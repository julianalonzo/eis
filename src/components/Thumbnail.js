import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  avatarContainer: props => ({
    borderRadius: '50%',
    border: '2px solid #bdbdbd',
    '&:hover': {
      borderColor: '#424242',
      cursor: 'pointer'
    },
    padding: '1px',
    marginRight: props.noMarginRight ? '0px' : '8px'
  }),
  primary: props => ({
    borderColor: '#3f51b5',
    '&:hover': {
      borderColor: '#3f51b5'
    }
  }),
  avatar: {
    border: '1px solid #bdbdbd'
  }
});

export default function Thumbnail({
  thumbnail: { alt, src, variant },
  noMarginRight
}) {
  const classes = useStyles(noMarginRight);

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
    </div>
  );
}
