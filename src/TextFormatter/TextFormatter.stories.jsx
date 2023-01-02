import React, { useEffect, useState } from "react";

import { TextFormatter } from "./TextFormatter";

import mockresp from "./google-fonts-response.json";
import { ClassNames } from "@emotion/react";

export default {
  title: "Custom/TextFormatter",
  component: TextFormatter,
};

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.2)"
    );
  }
  throw new Error("Bad Hex");
}

export const primary = () => {
  const [styles, setStyles] = useState({
    color: "#000000",
    font: "",
    fontSize: 10,
    fontFamily: "",
  });
  const webFonts = [...mockresp];

  const handleStyleChange = (styles) => {
    setStyles(styles);
  };
  return (
    <div
      style={{
        alignItems: "flex-start",
        display: "flex",
        columnGap: 10,
      }}
    >
      <pre
        style={{
          border: `1px solid ${styles.color}`,
          boxShadow: `0 8px 16px 0 ${hexToRgbA(styles.color)}`,
          color: `${styles.color}`,
          fontFamily: `${styles.fontFamily}`,
          fontSize: `${styles.fontSize}px`,
          padding: 10,
          height: 120,
          width: 400,
        }}
      >
        <code>{JSON.stringify(styles, null, 4)}</code>
      </pre>
      <TextFormatter
        styles={styles}
        onStyleChange={handleStyleChange}
        webFonts={webFonts}
      />
    </div>
  );
};
