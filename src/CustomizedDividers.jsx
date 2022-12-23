import React, { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const CustomFontSizeMenu = (props) => {
  const { selectedValue, onChange } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    onChange(value);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        sx={{
          height: 28,
          margin: `4px`,
          minWidth: 'unset',
          padding: '7px',
          width: 28,
        }}
      >
        <img
          src="https://www.gstatic.com/images/icons/material/system_gm/2x/format_size_black_20dp.png"
          width="20px"
          height="20px"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={(e) => handleClose('x-small')}
          sx={{ fontSize: 'x-small' }}
        >
          Small
        </MenuItem>
        <MenuItem
          onClick={(e) => handleClose('small')}
          sx={{ fontSize: 'small' }}
        >
          Normal
        </MenuItem>
        <MenuItem
          onClick={(e) => handleClose('large')}
          sx={{ fontSize: 'large' }}
        >
          Large
        </MenuItem>
        <MenuItem
          onClick={(e) => handleClose('xx-large')}
          sx={{ fontSize: 'xx-large' }}
        >
          Huge
        </MenuItem>
      </Menu>
    </>
  );
};

export function CustomizedDividers(props) {
  const { styles, onStyleChange } = props;

  const { fontSize, formats, color } = useMemo(() => {
    const { font, fontSize, color } = styles;
    return {
      fontSize,
      formats: font.split(' ').filter((elem) => elem.length != 0),
      color,
    };
  }, [styles]);

  const handleFormat = (event, newFormats) => {
    onStyleChange({
      color,
      font: newFormats.join(' '),
      fontSize,
    });
  };

  const handleFontColor = (event) => {
    onStyleChange({
      color: event.target.value,
      font: formats.join(' '),
      fontSize,
    });
  };

  const handleFontSize = (fontSize) => {
    onStyleChange({
      color,
      font: formats.join(' '),
      fontSize,
    });
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          alignItems: 'center',
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
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
        <CustomFontSizeMenu
          selectedValue={fontSize}
          onChange={handleFontSize}
        />
        <input
          className="editor__style color-picker"
          type="color"
          id="color-picker"
          name="body"
          onChange={handleFontColor}
          style={{
            cursor: 'pointer',
            margin: 4,
          }}
          value={color}
        />
      </Paper>
    </div>
  );
}
