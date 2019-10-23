import React from 'react';

import { isRequired } from '../../util/validators';

import { Field } from 'react-final-form';

import Thumbnail from '../UI/Thumbnail';
import UploadDropzone from '../UI/UploadDropzone';

import { makeStyles } from '@material-ui/styles';
import { Box, Grid, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  thumbnailsFormHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  thumbnailsHeaderText: {
    marginRight: theme.spacing(6)
  },
  mainHeaderText: {
    marginRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium
  },
  subHeaderText: {
    fontWeight: theme.typography.fontWeightMedium
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  thumbnailsPreviewContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  noThumbnailText: {
    fontStyle: 'italic'
  },
  textField: {
    margin: theme.spacing(0, 3, 3, 0)
  }
}));

export default function ItemDetailsForm({
  thumbnails,
  onAddThumbnails,
  onRemoveThumbnail
}) {
  const classes = useStyles();

  const preprocessedThumbnails = thumbnails.map(thumbnail => {
    let image;

    if (thumbnail instanceof File) {
      image = URL.createObjectURL(thumbnail);
    } else {
      image = thumbnail.path;
    }

    return image;
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Field name="itemName" validate={isRequired}>
            {({ input, meta }) => {
              return (
                <TextField
                  label="Item Name"
                  variant="outlined"
                  margin="dense"
                  className={classes.textField}
                  {...input}
                  error={meta.error && meta.touched}
                  helperText={meta.error && meta.touched ? meta.error : null}
                />
              );
            }}
          </Field>
          <Field name="itemCategory">
            {({ input, meta }) => {
              return (
                <TextField
                  label="Item Category"
                  variant="outlined"
                  margin="dense"
                  className={classes.textField}
                  {...input}
                />
              );
            }}
          </Field>
          <Field name="itemCondition">
            {({ input, meta }) => {
              return (
                <TextField
                  label="Item Condition"
                  variant="outlined"
                  margin="dense"
                  className={classes.textField}
                  {...input}
                />
              );
            }}
          </Field>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.thumbnailsFormHeader}>
          <div className={classes.thumbnailsHeaderText}>
            <Typography
              display="inline"
              className={classes.mainHeaderText}
              color="textSecondary"
            >
              Thumbnails
            </Typography>
            <Typography
              variant="subtitle2"
              display="inline"
              className={classes.subHeaderText}
              color="textSecondary"
            >
              (4 max)
            </Typography>
          </div>
        </div>
        <UploadDropzone
          showPlaceholder={thumbnails.length === 0}
          onAddFiles={onAddThumbnails}
          label="thumbnails"
        >
          {preprocessedThumbnails.length > 0 ? (
            <div className={classes.thumbnailsPreviewContainer}>
              {preprocessedThumbnails.map((thumbnail, index) => {
                return (
                  <Thumbnail
                    key={thumbnail}
                    variant="image"
                    image={thumbnail}
                    onRemoveThumbnail={() => {
                      onRemoveThumbnail(index);
                    }}
                    marginRight={3}
                  />
                );
              })}
            </div>
          ) : null}
        </UploadDropzone>
      </Grid>
    </Grid>
  );
}

ItemDetailsForm.defaultProps = {
  thumbnails: []
};
