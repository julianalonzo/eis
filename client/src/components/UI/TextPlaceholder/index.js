import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(8, 0),
    textAlign: "center"
  }
}));

export default function TextPlaceholder({ text }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary">
        {text}
      </Typography>
    </div>
  );
}
