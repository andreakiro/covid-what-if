import React from "react";

export default function Box({ levels }) {
  let row = [1, 2, 3, 4, 5, 6, 7, 8];
  let width = new Array(12);
  return (
    <div class="flex justify-center">
      <span class="inline-flex justify-center w-4/5 rounded-md border border-green-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
      <div class="flex justify-center w-full space-x-2">
        {row.map((i) => {
          return (
              <button class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
                <p>{i}</p>
              </button>
          );
        })}
        </div>
        {/* <div class="flex justify-center w-full space-x-2">
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>1</p>
          </span>
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>2</p>
          </span>
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>3</p>
          </span>
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>4</p>
          </span>
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>5</p>
          </span>
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>6</p>
          </span>
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>7</p>
          </span>
          <span class="inline-flex justify-center w-full rounded-md border border-blue-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            <p>8</p>
          </span>
        </div> */}
      </span>
    </div>
  );
}
