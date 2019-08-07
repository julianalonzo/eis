import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NewPropertyForm from './NewPropertyForm';
import TextField from '@material-ui/core/TextField';
import PropertyForm from './PropertyForm';

const useStyles = makeStyles({
  row: {
    marginBottom: '16px'
  },
  formHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  propertyGroupNameTextField: {
    marginRight: '24px'
  },
  buttonIcon: {
    marginRight: '8px'
  },
  actionsContainer: {
    marginTop: '16px'
  }
});

export default function PropertyGroupForm({
  propertyGroupFormData: { propertyGroupName, properties },
  addingNewProperty,
  onRemovePropertyForm
}) {
  const classes = useStyles();

  const propertyFormEvents = {
    onRemovePropertyForm
  };

  const propertyForms = properties.map(property => {
    return (
      <Grid item xs={12}>
        <PropertyForm
          key={property.id}
          propertyFormData={property}
          {...propertyFormEvents}
        />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} className={classes.row}>
        <div className={classes.formHeader}>
          <TextField
            label="Property Group Name"
            variant="outlined"
            className={classes.propertyGroupNameTextField}
            fullWidth
            value={propertyGroupName}
          />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </Grid>
      <Grid item />
      {properties.length > 0 ? (
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            {propertyForms}
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={8} className={classes.actionsContainer}>
        {addingNewProperty ? (
          <NewPropertyForm />
        ) : (
          <Button component="span">
            <AddIcon className={classes.buttonIcon} />
            Add Thumbnail/s
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
