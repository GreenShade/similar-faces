import React, { Component } from 'react';
import * as d3 from "d3";

export default class PCA extends Component {
  constructor(props) {
    super(props);

    this.createChart = this.createChart.bind(this);
  }


  componentDidMount() {
    const size = (window.innerWidth < window.innerHeight) ? 900 : 450;

    this.user = this.props.user;
    this.members = this.props.members;

    this.margin = {top: 50, right: 50, left: 50, bottom: 50};
    this.height = size - this.margin.top - this.margin.bottom;
    this.width = size - this.margin.left - this.margin.right;

    this.createChart([]);
  }

  createChart(dataCircles) {
    d3.select("#pca").select("svg").remove();

    this.svg =
      d3.select("#pca").append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);

    this.svg.append("text")
      .text("Principal component projection of embeddings")
      .attr("x", this.margin.left + (this.width / 2))
      .attr("y", this.margin.top / 4 * 3)
      .attr("text-anchor", "middle")
      .attr("class", "janusze-font-style-large");

    this.svg.selectAll("circle")
      .data(dataCircles)
      .enter()
      .append("circle")
      .attr("cx", d => (d.x + 1) * this.width / 2 + this.margin.left)
      .attr("cy", d => this.height - (d.y + 1) * this.height / 2 + this.margin.top)
      .attr("r", d => d.r)
      .attr("fill", d => d.color);

    const xScale = d3.scaleLinear().domain([-1, 1]).range([0, this.width]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([this.height, 0]);

    this.svg.append("g").attr("class", "x axis")
      .attr("transform", "translate(" + this.margin.left + ", " + (this.height + this.margin.top) + ")")
      .call(d3.axisBottom(xScale))
      .attr("class", "janusze-font-style");
    this.svg.append("g").attr("class", "y axis")
      .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
      .call(d3.axisLeft(yScale))
      .attr("class", "janusze-font-style");
  }

  componentDidUpdate() {
    this.user = this.props.user;
    this.members = this.props.members;

    const dataCircles = [
      {x: this.user[0], y: this.user[1], r: 5, color: "red", index: 100}
    ];

    for (let i = 0; i < this.members.length; i++) {
      const color = (i < 3) ? "blue" : "green";
      const index = (i < 3) ? 10 : 1;
      const radius = (i < 3) ? 5 : 3;

      dataCircles.push({x: this.members[i][0], y: this.members[i][1], r: radius, color: color, index: index})
    }

    this.createChart(dataCircles.sort((x, y) => x.index - y.index));
  }

  render() {
    return (
      <div id="pca">
        <svg></svg>
      </div>
    );
  }
}