import React from 'react';

import Card from '../../UI/Card';
import LoadingIndicator from '../../UI/LoadingIndicator';

import { Image as NoThumbnailIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Box, Chip, Grid, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(8)
  },
  textHeader: {
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: theme.spacing(2)
  }
}));

export default function Items({
  items = [],
  loading = false,
  onOpenItemMoreActions,
  onOpenItemDetails
}) {
  const classes = useStyles();

  if (loading) {
    return <LoadingIndicator label="Fetching items..." />;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Typography
        variant="body2"
        gutterBottom={true}
        color="textSecondary"
        className={classes.textHeader}
      >
        Items
      </Typography>
      <Grid container spacing={4}>
        {items.map(item => {
          return (
            <Grid key={item._id} item xs={12} sm={6} md={4} xl={3}>
              <Card
                variant="descriptive"
                title={item.name}
                thumbnailVariant={item.thumbnails.length > 0 ? 'image' : 'icon'}
                image={
                  item.thumbnails.length > 0
                    ? item.thumbnails[0].path
                    : undefined
                }
                icon={<NoThumbnailIcon />}
                onOpenMoreActions={event => {
                  event.stopPropagation();
                  onOpenItemMoreActions(event, item._id);
                }}
                onClick={() => {
                  onOpenItemDetails(item._id);
                }}
              >
                {item.category !== '' && (
                  <Chip
                    size="small"
                    style={{ marginRight: '8px' }}
                    label={item.category}
                  />
                )}
                {item.condition !== '' && (
                  <Chip size="small" label={item.condition} />
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      condition: PropTypes.string.isRequired
    }).isRequired
  )
};

Items.defaultProps = {
  items: []
};
