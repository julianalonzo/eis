import React from 'react';

import { HOST } from '../../../util/constants';

import Thumbnail from '../../UI/Thumbnail';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    borderLeft: '3px solid transparent',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.primary[50],
      borderLeft: `3px solid ${theme.palette.primary[500]}`
    },
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
    maxWidth: '800px',
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(1)
  },
  avatarNameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    fontWeight: theme.fontWeight.bolder
  }
}));

export default function Item({
  item: { _id, thumbnails, name, category, condition }
}) {
  const classes = useStyles();

  const thumbnailSrc =
    thumbnails.length > 0
      ? `${HOST}/api/files/${thumbnails[0].filename}`
      : null;

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid
        item
        xs={6}
        sm={4}
        md={5}
        lg={5}
        className={classes.avatarNameContainer}
      >
        <Thumbnail alt={name} src={thumbnailSrc} marginRight={3}>
          {!thumbnailSrc && name[0]}
        </Thumbnail>
        <Typography className={classes.name}>{name}</Typography>
      </Grid>
      <Grid item xs={3} sm={2} md={4} lg={3}>
        <Typography>{category}</Typography>
      </Grid>
      <Grid item xs={3} sm={2} md={3} lg={3}>
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
