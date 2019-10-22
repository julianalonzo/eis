import React from 'react';

import { Link } from 'react-router-dom';

import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

export default function Breadcrumbs({ breadcrumbs }) {
  const classes = useStyles();

  return (
    <MuiBreadcrumbs>
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
          <Typography key={breadcrumb.link} color="textPrimary">
            {breadcrumb.label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
}
