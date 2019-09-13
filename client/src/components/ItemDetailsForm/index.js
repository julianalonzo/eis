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

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  row: {
    marginBottom: theme.spacing(2)
  },
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
    fontWeight: 500
  },
  subHeaderText: {
    fontWeight: 500
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
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="itemName" validate={isRequired}>
              {({ input, meta }) => {
                return (
                  <TextField
                    label="Item Name"
                    variant="outlined"
                    fullWidth
                    {...input}
                    error={meta.error && meta.touched}
                    helperText={meta.error && meta.touched ? meta.error : null}
                  />
                );
              }}
            </Field>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="itemCategory">
              {({ input, meta }) => {
                return (
                  <TextField
                    label="Item Category"
                    variant="outlined"
                    fullWidth
                    {...input}
                  />
                );
              }}
            </Field>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="itemCondition">
              {({ input, meta }) => {
                return (
                  <TextField
                    label="Item Condition"
                    variant="outlined"
                    fullWidth
                    {...input}
                  />
                );
              }}
            </Field>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.row}>
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
        </UploadDropzone>
      </Grid>
    </Grid>
  );
}

ItemDetailsForm.propTypes = {
  itemDetails: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    condition: PropTypes.string,
    thumbnails: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string,
        variant: PropTypes.string
      })
    )
  })
};

ItemDetailsForm.defaultProps = {
  thumbnails: []
};
