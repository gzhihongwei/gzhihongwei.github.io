import React from "react"
import { promises as fs } from "fs"
import bibtexParse from "@orcid/bibtex-parse-js"

import ContainerBlock from "../components/mine/ContainerBlock"
import Publications from "../components/mine/Publications"

export default function Research({ pubs }) {
  return (
    <ContainerBlock>
      <Publications title="Research" pubs={pubs} />
    </ContainerBlock>
  )
}

export const getStaticProps = async () => {
  const bibFile = await fs.readFile(
    process.cwd() + "/public/publications.bib",
    "utf8"
  )

  const pubs = bibtexParse.toJSON(bibFile)

  return {
    props: {
      pubs,
    },
  }
}
