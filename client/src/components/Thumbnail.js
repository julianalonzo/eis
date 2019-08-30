import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: props => ({
    display: 'flex',
    marginRight: props.marginRight + 'px',
    alignItems: 'flex-end'
  }),
  avatarContainer: {
    borderRadius: '50%',
    border: '2px solid #bdbdbd',
    '&:hover': {
      borderColor: '#424242',
      cursor: 'pointer'
    },
    padding: '1px'
  },
  primary: {
    borderColor: '#3f51b5',
    '&:hover': {
      borderColor: '#3f51b5'
    }
  },
  avatar: {
    border: '1px solid #bdbdbd'
  },
  removeIcon: {
    position: 'relative',
    left: '-8px',
    top: '8px'
  }
});

export default function Thumbnail({
  thumbnail: { alt, src, variant },
  marginRight = 0,
  onRemoveThumbnail
}) {
  const classes = useStyles({ marginRight });

  return (
    <div className={classes.root}>
      <div
        className={
          `${classes.avatarContainer} ` +
          (variant === 'THUMBNAIL_PRIMARY' ? `${classes.primary}` : '')
        }
      >
        <Avatar alt={alt} src={src} className={classes.avatar} />
      </div>
      <div className={classes.removeIcon}>
        <IconButton size="small" onClick={onRemoveThumbnail}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
