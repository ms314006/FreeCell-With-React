import React from 'react';

class Diamond {
  static getSuitSvg(color) {
    return <path fill={color} d="M19,12L12,22L5,12L12,2" />;
  }
}

export default Diamond;
