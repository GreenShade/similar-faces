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
      <img ref="img"
           id="member" />
    );
  }
}