import React from 'react';

import { makeStyles } from '@material-ui/styles';

import CloseIcon from '@material-ui/icons/Close';
import { Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Property from './Property';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  actionButtonContainer: {
    paddingLeft: theme.space
  }
}));

export default function PropertyForm({
  fieldName,
  fieldIndex,
  fieldLabel,
  onPropertyRemoved
}) {
  const classes = useStyles();

  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item xs={10}>
        <Field name={`${fieldName}.value`}>
          {({ input, meta }) => {
            return (
              <TextField
                label={fieldLabel}
                variant="outlined"
                {...input}
                fullWidth
              />
            );
          }}
        </Field>
      </Grid>
      <Grid item xs={2} className={classes.actionButtonContainer}>
        <IconButton onClick={() => onPropertyRemoved(fieldIndex)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

PropertyForm.propTypes = {
  item: PropTypes.arrayOf(Property.propTypes.property)
};
