import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function LoadingIndicator() {
  const classes = useStyles();

  const [isLoadingDisplayed, setIsLoadingDisplayed] = useState(false);
  const timer = setTimeout(() => {
    setIsLoadingDisplayed(true);
  }, 250);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isLoadingDisplayed) {
    return null;
  }

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
