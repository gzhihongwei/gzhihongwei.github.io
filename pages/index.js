import bibtexParse from "@orcid/bibtex-parse-js"

import Publication from "../components/Publication.tsx"
import { sortPublications } from "../scripts/utils.ts"

import publications from "./publications.bib"

const Index = () => {
  const pubs = sortPublications(bibtexParse.toJSON(publications))
  return (
    <>
      <p>
        I'm an AI Resident at <a href="https://ai.facebook.com/">Meta AI</a>. My
        research interests lie at the intersection of computer vision, natural
        language processing, and deep learning (or multimodal machine learning).
        I am mentored by{" "}
        <a href="https://satwikkottur.github.io/">Satwik Kottur</a>,{" "}
        <a href="https://zzhangncsu.github.io/">Zhe Zhang</a>,{" "}
        <a href="https://www.linkedin.com/in/danbikel/">Dan Bikel</a>, and{" "}
        <a href="https://shanemoon.com/">Shane Moon</a>. Previously, I completed
        my undergrad at <a href="https://www.umass.edu/">UMass Amherst</a>,
        where I was fortunate to have worked with Prof.{" "}
        <a href="https://people.cs.umass.edu/~miyyer/">Mohit Iyyer</a>,{" "}
        <a href="https://groups.cs.umass.edu/zamani/">Hamed Zamani</a>, and{" "}
        <a href="https://people.cs.umass.edu/~mfiterau/">Ina Fitera</a>. I also
        previously participated in{" "}
        <a href="https://www.cs.umd.edu/projects/reucaar/">REU-CAAR</a> at the{" "}
        <a href="https://www.umd.edu/">University of Maryland</a>, where I had
        the great pleasure of working with Prof.{" "}
        <a href="http://jpdickerson.com/">John Dickerson</a> and{" "}
        <a href="https://www.cs.umd.edu/~tomg/">Tom Goldstein</a>.
      </p>
      <p>email: gzwei [at] fb [dot] com</p>
      {/* Add headshot here */}
      <div>George Zhihong Wei (魏治鸿)</div>
      {pubs.map((pub) => (
        <Publication key={pub["citationKey"]} {...pub} />
      ))}
    </>
  )

  // Add a navbar

  // For each publication,
  //  Make the title an anchor tag to the publication if the link exists
  //  Format the authors
  //  Add the journal/workshop/booktitle/conference and year
}

export default Index
