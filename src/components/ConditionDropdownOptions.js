import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '180px'
  },
  conditionIcon: {
    minWidth: '36px'
  }
});

export default function ConditionDropdownOptions({ currentCondition }) {
  const classes = useStyles();

  const conditions = [
    { label: 'Working', icon: <CheckIcon /> },
    { label: 'Broken', icon: <ErrorIcon /> },
    { label: 'Missing', icon: <WarningIcon /> },
    { label: 'Broken Parts', icon: <ErrorIcon /> },
    { label: 'Missing Parts', icon: <WarningIcon /> }
  ];

  const conditionsWithoutCurrentCondition = conditions.filter(
    condition => condition.label !== currentCondition
  );

  return (
    <Paper className={classes.root}>
      <MenuList>
        {conditionsWithoutCurrentCondition.map(condition => {
          return (
            <MenuItem key={condition}>
              <ListItemIcon className={classes.conditionIcon}>
                {condition.icon}
              </ListItemIcon>
              <Typography variant="inherit">{condition.label}</Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
}

ConditionDropdownOptions.propTypes = {
  currentCondition: PropTypes.string.isRequired
};
