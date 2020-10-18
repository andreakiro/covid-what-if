import React, { useState } from "react";
import Dropdown from "../subs/Dropdown";
import Modal from "../subs/Modal";
import DatePicker from "../subs/DatePicker";
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

function InputButton({ text, setLock, animation, modal }) {
  let [active, setActive] = useState(false);
  return (
    <div>
      <span class="rounded-md shadow-sm">
        <button
          onClick={async () => {
            if (animation && !modal) {
              setLock(text);
              setActive(true);
              await timeout(5000);
              setActive(false);
            } else if (modal) {
              setLock(text);
              setActive(true);
            }
          }}
          class={`inline-flex justify-center w-full rounded-md border border-${
            active && !modal ? "green" : "gray"
          }-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
        >
          {text}
        </button>
        <Modal
          title={text}
          open={modal && active}
          onClose={() => {
            setActive(false);
            setLock(null);
          }}
        />
      </span>
    </div>
  );
}

function InputDropdown({ text, items, lock, setLock, setCountry }) {
  return (
    <Dropdown
      textselector={text}
      items={items}
      open={lock === text}
      onOpen={() => setLock(text)}
      onClose={(c) => {
        setLock(null);
        setCountry(c);
      }}
    />
  );
}

function InputDatePicker({ text, lock, setLock }) {
  return (
    <DatePicker
      textselector={text}
      open={lock === text}
      onOpen={() => setLock(text)}
      onClose={() => setLock(null)}
    />
  );
}

export default function Inputs(props) {
  let [lock, setLock] = useState(null);
  let [country, setCountry] = useState("Global");
  let [from, setFrom] = useState(null);
  let [until, setUntil] = useState(null);

  return (
    <div className="flex flex-col space-y-4 w-32">
      <div className="flex flex-col space-y-2 w-32">
        <Label text="Country" />
        <InputDropdown
          text="Select"
          items={["Global", "America", "Switzerland"]}
          sortItems={true}
          lock={lock}
          setLock={setLock}
          setCountry={(c) => setCountry(c)}
        />
      </div>

      <div className="flex flex-col space-y-2 w-32">
        <Label text="Time frame" />
        <InputDatePicker
          text="From"
          lock={lock}
          setLock={setLock}
          setFrom={(from) => setFrom(from)}
        />
        <InputDatePicker
          text="Until"
          lock={lock}
          setLock={setLock}
          setUntil={(until) => setUntil(until)}
        />
      </div>

      <InputButton
        text="Demographics"
        setLock={setLock}
        animation={false}
        modal={true}
      />
      <InputButton
        text="Download"
        setLock={setLock}
        animation={true}
        modal={false}
      />
    </div>
  );
}
