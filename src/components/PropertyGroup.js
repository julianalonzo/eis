import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Property from './Property';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    padding: '8px',
    width: '800px',
    marginBottom: '24px'
  },
  propertyGroupName: {
    letterSpacing: '1.3px',
    textTransform: 'uppercase',
    fontWeight: 700
  },
  properties: {
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
      <div>
        <Typography className={classes.propertyGroupName} component="span">
          {propertyGroupName}
        </Typography>
      </div>
      <div className={classes.properties}>
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
