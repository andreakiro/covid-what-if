import * as d3 from "d3";
import React from "react";

export default function Graph({ bigdata }) {
  const ref = React.useRef(null);

  const margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 60,
  };

  React.useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth - margin.left - margin.right;
    const height = ref.current.clientHeight - margin.top - margin.bottom;

    const container = d3.select(ref.current);
    container.selectAll("*").remove();
    const svg = container
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const data = bigdata[0];
    const target = bigdata[1];

    svg
      .append("circle")
      .attr("cx", width - 100)
      .attr("cy", 40)
      .attr("r", 6)
      .style("fill", bigdata[1].length !== 0 ? "#000000" : "#ffffff");
    svg
      .append("circle")
      .attr("cx", width - 100)
      .attr("cy", 60)
      .attr("r", 6)
      .style("fill", bigdata[1].length !== 0 ? "#4682B4" : "#ffffff");

    svg
      .append("text")
      .attr("x", width - 85)
      .attr("y", 44)
      .text("Real R0")
      .style("font-size", "14px")
      .attr("alignment-baseline", "middle")
      .style("fill", bigdata[1].length !== 0 ? "black" : "white");
    svg
      .append("text")
      .attr("x", width - 85)
      .attr("y", 64)
      .text("Predicted R0")
      .style("font-size", "14px")
      .attr("alignment-baseline", "middle")
      .style("fill", bigdata[1].length !== 0 ? "black" : "white");

    // x axis
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // y axis
    const y = d3.scaleLinear().domain([0, 4]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // add the  prediction
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // add the target
    const line2 = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(target)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.8)
      .attr("d", line2);

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", y(1))
      .attr("x2", width)
      .attr("y2", y(1))
      .attr("stroke-width", 1)
      .attr("stroke", "orange")
      .style("stroke-dasharray", "5,5");
  }, [ref, bigdata, margin]);

  return <svg ref={ref} className="w-full h-full"></svg>;
}
