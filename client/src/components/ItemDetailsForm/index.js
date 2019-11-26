import React, { useMemo } from 'react';

import { isRequired } from '../../util/validators';

import { Field } from 'react-final-form';

import TextField from '../UI/TextField';
import Thumbnail from '../UI/Thumbnail';
import UploadDropzone from '../UI/UploadDropzone';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

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
  }
}));

export default function ItemDetailsForm({
  thumbnails,
  onAddThumbnails,
  onRemoveThumbnail
}) {
  const classes = useStyles();

  const generateThumbnailsPreview = useMemo(() => {
    return thumbnails.map(thumbnail => {
      if (thumbnail instanceof File) {
        return {
          objectUrl: URL.createObjectURL(thumbnail)
        };
      }

      return thumbnail;
    });
  }, [thumbnails]);

  return (
    <>
      <div>
        <Field name="name" validate={isRequired}>
          {({ input, meta }) => {
            return (
              <TextField
                label="Item Name"
                {...input}
                error={meta.error && meta.touched}
                helperText={meta.error && meta.touched ? meta.error : null}
                fullWidth
              />
            );
          }}
        </Field>
        <Field name="category">
          {({ input, meta }) => {
            return <TextField label="Item Category" fullWidth {...input} />;
          }}
        </Field>
        <Field name="condition">
          {({ input, meta }) => {
            return <TextField label="Item Condition" fullWidth {...input} />;
          }}
        </Field>
      </div>
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
        {thumbnails.length > 0 ? (
          <div className={classes.thumbnailsPreviewContainer}>
            {generateThumbnailsPreview.map((thumbnail, index) => {
              const thumbnailUrl = thumbnail.path
                ? thumbnail.path
                : thumbnail.objectUrl;
              return (
                <Thumbnail
                  key={thumbnailUrl}
                  variant="image"
                  image={thumbnailUrl}
                  onRemoveThumbnail={() => {
                    onRemoveThumbnail(index);
                  }}
                  marginRight={4}
                />
              );
            })}
          </div>
        ) : null}
      </UploadDropzone>
    </>
  );
}

ItemDetailsForm.defaultProps = {
  thumbnails: []
};
