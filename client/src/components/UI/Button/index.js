import React from 'react';

import { makeStyles } from '@material-ui/styles';

import MuiButton from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: props => ({
    borderRadius: '25px',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    margin: theme.spacing(0, props.margin)
  })
}));

export default function Button(props) {
  const classes = useStyles({ margin: props.margin ? props.margin : 0 });

  return (
    <MuiButton className={classes.button} {...props}>
      {props.children}
    </MuiButton>
  );
}
