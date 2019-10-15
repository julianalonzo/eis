import React from 'react';

import { HOST } from '../../../../util/constants';

import MenuListPopper from '../../../UI/MenuListPopper';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

export default function AttachmentMoreActionsMenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  attachment,
  onRemoveAttachment
}) {
  return (
    <MenuListPopper isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <MenuList>
        <MenuItem dense={true}>
          <Typography
            variant="body2"
            onClick={() => {
              window.open(`${HOST}/api/files/${attachment.filename}`, '_blank');
              onClose();
            }}
          >
            Open
          </Typography>
        </MenuItem>
        <MenuItem
          dense={true}
          onClick={() => {
            onClose();
            onRemoveAttachment(attachment._id);
          }}
        >
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </MenuList>
    </MenuListPopper>
  );
}
