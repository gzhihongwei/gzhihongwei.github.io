import React from "react"
import userData from "@constants/data"
import { _splitAndStripWhitespace, parseAuthors, sortPublications } from "@utils/publications"
import bibtexParse from "@orcid/bibtex-parse-js"


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

function prepareTeaser(pathToTeaser) {
  // If relativePath is an image, use <img> element
  // If relativePath is a video, use <video> element
  const fileExtension = pathToTeaser.split(".").pop().toLowerCase()
  if (["png", "jpg", "jpeg", "gif"].includes(fileExtension))
    return <img src={pathToTeaser} />
  else if (["mp4", "webm", "ogg"].includes(fileExtension))
    return <video playsInline autoPlay loop muted src={pathToTeaser}></video>
}

function prepareAbstract(abstract) {
  let processedAbstract = abstract
    .replace(/\\emph\{(.*?)\}/g, "<em>$1</em>")
    .replace(/\\textbf\{(.*?)\}/g, "<strong>$1</strong>")
    .replace(/\\textit\{(.*?)\}/g, "<em>$1</em>")
    .replace(/\\newline/g, "<br />")
    .replace(/\$(.*?)\$/g, "\\($1\\)") // Inline math
    .replace(/\\\[(.*?)\\\]/gs, "\\[$1\\]") // Display math
    .replace(/\\\\/g, "<br />") // New line in LaTeX
    .replace(/\\&/g, "&") // Literal &
    .replace(/\\%/g, "%") // Literal %
    .replace(/\\_/g, "_") // Literal _
    .replace(/\\#/g, "#") // Literal #
    .replace(/\\\{/g, "{") // Literal {
    .replace(/\\\}/g, "}") // Literal }
    .replace(/\\texttt\{(.*?)\}/g, "<code>$1</code>") // Inline code

  console.log(processedAbstract)

  return (
    processedAbstract
  )
}

function constructBibtex(pub) {
  const deleteKeys = ["author+an", "teaser", "project", "github", "abstract"]

  let pubCopy = JSON.parse(JSON.stringify(pub))

  for (let key of deleteKeys) delete pubCopy.entryTags[key]

  return bibtexParse.toBibtex([pubCopy], false).trimEnd()
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
      venue = pub.entryTags.booktitle
      break

    case "misc":
      venue = pub.entryTags.archiveprefix ?? pub.entryTags.note
      break
  }

  return `${venue}. ${pub.entryTags.year}.`
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
      <div className="w-full mx-auto text-left">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-200 my-2">
          {title}
        </h1>

        <div className="max-w-6xl mx-auto">
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
 * @param {Object<string, string | Object<string, string>>} pub A publication object to be rendered.
 *
 */
function Publication({ pub }) {
  const pubTags = pub.entryTags

  const [showBibtex, setShowBibtex] = React.useState(false);
  const [showAbstract, setShowAbstract] = React.useState(false);

  const [showCopyMessage, setShowCopyMessage] = React.useState(false);

  const duration = 2000

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(constructBibtex(pub));
    setShowCopyMessage(true);
  setTimeout(() => setShowCopyMessage(false), duration);
  };

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (showCopyMessage) {
      setProgress(0);
      const startTime = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed < duration) {
          requestAnimationFrame(updateProgress);
        }
      };
      
      requestAnimationFrame(updateProgress);
    }
  }, [showCopyMessage]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-[2em]">
      {showCopyMessage && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-green-700 px-4 py-2 rounded z-50"
          style={{
            opacity: progress > 50 ? 2 - progress / 50 : 1,
            borderBottomColor: "#22c55e", // green-500
            borderBottomStyle: "solid",
            background: `linear-gradient(90deg, #22c55e ${progress}%, transparent ${progress}%) bottom/100% 2px no-repeat, #f0fdf4`, // green-500 for progress, green-100 for background
          }}
        >
          <div className="flex items-center">
            <span className="mr-2">Copied to clipboard!</span>
            <button
              onClick={() => setShowCopyMessage(false)}
              className="text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div className="col-span-4 md:col-span-1 max-w-[25%] md:max-w-full mx-auto">{pubTags?.teaser && prepareTeaser(pubTags.teaser)}</div>
      <div className="col-span-4 md:col-span-3 my-auto">
        <h1 className="font-bold text-xl text-gray-700 dark:text-gray-200">
          {pubTags.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-300">
          {prepareAuthors(pubTags)}
        </p>
        <p className="font-bold italic text-gray-700 dark:text-gray-200">
          {constructVenueYear(pub)}
        </p>
        <div>
          <a href={pubTags.url} target="_blank" className="mr-2">
            [Paper]
          </a>
          <button
            onClick={() => {
              setShowAbstract(!showAbstract)
              if (!showAbstract) setShowBibtex(false)
            }}
            className="mr-2"
          >
            [Abstract]
          </button>
          <button
            onClick={() => {
              setShowBibtex(!showBibtex)
              if (!showBibtex) setShowAbstract(false)
            }}
            className="mr-2"
          >
            [Bibtex]
          </button>
          {pubTags?.project && (
            <a href={pubTags.project} target="_blank">
              [Website]
            </a>
          )}
          {pubTags?.github && (
            <a href={pubTags.github} target="_blank" className="ml-2">
              [GitHub]
            </a>
          )}
          {showAbstract && (
            <div
              className="bg-[#F1F1F1] bg-opacity-75 dark:bg-gray-900 my-2 p-2 rounded border-2 border-gray-300 dark:border-gray-700"
              dangerouslySetInnerHTML={{
                __html: prepareAbstract(pubTags.abstract),
              }}
            ></div>
          )}
          {showBibtex && (
            <div className="bg-[#F1F1F1] bg-opacity-75 dark:bg-gray-900 my-2 p-2 rounded border-2 border-gray-300 dark:border-gray-700">
              <div className="relative">
                <button
                  onClick={handleCopyBibtex}
                  className="float-right text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
              <pre className="break-all whitespace-pre-wrap">
                {constructBibtex(pub)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
