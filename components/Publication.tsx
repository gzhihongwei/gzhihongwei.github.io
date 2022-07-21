// There should be a toggle of detailed or not.
// If detailed, add a toggle for the abstract and the bibtex
// Otherwise, just simple (linked title)
import React from "react"

import { BibTexParsed } from "../scripts/utils"

const Publication = (props: BibTexParsed) => {
  return <pre>{JSON.stringify(props, null, 4)}</pre>
}

export default Publication
