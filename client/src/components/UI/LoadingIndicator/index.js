import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center'
  },
  wrapper: {
    textAlign: 'center'
  },
  label: {
    marginTop: theme.spacing(1)
  }
}));

export default function LoadingIndicator({ label = '' }) {
  const classes = useStyles();

  const [isLoadingDisplayed, setIsLoadingDisplayed] = useState(false);
  const timer = setTimeout(() => {
    setIsLoadingDisplayed(true);
  }, 500);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  if (!isLoadingDisplayed) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Box className={classes.wrapper}>
        <CircularProgress />
        {label ? (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.label}
          >
            {label}
          </Typography>
        ) : null}
      </Box>
    </div>
  );
}
