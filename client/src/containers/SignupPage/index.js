import React, { useEffect } from "react";

import { parseFormSubmissionError } from "../../util/helperFunctions";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { Form, Field } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";

import Button from "../../components/UI/Button";

import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6, 2),
    width: "500px"
  },
  greetingWrapper: {
    marginBottom: theme.spacing(4)
  },
  greetText: {
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(0.75)
  },
  accountExistsWrapper: {
    marginBottom: theme.spacing(6)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary[500]
  },
  textField: {
    marginBottom: theme.spacing(4)
  },
  actionWrapper: {
    textAlign: "right",
    marginTop: theme.spacing(4)
  }
}));

function SignupPage({ onRegisterUser, registeringUser, isAuthenticated }) {
  const classes = useStyles();

  const history = useHistory();

  const registerUserHandler = async user => {
    const response = await onRegisterUser({
      email: user.email,
      password: user.password
    });

    if (response.errors) {
      return parseFormSubmissionError(response.errors);
    }

    history.push("/signin");
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  return (
    <Form
      validate={values => {
        const errors = {};

        const email = values.email || "";
        if (validator.isEmpty(email, { ignore_whitespace: true })) {
          errors.email = "Email is required";
        } else if (!validator.isEmail(email)) {
          errors.email = "Email is not valid";
        }

        const password = values.password || "";
        if (validator.isEmpty(password, { ignore_whitespace: true })) {
          errors.password = "Password is required";
        } else if (!validator.isLength(password, { min: 8 })) {
          errors.password = "Password must be at least 8 characters long";
        }

        const confirmPassword = values.confirmPassword || "";
        if (validator.isEmpty(confirmPassword, { ignore_whitespace: true })) {
          errors.confirmPassword = "Password confirmation is required";
        } else if (password !== confirmPassword) {
          errors.confirmPassword = "Password does not match";
        }

        return errors;
      }}
      onSubmit={async values => {
        return await registerUserHandler(values);
      }}
      render={({ handleSubmit }) => {
        return (
          <div className={classes.root}>
            <div className={classes.greetingWrapper}>
              <Typography variant="h4" className={classes.greetText}>
                Welcome to EIS
              </Typography>
              <Typography
                variant="body1"
                className={classes.subtitle}
                color="textSecondary"
              >
                Let's get you all set up so you can start managing your
                inventory!
              </Typography>
            </div>
            <div className={classes.accountExistsWrapper}>
              <Typography variant="body2" color="textSecondary">
                Already have an account?{" "}
                <Link to="/signin" className={classes.link}>
                  Signin
                </Link>{" "}
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
                >
                  {registeringUser ? "Creating User..." : "Create account"}
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
    regisiteringUser: state.user.regisiteringUser,
    registerUserError: state.user.registerUserError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: user => dispatch(actions.registerUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
