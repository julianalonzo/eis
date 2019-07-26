import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  formTitleContainer: {
    marginBottom: '16px'
  },
  formTitle: {
    fontWeight: 700,
    letterSpacing: '1.3px',
    textTransform: 'uppercase'
  },
  textFieldContainer: {
    width: '600px'
  }
});

export default function TemplateDetailsForm({
  templateDetailsData: { templateName, templateDescription }
}) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.formTitleContainer}>
        <Typography className={classes.formTitle} component="span">
          Template Details
        </Typography>
      </div>
      <div className={classes.textFieldContainer}>
        <TextField
          label="Template Name"
          value={templateName}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className={classes.textFieldContainer}>
        <TextField
          label="Template Description"
          value={templateDescription}
          margin="normal"
          variant="outlined"
          rows={4}
          fullWidth
          multiline
        />
      </div>
    </div>
  );
}

TemplateDetailsForm.propTypes = {
  templateDetailsData: PropTypes.shape({
    templateName: PropTypes.string.isRequired,
    templateDescription: PropTypes.string.isRequired
  })
};
