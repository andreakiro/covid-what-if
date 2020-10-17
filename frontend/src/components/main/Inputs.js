import React, { useState } from "react";
import { API, timeout } from "../../Utility.js";
import Dropdown from "../subs/Dropdown";

export default function Box(props) {
  let [box1, setBox1] = useState("0");
  let [box2, setBox2] = useState("0");
  let [loading, setLoading] = useState(false);
  let [result, setResult] = useState(0);
  let foo = async () => {
    let empty = false;
    if (box1 === "" || box2 === "") {
      empty = true;
      if (box1 === "") box1 = 0;
      if (box2 === "") box2 = 0;
    }
    setLoading(true);
    let r = await API(box1, box2);
    await timeout(100);
    setResult(r);
    setLoading(false);
    if (empty) {
      if (box1 === 0) setBox1(0);
      if (box2 === 0) setBox2(0);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-32">
      <div className="flex flex-col space-y-2 w-32">
        <div>
          <span class="rounded-md shadow-sm">
            <p class="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700">
              Country
            </p>
          </span>
        </div>
        <Dropdown />
      </div>

      <div className="flex flex-col space-y-2 w-32">
        <div>
          <span class="rounded-md shadow-sm">
            <p class="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700">
              Time frame
            </p>
          </span>
        </div>
        <Dropdown />
        <Dropdown />
      </div>

      <div>
        <span class="rounded-md shadow-sm">
          <button class="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            Demographics
          </button>
        </span>
      </div>

      <div>
        <span class="rounded-md shadow-sm">
          <button class="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
            Download
          </button>
        </span>
      </div>
    </div>
  );
}
