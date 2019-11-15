import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Close as CloseIcon } from '@material-ui/icons';
import { IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: props => ({
    position: 'relative',
    marginRight: theme.spacing(props.marginRight)
  }),
  thumbnailWrapper: props => ({
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '8px',
    width: props.thumbnailSize,
    height: props.thumbnailSize,
    padding: theme.spacing(0.5)
  }),
  image: props => ({
    backgroundImage: `url("${props.image}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }),
  icon: props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.grey[500]
  }),
  text: props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main
  }),
  noBorder: props => ({
    borderColor: 'transparent'
  }),
  textContent: {
    fontSize: theme.typography.fontSize * 1.75,
    fontWeight: theme.typography.fontWeightMedium
  },
  removeIcon: {
    position: 'absolute',
    right: theme.spacing(-3.5),
    top: theme.spacing(3.5)
  },
  onClick: {
    cursor: 'pointer'
  }
}));

export default function Thumbnail({
  variant = 'image',
  image,
  icon,
  text,
  marginRight = 0,
  noBorder = false,
  onRemoveThumbnail = null,
  size = 'default',
  onClick
}) {
  let thumbnailSize = size === 'default' ? 40 : 155;

  const classes = useStyles({
    marginRight,
    image,
    onClick,
    thumbnailSize
  });

  let variantClass;
  let content;
  switch (variant) {
    case 'image':
      variantClass = classes.image;
      content = null;
      break;
    case 'icon':
      variantClass = classes.icon;
      content = icon;
      break;
    case 'text':
      variantClass = classes.text;
      content = (
        <Typography color="primary" className={classes.textContent}>
          {text}
        </Typography>
      );
      break;
    default:
      variantClass = classes.image;
      content = null;
  }

  return (
    <div className={classes.root}>
      <div
        className={`${classes.thumbnailWrapper} ${variantClass} ${
          noBorder ? classes.noBorder : ''
        } ${onClick ? classes.onClick : null}`}
        onClick={onClick}
      >
        {content}
      </div>
      {onRemoveThumbnail && (
        <div className={classes.removeIcon}>
          <IconButton size="small" onClick={onRemoveThumbnail}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}
