import React from 'react';

import { isRequired } from '../../../util/validators';

import { Field } from 'react-final-form';

import TextField from '../../UI/TextField';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Divider,
  Hidden,
  IconButton,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginBottom: theme.spacing(2)
    }
  },
  textField: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: 0
    }
  },
  removePropertyContainer: {
    textAlign: 'right',
    margin: theme.spacing(1, 0)
  },
  removePropertyButton: {
    textDecoration: 'underline',
    color: theme.palette.text.hint,
    '&:hover': {
      color: theme.palette.grey[800],
      cursor: 'pointer'
    }
  },
  divider: {
    marginTop: theme.spacing(2)
  }
}));

export default function PropertyForm({
  fieldName,
  fieldIndex,
  onPropertyRemoved
}) {
  const theme = useTheme();
  const classes = useStyles();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <Field name={`${fieldName}.name`} validate={isRequired}>
        {({ input, meta }) => {
          return (
            <TextField
              label="Property Name"
              className={classes.textField}
              {...input}
              error={meta.error && meta.touched}
              helperText={meta.error && meta.touched ? meta.error : null}
              fullWidth={matchesSm}
            />
          );
        }}
      </Field>
      <Field name={`${fieldName}.value`}>
        {({ input, meta }) => {
          return (
            <TextField
              label="Default Value"
              className={classes.textField}
              {...input}
              fullWidth={matchesSm}
            />
          );
        }}
      </Field>
      <Hidden smDown>
        <div>
          <IconButton
            size="small"
            onClick={() => onPropertyRemoved(fieldIndex)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.removePropertyContainer}>
          <Typography
            variant="caption"
            className={classes.removePropertyButton}
            onClick={() => {
              onPropertyRemoved(fieldIndex);
            }}
          >
            Remove
          </Typography>
        </div>
        <Divider className={classes.divider} />
      </Hidden>
    </div>
  );
}
