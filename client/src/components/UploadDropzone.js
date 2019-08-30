import React, { useCallback, useMemo } from 'react';

import { makeStyles } from '@material-ui/styles';

import Button from '../components/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileUploadIllustration from '../assets/illustrations/file_upload.svg';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  uploadDropzone: {
    display: 'block',
    minHeight: '300px',
    textAlign: 'center',
    borderRadius: '10px'
  },
  fileUploadIllustration: {
    width: '150px',
    marginBottom: theme.spacing(2)
  },
  cloudUploadIcon: {
    marginRight: theme.spacing(1)
  },
  uploadedFilesContainer: {
    marginBottom: theme.spacing(4)
  }
}));

const baseStyle = {
  outline: 'none',
  borderRadius: '10px',
  width: '100%',
  border: '1px dashed transparent',
  padding: '16px'
};

const activeStyle = {
  border: '1px dashed ' + grey[200]
};

const acceptStyle = {
  border: '1px dashed ' + lightGreen[200]
};

const rejectStyle = {
  border: '1px dashed ' + red[200]
};

export default function UploadDropzone({
  onAddFiles,
  showPlaceholder,
  children,
  label
}) {
  const classes = useStyles();

  const onDrop = useCallback(
    acceptedFiles => {
      onAddFiles(acceptedFiles);
    },
    [onAddFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({ onDrop: onDrop, noClick: true, noKeyboard: true });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {showPlaceholder ? (
        <div className={classes.uploadDropzone}>
          <img
            src={FileUploadIllustration}
            alt="File Upoad"
            className={classes.fileUploadIllustration}
          />
          <Typography color="textSecondary" style={{ marginBottom: '8px' }}>
            Drag and drop {label} here
          </Typography>
          <Typography color="textSecondary" style={{ marginBottom: '8px' }}>
            or
          </Typography>
          <Button color="secondary" variant="outlined" onClick={open}>
            <CloudUploadIcon className={classes.cloudUploadIcon} />
            Add {label}
          </Button>
        </div>
      ) : (
        <Grid container>
          <Grid item xs={12} className={classes.uploadedFilesContainer}>
            {children}
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" variant="outlined" onClick={open}>
              <CloudUploadIcon className={classes.cloudUploadIcon} />
              Add {label}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
