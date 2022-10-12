import React from 'react';

export function Caption(props) {
  const { caption, onInputChange, onBtnClick } = props;

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input type="text" onChange={onInputChange} value={caption.text} />
      <button type="button" onClick={onBtnClick}>
        X
      </button>
    </div>
  );
}
