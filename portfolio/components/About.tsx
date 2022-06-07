import React from "react"
import Image from "next/image"
import profile from "../public/portrait.jpeg"
import Link from "next/link"

const About = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="lg:space-x-5 lg:flex lg:flex-row item-center lg:-mx-4 flex flex-col-reverse text-center lg:text-left">
        <div className="lg:px-4 lg:mt-12 ">
          <h1 className="text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white">
            Hi, I'm Derek,
          </h1>
          <div className="mt-6 text-gray-800 dark:text-white">
            <p className="mb-4">
              I'm a Full Stack Developer and a Game Developer. I work as a Senior Software Engineer at
              <Link href={'https://www.displaysweet.com/'}><a target="_blank" className={"font-bold"}> DisplaySweet</a></Link>.
              Welcome to my digital garden, where I share what I'm learning and what I am thinking.
            </p>

            <p className="mb-4">
              My development experience crosses different fields: game, web, cross-platform app. Recently I start to do some backend

              based on AWS for my side projects. Currently I focus on WebGL 3D development in my working time.

              In my free time I work on side projects and contribute to open source projects.
            </p>

            <p className="mb-4">
              Welcome to my digital garden, where I share what I'm learning and what I am thinking.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 lg:mt-12 lg:px-4 mb-10 self-center">
          <Image
            src={profile}
            alt="Profile"
            priority={true}
            className="rounded-full"
            width={128}
            height={128}
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  )
}

export default About;
