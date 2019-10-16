import React from 'react';

import MenuListPopper from '../../UI/MenuListPopper';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

export default function TemplateMoreActionsMenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  templateId,
  onOpenTemplatePage,
  onRemoveTemplate
}) {
  return (
    <MenuListPopper isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <MenuList>
        <MenuItem
          dense={true}
          onClick={() => {
            onOpenTemplatePage(templateId);
          }}
        >
          <Typography variant="body2">Open</Typography>
        </MenuItem>
        <MenuItem
          dense={true}
          onClick={() => {
            onRemoveTemplate(templateId);
            onClose();
          }}
        >
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </MenuList>
    </MenuListPopper>
  );
}
