import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '500px',
    marginTop: '12px',
    marginBottom: '12px'
  },
  name: {
    fontWeight: 700,
    marginRight: '8px',
    flexGrow: 2,
    flexBasis: '30%'
  },
  value: {
    flexGrow: 3,
    flexBasis: '50%'
  },
  actionButtons: {
    flexGrow: 1,
    flexBasis: '20%'
  },
  editIconButton: {
    marginRight: '8px'
  }
});

export default function Property({
  property: { id, name, value },
  onOpenEditPropertyDialog,
  onOpenDeletePropertyDialog
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="span" className={classes.name}>
        {name}
      </Typography>
      <Typography component="span" className={classes.value}>
        {value}
      </Typography>
      <div className={classes.actionButtons}>
        <IconButton
          size="small"
          className={classes.editIconButton}
          onClick={() => {
            onOpenEditPropertyDialog(id);
          }}
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
      </div>
    </div>
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
