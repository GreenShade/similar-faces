import React, { Component } from 'react';

export default class Member extends Component {
  componentDidMount() {
    this.img = this.refs.img;
    this.member = this.props.members[this.props.id];
  }

  componentDidUpdate() {
    this.member = this.props.members[this.props.id];
    this.img.src = this.member.face;
  }

  render() {
    return (
      <div>
        <img ref="img"
             alt="MP"
             id={this.props.id} />
        {this.member && <p id={this.props.id + "-description"}>{this.member.name}</p>}
      </div>
    );
  }
}