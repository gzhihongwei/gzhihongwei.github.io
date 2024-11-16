import React from "react"
import userData from "@constants/george_data"

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start overflow-hidden">
      {/* Text container */}

      <div className="w-full md:w-1/2 mx-auto text-left px-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-200 my-2">
          {userData.names[0]} ({userData.chineseName})
        </h1>
        {userData.description.map((desc, idx) => (
          <p
            key={idx}
            className="text-m md:text-xl text-gray-700 mb-4 dark:text-gray-300"
          >
            {desc}
          </p>
        ))}

        <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-200 my-2">
          News
        </h1>
        <div className="border-2 rounded-md overflow-y-scroll h-56">
          <ul className="ml-2 list-disc list-outside ml-5">
            {userData.news.map((val, idx) => (
              <li key={idx}>
                <strong>{val[0]}:</strong> {val[1]}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Image container */}
      <div className="relative w-full md:w-1/2 mt-20">
        <div className="text-center justify-center items-center">
          <img
            src={userData.pfp}
            alt="avatar"
            className="shadow w-1/2 mx-auto"
          />

          <p className="mt-10">
            <code>Email: {userData.encodedEmail}</code>
          </p>
        </div>
      </div>
    </div>
  )
}
