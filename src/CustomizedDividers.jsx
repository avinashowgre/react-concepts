import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

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

export function CustomizedDividers(props) {
  const { styles, onStyleChange } = props;

  const { formats, fillStyle } = useMemo(() => {
    const { font, fillStyle } = styles;
    return {
      formats: font.split(' '),
      fillStyle,
    };
  }, [styles]);

  const handleFormat = (event, newFormats) => {
    onStyleChange({
      font: newFormats.join(' '),
      fillStyle,
    });
  };

  const handleFontColor = (event) => {
    onStyleChange({
      font: formats.join(' '),
      fillStyle: event.target.value,
    });
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
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
        <input
          class="editor__style color-picker"
          type="color"
          id="color-picker"
          name="body"
          onChange={handleFontColor}
          value={fillStyle}
        />
      </Paper>
    </div>
  );
}
