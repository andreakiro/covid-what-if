import React from "react";
import ParameterProvider from "../parameters/ParameterProvider";
import Simulator from "./Simulator";

export default function SimulatorContainer() {
  return (
    <ParameterProvider>
      <Simulator />
    </ParameterProvider>
  );
}
