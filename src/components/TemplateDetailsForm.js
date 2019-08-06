import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  row: {
    marginBottom: 24
  }
});

export default function TemplateDetailsForm({
  templateDetailsData: { templateName, templateDescription }
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.row}>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} sm={4} md={3}>
            <Typography>Template Name</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              margin="dense"
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} sm={4} md={3}>
            <Typography>Template Description</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              multiline
              rowsMax="2"
              rows="2"
              fullWidth
              margin="dense"
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

TemplateDetailsForm.propTypes = {
  templateDetailsData: PropTypes.shape({
    templateName: PropTypes.string.isRequired,
    templateDescription: PropTypes.string.isRequired
  })
};
