import React, { useEffect } from 'react';

import { parseFormSubmissionError } from '../../util/helperFunctions';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Form, Field } from 'react-final-form';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';

import Button from '../../components/UI/Button';

import { TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '500px'
  },
  greetingWrapper: {
    marginBottom: theme.spacing(4)
  },
  greetText: {
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(0.75)
  },
  noAccountWrapper: {
    marginBottom: theme.spacing(6)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary[500]
  },
  textField: {
    marginBottom: theme.spacing(4)
  },
  forgotPasswordWrapper: {
    marginBottom: theme.spacing(4)
  },
  forgotPasswordLink: {
    color: theme.palette.text.secondary
  },
  actionWrapper: {
    textAlign: 'right'
  }
}));

function SigninPage({
  onAuthenticateUser,
  authenticatingUser,
  isAuthenticated
}) {
  const classes = useStyles();

  const history = useHistory();

  const authenticateUserHandler = async user => {
    const response = await onAuthenticateUser({
      email: user.email,
      password: user.password
    });

    if (response.errors) {
      return parseFormSubmissionError(response.errors);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <Form
      onSubmit={async values => {
        let clientSideErrors = {};

        const email = values.email || '';
        if (validator.isEmpty(email, { ignore_whitespace: true })) {
          clientSideErrors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
          clientSideErrors.email = 'Email is not valid';
        }

        const password = values.password || '';
        if (validator.isEmpty(password)) {
          clientSideErrors.password = 'Password is required';
        }

        if (Object.keys(clientSideErrors).length > 0) {
          return clientSideErrors;
        }

        return await authenticateUserHandler(values);
      }}
      render={({ handleSubmit }) => {
        return (
          <div className={classes.root}>
            <div className={classes.greetingWrapper}>
              <Typography variant="h4" className={classes.greetText}>
                Welcome back
              </Typography>
              <Typography
                variant="body1"
                className={classes.subtitle}
                color="textSecondary"
              >
                Signin your account to continue managing your inventory
              </Typography>
            </div>
            <div className={classes.noAccountWrapper}>
              <Typography variant="body2" color="textSecondary">
                No account yet?{' '}
                <Link to="/signup" className={classes.link}>
                  Create an account now
                </Link>
              </Typography>
            </div>
            <form onSubmit={handleSubmit}>
              <Field name="email">
                {({ input, meta }) => {
                  return (
                    <TextField
                      {...input}
                      label="Email"
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                      error={meta.submitError && !meta.dirtySinceLastSubmit}
                      helperText={
                        meta.submitError && !meta.dirtySinceLastSubmit
                          ? meta.submitError
                          : null
                      }
                    />
                  );
                }}
              </Field>
              <Field name="password">
                {({ input, meta }) => {
                  return (
                    <TextField
                      {...input}
                      type="password"
                      label="Password"
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                      error={meta.submitError && !meta.dirtySinceLastSubmit}
                      helperText={
                        meta.submitError && !meta.dirtySinceLastSubmit
                          ? meta.submitError
                          : null
                      }
                    />
                  );
                }}
              </Field>
              <div className={classes.forgotPasswordWrapper}>
                <Typography variant="body2">
                  <Link
                    to="/forgot-password"
                    className={classes.forgotPasswordLink}
                  >
                    Forgot password?
                  </Link>
                </Typography>
              </div>
              <div className={classes.actionWrapper}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={authenticatingUser}
                >
                  {authenticatingUser ? 'Signing in...' : 'Signin'}
                </Button>
              </div>
            </form>
          </div>
        );
      }}
    />
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authenticatingUser: state.auth.authenticatingUser,
    authenticateUserError: state.auth.authenticateUserError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticateUser: user => dispatch(actions.authenticateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
