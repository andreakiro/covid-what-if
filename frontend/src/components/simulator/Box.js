import React, { useEffect, useState } from "react";
import { useParameters } from "../../parameters/ParameterProvider";

function BoxButton({ text, level, cycle }) {
  return (
    <button
      onClick={() => cycle()}
      className={`inline-flex justify-center ${
        level === 0
          ? "bg-indigo-100 text-indigo-100 hover:text-gray-500"
          : level === 1
          ? "bg-indigo-300 text-indigo-300 hover:text-white"
          : level === 2
          ? "bg-indigo-500 text-indigo-500 hover:text-white"
          : "bg-indigo-700 text-indigo-700 hover:text-white"
      } px-4 py-2 text-sm leading-5 font-medium w-full rounded-md border px-4 py-2 text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
    >
      {text}
    </button>
  );
}

export default function Box() {
  let [state, dispatch] = useParameters();
  let [hide, setHide] = useState(false);

  let {
    box: { height, width, level },
  } = state;

  let column = Array.from({ length: width }, (_, i) => i + 1);
  let row = Array.from({ length: height }, (_, i) => i + 1);

  useEffect(() => {
    let hide = true;
    for (let i = 0; i < state.order.length; i++) {
      if (state.order[i] != 0) {
        hide = false;
        break;
      }
    }
    setHide(hide);
  }, [state.order]);

  return (
    <div
      className={`flex flex-col items-center mr-8 ml-16 space-y-2 ${
        hide ? "hidden" : ""
      }`}
    >
      <div className="w-full rounded-md mt-4 border border-gray-600 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
        <div className="flex flex-col space-y-2 w-full">
          {row.map((y) => {
            return (
              <div key={y} className="flex justify-center w-full space-x-2">
                {column.map((x) => {
                  let i = ((y - 1) << 3) + (x - 1);
                  return (
                    <React.Fragment key={i}>
                      <BoxButton
                        text={level[i]}
                        level={level[i]}
                        cycle={() =>
                          dispatch({
                            type: "box-transform",
                            card: "cycle",
                            i: i,
                          })
                        }
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
