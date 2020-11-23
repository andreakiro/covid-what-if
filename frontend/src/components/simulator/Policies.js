import React, { useState } from "react";
import Dropdown from "../modules/Dropdown";

function Label({ text }) {
  return (
    <label
      id="listbox-label"
      className="block text-sm leading-5 font-medium text-gray-700"
    >
      {text}
    </label>
  );
}

function LabelBox({ text }) {
  return (
    <div className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700">
      <Label text={text} />
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
      onClose={(c) => {
        setLock(null);
      }}
    />
  );
}

export default function Policies(props) {
  let [lock, setLock] = useState(null);

  return (
    <div className="flex flex-col space-y-4 w-32">
      <div className="flex flex-col space-y-2 w-32">
        <Label text="Policies" />
        <LabelBox text="Lockdown" />
        <LabelBox text="Masks" />
        <InputDropdown
          text="Add policy"
          items={["Lockdown", "Masks"]}
          sortItems={true}
          lock={lock}
          setLock={setLock}
        />
      </div>
    </div>
  );
}
