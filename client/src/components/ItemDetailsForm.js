import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from './Button';
import { Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import { isRequired } from '../utilities/validators';
import TextField from '@material-ui/core/TextField';
import Thumbnail from './Thumbnail';
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
  itemDetails: { name, category, condition, thumbnails }
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="name" validate={isRequired}>
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
            <Field name="category">
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
            <Field name="condition" validate={isRequired}>
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
          {thumbnails.length < 4 ? (
            <Button color="secondary" variant="outlined">
              <AddPhotoAlternateIcon className={classes.buttonIcon} />
              Upload Thumbnail
            </Button>
          ) : null}
        </div>
        <div className={classes.thumbnailsPreviewContainer}>
          {thumbnails.map(thumbnail => {
            return (
              <Thumbnail
                key={thumbnail.src}
                thumbnail={thumbnail}
                marginRight={8}
              />
            );
          })}
          {thumbnails.length === 0 ? (
            <Typography
              className={classes.noThumbnailText}
              color="textSecondary"
            >
              No thumbnails yet
            </Typography>
          ) : null}
        </div>
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
  itemDetails: {
    name: '',
    category: '',
    condition: '',
    thumbnails: []
  }
};
