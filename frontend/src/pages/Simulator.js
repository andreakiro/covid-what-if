import React, { useEffect, useState } from "react";
import { init } from "../API";
import Box from "../components/simulator/Box";
import GraphManager from "../components/simulator/GraphManager";
import Inputs from "../components/simulator/Inputs";
import Policies from "../components/simulator/Policies";
import { useParameters } from "../parameters/ParameterProvider";

async function initSession(dispatch) {
  let response = await init();
  dispatch({
    type: "initsession",
    uid: response.uid,
    countries: response.countries,
    policynames: response.policies,
  });
}

export default function Simulator() {
  let [state, dispatch] = useParameters();
  useEffect(() => {
    initSession(dispatch);
  }, [dispatch]);
  return (
    <>
      {/* <button
        onClick={() =>
          dispatch({
            type: "log",
          })
        }
        className="inline-flex justify-center w-20 rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
      >
        Log
      </button> */}
      <div className="flex flex-col w-10/12 mt-8 mb-8 divide-y divide-gray-400">
        <div className="flex pb-4">
          <div className="w-1/3 flex justify-center">
            <Inputs countries={state.countries} />
          </div>
          <div className="w-2/3 flex justify-center">
            <GraphManager />
          </div>
        </div>
        <div className={`flex pt-8 ${state.country === null ? "hidden" : ""}`}>
          <div className="w-1/3 flex justify-center">
            <Policies />
          </div>
          <div className="w-2/3 flex justify-center">
            <Box />
          </div>
        </div>
      </div>
    </>
  );
}
