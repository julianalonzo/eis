import React from 'react';

import { makeStyles } from '@material-ui/styles';

import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight.bold,
    padding: `${theme.space}px ${theme.space * 4}px`,
    borderRadius: '25px',
    backgroundColor: theme.color.primary,
    color: '#ffffff',
    '&:hover': {
      boxShadow: theme.shadow.subtle
    }
  }
}));

export default function PrimaryButton({ action, children }) {
  const classes = useStyles();
  return (
    <ButtonBase
      onClick={action}
      disableRipple
      disableTouchRipple
      className={classes.button}
    >
      {children}
    </ButtonBase>
  );
}
