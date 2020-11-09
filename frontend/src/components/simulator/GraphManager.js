import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { useParameters } from "../../parameters/ParameterProvider";
import Graph from "./Graph";

export default function GraphManager() {
  let parameters = useParameters();
  let [data, setData] = useState([]);

  let updateData = () => {
    setData(
      [
        ["2013-04-28", Math.random() * 2],
        ["2013-04-29", Math.random() * 2],
        ["2013-05-01", Math.random() * 2],
        ["2013-05-02", Math.random() * 2],
        ["2013-05-03", Math.random() * 2],
      ].map((x) => ({ date: d3.timeParse("%Y-%m-%d")(x[0]), value: x[1] }))
    );
  };

  useEffect(() => updateData(), [parameters]);

  return <Graph bigdata={data} />;
}
