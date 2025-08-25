/**
 * @fileoverview Utilities for parsing and sorting publications.
 */

/**
 * Splits a string on a separator and strips whitespace from each resulting string.
 * @param {string} stringToSplit The string to split.
 * @param {string} separator The separator to split on.
 * @param {number} [maxsplit=undefined] The maximum number of splits to do.
 * @returns {Array<string>} An array of the split strings with whitespace stripped.
 */
export function _splitAndStripWhitespace(
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
 * Parses a bibtex author string into an array of authors, where each author is
 * represented as an array of [last name, first name].
 * @param {string} authors The string of all the authors.
 * @returns {Array<string>} An array containing all of the parsed authors.
 */
export function parseAuthors(authors) {
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
 * Sorts an array of publications according to the "ydnt" scheme used by `biblatex`.
 * @param {Array<Object<string, string | Object<string, string>>} pubs An array of JS objects that represents the parsed.
 * @returns {Array<Object<string, string | Object<string, string>>} The sorted publications according to `ydnt`
 */
export function sortPublications(pubs) {
  let pubComparator = (a, b) => {
    let aTags = a.entryTags
    let bTags = b.entryTags

    let aYear = aTags.year
    let bYear = bTags.year

    if (aYear !== bYear) return bYear - aYear // Sort by descending year

    let aMonth = aTags.month || 1
    let bMonth = bTags.month || 1

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

/**
 * Comparator for comparing two bibtex entries by the specified field.
 * @param {Object<string, string | Object<string, string>} aTags The parsed bibtex tags of publication a.
 * @param {Object<string, string | Object<string, string>} bTags The parsed bibtex tags of publication b.
 * @param {string} field Which field to compare (e.g., "author", "editor", "translator").
 * @returns {number} The comparison result: negative if a < b, positive if a > b, 0 if equal.
 */
function _compareNames(aTags, bTags, field) {
  if (!(field in aTags)) return 0

  let aField = parseAuthors(aTags[field])
  let bField = parseAuthors(bTags[field])

  let aFieldJoined = aField.map((v) => `${v[0]}, ${v[1]}`).join(" and ")
  let bFieldJoined = bField.map((v) => `${v[0]}, ${v[1]}`).join(" and ")

  return aFieldJoined.localeCompare(bFieldJoined)
}
