import React from 'react';

import { formatFileSize } from '../../../util/helperFunctions';

import Moment from 'react-moment';

import Thumbnail from '../../UI/Thumbnail';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  mainDataWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  textDataWrapper: {
    minWidth: 0
  },
  actionButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function Attachment({
  attachment: { name, size, dateUploaded },
  variant,
  primaryAction
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={10} minWidth>
        <Box className={classes.mainDataWrapper}>
          <Box>
            <Thumbnail
              variant="icon"
              noBorder={true}
              icon={<InsertDriveFileIcon />}
              marginRight={1}
            />
          </Box>
          <Box className={classes.textDataWrapper}>
            <Typography variant="body2" color="textPrimary" noWrap={true}>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap={true}>
              {variant === 'upload' ? (
                formatFileSize(size)
              ) : (
                <Moment format="MMM D, YYYY" withTitle>
                  {dateUploaded}
                </Moment>
              )}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box className={classes.actionButtonsContainer}>
          <IconButton size="small" onClick={primaryAction}>
            {variant === 'upload' ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MoreVertIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

Attachment.propTypes = {
  variant: PropTypes.string,
  primaryAction: PropTypes.func.isRequired
};

Attachment.defaultProps = {
  variant: 'default'
};
