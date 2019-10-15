import React from 'react';

import { HOST } from '../../../util/constants';

import LoadingIndicator from '../../UI/LoadingIndicator';
import Thumbnail from '../../UI/Thumbnail';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
  }
}));

export default function ItemDetails({
  item: { name, category, condition, thumbnails },
  loading = false
}) {
  const classes = useStyles();

  if (loading) {
    return <LoadingIndicator />;
  }

  let thumbnailUrl;
  if (thumbnails.length > 0) {
    thumbnailUrl = `${HOST}/api/files/${thumbnails[0].filename}`;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={4}>
        <Thumbnail variant="image" image={thumbnailUrl} size="large" />
        <Box className={classes.thumbnails}>
          {thumbnails.map(thumbnail => {
            return (
              <Thumbnail
                key={thumbnail._id}
                variant="image"
                image={`${HOST}/api/files/${thumbnail.filename}`}
                marginRight={1}
              />
            );
          })}
        </Box>
      </Grid>
      <Grid item xs={12} sm={7} md={8}>
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.dataField}>
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
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Box className={classes.dataField}>
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
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Box className={classes.dataField}>
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
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
