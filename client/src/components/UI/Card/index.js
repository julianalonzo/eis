import React from 'react';

import Truncate from 'react-truncate';

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
    padding: theme.spacing(2.5),
    boxShadow: theme.shadows[1],
    '&:hover': {
      boxShadow: theme.shadows[2],
      cursor: 'pointer'
    }
  },
  avatarContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '225px'
  },
  title: {
    fontSize: theme.typography.fontSize * 1.25,
    fontWeight: theme.typography.fonWeightBold
  },
  subtitleContainer: {
    width: '225px',
    height: '40px'
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.hint
  },
  chip: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

export default function Card({
  title,
  subtitle = '',
  image,
  variant = 'text-subtitle',
  primaryChip = '',
  secondaryChips = [],
  onOpenMoreActions,
  ...otherProps
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} {...otherProps}>
      <Box className={classes.avatarContainer}>
        <Thumbnail alt={title || ''} src={image} />
        {onOpenMoreActions ? (
          <IconButton size="small" onClick={onOpenMoreActions}>
            <MoreHorizIcon />
          </IconButton>
        ) : null}
      </Box>
      <Box className={classes.titleContainer}>
        <Typography className={classes.title} noWrap={true} variant="h6">
          {title}
        </Typography>
        {primaryChip !== '' ? (
          <Chip
            size="small"
            label={primaryChip}
            style={{ marginLeft: '16px' }}
          />
        ) : null}
      </Box>
      <Box className={classes.subtitleContainer}>
        {variant === 'text-subtitle' && subtitle !== '' ? (
          <Truncate lines={2} ellipsis="..." className={classes.subtitle}>
            {subtitle}
          </Truncate>
        ) : variant === 'text-subtitle' && subtitle === '' ? (
          <Typography
            className={classes.subtitle}
            style={{ fontStyle: 'italic' }}
          >
            (No description)
          </Typography>
        ) : variant === 'chips-subtitle' ? (
          <Box>
            {secondaryChips.map((secondaryChip, index) => {
              if (secondaryChip !== '') {
                return (
                  <Chip
                    key={`${secondaryChip}_${index}`}
                    size="small"
                    label={secondaryChip}
                    className={classes.chip}
                  />
                );
              }

              return null;
            })}
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}
