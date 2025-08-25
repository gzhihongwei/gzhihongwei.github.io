import React from "react"
import userData from "@constants/data"

export default function Hero() {
  return (
    <div className="grid grid-cols-2 gap-2 max-w-6xl mx-auto">
      {/* Text container */}
      <div className="order-2 xl:order-1 col-span-2 xl:col-span-1 px-10 xl:px-0">
        <h1 className="text-center text-3xl xl:text-4xl font-bold text-gray-700 dark:text-gray-200 my-2">
          {userData.names[0]} ({userData.chineseName})
        </h1>
        {userData.description.map((desc, idx) => (
          <p
            key={idx}
            className="text-m xl:text-xl text-gray-700 mb-4 dark:text-gray-300"
          >
            {desc}
          </p>
        ))}

        <h1 className="text-center text-3xl xl:text-4xl font-bold text-gray-700 dark:text-gray-200 my-2">
          News
        </h1>
        <div className="bg-[#F1F1F1] bg-opacity-75 dark:bg-gray-900 border-2 rounded-md overflow-y-scroll h-56">
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
      <div className="order-1 xl:order-2 col-span-2 xl:col-span-1 flex items-center max-w-xl mx-auto">
        <div className="text-center justify-center">
          <img
            src={userData.pfp}
            alt="avatar"
            className="shadow w-1/2 mx-auto"
          />

          <p className="mt-10 px-10 xl:px-0">
            <code>Email: {userData.encodedEmail}</code>
          </p>
        </div>
      </div>
    </div>
  )
}
