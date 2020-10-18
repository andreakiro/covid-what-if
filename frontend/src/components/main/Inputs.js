import React, { useState } from "react";
import Dropdown from "../subs/Dropdown";
import { timeout } from "../../Utility.js";

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

function InputButton({ text, lock, activeAnimation }) {
  let [active, setActive] = useState(false);
  return (
    <div>
      <span class="rounded-md shadow-sm">
        <button
          disabled={lock !== null}
          onClick={async () => {
            if (activeAnimation) {
              setActive(true);
              await timeout(5000);
              setActive(false);
            }
          }}
          class={`inline-flex justify-center w-full rounded-md border border-${
            active ? "green" : "gray"
          }-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 ${
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

function InputDropdown({ text, items, lock, setLock }) {
  return (
    <Dropdown
      textselector={text}
      items={items}
      open={lock === text}
      onOpen={() => setLock(text)}
      onClose={() => setLock(null)}
    />
  );
}

export default function Inputs(props) {
  let [lock, setLock] = useState(null);
  return (
    <div className="flex flex-col space-y-4 w-32">
      <div className="flex flex-col space-y-2 w-32">
        <Label text="Country" />
        <InputDropdown
          text="Select"
          items={["Global", "Switzerland", "Italy"]}
          lock={lock}
          setLock={setLock}
        />
      </div>

      <div className="flex flex-col space-y-2 w-32">
        <Label text="Time frame" />
        <InputDropdown
          text="From"
          items={["January", "February", "March"]}
          lock={lock}
          setLock={setLock}
        />
        <InputDropdown
          text="Until"
          items={["January", "February", "March"]}
          lock={lock}
          setLock={setLock}
        />
      </div>

      <InputButton text="Demographics" lock={lock} activeAnimation={false} />
      <InputButton text="Download" lock={lock} activeAnimation={true} />
    </div>
  );
}
