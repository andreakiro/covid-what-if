import React, { useState } from "react";

function isNumeric(str) {
  if (typeof str != "string") return false;
  return str === "" ? true : !isNaN(parseInt(str));
}

function dateIsValid(date, y1, y2) {
  // check if input is too big
  if (date.length > 10) return false;

  // check that DD.MM.YYYY are numeric
  let bool = false;
  for (let i = 0; i < date.length; i++) {
    if (bool) return true;
    if (i == 2 || i == 5) continue;
    bool |= !isNumeric(date.substring(i, i + 1));
  }

  // check that char 3 and 6 are dots
  if (date.length >= 6) {
    bool |= date.substring(5, 6) != ".";
  } else if (date.length >= 3) {
    bool |= date.substring(2, 3) != ".";
  }

  // check coherence for YYYY
  if (date.length == 10) {
    let year = parseInt(date.substring(6, 10));
    bool |= year > y2 || year < y1;
  }

  // check coherence for MM
  if (date.length >= 5) {
    let month = parseInt(date.substring(3, 5));
    bool |= month > 12 || month < 1;
  }

  // check coherence for DD
  if (date.length >= 2) {
    let days = parseInt(date.substring(0, 2));
    bool |= days > 31 || days < 1;
  }
  return !bool;
}

export default function Dropdown({ textselector, open, onOpen, onClose }) {
  let [selected, setSelected] = useState(null);
  let [placeholder, setPlaceholder] = useState("DD.MM.YYYY");
  let [invalidInput, setInvalidInput] = useState(false);
  let [inputProgress, setInputProgress] = useState(false);

  let valid = (date) => {
    return dateIsValid(date, 2000, 2050);
  };

  let invalidInputLogic = (date) => {
      if (valid(date) || date == "") {
          setInvalidInput(false);
      } else {
          setInvalidInput(true);
      }
  };

  let inputProgressLogic = (date) => {
    if (date.length == 10 || date == "") {
        setInputProgress(false);
    } else {
        setInputProgress(true);
    }
  };

  let setTextOrReset = (date) => {
    if (date === null || date === "") {
      setSelected(textselector);
    } else {
      setSelected(date);
    }
  };

  return (
    <div class="relative inline-block text-left">
      <div>
        <span class="rounded-md shadow-sm">
          <button
            type="button"
            class={`inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm leading-5 font-medium border ${
              invalidInput
                ? "border-red-300 text-red-700 hover:text-red-500"
                : (inputProgress ? "border-orange-300 text-yellow-700 hover:text-yellow-600" : "border-gray-300 text-gray-700 hover:text-gray-500")
            } focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
            onClick={() => {
              if (open) {
                onClose();
                setPlaceholder("DD.MM.YYYY");
              } else {
                onOpen();
              }
            }}
            id="options-menu"
          >
            {selected ?? textselector}
            <svg
              class={`-mr-1 ml-2 h-5 w-5 transform ${
                open ? "-rotate-180" : ""
              } transition-transform duration-200`}
              xmlns="http://www.w3.org/2000/svg"
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

      <div
        class={`origin-top-right absolute z-10 right-0 mt-2 w-full rounded-md shadow-lg ${
          open ? "" : "hidden"
        }`}
      >
        <div class="rounded-md bg-white shadow-xs">
          <input
            id="date"
            class="block px-4 py-2 w-full text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            placeholder={placeholder}
            onChange={(event) => {
              let date = event.target.value;
              inputProgressLogic(date);
              invalidInputLogic(date);
              setTextOrReset(date);
            }}
          />
        </div>
      </div>
    </div>
  );
}
