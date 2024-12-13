import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { lineData } from "./lineData";

const LineChart = () => {
  const divRef = useRef(null);
  const [graphHeight, setGraphData] = useState(0);
  const values = lineData;

  useEffect(() => {
    // console.log("values: " + values[0].d);
    // console.log("lineData: " + lineData);
    // 초반에 세 번 렌더 되는것 같은데.. -> strictmode때문에 두 번 일어남.

    if (!values || values.length === 0) return; // values가 비어있으면 early return

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const DataHeight = 400;

    setGraphData(DataHeight);

    const currentElement = divRef.current;
    const width = currentElement?.offsetWidth;
    const height = graphHeight;

    const documentElement = d3
      .select(currentElement)
      .call((g) => g.select("svg").remove())
      .append("svg")
      .attr("viewBox", `0,0,${width},${height}`);

    const parseDate = d3.timeParse("%Y-%m-%d");

    const data = values.map(({ d, v }) => ({
      d: parseDate(d),
      v,
    }));

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.d))
      .range([margin.left, width - margin.right]);

    const yMax = d3.max(data, (d) => d.v);
    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const d3Type = d3
      .line()
      .x((value) => x(value.d))
      .y((value) => y(value.v));

    const xAxis = (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    documentElement.append("g").call(xAxis);

    const yAxis = (g) =>
      g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    documentElement
      .append("g")
      .call(yAxis)
      .call((g) => g.select(".domain").remove());

    documentElement
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", d3Type);
  }, [values, graphHeight]);

  return (
    <>
      <h2>Line Chart</h2>
      <div
        ref={divRef}
        style={{
          width: "100%",
          height: graphHeight,
        }}
      />
    </>
  );
};

export default LineChart;
