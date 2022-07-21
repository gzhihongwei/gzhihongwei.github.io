import React from "react"

const Publications = () => {
  return <div>Publications</div>
}

export default Publications

function formatAuthors(authors, authorAnnotations) {
  const authorAnns: string[] = authorAnnotations.split(/;\ ?/).filter(Boolean)
  const authorAnnsMap: AuthorAnnotationMap = authorAnns.reduce(
    (acc: AuthorAnnotationMap, curr: string): AuthorAnnotationMap => {
      const [authorNum, authorAnnotation]: string[] = curr.split("=")
      acc[authorNum] = authorAnnotation.split(",")
      return acc
    },
    {}
  )

  for (const [authorNum, authorAnnotation] of Object.entries(authorAnnsMap)) {
    for (const authorAnn of authorAnnotation) {
      switch (authorAnn) {
        case "first":
          authors[+authorNum - 1] += "<sup>*</sup>"
          break
        case "highlight":
          authors[+authorNum - 1] = `<strong>${
            authors[+authorNum - 1]
          }</strong>`
          break
      }
    }
  }

  return authors.join(", ")
}
