import React, { useEffect, useState } from "react";
import { useParameters } from "../../parameters/ParameterProvider";
import { workingPolicies } from "../../parameters/util";
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

function fromOrder(state, order, setActives) {
  let actives = [];
  for (let i = 0; i < order.length; i++) {
    if (order[i] === 1) {
      let indexer = "c" + (i + 1);
      actives.push(state.policynames[indexer]);
    }
  }
  setActives(actives);
}

export default function Policies(props) {
  let [lock, setLock] = useState(null);
  let [state] = useParameters();
  let [actives, setActives] = useState([]);
  useEffect(() => {
    let order = workingPolicies(state.policies)[0];
    fromOrder(state, order, setActives);
  }, [state]);

  return (
    <div className="flex flex-col space-y-4 w-32">
      <div className="flex flex-col space-y-2 w-32">
        <Label text="Policies" />
        {actives.map((text) => {
          return (
            <div className="flex space-x-2">
              <LabelBox text={text} />
              <button className="text-sm leading-5 font-medium text-gray-700 hover:text-red-500">
                x
              </button>
            </div>
          );
        })}
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
