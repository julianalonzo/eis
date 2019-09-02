import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DefaultIllustration from '../assets/illustrations/default.svg';
import Button from './Button';
import grey from '@material-ui/core/colors/grey';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  headerContainer: {
    paddingTop: '10vh',
    paddingLeft: theme.spacing(8),
    marginBottom: theme.spacing(5)
  },
  header: {
    fontSize: theme.spacing(6),
    fontWeight: 700
  },
  headerSubText: {
    fontSize: theme.spacing(2),
    color: grey[500],
    fontWeight: 500
  },
  illustrationContainer: {
    marginBottom: theme.spacing(3)
  },
  centeredWrapper: {
    textAlign: 'center'
  },
  image: props => ({
    width: props.illustrationSize
  }),
  secondaryText: {
    color: '#9e9e9e'
  },
  actionButtonContainer: {
    marginTop: theme.spacing(3)
  }
}));

export default function IllustrationPlaceholder({
  sourceImage,
  alt,
  primaryText,
  secondaryText,
  action,
  size,
  headerText,
  headerSubText
}) {
  let illustrationSize;

  switch (size) {
    case 'sm':
      illustrationSize = '300px';
      break;
    case 'md':
      illustrationSize = '400px';
      break;
    case 'lg':
      illustrationSize = '500px';
      break;
    default:
      illustrationSize = '300px';
  }

  const classes = useStyles({ illustrationSize });

  return (
    <Grid container>
      <Grid item xs={12} className={classes.headerContainer}>
        {headerText ? (
          <Typography className={classes.header}>{headerText}</Typography>
        ) : null}
        {headerSubText ? (
          <Typography className={classes.headerSubText}>
            {headerSubText}
          </Typography>
        ) : null}
      </Grid>
      <Grid item xs={12} className={classes.illustrationContainer}>
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
          {primaryText ? (
            <Typography variant="h5">{primaryText}</Typography>
          ) : null}
          {secondaryText ? (
            <Typography className={classes.secondaryText}>
              {secondaryText}
            </Typography>
          ) : null}
          {action ? (
            <div className={classes.actionButtonContainer}>
              <Button color="primary" variant="contained">
                {action.label}
              </Button>
            </div>
          ) : null}
        </div>
      </Grid>
    </Grid>
  );
}

IllustrationPlaceholder.propTypes = {
  sourceImage: PropTypes.string,
  alt: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  size: PropTypes.string,
  headerText: PropTypes.string,
  headerSubText: PropTypes.string
};
