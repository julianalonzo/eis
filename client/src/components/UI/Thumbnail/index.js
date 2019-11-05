import React from 'react';

import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginRight: theme.spacing(props.marginRight),
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
    position: 'relative',
    right: theme.spacing(-4.5),
    top: theme.spacing(3.5)
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

  const classes = useStyles({ marginRight, image, onClick, thumbnailSize });

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
    <div
      className={`${classes.root} ${variantClass} ${
        noBorder ? classes.noBorder : ''
      }`}
    >
      {content}
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
