import React from "react";

export default function SelectMenu({ label }) {
  return (
    <div className="space-y-1">
      <label
        id="listbox-label"
        className="block text-sm leading-5 font-medium text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <div className="flex items-center space-x-3">
              <span className="block truncate">Tom Cook</span>
            </div>
          </button>
        </span>
      </div>
    </div>
  );
}
