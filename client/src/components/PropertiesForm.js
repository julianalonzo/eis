import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AddIcon from '@material-ui/icons/Add';
import Button from './Button';
import { FieldArray } from 'react-final-form-arrays';
import Grid from '@material-ui/core/Grid';
import PropertyForm from './PropertyForm';
import Property from './Property';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  propertiesContainer: {
    marginBottom: theme.spacing(4)
  },
  propertyRow: {
    marginBottom: theme.spacing(2)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function PropertiesForm({ onPropertyAdded }) {
  const classes = useStyles();

  return (
    <FieldArray name="properties">
      {({ fields }) => {
        return (
          <Grid container>
            {fields.length > 0 ? (
              <Grid item xs={12} className={classes.propertiesContainer}>
                <Grid container>
                  {fields.map((name, index) => {
                    return (
                      <Grid
                        key={name}
                        item
                        xs={12}
                        className={classes.propertyRow}
                      >
                        <PropertyForm
                          fieldName={name}
                          fieldIndex={index}
                          fieldLabel={fields.value[index].name}
                          onPropertyRemoved={fields.remove}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  onPropertyAdded('properties', { name: '', value: '' });
                }}
                variant="outlined"
                color="secondary"
              >
                <AddIcon className={classes.buttonIcon} /> New Property
              </Button>
            </Grid>
          </Grid>
        );
      }}
    </FieldArray>
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
