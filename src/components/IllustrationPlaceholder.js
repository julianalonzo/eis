import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DefaultIllustration from '../assets/illustrations/default.svg';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  centeredWrapper: {
    textAlign: 'center'
  },
  image: {
    width: '320px'
  },
  secondaryText: {
    color: '#9e9e9e'
  }
});

export default function IllustrationPlaceholder({
  sourceImage,
  alt,
  primaryText,
  secondaryText
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={classes.centeredWrapper}>
          <img
            src={sourceImage ? sourceImage : DefaultIllustration}
            alt={alt ? alt : 'Illustration'}
            className={classes.image}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.centeredWrapper}>
          <Typography variant="h5">{primaryText}</Typography>
          <Typography className={classes.secondaryText}>
            {secondaryText}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

IllustrationPlaceholder.propTypes = {
  sourceImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string
};
