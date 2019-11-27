import React from 'react';

import { Link } from 'react-router-dom';

import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Home as HomeIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  homeContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  homeIcon: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(-0.25)
  }
}));

export default function Breadcrumbs({ breadcrumbs, disabled = false }) {
  const classes = useStyles();

  if (disabled) {
    return (
      <MuiBreadcrumbs maxItems={4}>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <Typography
              variant="body2"
              key={`${breadcrumb.label}_${index}`}
              color="textSecondary"
            >
              {breadcrumb.label}
            </Typography>
          );
        })}
      </MuiBreadcrumbs>
    );
  }

  return (
    <MuiBreadcrumbs maxItems={4} className={classes.root}>
      <Link className={classes.link} to="/">
        <div className={classes.homeContainer}>
          <HomeIcon className={classes.homeIcon} /> Home
        </div>
      </Link>
      {breadcrumbs.map((breadcrumb, index) => {
        if (index + 1 < breadcrumbs.length) {
          return (
            <Link
              key={breadcrumb.link}
              to={breadcrumb.link}
              className={classes.link}
            >
              {breadcrumb.label}
            </Link>
          );
        }

        return (
          <Typography key={`${breadcrumb.label}_${index}`} color="textPrimary">
            {breadcrumb.label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
}
