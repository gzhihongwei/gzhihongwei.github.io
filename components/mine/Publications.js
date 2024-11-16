import React from "react"
import userData from "@constants/george_data"

// Read in the `.bib` file
// Sort in the same way as the CV
/**
 *
 * @param {string} stringToSplit
 * @param {string} separator
 * @param {number} [maxsplit=undefined]
 * @returns
 */
function _splitAndStripWhitespace(
  stringToSplit,
  separator,
  maxsplit = undefined
) {
  let splitString = stringToSplit.split(separator)

  if (maxsplit !== undefined) {
    let tempSplitString = splitString
    splitString = tempSplitString.splice(0, maxsplit)
    splitString.push(tempSplitString.join(separator))
  }

  return splitString
    .map((value) => value.trim())
    .filter((value) => value !== "")
}

/**
 *
 * @param {Array<Object>} pubs An array of JS objects that represents the parsed.
 * @returns {Array<Object>} The sorted publications according to `ydnt`
 */
function sortPublications(pubs) {
  // Need to implement a comparator
  // In case of ties, additionally sort by name of the publication? TODO: look at `biblatex` to see how they actual sort
  let pubComparator = (a, b) => {
    let aTags = a.entryTags
    let bTags = b.entryTags

    let aYear = aTags.year
    let bYear = bTags.year

    if (aYear !== bYear) return bYear - aYear // Sort by descending year

    let aMonth = aTags.month
    let bMonth = bTags.month

    if (aMonth !== bMonth) return bMonth - aMonth // Sort by descending month

    let fields = ["author", "editor", "translator"] // Sort by ascending name

    for (let field of fields) {
      let comparison = _compareNames(aTags, bTags, field)

      if (comparison !== 0) return comparison
    }

    let aTitle = aTags.title
    let bTitle = bTags.title

    return aTitle.localeCompare(bTitle) // Sort by ascending title
  }

  return pubs.sort(pubComparator)
}

function _compareNames(aTags, bTags, field) {
  if (!(field in aTags)) return 0

  let aField = parseAuthors(aTags[field])
  let bField = parseAuthors(bTags[field])

  let aFieldJoined = aField.map((v) => `${v[0]}, ${v[1]}`).join(" and ")
  let bFieldJoined = bField.map((v) => `${v[0]}, ${v[1]}`).join(" and ")

  return aFieldJoined.localeCompare(bFieldJoined)
}

/**
 *
 * @param {string} authors The string of all the authors.
 * @returns {Array<string>} An array containing all of the parsed authors.
 */
function parseAuthors(authors) {
  // First split on "and"
  let splitAuthors = _splitAndStripWhitespace(authors, "and")

  return splitAuthors.map((authorString) => {
    // Three cases:
    //  Case 1: First von Last, no processing needs to be done
    if (authorString.indexOf(",") === -1)
      return _splitAndStripWhitespace(authorString, " ", 1).reverse()

    let authorParts = _splitAndStripWhitespace(authorString, ",")

    // Both of the following cases need to have the First Name moved to the front of the array
    let authorFirstName = authorParts.pop()
    let joinedLastName = authorParts.join(" ")
    //  Case 2: von Last, First
    //  Case 3: von Last, Jr, First // TODO: finish considering this case
    return [joinedLastName, authorFirstName]
  })
}

/**
 *
 * @param {string} authorAnnsString The `author+an` field
 * @returns {Object} A mapping from author annotation to list of authors with that annotation
 */
function parseAuthorAnns(authorAnnsString) {
  let splitAuthorAnnsStrings = _splitAndStripWhitespace(authorAnnsString, ";")

  // Maps author annotation to the author indices that have that annotation
  // e.g. allAuthorAnns["first"] = [0, 1]
  let allAuthorAnns = {}

  splitAuthorAnnsStrings.forEach((splitAuthorAnnsString) => {
    // `splitAuthorAnnsString` is in the form "int=ann1,ann2,..."
    // 1. Split on "="
    let [authorIndex, authorAnns] = _splitAndStripWhitespace(
      splitAuthorAnnsString,
      "="
    )
    // 2. Split on "," in `authorAnns`
    authorAnns = _splitAndStripWhitespace(authorAnns, ",")
    // Add to `allAuthorAnns`
    authorAnns.forEach((authorAnn) => {
      if (!(authorAnn in allAuthorAnns)) {
        allAuthorAnns[authorAnn] = []
      }

      allAuthorAnns[authorAnn].push(+authorIndex - 1) // `authorIndex` is 1-indexed in bibtex
    })
  })

  return allAuthorAnns
}

