import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Thumbnail from './Thumbnail';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  row: {
    marginBottom: '16px'
  },
  thumbnailsFormHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  },
  thumbnailsHeaderText: {
    marginRight: '48px'
  },
  mainHeaderText: {
    marginRight: '4px'
  },
  subHeaderText: {
    fontSize: '12px',
    color: '#9e9e9e'
  },
  buttonIcon: {
    marginRight: '8px'
  },
  thumbnailsPreviewContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

export default function ItemDetailsForm({
  itemDetailsFormData: { itemName, itemCategory, itemCondition, itemThumbnails }
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12} sm={8} md={6} lg={4}>
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
          <Grid item xs={12} sm={8} md={6} lg={4}>
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
          <Grid item xs={12} sm={8} md={6} lg={4}>
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
            <Typography component="span" className={classes.mainHeaderText}>
              Thumbnails
            </Typography>
            <Typography component="span" className={classes.subHeaderText}>
              (4 max)
            </Typography>
          </div>
          {itemThumbnails.length < 4 ? (
            <Button component="span">
              <AddPhotoAlternateIcon className={classes.buttonIcon} />
              Add Thumbnail/s
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
    itemCondition: 'In Stock',
    itemThumbnails: []
  }
};
