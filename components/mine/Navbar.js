import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import userData from "@constants/george_data"

export default function Navbar() {
  const router = useRouter()
  console.log(router.asPath)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex md:flex-row justify-between items-center">
        <div className="flex flex-col">
          <Link href="/">
            <h1 className="font-semibold text-xl dark:text-gray-100">
              {userData.names[0]}
            </h1>
            <p className="text-base font-light text-gray-500 dark:text-gray-300">
              {userData.position}
            </p>
          </Link>
        </div>

        <div className="space-x-8 hidden md:block">
          {/* <Link
            href="/about"
            className={`text-base  ${
              router.asPath === "/about"
                ? "text-gray-800 font-bold dark:text-gray-400"
                : "text-gray-600 dark:text-gray-300 font-normal "
            }`}
          >
            About{" "}
            {router.asPath === "/about" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-down inline-block h-3 w-3"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                />
              </svg>
            )}
          </Link> */}
          <Link
            href="/research"
            className={`text-base  ${
              router.asPath === "/research"
                ? "text-gray-800 font-bold dark:text-gray-400"
                : "text-gray-600 dark:text-gray-300 font-normal "
            }`}
          >
            Research
            {router.asPath === "/research" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-down inline-block h-3 w-3"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                />
              </svg>
            )}
          </Link>
          <Link
            href={userData.cv}
            className={`text-base  ${
              router.asPath === userData.cv
                ? "text-gray-800 font-bold dark:text-gray-400"
                : "text-gray-600 dark:text-gray-300 font-normal "
            }`}
          >
            CV
          </Link>
        </div>

        <div className="space-x-4 flex flex-row items-center">
          <a
            href={userData.socialLinks.semanticScholar}
            className="text-base font-normal text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              height="16"
              className="bi bi-semantic-scholar h-5 w-5"
              viewBox="0 0 512 512"
            >
              <path
                d="m379.0868 75.20191c18.16812 40.68422 25.53302 83.89034 32.42143 127.20955-1.26557.35902-2.52865.72116-3.79427 1.08267-.9109-2.53364-1.98432-5.02156-2.70735-7.60959-5.21805-18.65384-10.47938-37.29655-15.47376-56.01156-1.79641-6.7327-6.03443-10.08392-12.09539-13.38137-8.90177-4.84112-17.31343-11.08316-24.69005-18.04576-4.70771-4.44068-8.73494-7.14859-15.41325-7.07815-44.46061.47028-88.92553.51538-133.38426.92448-2.96314.0295-6.63075 1.12345-8.72809 3.06448-8.08853 7.48476-15.67094 15.51457-25.64177 25.55586 26.29927 64.04074 39.52245 133.8403 33.84523 208.04469-12.62623-8.0842-22.40117-14.47949-22.98144-31.41848-2.90381-84.66094-29.02018-161.22472-83.580741-227.107617-1.227261-1.482494-1.837205-3.476039-2.736967-5.229823h284.960678zm-330.356845 32.64514c12.662672 0 25.33214-.20085 37.983708.17178 2.510789.0723 6.022658 1.66788 7.277148 3.67935 37.836649 60.79088 67.333839 124.63574 71.155359 197.68268.0178.28921-.2826.59448-1.36262 2.71657-22.61129-77.29358-63.40364-142.73587-115.871175-201.39106.273676-.95167.544426-1.90519.818185-2.85871zm-40.7293523 53.1819c18.0890173-.65752 33.3891773-1.3175 48.6911883-1.60238 1.541204-.0295 3.360468 2.009 4.650795 3.4439 29.847587 33.20131 56.935394 68.2806 73.632114 110.23473 3.17758 7.97976 5.35158 16.35996 7.98907 24.55477-34.58434-54.42464-82.710674-95.12245-134.9637713-136.63164zm194.4736173 275.76916c-31.48153-50.06559-61.80372-98.28894-92.12778-146.5123.37077-.47706.74155-.95165 1.11169-1.42811 2.54233 2.04731 56.62149 45.41225 80.9093 65.30201 6.76608 5.54129 11.87848 5.44178 18.91585-.27375 82.58396-67.08545 174.73706-117.86224 272.58287-158.80848 5.22305-2.18511 10.64009-3.91664 15.98238-5.81688 1.18651-.42022 2.44093-.65319 4.15147-.22122-113.62299 65.98672-222.02236 138.23835-301.52641 247.75933z"
                stroke-width=".086816"
              />
            </svg>
          </a>
          <a
            href={userData.socialLinks.googleScholar}
            className="text-base font-normal text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              height="16"
              className="bi bi-google-scholar h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path d="M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
          </a>
          <a
            href={userData.socialLinks.x}
            className="text-base font-normal text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-twitter h-5 w-5"
              viewBox="0 0 300 300.251"
            >
              <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
            </svg>
          </a>
          <a
            href={userData.socialLinks.linkedin}
            className="text-base font-normal text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-linkedin h-5 w-5"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
          </a>
          <a
            href={userData.socialLinks.github}
            className="text-base font-normal text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-github h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
            </svg>
          </a>

          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 rounded focus:outline-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-yellow-500 dark:text-yellow-500"
              >
                {theme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="space-x-8 text-center block md:hidden mt-4">
        <Link
          href="/research"
          className="text-base font-normal text-gray-600 dark:text-gray-300"
        >
          Research
        </Link>
        {/* <Link
          href="/teaching"
          className="text-base font-normal text-gray-600 dark:text-gray-300"
        >
          Teaching
        </Link> */}
        <Link
          href="/George_Wei.CV.pdf"
          className="text-base font-normal text-gray-600 dark:text-gray-300"
          target="_blank"
        >
          CV
        </Link>
      </div>
    </div>
  )
}
