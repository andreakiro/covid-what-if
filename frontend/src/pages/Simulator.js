import React from "react";
import Graph from "../components/main/Graph";
import Inputs from "../components/main/Inputs";

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