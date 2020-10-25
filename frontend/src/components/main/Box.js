import React, { useState } from "react";

function Label({ text }) {
  return (
    <label
      id="listbox-label"
      class="block text-sm leading-5 font-medium text-gray-700"
    >
      {text}
    </label>
  );
}

export default function Box({ boxes, height }) {
  let [row, setRow] = useState(Array.from({ length: boxes }, (_, i) => i + 1));
  let [width, setWidth] = useState(
    Array.from({ length: height }, (_, i) => i + 1)
  );
  let [level, setLevel] = useState(0);

  let cycle = () => {
    console.log(level);
    if (level == 3) {
      setLevel(0);
    } else {
      setLevel((level += 1));
    }
  };
  return (
    <div class="flex flex-col justify-center space-y-2">
      <Label text="Each box represent 1/8 of the time frame" />
      <span class="inline-flex justify-center w-4/5 rounded-md border border-gray-600 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
        <div className="flex flex-col space-y-2 w-full">
          {width.map(() => {
            return (
              <div class="flex justify-center w-full space-x-2">
                {row.map((i) => {
                  return (
                    <button
                      onClick={() => cycle()}
                      class={`inline-flex justify-center bg-${
                        level == 0
                          ? "white"
                          : level == 1
                          ? "yellow-500"
                          : level == 2
                          ? "orange-500"
                          : "red-600"
                      } px-4 py-2 text-sm leading-5 font-medium text-${
                        level == 0 ? "gray-700" : "white"
                      } w-full rounded-md border border-${
                        level == 0 ? "gray-500" : ""
                      } px-4 py-2 text-sm leading-5 font-medium hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
                    >
                      <p
                        className={`text-${level == 0 ? "grey-700" : "white"}`}
                      >
                        {i}
                      </p>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </span>
      <Label text="Click on a box to increase policy level" />
    </div>
  );
}
