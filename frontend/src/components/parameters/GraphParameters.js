import { useState, useEffect } from "react";

export function GraphParameters() {
  let [bigdata, setBigdata] = useState([]);

  let updateData = () => {
      
  };

  //   let bigdata2 = [
  //     ["2013-04-28", 2],
  //     ["2013-04-29", 1],
  //     ["2013-05-01", 3],
  //     ["2013-05-02", 0.5],
  //     ["2013-05-03", 3.5],
  //   ].map((x) => ({ date: d3.timeParse("%Y-%m-%d")(x[0]), value: x[1] }));

  let onClick = () => {
    const newelement = { date: new Date(), value: Math.random() * 4 };
    setBigdata((bigdata) => [...bigdata, newelement]);
  };

  let graphParams = {
    bigdata,
    updateData
  };

  return graphParams;
}
