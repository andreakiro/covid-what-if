import React, { useEffect, useState } from "react";
import { useParameters } from "../../parameters/ParameterProvider";

function LabelBox({ text }) {
  return (
    <div className="inline-flex justify-center w-4/6 rounded-md border border-gray-500 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700">
      <label
        id="listbox-label"
        className="block text-sm leading-5 font-medium text-gray-700"
      >
        {text}
      </label>
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
  }, [state.order, state.policynames, dispatch]);

  return (
    <div className="flex flex-col space-y-2 py-2 w-full">
      {actives.map((text, i) => {
        return (
          <div key={i} className="flex space-x-2">
            <button
              onClick={() =>
                dispatch({
                  type: "policy-transform-del",
                  index: Object.values(map)[i],
                  relative: i,
                  status: 0,
                })
              }
              className="text-sm leading-5 font-medium text-gray-700 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 0 24 24"
                width="18"
                className="fill-current"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "box-transform",
                  card: "increase",
                  row: i,
                })
              }
              className="text-sm leading-5 font-medium text-gray-700 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 0 24 24"
                width="18"
                className="fill-current"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z" />
              </svg>
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "box-transform",
                  card: "reset",
                  row: i,
                })
              }
              className="text-sm leading-5 font-medium text-gray-700 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 0 24 24"
                width="18"
                className="fill-current"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
              </svg>
            </button>
            <LabelBox text={text} />
          </div>
        );
      })}
    </div>
  );
}
