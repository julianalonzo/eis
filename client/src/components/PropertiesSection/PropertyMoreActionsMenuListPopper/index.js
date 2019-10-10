import React from 'react';

import MenuListPopper from '../../UI/MenuListPopper';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

export default function PropertyMoreActionsMenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  currentPropertyId
}) {
  return (
    <MenuListPopper isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <MenuList>
        <MenuItem
          dense={true}
          onClick={() => {
            onClose();
          }}
        >
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem
          dense={true}
          onClick={() => {
            onClose();
          }}
        >
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </MenuList>
    </MenuListPopper>
  );
}
