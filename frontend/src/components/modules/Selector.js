import React from "react";
import { useParameters } from "../../parameters/ParameterProvider";

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function getIndexByPolicy(policynames, policy) {
  let key = getKeyByValue(policynames, policy);
  return parseInt(key.substring(1)) - 1;
}

export default function Selector({
  textselector,
  sortItems,
  open,
  onOpen,
  onClose,
}) {
  let [state, dispatch] = useParameters();
  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            onClick={() => {
              if (open) onClose();
              else onOpen();
            }}
            id="options-menu"
          >
            {state.unactives.length === 0 && state.country !== null
              ? "All in!"
              : textselector}
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
          open && state.unactives.length !== 0 ? "" : "hidden"
        }`}
      >
        <div
          className={`rounded-md bg-white shadow-xs overflow-y-auto ${
            state.unactives.length > 2 ? "h-24" : ""
          }`}
        >
          <div className="py-1">
            {(state.unactives ?? [])
              .sort((a, b) => {
                if (sortItems)
                  return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
                else return -1; // Don't sort the items
              })
              .map((item) => {
                return (
                  <button
                    className="block px-4 py-2 w-full text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    key={item}
                    onClick={() => {
                      dispatch({
                        type: "policy-transform-add",
                        relative: getIndexByPolicy(state.policynames, item),
                      });
                      onClose();
                    }}
                  >
                    {item}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
