import React from "react";
import Box from "../components/simulator/Box";
import GraphManager from "../components/simulator/GraphManager";
import Inputs from "../components/simulator/Inputs";
import Policies from "../components/simulator/Policies";
import ParameterProvider from "../parameters/ParameterProvider";
import { countries } from "../API";

export default function Simulator() {
  return (
    <ParameterProvider>
      <div className="flex flex-col w-10/12 mt-8 mb-8 divide-y divide-gray-400">
        <div className="flex pb-4">
          <div className="w-1/3 flex justify-center">
            <Inputs countries={["America", "Switzerland", "Italy", "France"]} />
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
