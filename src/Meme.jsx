import React, { useState } from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';

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

export function Meme() {
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

    const caption = {
      fillStyle: 'white',
      text: '',
      x: 250,
      y: 160 + 20 * captions.length,
    };

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
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <IconButton
              color="primary"
              sx={{ p: '10px', height: 40, width: 40 }}
              aria-label="directions"
              onClick={addCaption}
            >
              <AddIcon />
            </IconButton>

            <>
              {captions.map((caption, index) => (
                <Caption
                  caption={caption}
                  onInputChange={(e) =>
                    handleCaptionChange(index, e.target.value)
                  }
                  onBtnClick={(e) => handleBtnClick(index)}
                />
              ))}
            </>

            <Button
              variant="contained"
              onClick={saveFile}
              sx={{ width: 100 }}
              disabled={!captions.length > 0}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
