import React from 'react';

import MenuListPopper from '../UI/MenuListPopper';

import { makeStyles } from '@material-ui/styles';
import ItemIcon from '@material-ui/icons/Style';
import FolderIcon from '@material-ui/icons/Folder';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  menuList: {
    width: '120px'
  },
  menuItemIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  }
}));

export default function NewButtonMenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  currentFolder,
  onOpenSelectTemplatePage,
  onOpenNewFolderDialog
}) {
  const classes = useStyles();

  return (
    <MenuListPopper isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <MenuList className={classes.menuList}>
        {currentFolder !== '' ? (
          <MenuItem onClick={onOpenSelectTemplatePage}>
            <ItemIcon className={classes.menuItemIcon} />
            <Typography>Item</Typography>
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={() => {
            onClose();
            onOpenNewFolderDialog();
          }}
        >
          <FolderIcon className={classes.menuItemIcon} />
          <Typography>Folder</Typography>
        </MenuItem>
      </MenuList>
    </MenuListPopper>
  );
}
