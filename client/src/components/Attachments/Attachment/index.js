import React from 'react';

import { formatFileSize } from '../../../util/helperFunctions';

import Moment from 'react-moment';

import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import PropTypes from 'prop-types';

export default function Attachment({
  attachment: { id, fileName, filePath, type, fileSize, dateUploaded },
  variant,
  primaryAction
}) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <InsertDriveFileIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={fileName}
        secondary={
          variant === 'default' ? (
            <Moment format="MMM D, YYYY" withTitle>
              {dateUploaded}
            </Moment>
          ) : (
            formatFileSize(fileSize)
          )
        }
      />
      <ListItemSecondaryAction>
        {variant === 'default' ? (
          <IconButton onClick={primaryAction}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton onClick={primaryAction}>
            <CloseIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

Attachment.propTypes = {
  attachment: PropTypes.shape({
    id: PropTypes.string,
    fileName: PropTypes.string,
    filePath: PropTypes.string,
    type: PropTypes.string,
    fileSize: PropTypes.number,
    dateUploaded: PropTypes.string
  }),
  variant: PropTypes.string
};

Attachment.defaultProps = {
  variant: 'default'
};
