import React from 'react';

import MenuListPopper from '../../UI/MenuListPopper';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

export default function ItemMoreActionsMenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  currentItem,
  onRemoveItem
}) {
  return (
    <MenuListPopper isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <MenuList>
        <MenuItem
          dense={true}
          onClick={() => {
            onRemoveItem(currentItem);
            onClose();
          }}
        >
          <Typography variant="body2">Delete Item</Typography>
        </MenuItem>
      </MenuList>
    </MenuListPopper>
  );
}
