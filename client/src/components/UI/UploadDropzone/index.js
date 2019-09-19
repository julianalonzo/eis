import React, { useCallback } from 'react';

import Button from '../Button';
import { useDropzone } from 'react-dropzone';

import { makeStyles } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  cloudUploadIcon: {
    marginRight: theme.spacing(1)
  },
  uploadedFilesContainer: {
    marginBottom: theme.spacing(2)
  }
}));

export default function UploadDropzone({ onAddFiles, children, label }) {
  const classes = useStyles();

  const onDrop = useCallback(
    acceptedFiles => {
      onAddFiles(acceptedFiles);
    },
    [onAddFiles]
  );

  const { getInputProps, open } = useDropzone({
    onDrop: onDrop,
    noClick: true,
    noKeyboard: true
  });

  return (
    <div>
      <input {...getInputProps()} />
      <Grid container>
        {children ? (
          <Grid item xs={12} className={classes.uploadedFilesContainer}>
            {children}
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Button color="secondary" variant="outlined" onClick={open}>
            <CloudUploadIcon className={classes.cloudUploadIcon} />
            Add {label}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
