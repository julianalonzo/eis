import React, { useEffect } from 'react';

import { parseFormSubmissionError } from '../../util/helperFunctions';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Form, Field } from 'react-final-form';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';

import Logo from '../../assets/eis-logo.svg';
import RegisterIllustration from '../../assets/illustrations/register.svg';

import Button from '../../components/UI/Button';
import TextField from '../../components/UI/TextField';

import { Hidden, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh',
    [theme.breakpoints.up('sm')]: {
      backgroundColor: '#e8eaf6',
      backgroundImage: `url("${RegisterIllustration}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPositionX: '20vw',
      backgroundPositionY: 'top',
      backgroundAttachment: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    },
    [theme.breakpoints.up('xl')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  formContainer: {
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 3),
      width: '80vw',
      minHeight: '400px',
      borderRadius: '25px',
      boxShadow: theme.shadows[24]
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
      position: 'fixed',
      width: '40vw',
      minHeight: '100vh',
      borderRadius: '0'
    },
    [theme.breakpoints.up('xl')]: {
      width: '500px',
      minHeight: '500px',
      borderRadius: '25px',
      boxShadow: theme.shadows[24]
    }
  },
  greetingWrapper: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  greetText: {
    fontWeight: theme.typography.fontWeightMedium,
    color: '#1a237e',
    marginBottom: theme.spacing(0.75),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h5.fontSize
    }
  },
  subtitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.body2.fontSize
    }
  },
  accountExistsWrapper: {
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  accountExistsText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.body2.fontSize
    }
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary[500]
  },
  textField: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0)
    }
  },
  actionWrapper: {
    textAlign: 'right',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  mobileIllustrationContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  mobileIllustration: {
    width: '150px'
  },
  logo: {
    width: theme.spacing(8),
    marginBottom: theme.spacing(2)
  }
}));

function SignupPage({ onRegisterUser, registeringUser, isAuthenticated }) {
  const theme = useTheme();
  const classes = useStyles();
  const matchesXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const history = useHistory();

  const registerUserHandler = async user => {
    const response = await onRegisterUser({
      email: user.email,
      password: user.password
    });

    if (response.errors) {
      return parseFormSubmissionError(response.errors);
    }

    history.push('/signin');
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <Form
      validate={values => {
        const errors = {};

        const email = values.email || '';
        if (validator.isEmpty(email, { ignore_whitespace: true })) {
          errors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
          errors.email = 'Email is not valid';
        }

        const password = values.password || '';
        if (validator.isEmpty(password, { ignore_whitespace: true })) {
          errors.password = 'Password is required';
        } else if (!validator.isLength(password, { min: 8 })) {
          errors.password = 'Password must be at least 8 characters long';
        }

        const confirmPassword = values.confirmPassword || '';
        if (validator.isEmpty(confirmPassword, { ignore_whitespace: true })) {
          errors.confirmPassword = 'Password confirmation is required';
        } else if (password !== confirmPassword) {
          errors.confirmPassword = 'Password does not match';
        }

        return errors;
      }}
      onSubmit={async values => {
        return await registerUserHandler(values);
      }}
      render={({ handleSubmit }) => {
        return (
          <div className={classes.root}>
            <div className={classes.formContainer}>
              <div className={classes.greetingWrapper}>
                <img src={Logo} alt="EIS" className={classes.logo} />
                <Typography variant="h4" className={classes.greetText}>
                  Welcome to EIS
                </Typography>
                <Hidden smDown>
                  <Typography
                    variant="body1"
                    className={classes.subtitle}
                    color="textSecondary"
                  >
                    Let's get you all set up so you can start managing your
                    inventory!
                  </Typography>
                </Hidden>
              </div>
              <Hidden smUp>
                <div className={classes.mobileIllustrationContainer}>
                  <img
                    src={RegisterIllustration}
                    alt="Register Illustration"
                    className={classes.mobileIllustration}
                  />
                </div>
              </Hidden>
              <div className={classes.accountExistsWrapper}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.accountExistsText}
                >
                  Already have an account?{' '}
                  <Link to="/signin" className={classes.link}>
                    Sign in
                  </Link>{' '}
                  instead.
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
                        error={
                          (meta.error && meta.touched) ||
                          (meta.submitError && !meta.dirtySinceLastSubmit)
                        }
                        helperText={
                          (meta.error && meta.touched) ||
                          (meta.submitError && !meta.dirtySinceLastSubmit)
                            ? meta.error || meta.submitError
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
                        error={meta.error && meta.touched}
                        helperText={
                          meta.error && meta.touched ? meta.error : null
                        }
                      />
                    );
                  }}
                </Field>
                <Field name="confirmPassword">
                  {({ input, meta }) => {
                    return (
                      <TextField
                        {...input}
                        type="password"
                        label="Confirm password"
                        variant="outlined"
                        className={classes.textField}
                        fullWidth
                        error={meta.error && meta.touched}
                        helperText={
                          meta.error && meta.touched ? meta.error : null
                        }
                      />
                    );
                  }}
                </Field>
                <div className={classes.actionWrapper}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={registeringUser}
                    fullWidth={matchesXsDown}
                  >
                    {registeringUser ? 'Creating User...' : 'Create account'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    />
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    regisiteringUser: state.user.regisiteringUser,
    registerUserError: state.user.registerUserError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: user => dispatch(actions.registerUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
