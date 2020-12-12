import React, { useEffect, useState } from "react";
import { useParameters } from "../../parameters/ParameterProvider";
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

export default function Policies() {
  let [state, dispatch] = useParameters();

  let [actives, setActives] = useState([]);
  let [map, setMap] = useState({});

  useEffect(() => {
    let actives = [];
    let unactives = [];
    let map = {};
    let iMap = 0;
    for (let i = 0; i < state.order.length; i++) {
      let indexer = "c" + (i + 1);
      if (state.order[i] === 1) {
        actives.push(state.policynames[indexer]);
        map[iMap++] = i;
      } else unactives.push(state.policynames[indexer]);
    }
    setActives(actives);
    dispatch({
      type: "unactives",
      content: unactives,
    });
    setMap(map);
  }, [state.order]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      {actives.map((text, i) => {
        return (
          <div key={i} className="flex space-x-2">
            <LabelBox text={text} />
            <button
              onClick={() =>
                dispatch({
                  type: "del",
                  index: Object.values(map)[i],
                  relative: i,
                  status: 0,
                })
              }
              className="text-sm leading-5 font-medium text-gray-700 hover:text-red-500"
            >
              DEL
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "inc",
                  row: i,
                })
              }
              className="text-sm leading-5 font-medium text-gray-700 hover:text-red-500"
            >
              +1
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "reset",
                  row: i,
                })
              }
              className="text-sm leading-5 font-medium text-gray-700 hover:text-red-500"
            >
              RES
            </button>
          </div>
        );
      })}
    </div>
  );
}
