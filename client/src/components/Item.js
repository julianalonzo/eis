import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Thumbnail from './Thumbnail';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    borderLeft: '3px solid transparent',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#e8eaf6',
      borderLeft: '3px solid #3f51b5'
    },
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
    maxWidth: '800px',
    padding: '8px 16px'
  },
  avatarNameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    fontWeight: '700'
  }
});

export default function Item({
  item: { _id, thumbnail, name, category, condition }
}) {
  const classes = useStyles();

  const thumbnailData = {
    src: thumbnail,
    alt: 'Thumbnail',
    variant: 'THUMBNAIL_DEFAULT'
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={5} md={4} lg={3} className={classes.avatarNameContainer}>
        <Thumbnail thumbnail={thumbnailData} marginRight={24} />
        <Typography className={classes.name}>{name}</Typography>
      </Grid>
      <Grid item xs={3} lg={2}>
        <Typography>{category}</Typography>
      </Grid>
      <Grid item xs={2} lg={2}>
        <Typography>{condition}</Typography>
      </Grid>
    </Grid>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired
  })
};
