import React, { Component } from 'react';

export default class Background extends Component {
  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.context2d = this.refs.canvas.getContext("2d");
  }

  componentDidUpdate() {
    this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.props.rects.forEach((rect) => {
      this.context2d.beginPath();
      this.context2d.rect(rect[0], rect[1], rect[2], rect[3]);
      this.context2d.lineWidth = 10;
      this.context2d.strokeStyle = "#0000FF";
      this.context2d.stroke();
    });
  }

  render() {
    return (
      <canvas ref="canvas"
              id="foreground"
              width={500}
              height={500} />
    );
  }
}