import React, { useState } from "react";

import { Caption } from "./Caption";

export default {
  title: "Custom/Caption",
  component: Caption,
};

export const primary = () => {
  const [captions, setCaptions] = useState([
    {
      color: "",
      font: "",
      text: "",
      x: 250,
      y: 160,
    },
  ]);

  const handleCaptionChange = (index, captionObj) => {
    let captionsCpy = [...captions];

    captionsCpy.splice(index, 1, captionObj);

    setCaptions(captionsCpy);
  };

  const handleBtnClick = (index) => {
    let captionsCpy = [...captions];

    captionsCpy.splice(index, 1);

    setCaptions(captionsCpy);
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
          padding: 10,
          height: 120,
          width: 400,
        }}
      >
        <code>{JSON.stringify(captions, null, 4)}</code>
      </pre>
      <Caption
        caption={captions[0]}
        onChange={(captionObj) => handleCaptionChange(0, captionObj)}
      />
    </div>
  );
};
