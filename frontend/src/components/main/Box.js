import React from "react";

export default function Box({ boxes, height }) {
  let row = Array.from({ length: boxes }, (_, i) => i + 1);
  let width = Array.from({ length: height }, (_, i) => i + 1);
  return (
    <div class="flex justify-center space-y-4">
      <span class="inline-flex justify-center w-4/5 rounded-md border border-green-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
        <div className="flex flex-col space-y-2 w-full">
          {width.map(() => {
            return (
              <div class="flex justify-center w-full space-x-2">
                {row.map((i) => {
                  return (
                    <button
                      onClick={null}
                      class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                    >
                      <p>{i}</p>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </span>
    </div>
  );
}
