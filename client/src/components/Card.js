import React from 'react';

import { makeStyles } from '@material-ui/styles/';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Truncate from 'react-truncate';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4, 2),
    maxWidth: '250px',
    width: '100%',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '&:hover': {
      boxShadow:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      cursor: 'pointer'
    }
  },
  avatarContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    width: '80px',
    height: '80px',
    border: '1px solid #eaeaea'
  },
  titleContainer: {
    textAlign: 'center',
    padding: theme.spacing(0, 2),
    minHeight: '40px',
    maxHeight: '40px'
  },
  title: {
    fontSize: theme.fontSize * 1.5,
    fontWeight: theme.fontWeight.bolder
  },
  subtitleContainer: {
    textAlign: 'center',
    padding: theme.spacing(0, 2),
    minHeight: '100px',
    maxHeight: '100px'
  }
}));

export default function Card({ title, subtitle, image }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.avatarContainer}>
        <Avatar className={classes.avatar} src={image} alt={title} />
      </Box>
      <Box className={classes.titleContainer}>
        <Typography className={classes.title} noWrap={true}>
          {title}
        </Typography>
      </Box>
      <Box className={classes.subtitleContainer}>
        <Typography className={classes.subtitle} color="textSecondary">
          <Truncate lines={2} ellipsis="...">
            {subtitle}
          </Truncate>
        </Typography>
      </Box>
    </Paper>
  );
}
