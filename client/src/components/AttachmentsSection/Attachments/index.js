import React from 'react';

import Moment from 'react-moment';

import Thumbnail from '../../UI/Thumbnail';

import { Grid, IconButton, Typography } from '@material-ui/core';
import {
  InsertDriveFile as InsertDriveFileIcon,
  MoreVert as MoreVertIcon
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

export default function Attachments({ attachments, onOpenMoreActions }) {
  const classes = useStyles();

  return (
    <Grid container>
      {attachments.map(attachment => {
        return (
          <Grid
            key={attachment._id}
            item
            xs={12}
            md={10}
            className={classes.attachmentGridItem}
          >
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
                    <Typography variant="caption" color="textSecondary" noWrap>
                      <Moment format="MMM D, YYYY" withTitle>
                        {attachment.dateUploaded}
                      </Moment>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={2} minWidth>
                <div className={classes.actionButtonWrapper}>
                  <IconButton
                    size="small"
                    onClick={event => {
                      onOpenMoreActions(event.currentTarget, attachment);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
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
