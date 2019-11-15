import React, { useState, useEffect } from 'react';

import Thumbnail from '../../UI/Thumbnail';

import { Image as ImageIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Chip, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dataField: {
    marginBottom: theme.spacing(2)
  },
  dataFieldHeader: {
    fontWeight: theme.typography.fontWeightMedium
  },
  name: {
    fontWeight: theme.typography.fontWeightMedium
  },
  italic: {
    fontStyle: 'italic'
  },
  thumbnails: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  noThumbnailIcon: {
    width: '100%',
    height: '100%'
  }
}));

export default function ItemDetails({
  item: { name, category, condition, thumbnails }
}) {
  const classes = useStyles();

  const [currentThumbnail, setCurrentThumbnail] = useState(
    thumbnails.length > 0 ? thumbnails[0] : undefined
  );

  useEffect(() => {
    if (thumbnails.length === 0) {
      setCurrentThumbnail(undefined);
    } else {
      setCurrentThumbnail(thumbnails[0]);
    }
  }, [thumbnails]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={4}>
        <div>
          <Thumbnail
            variant={Boolean(currentThumbnail) ? 'image' : 'icon'}
            image={
              Boolean(currentThumbnail) ? currentThumbnail.path : undefined
            }
            icon={<ImageIcon className={classes.noThumbnailIcon} />}
            size="large"
          />
        </div>
        <div className={classes.thumbnails}>
          {thumbnails.map((thumbnail, index) => {
            return (
              <Thumbnail
                key={thumbnail._id}
                variant="image"
                image={thumbnail.path}
                marginRight={1}
                onClick={() => {
                  setCurrentThumbnail(thumbnail);
                }}
              />
            );
          })}
        </div>
      </Grid>
      <Grid item xs={12} sm={7} md={8}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.dataField}>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.dataFieldHeader}
              >
                Item Name
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.name}
              >
                {name}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <div className={classes.dataField}>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.dataFieldHeader}
              >
                Category
              </Typography>
              {category !== '' ? (
                <Chip label={category} size="small" />
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.italic}
                >
                  Not set
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <div className={classes.dataField}>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.dataFieldHeader}
              >
                Condition
              </Typography>
              {condition !== '' ? (
                <Chip label={condition} size="small" />
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.italic}
                >
                  Not set
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
