import React from 'react';
import Slider from './Slider';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Welcome
      </h1>
      Start building your snacks <a href="/">here</a>

      <Slider />
    </div>
  )
};

export default Landing;