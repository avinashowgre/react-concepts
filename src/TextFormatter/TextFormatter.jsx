import React, { useEffect, useMemo, useState } from "react";

import { styled } from "@mui/material/styles";

import WebFont from "webfontloader";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const CustomFontSizeMenu = (props) => {
  const { value, onChange } = props;

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            size="small"
            sx={{
              height: 28,
              margin: `4px`,
              minWidth: "unset",
              padding: "7px",
              width: 28,
            }}
            {...bindTrigger(popupState)}
          >
            <img
              src="https://www.gstatic.com/images/icons/material/system_gm/2x/format_size_black_20dp.png"
              width="20px"
              height="20px"
            />
          </Button>
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
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1, minWidth: 200, maxWidth: 200, margin: "5px" }}
              alignItems="center"
            >
              <span style={{ fontSize: "15px" }}>T</span>
              <Slider
                aria-label="fontSize"
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
              />
              <span style={{ fontSize: "25px" }}>T</span>
            </Stack>
          </Popover>
        </>
      )}
    </PopupState>
  );
};

export function TextFormatter(props) {
  const { styles, onStyleChange, webFonts } = props;
  const { fontFamily, font, fontSize, color } = styles;

  const formats = font.split(" ").filter((elem) => elem.length != 0);

  const handleFormat = (event, newFormats) => {
    onStyleChange({
      ...styles,
      font: newFormats.join(" "),
    });
  };

  const handleFontColor = (event) => {
    onStyleChange({
      ...styles,
      color: event.target.value,
    });
  };

  const handleFontSize = (fontSize) => {
    onStyleChange({
      ...styles,
      fontSize,
    });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    onStyleChange({
      ...styles,
      fontFamily: value,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        alignItems: "center",
        display: "flex",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          displayEmpty
          onChange={handleChange}
          value={fontFamily}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {webFonts.map((fontFamily) => (
            <MenuItem
              key={fontFamily}
              value={fontFamily}
              style={{
                fontFamily,
              }}
            >
              {fontFamily}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CustomFontSizeMenu value={fontSize} onChange={handleFontSize} />
      <input
        className="editor__style color-picker"
        type="color"
        id="color-picker"
        name="body"
        onChange={handleFontColor}
        style={{
          cursor: "pointer",
          margin: 4,
        }}
        value={color}
      />
    </Paper>
  );
}