function prepareAuthors(pubTags) {
  let parsedAuthors = parseAuthors(pubTags.author)

  let areAuthorAnns = "author+an" in pubTags
  let parsedAuthorAnns = areAuthorAnns
    ? parseAuthorAnns(pubTags["author+an"])
    : null

  return constructNames(parsedAuthors, parsedAuthorAnns)
}

function prepareAbstract(abstract) {
  // Identify latex and surround with \(\)
  return abstract.replace(/(\$.*\$|\\.*\{.*\})/g, "\\($1\\)")
}

function constructBibtex(pub) {
  const deleteKeys = ["author+an", "thumbnail", "page", "github", "abstract"]

  let pubCopy = JSON.parse(JSON.stringify(pub))

  for (let key of deleteKeys) delete pubCopy.entryTags[key]

  return BibtexParser.toBibtex(pubCopy)
}

function constructNames(authors, authorAnns) {
  let authorStrings = authors.map((val) => `${val[1]} ${val[0]}`)

  if (authorAnns !== null) {
    for (const key in authorAnns) {
      let authorInds = authorAnns[key]

      let ann

      // TODO: add more symbols
      switch (key) {
        case "first":
          ann = "*"
          break

        case "last":
          ann = "†"
          break
      }

      authorInds.forEach((ind) => {
        authorStrings[ind] += ann
      })
    }
  }

  let authorElements = authorStrings.map(highlightName)

  return (
    <>
      {authorElements.map((author, idx) => (
        <>
          {author}
          {idx !== authorElements.length - 1 ? ", " : ""}
        </>
      ))}
      .
    </>
  )
}

function constructVenueYear(pub) {
  let venue
  switch (pub.entryType.toLowerCase()) {
    case "inproceedings":
      venue = "booktitle"
      break

    case "article":
    case "misc":
    default:
      venue = "journal"
      break
  }

  return `${pub.entryTags[venue]}. ${pub.entryTags.year}.`
}

/**
 *
 * @param {string} authorString The author name to possibly highlight.
 * @returns {React.ReactElement} The possibly highlighted name.
 */
function highlightName(authorString) {
  if (userData.names.some((name) => authorString.includes(name)))
    return <strong>{authorString}</strong>
  return <>{authorString}</>
}

export default function Publications({ title, pubs }) {
  pubs = sortPublications(pubs)

  return (
    <div className="flex flex-col md:flex-row justify-center items-start overflow-hidden">
      <div className="w-full mx-auto text-left p-10 lg:p-20">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-200 my-2">
          {title}
        </h1>

        <div className="grid grid-cols-1 max-w-2xl mx-auto">
          {pubs.map((pub) => (
            <Publication key={pub.citationKey} pub={pub} />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 *
 * @param {Object} pub A publication object to be rendered.
 *
 */
function Publication({ pub }) {
  // Thumbnail image
  // Title as hyperlink
  // Abstract (need to surround any Latex with "\(\)")
  // Bibtex
  // Project Page? (Project Page)
  // GitHub? (Code)
  const pubTags = pub.entryTags

  let thumbnail = pubTags?.thumbnail
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl text-gray-700 dark:text-gray-200 mt-4">
        {pubTags.title}
      </h1>
      <p className="text-gray-500 dark:text-gray-300">
        {prepareAuthors(pubTags)}
      </p>
      <p className="font-bold italic text-gray-700 dark:text-gray-200">
        {constructVenueYear(pub)}
      </p>
      <p>
        <a href={pubTags.url} target="_blank">
          [Paper]
        </a>
      </p>
    </div>
  )
}
