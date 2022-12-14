import React, { useEffect, useState } from "react";

import WebFont from "webfontloader";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import { MemeUploader } from "./MemeUploader";
// import { MemePreview } from './MemePreview';
import { MemePreviewCpy } from "./MemePreviewCpy";
import { Caption } from "./Caption";

export function Meme() {
  const [image, setImage] = useState();
  const [captions, setCaptions] = useState([]);
  const [meme, setMeme] = useState();
  const [webFonts, setWebFonts] = useState([]);

  useEffect(() => {
    let active = true;

    (async function () {
      const { items: fonts } = await fetch(
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB1aj9FtKfyxWips2YVhIzrKOeqdUegvKM"
      ).then((data) => data.json());
      const fontFamilies = fonts.map((font) => font.family);

      if (active) {
        setWebFonts(
          fontFamilies.filter((font) => {
            try {
              WebFont.load({
                google: {
                  families: [font],
                },
              });
              return true;
            } catch (e) {
              return false;
            }
          })
        );
      }
    })();

    () => {
      active = false;
    };
  }, []);

  function handleFileInput(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      setImage(src);
    }
  }

  function addCaption(e) {
    e.preventDefault();

    const caption = {
      color: "",
      font: "",
      fontFamily: "",
      fontSize: 10,
      text: "",
      x: 250,
      y: 160 + 20 * captions.length,
    };

    setCaptions((prevState) => [...prevState, caption]);
  }

  function handleCaptionChange(index, captionObj) {
    let captionsCpy = [...captions];

    captionsCpy.splice(index, 1, captionObj);

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
        meme.toDataURL("image/png") +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  }

  return (
    <div className="meme-container">
      <MemeUploader onFileInput={handleFileInput} />
      {image && (
        <div style={{ alignItems: "flex-start", display: "flex", gap: "20px" }}>
          {/* <MemePreview imageBlob={image} setMeme={setMeme} texts={captions} /> */}
          <MemePreviewCpy
            imageBlob={image}
            setMeme={setMeme}
            texts={captions}
            onCaptionChange={handleCaptionChange}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <IconButton
              color="primary"
              sx={{ p: "10px", height: 40, width: 40 }}
              aria-label="directions"
              onClick={addCaption}
            >
              <AddIcon />
            </IconButton>

            <>
              {captions.map((caption, index) => (
                <Caption
                  caption={caption}
                  onChange={(captionObj) =>
                    handleCaptionChange(index, captionObj)
                  }
                  onBtnClick={(e) => handleBtnClick(index)}
                  webFonts={webFonts}
                />
              ))}
            </>

            <Button
              variant="contained"
              onClick={saveFile}
              sx={{ width: 100 }}
              disabled={captions.length === 0}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
