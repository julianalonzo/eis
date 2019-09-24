import React from 'react';

import { HOST } from '../../util/constants';

import Card from '../UI/Card';

import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';

export default function Items({ items = [], onOpenItemMoreActions }) {
  return (
    <Grid container spacing={4}>
      {items.map(item => {
        let thumbnailUrl = null;

        if (item.thumbnails.length > 0) {
          thumbnailUrl = `${HOST}/api/files/${item.thumbnails[0].filename}`;
        }

        return (
          <Grid key={item._id} item xs={12} sm={6} md={4} xl={3}>
            <Card
              variant="chips-subtitle"
              title={item.name}
              image={thumbnailUrl}
              secondaryChips={[item.category, item.condition]}
              onOpenMoreActions={event => {
                onOpenItemMoreActions(event, item._id);
              }}
            />
          </Grid>
        );
      })}
    </Grid>
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
