import React, { useEffect } from "react";
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
      <div className="grid grid-cols-3 w-10/12 mt-8 mb-8 ">
        <div className="flex justify-center col-span-1 row-start-1">
          <Inputs countries={state.countries} />
        </div>
        <div className="col-span-2 row-start-1">
          <GraphManager />
        </div>
        <div className="col-span-1 flex items-end">
          <Policies />
        </div>
        <div className="col-span-2">
          <Box />
        </div>
      </div>
    </>
  );
}
