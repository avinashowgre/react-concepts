import React from 'react';

export function Caption(props) {
  const { onInputChange } = props;
  return <input type="text" onChange={onInputChange} />;
}
