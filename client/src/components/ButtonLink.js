import React from 'react';

import { makeStyles } from '@material-ui/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
  buttonLink: props => ({
    fontSize: '16px',
    marginRight: props.marginRight + 'px',
    color: grey[500],
    fontWeight: '600',
    '&:hover': {
      color: '#000000',
      textDecoration: 'underline'
    }
  })
});

export default function ButtonLink({ marginRight = 0, action, children }) {
  const classes = useStyles({ marginRight });

  return (
    <ButtonBase
      onClick={action}
      disableRipple
      disableTouchRipple
      className={classes.buttonLink}
    >
      {children}
    </ButtonBase>
  );
}
