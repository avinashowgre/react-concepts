import React, { useEffect, useState } from "react";

import WebFont from "webfontloader";

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";

import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";

import { TextFormatter } from "../TextFormatter";

export function Caption(props) {
  const { caption, onChange, onBtnClick } = props;
  const [webFonts, setWebFonts] = useState([]);
  const { color, font, text } = caption;

  useEffect(() => {
    let active = true;

    (async function () {
      const { items: fonts } = await fetch(
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB1aj9FtKfyxWips2YVhIzrKOeqdUegvKM"
      ).then((data) => data.json());
      const fontFamilies = fonts.map((font) => font.family);

      if (active) {
        setWebFonts(fontFamilies);

        // To load font family dynamically on user selection
        WebFont.load({
          google: {
            families: ["ABeeZee"],
          },
        });
      }
    })();

    () => {
      active = false;
    };
  }, []);

  function handleStyleChange(styles) {
    onChange({
      ...caption,
      ...styles,
    });
  }

  function handleInputChange(text) {
    onChange({
      ...caption,
      text,
    });
  }

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        inputProps={{ "aria-label": "add caption" }}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Add caption"
        sx={{ ml: 1, flex: 1, fontFamily: "ABeeZee" }}
        value={text}
      />

      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <>
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              {...bindTrigger(popupState)}
            >
              <MenuIcon />
            </IconButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <TextFormatter
                styles={{ font, color }}
                onStyleChange={handleStyleChange}
              />
            </Popover>
          </>
        )}
      </PopupState>

      {onBtnClick && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton
            color="error"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={onBtnClick}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Paper>
  );
}
