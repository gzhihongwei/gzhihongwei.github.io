import React from "react"
import Head from "next/head"
import Script from "next/script"
import { useRouter } from "next/router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import userData from "@constants/george_data"

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter()

  const meta = {
    title: `${userData.names[0]} - ${userData.position}`,
    description: userData.shortDescription,
    image: userData.pfp,
    type: "website",
    ...customMeta,
  }
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://${userData.domain}${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://${userData.domain}${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={userData.names[0]} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gzhihongwei" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}

        <Script>
          <script
            id="MathJax-script"
            async
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          ></script>
        </Script>
      </Head>
      <main className="dark:bg-gray-800 w-full">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  )
}
