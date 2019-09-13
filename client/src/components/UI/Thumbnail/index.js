import React from 'react';

import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginRight: theme.spacing(props.marginRight),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '8px',
    padding: theme.spacing(0.5),
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundImage: `url("${props.src}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }),
  removeIcon: {
    position: 'relative',
    right: theme.spacing(-4.5),
    top: theme.spacing(3.5)
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
  const classes = useStyles({ marginRight, src, onClick });
  return (
    <div className={classes.root}>
      <div className={classes.thumbnail}></div>
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
