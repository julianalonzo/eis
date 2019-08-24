import React from 'react';

import { makeStyles } from '@material-ui/styles';

import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles({
  button: {
    fontSize: '14px',
    padding: '8px 24px',
    borderRadius: '25px',
    border: '1px solid transparent',
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1.3px',
    '&:hover': {
      backgroundColor: '#283593'
    }
  }
});

export default function PrimaryButton({ action, label }) {
  const classes = useStyles();
  return (
    <ButtonBase
      onClick={action}
      disableRipple
      disableTouchRipple
      className={classes.button}
    >
      {label}
    </ButtonBase>
  );
}
