import React from 'react';

import Moment from 'react-moment';

import { Divider, IconButton, Typography } from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  InsertDriveFile as NoteIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  note: {
    marginBottom: theme.spacing(4)
  },
  noteWrapper: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  noteAvatar: {
    width: '25px',
    height: '25px',
    marginRight: theme.spacing(2),
    color: theme.palette.grey[500]
  },
  noteContentWrapper: {
    flexGrow: '1',
    marginRight: theme.spacing(4)
  },
  datePosted: {
    marginTop: theme.spacing(1)
  }
}));

export default function Notes({ notes }) {
  const classes = useStyles();

  return (
    <>
      {notes.map(note => {
        return (
          <div className={classes.note} key={note._id}>
            <div className={classes.noteWrapper}>
              <div>
                <NoteIcon className={classes.noteAvatar} />
              </div>
              <div className={classes.noteContentWrapper}>
                <Typography variant="body2">{note.content}</Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className={classes.datePosted}
                >
                  <Moment format="MMM D, YYYY h:mm A">{note.datePosted}</Moment>
                </Typography>
              </div>
              <div>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
