import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  default: props => ({
    border: '3px solid #bdbdbd',
    marginRight: props.noMarginRight ? '0' : '8px',
    '&:hover': {
      borderColor: '#424242',
      cursor: 'pointer'
    }
  }),
  primary: props => ({
    borderColor: '#3f51b5',
    '&:hover': {
      borderColor: '#3f51b5'
    }
  })
});

export default function Thumbnail({
  thumbnail: { alt, src, variant },
  noMarginRight
}) {
  const classes = useStyles(noMarginRight);

  return (
    <Avatar
      alt={alt}
      src={src}
      className={
        `${classes.default} ` +
        (variant === 'THUMBNAIL_PRIMARY' ? `${classes.primary}` : '')
      }
    />
  );
}
