import React from 'react';

export function StarIcon(props) {
  const { fillColor = 'white' } = props;
  return (
    <svg
      id="svgelem"
      width="300"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="100,10 40,180 190,60 10,60 160,180"
        style={`fill:${fillColor};stroke:purple;stroke-width:1`}
      />
    </svg>
  );
}
