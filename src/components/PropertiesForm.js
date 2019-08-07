import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropertyGroupForm from './PropertyGroupForm';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  newPropertyGroupButtonContainer: {
    marginBottom: '36px'
  },
  row: {
    marginBottom: '16px'
  }
});

export default function PropertiesForm({ propertyGroups }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.newPropertyGroupButtonContainer}>
        <Button variant="contained" color="primary">
          <AddIcon /> New Property Group
        </Button>
      </Grid>
      {propertyGroups.map(propertyGroup => {
        return (
          <Grid item xs={12} className={classes.row}>
            <PropertyGroupForm propertyGroupFormData={propertyGroup} />
          </Grid>
        );
      })}
    </Grid>
  );
}

PropertiesForm.propTypes = {
  propertyGroups: PropTypes.arrayOf(
    PropertyGroupForm.propTypes.propertyGroupFormData
  )
};

PropertiesForm.defaultProps = {
  propertyGroups: []
};
