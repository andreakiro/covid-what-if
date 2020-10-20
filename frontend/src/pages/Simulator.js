import React from "react";
import Box from "../components/main/Box";
import Inputs from "../components/main/Inputs";

export default function Simulator() {
  return (
    <>
      <div className="flex w-full mt-12">
        <div className="w-1/3 flex justify-center">
          <Inputs />
        </div>
        <div className="w-2/3">
          <Box boxes={8} height={3}/>
        </div>
      </div>
    </>
  );
}
