import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  row: {
    marginBottom: '24px'
  }
});

export default function TemplateDetailsForm({
  templateDetailsData: { templateName, templateDescription }
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Template Name"
              variant="outlined"
              fullWidth
              value={templateName}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Template Description"
              variant="outlined"
              fullWidth
              value={templateDescription}
              multiline
              maxRows={4}
              rows={4}
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
