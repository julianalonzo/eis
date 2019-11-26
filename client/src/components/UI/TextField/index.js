import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { TextField as MuiTextField } from '@material-ui/core';

const useTextFieldStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    },
    '&$focused': {
      backgroundColor: theme.palette.grey[100]
    }
  },
  focused: {}
}));

const useRootStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));

export default function TextField(props) {
  const rootStyles = useRootStyles();
  const textFieldStyles = useTextFieldStyles();

  return (
    <div className={rootStyles.root}>
      <MuiTextField
        {...props}
        variant="filled"
        InputProps={{ classes: textFieldStyles }}
      />
    </div>
  );
}
