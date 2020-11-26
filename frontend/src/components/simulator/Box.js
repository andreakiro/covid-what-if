import React from "react";
import { useParameters } from "../../parameters/ParameterProvider";

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

function BoxButton({ text, level, cycle }) {
  return (
    <button
      onClick={() => cycle()}
      className={`inline-flex justify-center ${
        level === 0
          ? "bg-white"
          : level === 1
          ? "bg-yellow-500"
          : level === 2
          ? "bg-orange-500"
          : "bg-red-600"
      } px-4 py-2 text-sm leading-5 font-medium ${
        level === 0 ? "text-gray-700" : "text-white"
      } ${
        level === 0 ? "text-grey-700" : "text-white"
      } w-full rounded-md border ${
        level === 0 ? "border-gray-500" : ""
      } px-4 py-2 text-sm leading-5 font-medium hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150`}
    >
      {text}
    </button>
  );
}

export default function Box() {
  let [state, dispatch] = useParameters();
  let {
    box: { height, width, level },
  } = state;

  let column = Array.from({ length: width }, (_, i) => i + 1);
  let row = Array.from({ length: height }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      <div className="text-left w-4/5">
        <Label text="Each box represent 1/8 of the time frame" />
      </div>
      <div className="w-4/5 rounded-md border border-gray-600 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
        <div className="flex flex-col space-y-2 w-full">
          {row.map((y) => {
            return (
              <div key={y} className="flex justify-center w-full space-x-2">
                {column.map((x) => {
                  let i = ((y - 1) << 3) + (x - 1);
                  return (
                    <React.Fragment key={i}>
                      <BoxButton
                        text={x}
                        level={level[i]}
                        cycle={() =>
                          dispatch({
                            type: "cycle",
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
      <div className="text-right w-4/5">
        <Label text="Click on a box to increase policy level" />
      </div>
      {/* <button
        onClick={() => reset()}
        className="inline-flex justify-center bg-white px-4 py-2 text-sm leading-5 font-medium text-gray-700 w-1/5 rounded-md border border-gray-500 px-4 py-2 text-sm leading-5 font-medium hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
      >
        Reset
      </button> */}
      {/* <button
        onClick={() => increase(1)}
        className="inline-flex justify-center bg-white px-4 py-2 text-sm leading-5 font-medium text-gray-700 w-1/5 rounded-md border border-gray-500 px-4 py-2 text-sm leading-5 font-medium hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
      >
        +
      </button> */}
    </div>
  );
}
