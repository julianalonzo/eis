import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: props => ({
    display: 'flex',
    marginRight: theme.spacing(props.marginRight),
    alignItems: 'flex-end'
  }),
  avatarContainer: props => ({
    borderRadius: '50%',
    border: '2px solid #bdbdbd',
    '&:hover': {
      borderColor: props.onClick ? '#424242' : '',
      cursor: props.onClick ? 'pointer' : 'inherit'
    },
    padding: '1px'
  }),
  primary: props => ({
    borderColor: theme.palette.primary[500],
    '&:hover': {
      borderColor: theme.palette.primary[500]
    }
  }),
  avatar: {
    border: '1px solid #bdbdbd'
  },
  removeIcon: {
    position: 'relative',
    left: '-8px',
    top: '8px'
  }
}));

export default function Thumbnail({
  alt,
  src,
  variant,
  marginRight = 0,
  children,
  onRemoveThumbnail = null,
  onClick
}) {
  const classes = useStyles({ marginRight, onClick });

  return (
    <div className={classes.root}>
      <div
        className={
          `${classes.avatarContainer} ` +
          (variant === 'THUMBNAIL_PRIMARY' ? `${classes.primary}` : '')
        }
      >
        <Avatar alt={alt} src={src} className={classes.avatar}>
          {children}
        </Avatar>
      </div>
      {onRemoveThumbnail && (
        <div className={classes.removeIcon}>
          <IconButton size="small" onClick={onRemoveThumbnail}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
