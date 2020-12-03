import React, { useState } from "react";

export default function Dropdown({
  textselector,
  items,
  sortItems,
  open,
  onOpen,
  onClose,
  defaultcountry = null,
  init = false
}) {
  let [selected, setSelected] = useState(defaultcountry);
  let onItemClicked = (name) => {
    onClose(name);
    setSelected(name);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className={`inline-flex justify-center w-full rounded-md border border-${ init && selected === null ? "green" : "gray"}-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
            onClick={() => {
              if (open) {
                onClose(selected);
              } else {
                onOpen();
              }
            }}
            id="options-menu"
          >
            {selected ?? textselector}
            <svg
              className={`-mr-1 ml-2 h-5 w-5 transform ${
                open ? "-rotate-180" : ""
              } transition-transform duration-200`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      <div
        className={`origin-top-right absolute z-10 right-0 mt-2 w-full rounded-md shadow-lg ${
          open ? "" : "hidden"
        }`}
      >
        <div className="rounded-md bg-white shadow-xs">
          <div className={`${selected === null ? "hidden" : ""}`}>
            <div className="py-1">
              <p className="block px-4 py-2 w-full text-left text-sm leading-5 text-gray-700">
                {selected}
              </p>
            </div>
            <div className="border-t border-gray-300"></div>
          </div>
          <div className="py-1">
            {(items ?? [])
              .sort((a, b) => {
                if (sortItems) {
                  if (a === "Global") return -1;
                  else if (b === "Global") return 1;
                  else return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
                } else {
                  return -1; // don't sort items
                }
              })
              .map((item) => {
                if (item !== selected) {
                  return (
                    <button
                      className="block px-4 py-2 w-full text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      key={item}
                      onClick={() => onItemClicked(item)}
                    >
                      {item}
                    </button>
                  );
                } else {
                  return null; // avoid array-callback-return error
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
