import React, { Component } from 'react';

export default class Member extends Component {
  componentDidMount() {
    this.img = this.refs.img;
  }

  componentDidUpdate() {
    this.img.src = this.props.face;
  }

  render() {
    return (
      <div>
        <img ref="img"
             alt="MP"
             id="member" />
        <p id="member-description">{this.props.name}</p>
      </div>
    );
  }
}