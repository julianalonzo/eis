import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: '1.2px'
  }
}));

export default function SectionPaper({ title, children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
