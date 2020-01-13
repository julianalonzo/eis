import React from 'react';

import Card from '../../UI/Card';
import LoadingIndicator from '../../UI/LoadingIndicator';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(8)
  },
  textHeader: {
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: theme.spacing(2)
  }
}));

export default function Folders({
  folders,
  loading = false,
  onOpenFolder,
  onOpenFolderMoreActions
}) {
  const classes = useStyles();

  if (loading) {
    return <LoadingIndicator label="Fetching folders..." />;
  }

  if (folders.length === 0) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Typography
        variant="body2"
        gutterBottom={true}
        color="textSecondary"
        className={classes.textHeader}
      >
        Folders
      </Typography>
      <Grid container spacing={4}>
        {folders.map(folder => {
          return (
            <Grid item key={folder._id} xs={12} sm={6} md={4} xl={3}>
              <Card
                title={folder.name}
                variant="dense"
                thumbnailVariant="icon"
                icon={<FolderIcon />}
                onClick={() => {
                  onOpenFolder(folder._id);
                }}
                onOpenMoreActions={event => {
                  event.stopPropagation();
                  onOpenFolderMoreActions(event, folder._id);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
