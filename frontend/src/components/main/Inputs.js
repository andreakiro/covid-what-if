import React, { useState } from "react";
import { API, timeout } from "../../Utility.js";
import Dropdown from "../subs/Dropdown";

export default function Inputs(props) {
  let [using, setUsing] = useState(null);
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
        <Dropdown
          textselector="Select"
          items={["Global", "Switzerland", "Italy"]}
          open={using === "Selector"}
          onOpen={() => {
            if (using === null) {
              setUsing("Selector");
            }
          }}
          onClose={() => setUsing(null)}
        />
      </div>

      <div className="flex flex-col space-y-2 w-32">
        <div>
          <span class="rounded-md shadow-sm">
            <p class="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700">
              Time frame
            </p>
          </span>
        </div>
        <Dropdown
          textselector="From"
          items={["January", "February", "March"]}
          open={using === "From"}
          onOpen={() => {
            if (using === null) {
              setUsing("From");
            }
          }}
          onClose={() => setUsing(null)}
        />
        <Dropdown
          textselector="Until"
          items={["January", "February", "March"]}
          open={using === "Until"}
          onOpen={() => {
            if (using === null) {
              setUsing("Until");
            }
          }}
          onClose={() => setUsing(null)}
        />
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
