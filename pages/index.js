import { promises as fs } from "fs"
import bibtexParse from "@orcid/bibtex-parse-js"

import ContainerBlock from "../components/ContainerBlock"
import Hero from "../components/Hero"

export default function Home({ pubs }) {
  return (
    <ContainerBlock>
      <Hero pubs={pubs} />
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
