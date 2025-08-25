import React from "react"
import userData from "@constants/data"

import Publications from "./Publications"

export default function SelectedPublications({ pubs }) {
  let filteredPubs = pubs.filter((pub) => userData.selectedPubs.includes(pub.citationKey))

  return Publications({ title: "Selected Publications", pubs: filteredPubs })
}
