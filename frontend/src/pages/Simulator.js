import React from "react";
import Box from "../components/main/Box";
import Inputs from "../components/main/Inputs";
import Graph from "../components/main/Graph";
import Policies from "../components/main/Policies";

export default function Simulator() {
  return (
    <>
      <div className="flex w-full mt-12">
        <div className="w-1/3 flex justify-center">
          <div class="flex-col space-y-6">
            <Inputs />
            <Policies />
          </div>
        </div>
        <div className="w-2/3">
          <div class="flex-col space-y-6">
            {/* <Graph /> */}
            <Box boxes={8} height={3} />
          </div>
        </div>
      </div>
    </>
  );
}
