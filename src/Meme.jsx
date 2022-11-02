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
  const [meme, setMeme] = useState();

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

  function saveFile() {
    var win = window.open();
    win.document.write(
      '<iframe src="' +
        meme.toDataURL('image/png') +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  }

  return (
    <div className="meme-container">
      <MemeUploader onFileInput={handleFileInput} />
      {image && (
        <div style={{ alignItems: 'flex-start', display: 'flex', gap: '20px' }}>
          <MemePreview imageBlob={image} setMeme={setMeme} texts={captions} />
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

            <button type="button" onClick={saveFile}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
