import React, { useState, useEffect } from "react";
import Box from "../components/simulator/Box";
import GraphManager from "../components/simulator/GraphManager";
import Inputs from "../components/simulator/Inputs";
import Policies from "../components/simulator/Policies";
import ParameterProvider from "../parameters/ParameterProvider";
import { load, update, init } from "../API";

async function teststuff(setCountries) {
  let result = await init();
  setCountries(result.countries);
  console.log('Init done');

  let p = {
    country: "CHE",
    tframe: {
      from: null,
      until: null,
    },
    uid: result.uid,
  };
  await load(p);
  console.log('Load done');

  let p2 = {
    country: "CHE",
    tframe: {
      from: "25.07.2020",
      until: "25.07.2020"
    },
    policies: {
      c1_level: [0],
      c2_level: [0],
      c3_level: [0],
      c4_level: [0],
      c5_level: [0],
      c6_level: [0],
      c7_level: [0],
      c8_level: [0],
    },
    uid: result.uid
  };
  await update(p2);
  console.log('Update done');
}

export default function Simulator() {
  let [countries, setCountries] = useState([]);
  useEffect(() => { teststuff(setCountries) }, []);
  return (
    <ParameterProvider>
      <div className="flex flex-col w-10/12 mt-8 mb-8 divide-y divide-gray-400">
        <div className="flex pb-4">
          <div className="w-1/3 flex justify-center">
            <Inputs countries={countries} />
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
    </ParameterProvider>
  );
}
