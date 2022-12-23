import React, { useState } from 'react';

import { CustomizedDividers } from './CustomizedDividers';

export function CustomizedDividersContainer() {
  const [styles, setStyles] = useState({
    color: '',
    font: '',
  });

  const handleStyleChange = (styles) => {
    console.log(styles);
  };
  return (
    <CustomizedDividers styles={styles} onStyleChange={handleStyleChange} />
  );
}
