import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    borderLeft: '3px solid transparent',
    '&:hover': {
      cursor: 'pointer',
      borderLeft: '3px solid #3f51b5'
    }
  },
  checkbox: {
    marginRight: '24px'
  },
  avatarContainer: {
    marginRight: '24px'
  },
  thumbnail: {
    border: '1px solid hsl(212, 12%, 72%)',
    boxShadow: 'inset 0 0 0 1px hsla(0, 0%, 0%, .1)'
  },
  name: {
    fontWeight: 700,
    marginRight: '24px',
    flexGrow: 2
  },
  category: {
    marginRight: '24px',
    flexGrow: 2
  },
  conditionContainer: {
    marginRight: '24px',
    flexGrow: 3
  },
  condition: props => ({
    width: '180px',
    borderRadius: '25px',
    border: '1px solid ' + props.conditionColor,
    padding: '8px 12px',
    color: props.conditionColor,
    '&:hover': {
      backgroundColor: 'transparent'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }),
  conditionIconAndTextContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  conditionIconContainer: {
    width: '32px'
  }
});

export default function Item({
  item: { id, thumbnail, name, category, condition, state },
  onCheckItem,
  onSelectItem,
  onOpenConditionOptions
}) {
  let conditionColor = '#9e9e9e';
  let conditionIcon = <HelpIcon />;

  switch (condition) {
    case 'Working':
      conditionColor = '#4caf50';
      conditionIcon = <CheckIcon />;
      break;
    case 'Broken':
      conditionColor = '#f44336';
      conditionIcon = <ErrorIcon />;
      break;
    case 'Broken Parts':
      conditionColor = '#f44336';
      conditionIcon = <ErrorIcon />;
      break;
    case 'Missing':
      conditionColor = '#ffc107';
      conditionIcon = <WarningIcon />;
      break;
    case 'Missing Parts':
      conditionColor = '#ffc107';
      conditionIcon = <WarningIcon />;
      break;
    default:
      conditionColor = '#9e9e9e';
      conditionIcon = <HelpIcon />;
  }

  const classes = useStyles({ conditionColor });

  return (
    <div
      className={classes.root}
      onClick={() => {
        onSelectItem(id);
      }}
    >
      <Checkbox
        color="default"
        checked={state === 'ITEM_CHECKED'}
        className={classes.checkbox}
        onClick={event => {
          event.stopPropagation();
          onCheckItem(id);
        }}
      />
      <div className={classes.avatarContainer}>
        <Avatar alt="Thumbnail" src={thumbnail} className={classes.thumbnail} />
      </div>
      <Typography component="span" className={classes.name}>
        {name}
      </Typography>
      <Typography component="span" className={classes.category}>
        {category}
      </Typography>
      <div className={classes.conditionContainer}>
        <div
          className={classes.condition}
          onClick={event => {
            event.stopPropagation();
            onOpenConditionOptions(id, condition);
          }}
        >
          <div className={classes.conditionIconAndTextContainer}>
            <div className={classes.conditionIconContainer}>
              {conditionIcon}
            </div>
            <Typography component="span">{condition}</Typography>
          </div>
          <ArrowDropDownIcon />
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }),
  onCheckItem: PropTypes.func,
  onSelectItem: PropTypes.func
};
