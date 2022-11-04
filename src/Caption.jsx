import React from 'react';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';

import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';

import { CustomizedDividers } from './CustomizedDividers';

const EditBtnStyles = {
  alignItems: 'center',
  background: 'white',
  border: 'unset',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '24px',
  height: '40px',
  justifyContent: 'center',
  padding: '5px 10px',
  width: '40px',
};

function EditorMenu() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            {...bindTrigger(popupState)}
          >
            <MenuIcon />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <CustomizedDividers />
          </Popover>
        </>
      )}
    </PopupState>
  );
}

export function Caption(props) {
  const { caption, onInputChange, onBtnClick } = props;

  /**
   * This function handles change in the caption style or input
   */
  function handleCaptionChange(updatedCaption) {}

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        inputProps={{ 'aria-label': 'add caption' }}
        onChange={onInputChange}
        placeholder="Add caption"
        sx={{ ml: 1, flex: 1 }}
        value={caption.text}
      />

      <EditorMenu />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <IconButton
        color="error"
        sx={{ p: '10px' }}
        aria-label="directions"
        onClick={onBtnClick}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}
