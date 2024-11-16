import { promises as fs } from "fs"
import bibtexParse from "@orcid/bibtex-parse-js"

import styles from "../styles/Home.module.css"
import ContainerBlock from "../components/mine/ContainerBlock"
import Hero from "../components/mine/Hero"
import SelectedPublications from "../components/mine/SelectedPublications"

export default function Home({ pubs }) {
  return (
    <ContainerBlock>
      <Hero />
      <SelectedPublications pubs={pubs} />
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
