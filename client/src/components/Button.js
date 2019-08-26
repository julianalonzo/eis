import React from 'react';

import { makeStyles } from '@material-ui/styles';

import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  button: props => {
    let backgroundColor =
      props.color === 'primary' ? theme.color.primary : theme.color.secondary;
    let fontColor = 'white';
    let borderColor = 'transparent';
    let hoverProps = {
      boxShadow: theme.shadow.subtle,
      backgroundColor:
        props.color === 'primary'
          ? theme.color.primaryDarker
          : theme.color.secondaryDarker
    };

    if (props.variant === 'outlined') {
      fontColor = backgroundColor;
      borderColor = backgroundColor;
      hoverProps = {
        borderColor: 'transparent',
        color: 'white',
        backgroundColor:
          props.color === 'primary'
            ? theme.color.primaryDarker
            : theme.color.secondaryDarker
      };
      backgroundColor = 'transparent';
    }

    return {
      fontSize: theme.fontSize,
      fontWeight: theme.fontWeight.bold,
      padding: `${theme.space}px ${theme.space * 4}px`,
      borderRadius: '25px',
      backgroundColor: backgroundColor,
      color: fontColor,
      border: '1px solid ' + borderColor,
      '&:hover': {
        ...hoverProps
      }
    };
  }
}));

export default function Button({
  variant = 'contained',
  color = 'primary',
  action,
  children
}) {
  const classes = useStyles({ variant, color });
  return (
    <ButtonBase
      onClick={action}
      disableRipple
      disableTouchRipple
      className={classes.button}
    >
      {children}
    </ButtonBase>
  );
}
