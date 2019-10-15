import React from 'react';

import MenuListPopper from '../../UI/MenuListPopper';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

export default function PropertyMoreActionsMenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  property,
  onOpenEditPropertyDialog,
  onRemoveProperty
}) {
  return (
    <MenuListPopper isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <MenuList>
        <MenuItem
          dense={true}
          onClick={event => {
            onOpenEditPropertyDialog(event.currentTarget, property);
            onClose();
          }}
        >
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem
          dense={true}
          onClick={() => {
            onRemoveProperty(property._id);
            onClose();
          }}
        >
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </MenuList>
    </MenuListPopper>
  );
}
