import React, { useState } from 'react';

import { MemeUploader } from './MemeUploader';
import { MemePreview } from './MemePreview';
import { Caption } from './Caption';

/**
 * Meme component that takes in image upload and render on canvas element.
 * 1) Create a input type file component
 * 2) Create canvas element that displayed on image render
 * 3) Show close button to remove the rendered image.
 * 4) Add caption feature
 */

export function Meme(props) {
  const [image, setImage] = useState();
  const [captions, setCaptions] = useState([]);

  function handleFileInput(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      setImage(src);
    }
  }

  function addCaption(e) {
    e.preventDefault();

    const caption = { text: '', x: 250, y: 160 + 20 * captions.length };

    setCaptions((prevState) => [...prevState, caption]);
  }

  function handleCaptionChange(index, newValue) {
    let captionsCpy = [...captions];

    captionsCpy[index].text = newValue;

    setCaptions(captionsCpy);
  }

  function handleBtnClick(index) {
    let captionsCpy = [...captions];

    captionsCpy.splice(index, 1);

    setCaptions(captionsCpy);
  }

  return (
    <div className="meme-container">
      <MemeUploader onFileInput={handleFileInput} />
      {image && (
        <div style={{ alignItems: 'flex-start', display: 'flex', gap: '20px' }}>
          <MemePreview imageBlob={image} texts={captions} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button type="button" onClick={addCaption}>
              Add Caption
            </button>
            {captions.map((caption, index) => (
              <Caption
                caption={caption}
                onInputChange={(e) =>
                  handleCaptionChange(index, e.target.value)
                }
                onBtnClick={(e) => handleBtnClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
