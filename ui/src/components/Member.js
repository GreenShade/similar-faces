import React, { Component } from 'react';

export default class Member extends Component {
  componentDidMount() {
    this.img = this.refs.img;
    this.member = this.props.members[this.props.id];
  }

  componentDidUpdate() {
    this.member = this.props.members[this.props.id];
  }

  getName() {
    return `#${this.props.idx} ${this.member.name}`
  }

  render() {
    if (this.member)
      this.img.src = "data:image/webp;base64," + this.member.face;

    return (
      <div>
        <img ref="img"
             alt="MP"
             id={this.props.id} />
        {this.member && <p id={this.props.id + "-description"} className="janusze-font-style-description">{this.getName()}</p>}
      </div>
    );
  }
}