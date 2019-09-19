import React from 'react';

import { HOST } from '../../util/constants';
import { isRequired } from '../../util/validators';

import { Field } from 'react-final-form';

import Thumbnail from '../UI/Thumbnail';
import UploadDropzone from '../UI/UploadDropzone';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
    alignItems: 'center'
  },
  noThumbnailText: {
    fontStyle: 'italic'
  },
  formInput: {
    margin: theme.spacing(0, 3, 3, 0),
    width: '200px'
  },
  itemNameField: {
    width: '300px'
  }
}));

export default function ItemDetailsForm({
  thumbnails,
  onAddThumbnails,
  onRemoveThumbnail
}) {
  const classes = useStyles();

  const formattedThumbnails = thumbnails.map(thumbnail => {
    let name = '';
    let src = '';

    if (thumbnail instanceof File) {
      name = thumbnail.name;
      src = URL.createObjectURL(thumbnail);
    } else {
      name = thumbnail.filename;
      src = `${HOST}/api/files/${thumbnail.filename}`;
    }

    return {
      alt: name,
      src: src,
      variant: 'THUMBNAIL_PRIMARY'
    };
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Field name="itemName" validate={isRequired}>
          {({ input, meta }) => {
            return (
              <TextField
                label="Item Name"
                variant="outlined"
                className={`${classes.formInput} ${classes.itemNameField}`}
                {...input}
                error={meta.error && meta.touched}
                helperText={meta.error && meta.touched ? meta.error : null}
              />
            );
          }}
        </Field>
        <br />
        <Field name="itemCategory">
          {({ input, meta }) => {
            return (
              <TextField
                label="Item Category"
                variant="outlined"
                className={classes.formInput}
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
                className={classes.formInput}
                {...input}
              />
            );
          }}
        </Field>
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
          {formattedThumbnails.length > 0 ? (
            <div className={classes.thumbnailsPreviewContainer}>
              {formattedThumbnails.map((thumbnail, index) => {
                return (
                  <Thumbnail
                    key={thumbnail.src}
                    alt={thumbnail.name}
                    src={thumbnail.src}
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
