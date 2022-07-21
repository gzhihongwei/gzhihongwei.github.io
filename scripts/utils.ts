export interface BibTexParsed {
  citationKey: string
  entryTages: { [key: string]: string }
  entryType: string
}

export function sortPublications(publications: BibTexParsed[]): BibTexParsed[] {
  // Sorts by "ydnt" like that in `biblatex`
  return publications.sort(
    (a, b) =>
      +(b["entryTags"]["year"] - a["entryTags"]["year"]) ||
      +a["entryTags"]["author"]
        .toLowerCase()
        .localeCompare(b["entryTags"]["author"].toLowerCase()) ||
      +a["entryTags"]["title"]
        .toLowerCase()
        .replace(/\b(a|an|the)\b/g, "")
        .localeCompare(
          b["entryTags"]["title"].toLowerCase().replace(/\b(a|an|the)\b/g, "")
        )
  )
}

export function parseAuthor(author: string): string {
  let nameParts: string[] = author.split(",")

    // The only valid formats for authors are
    //  1. First von Last;
    //  2. von Last, First; and
    //  3. von Last, Jr, First.
    // So if there are any commas, move the last split part (First name) to the beginning of the array
    if (nameParts.length > 1)
      nameParts = [
        ...nameParts.slice(-1, nameParts.length),
        ...nameParts.slice(0, -1),
      ]

    return nameParts.join(" ")
}
