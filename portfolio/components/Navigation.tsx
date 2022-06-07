import Link from "next/link"
import React from "react"
import ThemeSwitch from './ThemeSwitch';

const Navigation = () => {
  return (
    <div className="sticky top-0 z-20 py-2 bg-white md:py-6 md:mb-6 dark:bg-black">
      <div className="container px-4 mx-auto lg:max-w-4xl flex items-center justify-between">
        <Link href="/">
          <a
            className={"font-bold text-2xl tracking-wider transition-colors text-gray-600 hover:text-black dark:text-white dark:hover:text-gray-600"}
          >
            DW
          </a>
        </Link>
        <div className={"flex items-center"}>
          <div className="md:flex lg:flex space-x-4 font-medium">
            <Link href="/">
              <a className="text-gray-600 hover:text-black sm:block dark:text-white dark:hover:text-gray-600">
                About
              </a>
            </Link>
            <Link href="/">
              <a className="text-gray-600 hover:text-black sm:block dark:text-white dark:hover:text-gray-600">
                Works
              </a>
            </Link>
            <Link href="http://blog.birdinforest.com">
              <a className="text-gray-600 hover:text-black sm:block dark:text-white dark:hover:text-gray-600">
                Blog
              </a>
            </Link>
            <Link href="/Office3D">
              <a className="text-gray-600 hover:text-black sm:block dark:text-white dark:hover:text-gray-600">
                My Office
              </a>
            </Link>
            <Link href="/Test3D">
              <a className="text-gray-600 hover:text-black sm:block dark:text-white dark:hover:text-gray-600">
                Test3D
              </a>
            </Link>
            <Link href="/TV3D">
              <a className="text-gray-600 hover:text-black sm:block dark:text-white dark:hover:text-gray-600">
                TV3D
              </a>
            </Link>
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default Navigation;
