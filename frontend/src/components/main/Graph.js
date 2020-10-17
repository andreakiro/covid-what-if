import React from "react";
import * as d3 from "d3";

export default function Graph() {
  const ref = React.useRef(null);

  const margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 60,
  };

  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  React.useEffect(() => {
    if (!ref.current) return;

    const svg = d3
      .select(ref.current)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
      (d) => ({ date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value })).then(
      (data) => {
        console.log(data);
          
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
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => +d.value)])
          .range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        // add the  line

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
      }
    );
  }, [ref]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      ref={ref}
    ></svg>
  );
}

export function Graph1() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const jsonCircles = [
      {
        x_axis: 30,
        y_axis: 30,
        radius: 20,
        color: "green",
      },
    ];

    const svgContainer = d3.select(ref.current);

    const circles = svgContainer
      .selectAll("circle")
      .data(jsonCircles)
      .enter()
      .append("circle");

    const circleAttributes = circles
      .attr("cx", (d) => d.x_axis)
      .attr("cy", (d) => d.y_axis)
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => d.color);
  }, [ref]);

  return <svg width="200" height="200" ref={ref}></svg>;
}
