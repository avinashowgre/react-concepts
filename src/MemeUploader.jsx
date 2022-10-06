import React, { useState } from 'react';

const fileUploadStyles = {
  border: '2px dashed #7b2cbf',
  borderRadius: '40px',
  margin: '10px 0 15px',
  padding: '30px 50px',
  textAlign: 'center',
  width: '350px',
};

export function MemeUploader(props) {
  const { onFileInput } = props;
  const [showInput, setShowInput] = useState(true);

  function handleInputChange(event) {
    setShowInput(!showInput);

    if (onFileInput) {
      onFileInput(event);
    }
  }

  if (!showInput) return null;

  return (
    <div style={fileUploadStyles}>
      <h3
        style={{
          fontSize: '26px',
          margin: '15px 0',
        }}
      >
        Drag & drop any file here
      </h3>
      <label
        style={{
          fontSize: '19px',
        }}
      >
        or
        <span>
          <input
            type="file"
            style={{
              opacity: 0,
            }}
            onChange={handleInputChange}
          />
          <span
            style={{
              color: '#7b2cbf',
              fontWeight: 'bolder',
              cursor: 'pointer',
              position: 'relative',
              top: '-25px',
            }}
          >
            browse file
          </span>
          <span
            style={{
              position: 'relative',
              top: '-25px',
            }}
          >
            from device
          </span>
        </span>
      </label>
    </div>
  );
}
