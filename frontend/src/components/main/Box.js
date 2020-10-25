import React, { useState } from "react";
import { useParameters } from "../ParameterProvider";

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

function BoxButton({ text, level, cycle }) {
  return (
    <button
      onClick={() => cycle()}
      class={`inline-flex justify-center ${
        level == 0
          ? "bg-white"
          : level == 1
          ? "bg-yellow-500"
          : level == 2
          ? "bg-orange-500"
          : "bg-red-600"
      } px-4 py-2 text-sm leading-5 font-medium ${
        level == 0 ? "text-gray-700" : "text-white"
      } ${
        level == 0 ? "text-grey-700" : "text-white"
      } w-full rounded-md border ${
        level == 0 ? "border-gray-500" : ""
      } px-4 py-2 text-sm leading-5 font-medium hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
    >
      {text}
    </button>
  );
}

export default function Box({ boxes }) {
  let { height, level, cycle } = useParameters();
  let [row, setRow] = useState(Array.from({ length: boxes }, (_, i) => i + 1));
  let [width, setWidth] = useState(
    Array.from({ length: height }, (_, i) => i + 1)
  );

  return (
    <div class="flex flex-col items-center space-y-2 w-full">
      <div class="text-left w-4/5">
        <Label text="Each box represent 1/8 of the time frame" />
      </div>
      <span class="inline-flex justify-center w-4/5 rounded-md border border-gray-600 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
        <div className="flex flex-col space-y-2 w-full">
          {width.map((y) => {
            return (
              <div class="flex justify-center w-full space-x-2">
                {row.map((x) => {
                  let i = ((y - 1) << 3) + (x - 1);
                  return (
                    <BoxButton
                      text={x}
                      level={level[i]}
                      cycle={() => cycle(i)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </span>
      <div class="text-right w-4/5">
        <Label text="Click on a box to increase policy level" />
      </div>
    </div>
  );
}
