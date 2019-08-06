import React from 'react';

import { makeStyles } from '@material-ui/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: '700px'
  },
  name: {},
  editButton: {
    marginRight: '8px'
  }
});

export default function Property({
  property: { id, name, value, state },
  onOpenEditPropertyDialog,
  onOpenDeletePropertyDialog
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      wrap="nowrap"
      className={classes.root}
    >
      <Grid item xs={4} zeroMinWidth>
        <Typography noWrap className={classes.name}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={6} zeroMinWidth>
        <Typography noWrap>{value}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          size="small"
          onClick={() => {
            onOpenEditPropertyDialog(id);
          }}
          className={classes.editButton}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            onOpenDeletePropertyDialog(id);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

Property.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string
  }),
  onOpenEditPropertyDialog: PropTypes.func.isRequired,
  onOpenDeletePropertyDialog: PropTypes.func.isRequired
};
