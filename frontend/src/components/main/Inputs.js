import React, { useState } from "react";
import Dropdown from "../subs/Dropdown";

function Label({ text }) {
  return <div>
  <span class="rounded-md shadow-sm">
    <p class="inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700">
      {text}
    </p>
  </span>
</div>;
}

function InputButton({ text, lock }) {
  return (
    <div>
      <span class="rounded-md shadow-sm">
        <button
          disabled={lock !== null}
          class={`inline-flex justify-center w-full rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 ${
            lock !== null
              ? "cursor-default"
              : "hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
          }`}
        >
          {text}
        </button>
      </span>
    </div>
  );
}

export default function Inputs(props) {
  let [using, setUsing] = useState(null);
  return (
    <div className="flex flex-col space-y-4 w-32">
      
      <div className="flex flex-col space-y-2 w-32">
        <Label text="Country" />
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
        <Label text="Time frame" />
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

      <InputButton text="Demographics" lock={using} />
      <InputButton text="Download" lock={using} />
    </div>
  );
}
