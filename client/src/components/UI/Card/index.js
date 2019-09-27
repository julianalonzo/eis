import React from 'react';

import Thumbnail from '../Thumbnail';

import { makeStyles } from '@material-ui/styles/';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    '&:hover': {
      boxShadow: theme.shadows[2],
      cursor: 'pointer'
    }
  },
  cardHeaderContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  cardTitleAvatarWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '225px',
    marginTop: theme.spacing(1)
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium
  },
  cardBody: {
    width: '225px',
    height: '40px',
    marginTop: theme.spacing(1)
  }
}));

export default function Card({
  variant = 'default',
  title,
  thumbnailVariant = 'text',
  icon,
  image,
  children,
  chip,
  onOpenMoreActions,
  ...otherProps
}) {
  const classes = useStyles();

  let thumbnailProperties;
  switch (thumbnailVariant) {
    case 'icon':
      thumbnailProperties = {
        icon: icon
      };
      break;
    case 'image':
      thumbnailProperties = {
        image: image
      };
      break;
    default:
      thumbnailProperties = {
        text: title[0]
      };
  }

  if (variant === 'dense') {
    return (
      <Paper className={classes.paper} {...otherProps}>
        <Box className={classes.cardHeaderContainer}>
          <Box className={classes.cardTitleAvatarWrapper}>
            <Thumbnail
              variant={thumbnailVariant}
              {...thumbnailProperties}
              noBorder={true}
              marginRight={1}
            />
            <Typography
              className={classes.title}
              noWrap={true}
              display="inline"
              variant="body1"
            >
              {title}
            </Typography>
          </Box>
          {onOpenMoreActions ? (
            <IconButton size="small" onClick={onOpenMoreActions}>
              <MoreHorizIcon />
            </IconButton>
          ) : null}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} {...otherProps}>
      <Box className={classes.cardHeaderContainer}>
        <Thumbnail variant={thumbnailVariant} {...thumbnailProperties} />
        {onOpenMoreActions ? (
          <IconButton size="small" onClick={onOpenMoreActions}>
            <MoreHorizIcon />
          </IconButton>
        ) : null}
      </Box>
      <Box className={classes.titleContainer}>
        <Typography className={classes.title} noWrap={true} display="inline">
          {title}
        </Typography>
        {chip ? (
          <Chip size="small" label={chip} style={{ marginLeft: '16px' }} />
        ) : null}
      </Box>
      <Box className={classes.cardBody}>{children}</Box>
    </Paper>
  );
}
