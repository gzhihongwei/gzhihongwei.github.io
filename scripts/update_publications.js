import axios from "axios"
import fs from "fs/promises"
import path from "path"
import bibtexParse from "@orcid/bibtex-parse-js"
import { fileURLToPath } from "url"
import { parseAuthors, sortPublications } from "../utils/publications.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Semantic Scholar API endpoint for author search
const API_URL = "https://api.semanticscholar.org/graph/v1/author/"

// Your Semantic Scholar author ID (you'll need to replace this)
const AUTHOR_ID = process.env.SEMANTIC_SCHOLAR_AUTHOR_ID

// Output file path
const OUTPUT_PATH = path.join(__dirname, "..", "public", "publications.bib")


/**
 * Makes a citation key based on the first author's last name, year, and first word of the title.
 * @param {string} authors A bibtex author string.
 * @param {number} year The publication year.
 * @param {string} title The publication title.
 * @returns {string} A citation key in the form `firstAuthorLastNameYearTitleFirstWord`.
 */
function makeCitationKey(authors, year, title) {
  const parsedAuthors = parseAuthors(authors)
  const firstAuthorLastName = parsedAuthors[0][0].replace(/\s+/g, "").toLowerCase()
  const titleFirstWord = title
    .split(" ")
    .filter(
      (word) => !["a", "an", "are", "the"].includes(word.toLowerCase())
    )[0]
    .replace(/:$/, "")
    .toLowerCase()
  return `${firstAuthorLastName}${year}${titleFirstWord}`
}

/**
 * Extracts a URL from a disclaimer string if present.
 * @param {string} disclaimer The disclaimer string from Semantic Scholar that may contain a URL.
 * @returns {string | null} The extracted URL, or null if none found.
 */
function extractUrl(disclaimer) {
  const urlMatch = disclaimer.match(/https?:\/\/[^\s,]+/)
  return urlMatch ? urlMatch[0] : null
}

/**
 * Adds additional information from Semantic Scholar to a bibtex entry.
 * @param {Object<string, string | Object<string, string>} bibtexEntry The bibtex entry to modify as parsed by `bibtex-parse-js`.
 * @param {Object<string, string | Object<string, any>>} paper The paper object from Semantic Scholar.
 */
function addToBibtex(bibtexEntry, paper) {
  const entryTags = bibtexEntry.entryTags
  entryTags.year = paper.year

  // Make citation key
  bibtexEntry.citationKey = makeCitationKey(entryTags.author, entryTags.year, entryTags.title)

  // Add abstract
  entryTags.abstract = paper.abstract

  // Add URL if available
  const rawUrl =
    paper.openAccessPdf.url || extractUrl(paper.openAccessPdf?.disclaimer || "")
  if (rawUrl !== null) {
    let finalUrl
    if (rawUrl.startsWith("https://arxiv.org"))
      finalUrl = rawUrl.replace("/pdf/", "/abs/")
    else if (rawUrl.startsWith("https://proceedings.neurips.cc"))
      finalUrl = rawUrl
        .replace("/file/", "/hash/")
        .replace("-Paper-", "-Abstract-")
        .replace(".pdf", ".html")
    // TODO: handle other cases
    entryTags.url = finalUrl
  }

  // Add month if available
  const month = paper.publicationDate
    ? parseInt(paper.publicationDate.split("-")[1])
    : null
  if (month !== null) entryTags.month = month

  // Determine entry type and add venue info
  if (paper.venue !== "arXiv.org") {
    bibtexEntry.entryType = "inproceedings"
    entryTags.booktitle = paper.venue
  } else {
    bibtexEntry.entryType = "misc"
    entryTags.eprint = rawUrl.split("/").pop()
    entryTags.archivePrefix = "arXiv"
    delete entryTags.booktitle
  }
}

async function fetchPublicationData() {
  try {
    // Fetch author data including papers
    const response = await axios.get(`${API_URL}${AUTHOR_ID}`, {
      params: {
        fields:
          "name,paperCount,papers.title,papers.year,papers.venue,papers.publicationDate,papers.abstract,papers.citationStyles",
      },
    })

    const authorData = response.data

    const papers = authorData.papers
      .map((paper) => {
        let parsedBibtex = bibtexParse.toJSON(paper.citationStyles.bibtex)[0]
        addToBibtex(parsedBibtex, paper)
        return parsedBibtex
      })

    // Filter out papers that are already in the .bib file
    // const newPapers = papers
    const previousPapers = bibtexParse.toJSON(await fs.readFile(OUTPUT_PATH, 'utf-8'))
    const newPapers = papers.filter((paper) => !previousPapers.map(p => p.title).includes(paper.title))

    const allPapers = sortPublications(previousPapers.concat(newPapers))

    // Write to file
    await fs.writeFile(
      OUTPUT_PATH,
      bibtexParse.toBibtex(allPapers, false)
    )
    console.log("New publication data successfully written to file")
  } catch (e) {
    console.error("Error fetching or writing publication data:", e.message)
  }
}

// Run the script
await fetchPublicationData()
