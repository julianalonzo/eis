import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import ItemIcon from '@material-ui/icons/Style';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  }
}));

export default function NewButtonSpeedDial({
  isOpen,
  onOpen,
  onClose,
  isInFolder,
  onOpenSelectTemplatePage,
  onOpenNewFolderDialog
}) {
  const classes = useStyles();

  return (
    <SpeedDial
      ariaLabel="New Button Speed Dial"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onOpen={onOpen}
      onClose={onClose}
      open={isOpen}
      direction="up"
    >
      {isInFolder && (
        <SpeedDialAction
          icon={<ItemIcon />}
          tooltipTitle="New Item"
          onClick={() => {
            onClose();
            onOpenSelectTemplatePage();
          }}
        />
      )}
      <SpeedDialAction
        icon={<FolderIcon />}
        tooltipTitle="New Folder"
        onClick={() => {
          onClose();
          onOpenNewFolderDialog();
        }}
        className={classes.speedDialAction}
      />
    </SpeedDial>
  );
}
