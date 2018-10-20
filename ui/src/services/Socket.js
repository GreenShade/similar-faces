import React, {Component} from "react";
import openSocket from "socket.io-client";

export default class Socket extends Component{
  componentDidMount() {
    this.socket = openSocket("http://localhost:5000");
    this.socket.on("face", json => {
      const obj = JSON.parse(json);
      this.props.updateComputing(false);
      this.props.updateRects(obj.positions);
      this.props.updateMember(obj.face);
    });

    this.canvas = document.getElementById("canvas");
    this.context2d = this.canvas.getContext("2d");
  }

  componentDidUpdate() {
    if (!this.props.computing && this.props.video) {
      this.props.updateComputing(true);
      this.context2d.drawImage(this.props.video, 0, 0, this.props.width, this.props.height);

      this.socket.emit("detect", this.canvas.toDataURL("image/webp").substring(22));
    }
  }

  render() {
    return null;
  }
}