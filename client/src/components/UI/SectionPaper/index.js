import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: theme.spacing(3)
  },
  title: {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '1.5px'
  }
}));

export default function SectionPaper({ title, actionButton, children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className={classes.headerContainer}>
        <Box>
          <Typography variant="body2" className={classes.title}>
            {title}
          </Typography>
        </Box>
        {actionButton ? (
          <Box>
            <IconButton
              onClick={actionButton.action}
              color="primary"
              size="small"
            >
              {actionButton.icon}
            </IconButton>
          </Box>
        ) : null}
      </Box>
      {children}
    </Paper>
  );
}
