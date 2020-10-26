import { useState, useEffect } from "react";
import * as d3 from "d3";

export function GraphParameters() {
  let [bigdata, setBigdata] = useState([]);

  let updateData = () => {
    setBigdata(
      [
        ["2013-04-28", Math.random() * 4],
        ["2013-04-29", Math.random() * 4],
        ["2013-05-01", Math.random() * 4],
        ["2013-05-02", Math.random() * 4],
        ["2013-05-03", Math.random() * 4],
      ].map((x) => ({ date: d3.timeParse("%Y-%m-%d")(x[0]), value: x[1] }))
    );
  };

  let graphParams = {
    bigdata,
    updateData,
  };

  return graphParams;
}
