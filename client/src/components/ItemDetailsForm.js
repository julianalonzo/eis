import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from './Button';
import Grid from '@material-ui/core/Grid';
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
  itemDetailsFormData: { itemName, itemCategory, itemCondition, itemThumbnails }
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Item Name"
              variant="outlined"
              fullWidth
              value={itemName}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Item Description"
              variant="outlined"
              multiline
              rowsMax={4}
              rows={4}
              fullWidth
              value={itemCategory}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Item Condition"
              variant="outlined"
              fullWidth
              value={itemCondition}
            />
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
          {itemThumbnails.length < 4 ? (
            <Button color="secondary" variant="outlined">
              <AddPhotoAlternateIcon className={classes.buttonIcon} />
              Upload Thumbnail
            </Button>
          ) : null}
        </div>
        <div className={classes.thumbnailsPreviewContainer}>
          {itemThumbnails.map(thumbnail => {
            return (
              <Thumbnail
                key={thumbnail.src}
                thumbnail={thumbnail}
                marginRight={8}
              />
            );
          })}
          {itemThumbnails.length === 0 ? (
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
  itemDetailsFormData: PropTypes.shape({
    itemName: PropTypes.string,
    itemCategory: PropTypes.string,
    itemCondition: PropTypes.string,
    itemThumbnails: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string,
        variant: PropTypes.string
      })
    )
  })
};

ItemDetailsForm.defaultProps = {
  itemDetailsFormData: {
    itemName: '',
    itemCategory: '',
    itemCondition: '',
    itemThumbnails: []
  }
};
