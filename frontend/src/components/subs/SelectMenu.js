import React, { useState } from "react";

export default function SelectMenu({label}) {
  return (
    <div class="space-y-1">
      <label
        id="listbox-label"
        class="block text-sm leading-5 font-medium text-gray-700"
      >
        {label}
      </label>

      <div class="relative">
        <span class="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <div class="flex items-center space-x-3">
              <span class="block truncate">Tom Cook</span>
            </div>
          </button>
        </span>

        {/* <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          <ul
            tabindex="-1"
            role="listbox"
            class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            <li
              id="listbox-item-0"
              role="option"
              class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
            >
              <div class="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                  class="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span class="font-normal block truncate">Wade Cooper</span>
              </div>

              <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
