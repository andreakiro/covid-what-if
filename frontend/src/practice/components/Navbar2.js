import React from "react";

export default function Nav() {
  return (
    <div className="px-4 md:px-8 lg:px-32 bg-indigo-400 text-3xl">
      <nav className="flex items-center justify-between py-2">
        <div className="flex items-center lg:w-1/2">
          <div className="flex items-center">
            <div className="hidden mx-4 sm:block text-white font-bold">
              What if ?
            </div>
          </div>
        </div>

        {/* begin */}

        <div class="relative inline-block text-left">
          <div>
            <span class="rounded-md shadow-sm">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Options
                {/* <!-- Heroicon name: chevron-down --> */}
                <svg
                  class="-mr-1 ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>

          {/* <!--
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
          <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
            <div class="rounded-md bg-white shadow-xs">
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  Support
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                >
                  License
                </a>
                <form method="POST" action="#">
                  <button
                    type="submit"
                    class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* end */}

        {/* <div className="hidden mx-4 sm:block text-white font-bold">More</div> */}
      </nav>
    </div>
  );
}
