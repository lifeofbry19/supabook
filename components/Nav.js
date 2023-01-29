import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function Nav() {
  //const [selected, setSelected] = useState("discover");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useUser();
  return (
    <nav className=" bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400   "
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden  sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/recipes"
                  className={`hover:bg-gray-700 text-white px-3 py-2 rounded-md  font-medium text-md`}
                  aria-current="page"
                >
                  Discover
                </Link>
                {user ? (
                  <Link
                    replace={true}
                    href={{
                      pathname: "/[userId]/user-recipes",
                      query: { userId: user.id },
                    }}
                    className={` text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md  font-medium text-md`}
                  >
                    My Recipes
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center absolute left-[44%] top-4 -translate-x-5 sm:translate-x-0 text-white">
            <Link href="/">
              <h1 className="bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent text-3xl">
                Supabook
              </h1>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                {user && (
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Link href={`/${user?.id ? user.id : "#"}`}>
                      <div className="h-10 w-10 rounded-full bg-gray-700 opacity-80 justify-center items-center ">
                        <p className="bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent text-3xl">
                          {user.email ? user.email[0].toUpperCase() : "A"}
                        </p>
                      </div>
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden ${mobileMenuOpen ? "" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          <a
            href="/recipes"
            className=" text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Discover
          </a>

          <a
            href="#"
            className="text-white   block px-3 py-2 rounded-md text-base font-medium"
          >
            My Recipes
          </a>
        </div>
      </div>
    </nav>
  );
}
