import {Component} from "react";
import openSocket from "socket.io-client";

export default class Socket extends Component{
  componentDidMount() {
    this.socket = openSocket(process.env.REACT_APP_SOCKET);
    this.socket.on("face", json => {
      const obj = JSON.parse(json);
      this.props.updateComputing(false);
      this.props.updateRects(obj.detected[0].positions);

      const members = {};
      for (let i = 0; i < obj.detected.length; i++) {
        members["member" + (i + 1)] = {face: obj.detected[i].face, name: obj.detected[i].name};
      }
      this.props.updateMembers(members);
    });
    this.socket.on("pca", json => {
      const obj = JSON.parse(json);
      this.props.updateProjections(obj.user, obj.members);
    });

    this.canvas = document.getElementById("canvas");
  }

  componentDidUpdate() {
    if (!this.props.computing && this.props.video) {
      this.props.updateComputing(true);

      this.socket.emit("detect", this.canvas.toDataURL("image/webp").substring(22), window.innerWidth < window.innerHeight);
    }
  }

  render() {
    return null;
  }
}