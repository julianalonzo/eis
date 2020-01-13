import React from 'react';

import Button from '../Button';
import DefaultIllustration from '../../../assets/illustrations/default.svg';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10vh'
  },
  headerContainer: {
    paddingLeft: theme.spacing(8),
    marginBottom: theme.spacing(5)
  },
  header: {
    fontSize: theme.typography.fontSize * 3.5,
    fontWeight: theme.typography.fontWeightBold
  },
  headerSubText: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightMedium
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
  actionButtonContainer: {
    marginTop: theme.spacing(3)
  }
}));

export default function IllustrationPlaceholder({
  sourceImage,
  alt,
  title,
  subtitle,
  action,
  variant,
  size
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
    <Grid container className={classes.root}>
      {variant === 'illustration' ? (
        <Grid item xs={12} className={classes.headerContainer}>
          {title ? (
            <Typography className={classes.header}>{title}</Typography>
          ) : null}
          {subtitle ? (
            <Typography className={classes.headerSubText} color="textSecondary">
              {subtitle}
            </Typography>
          ) : null}
        </Grid>
      ) : null}
      <Grid item xs={12} className={classes.illustrationContainer}>
        <Box className={classes.centeredWrapper}>
          <img src={sourceImage} alt={alt} className={classes.image} />
        </Box>
      </Grid>
      {variant === 'placeholder' ? (
        <Grid item xs={12}>
          <Box className={classes.centeredWrapper}>
            {title ? <Typography variant="h5">{title}</Typography> : null}
            {subtitle ? (
              <Typography color="textSecondary">{subtitle}</Typography>
            ) : null}
            {action ? (
              <Box className={classes.actionButtonContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={action.action}
                >
                  {action.label}
                </Button>
              </Box>
            ) : null}
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}

IllustrationPlaceholder.propTypes = {
  sourceImage: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string
};

IllustrationPlaceholder.defaultProps = {
  sourceImage: DefaultIllustration,
  alt: 'Illustration',
  size: 'sm',
  variant: 'placeholder'
};
