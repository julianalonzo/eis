import React from 'react';

import { makeStyles } from '@material-ui/styles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Property from './Property';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    padding: '8px',
    marginBottom: '24px'
  },
  propertyGroupNameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  },
  propertyGroupName: {
    fontWeight: '700'
  },
  editButton: {
    marginLeft: '8px'
  }
});

export default function PropertyGroup({
  propertyGroup: { id, propertyGroupName, properties },
  onOpenEditPropertyDialog,
  onOpenDeletePropertyDialog
}) {
  const classes = useStyles();

  const propertyEvents = {
    onOpenEditPropertyDialog,
    onOpenDeletePropertyDialog
  };

  return (
    <div className={classes.root}>
      <div className={classes.propertyGroupNameContainer}>
        <Typography className={classes.propertyGroupName}>
          {propertyGroupName}
        </Typography>
        <IconButton size="small" className={classes.editButton}>
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
      <div>
        {properties.map(property => {
          return (
            <Property
              key={property.id}
              property={property}
              {...propertyEvents}
            />
          );
        })}
      </div>
    </div>
  );
}

PropertyGroup.propTypes = {
  propertyGroup: PropTypes.shape({
    id: PropTypes.string.isRequired,
    propertyGroupName: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(Property.propTypes.property).isRequired
  }),
  onOpenEditPropertyDialog: PropTypes.func.isRequired,
  onOpenDeletePropertyDialog: PropTypes.func.isRequired
};
