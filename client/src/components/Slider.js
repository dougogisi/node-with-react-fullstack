import React, { Component } from 'react';

import Slide from './Slider/Slide';
import LeftArrow from './Slider/controls/LeftArrow';
import RightArrow from './Slider/controls/RightArrow';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="slider">
        <Slide />
        
        <LeftArrow />
        <RightArrow />
      </div>
    );
  }
}