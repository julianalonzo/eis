import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import PropertyForm from './PropertyForm';
import NewPropertyForm from './NewPropertyForm';
import Property from './Property';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  propertyRow: {
    marginBottom: theme.spacing(2)
  }
}));

export default function PropertiesForm({ properties, adding }) {
  const classes = useStyles();

  if (properties.length === 0) {
    adding = true;
  }

  const propertiesView = properties.map(property => {
    return (
      <Grid key={property._id} item xs={12} className={classes.propertyRow}>
        <PropertyForm item={property} />
      </Grid>
    );
  });

  return (
    <Grid container>
      {properties.length > 0 ? propertiesView : null}
      {adding ? (
        <Grid item xs={12}>
          <NewPropertyForm />
        </Grid>
      ) : null}
    </Grid>
  );
}

PropertiesForm.propTypes = {
  properties: PropTypes.arrayOf(Property.propTypes.property),
  adding: PropTypes.bool
};

PropertiesForm.defaultProps = {
  properties: [],
  adding: false
};
