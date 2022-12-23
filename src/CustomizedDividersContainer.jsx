import React, { useState } from 'react';

import { CustomizedDividers } from './CustomizedDividers';

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.2)'
    );
  }
  throw new Error('Bad Hex');
}

export function CustomizedDividersContainer() {
  const [styles, setStyles] = useState({
    color: '#000000',
    font: '',
    fontSize: '',
  });

  const handleStyleChange = (styles) => {
    setStyles(styles);
  };
  return (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        columnGap: 10,
      }}
    >
      <pre
        style={{
          border: `1px solid ${styles.color}`,
          boxShadow: `0 8px 16px 0 ${hexToRgbA(styles.color)}`,
          fontSize: `${styles.fontSize}`,
          padding: 10,
          height: 120,
          width: 400,
        }}
      >
        <code>{JSON.stringify(styles, null, 4)}</code>
      </pre>
      <CustomizedDividers styles={styles} onStyleChange={handleStyleChange} />
    </div>
  );
}
