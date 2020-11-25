import React, { useEffect, useState } from "react";
import { init } from "../API";
import Box from "../components/simulator/Box";
import GraphManager from "../components/simulator/GraphManager";
import Inputs from "../components/simulator/Inputs";
import Policies from "../components/simulator/Policies";
import { useParameters } from "../parameters/ParameterProvider";

async function initSession(dispatch, setCountries) {
  let response = await init();
  setCountries(response.countries);
  dispatch({
    type: "INIT UID",
    uid: response.uid,
  });
}

export default function Simulator() {
  // let [state, dispatch] = useParameters();
  // let [countries, setCountries] = useState([]);
  // useEffect(() => initSession(dispatch, setCountries), []);
  return (
    <>
      <div className="flex flex-col w-10/12 mt-8 mb-8 divide-y divide-gray-400">
        <div className="flex pb-4">
          <div className="w-1/3 flex justify-center">
            <Inputs countries={[]} />
          </div>
          <div className="w-2/3 flex justify-center">
            <GraphManager />
          </div>
        </div>
        <div className="flex pt-8">
          <div className="w-1/3 flex justify-center">
            <Policies />
          </div>
          <div className="w-2/3 flex justify-center">
            <Box boxes={8} />
          </div>
        </div>
      </div>
    </>
  );
}
