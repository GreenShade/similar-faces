import React, { Component } from "react";

export default class Video extends Component {
  componentDidMount() {
    const video = this.refs.video;
    this.video = video;
    this.canvas = this.refs.canvas;
    this.context2d = this.canvas.getContext("2d");

    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then((stream) => video.srcObject = stream);

    const self = this;
    video.addEventListener("play", function() {
      const width = 500;
      const height = 500 * 3 / 4;

      self.width = width;
      self.height = height;

      self.props.updateVideoDimensions({width, height});
      self.updateVideoFrame();
    }, false);
  }

  updateVideoFrame() {
    this.context2d.drawImage(this.video, 0, 0, this.width, this.height);

    this.props.updateVideoFrame({video: this.video, id: this.props.id + 1});
    setTimeout(this.updateVideoFrame.bind(this), 0);
  }

  render() {
    return (
      <div id="canvasWrap">
        <video id="video" ref="video" width={500} height={500} autoPlay style={{display: "none"}} />
        <canvas id="canvas" ref="canvas" width={500} height={500} />
      </div>
    );
  }
}