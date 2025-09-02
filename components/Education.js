import React from "react"

export default function Education({ edu }) {
    return (
      <div className="grid grid-cols-5 gap-10 [&:not(:last-child)]:mb-[2em]">
        <div className="col-span-5 md:col-span-1 max-w-[25%] md:max-w-full mx-auto">
          <img src={edu.image} />
        </div>
        <div className="col-span-5 md:col-span-3 my-auto">
          <h1 className="font-bold text-xl text-gray-700 dark:text-gray-200">
            {edu.institution}
          </h1>
          <h2 className="font-bold italic text-lg text-gray-700 dark:text-gray-200 whitespace-pre-line">
            {edu.department}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 whitespace-pre-line">
            {edu.degree}
          </p>
        </div>
        <div className="col-span-5 md:col-span-1 m-auto">
          <p className="text-gray-500 dark:text-gray-300">{edu.date}</p>
        </div>
      </div>
    )
}