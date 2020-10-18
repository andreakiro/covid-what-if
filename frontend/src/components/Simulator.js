import React from "react";
import Graph from "./main/Graph";
import Inputs from "./main/Inputs";

export default function Simulator() {
  return (
    <>
      <div className="flex w-full mt-12">
        <div className="w-1/3 flex justify-center">
          <Inputs />
        </div>
        <div className="w-2/3">
          <Graph />
        </div>
      </div>
    </>
  );
}
