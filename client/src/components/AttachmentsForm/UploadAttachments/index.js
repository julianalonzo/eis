import React from 'react';

import { formatFileSize } from '../../../util/helperFunctions';

import Thumbnail from '../../UI/Thumbnail';

import { Grid, IconButton, Typography } from '@material-ui/core';
import {
  Close as CloseIcon,
  InsertDriveFile as InsertDriveFileIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  attachmentGridItem: {
    marginBottom: theme.spacing(1)
  },
  dataWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  textDataWrapper: {
    minWidth: 0
  },
  actionButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function UploadAttachments({ attachments, onRemoveAttachment }) {
  const classes = useStyles();

  return (
    <Grid container>
      {attachments.map((attachment, index) => {
        return (
          <Grid key={index} item xs={12} className={classes.attachmentGridItem}>
            <Grid container>
              <Grid item xs={10} minWidth>
                <div className={classes.dataWrapper}>
                  <div>
                    <Thumbnail
                      variant="icon"
                      noBorder
                      icon={<InsertDriveFileIcon />}
                      marginRight={1}
                    />
                  </div>
                  <div className={classes.textDatWrapper}>
                    <Typography variant="body2" color="textPrimary" noWrap>
                      {attachment.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {formatFileSize(attachment.size)}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={2} minWidth>
                <div className={classes.actionButtonWrapper}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      onRemoveAttachment(index);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
