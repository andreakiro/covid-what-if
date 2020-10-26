import React from "react";
import Box from "../components/main/Box";
import Inputs from "../components/main/Inputs";
import Graph from "../components/main/Graph";
import Policies from "../components/main/Policies";
import ParameterProvider from "../components/ParameterProvider";
import * as d3 from "d3";

export default function Simulator() {
  // let [bigdata, setBigdata] = React.useState([]);

  // let onClick = () => {
  //   const newelement = { date: new Date(), value: Math.random() * 4 };
  //   setBigdata((bigdata) => [...bigdata, newelement]);
  // };

  return (
    <ParameterProvider>
      {/* <button onClick={onClick}>Add</button>
      <button onClick={() => setBigdata([])}>Reset</button> */}
      <div className="flex flex-col w-10/12 mt-8 mb-8 divide-y divide-gray-400">
        <div className="flex pb-4">
          <div className="w-1/3 flex justify-center">
            <Inputs />
          </div>
          <div className="w-2/3 flex justify-center">
            <Graph />
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
