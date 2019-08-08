import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { formatFileSize } from '../helperFunctions';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: '16px'
  },
  textPrimary: {
    fontWeight: '700'
  },
  textSecondary: {
    color: '#9e9e9e',
    fontSize: '12px'
  }
});

export default function Attachment({
  attachment: { id, fileName, filePath, type, fileSize, dateUploaded },
  variant
}) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={10}>
        <div className={classes.flexAlignCenter}>
          <Avatar className={classes.avatar}>
            <InsertDriveFileIcon />
          </Avatar>
          <div>
            <Typography className={classes.textPrimary}>{fileName}</Typography>
            <Typography className={classes.textSecondary}>
              {variant === 'default' ? (
                <Moment format="MMM D, YYYY" withTitle>
                  {dateUploaded}
                </Moment>
              ) : (
                formatFileSize(fileSize)
              )}
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item>
        {variant === 'default' ? (
          <IconButton>
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton>
            <CloseIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}

Attachment.propTypes = {
  attachment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    dateUploaded: PropTypes.string.isRequired
  }),
  variant: PropTypes.string
};

Attachment.defaultProps = {
  variant: 'default'
};
