import {Component} from "react";
import openSocket from "socket.io-client";

export default class Socket extends Component{
  componentDidMount() {
    this.socket = openSocket("http://localhost:5000");
    this.socket.on("face", json => {
      const obj = JSON.parse(json);
      this.props.updateComputing(false);
      this.props.updateRects(obj.detected[0].positions);
      for (let i = 0; i < obj.detected.length; i++) {
        this.props.updateMember(obj.detected[i].face, "member" + (i + 1));
        this.props.updateName(obj.detected[i].name, "member" + (i + 1));
      }
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