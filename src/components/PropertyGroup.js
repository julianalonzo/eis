import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Property from './Property';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    padding: '8px',
    width: '800px'
  },
  propertyGroupName: {
    fontSize: '18px',
    fontWeight: 700
  },
  properties: {
    marginLeft: '8px'
  }
});

export default function PropertyGroup({
  propertyGroup: { id, propertyGroupName, properties }
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.propertyGroupName} component="span">
          {propertyGroupName}
        </Typography>
      </div>
      <div className={classes.properties}>
        {properties.map(property => {
          return <Property key={property.id} property={property} />;
        })}
      </div>
    </div>
  );
}

PropertyGroup.propTypes = {
  id: PropTypes.string.isRequired,
  propertyGroupName: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(Property.propTypes.property)
};
