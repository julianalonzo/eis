import React from 'react';

import { HOST } from '../../util/constants';

import EmptyItemsIllustration from '../../assets/illustrations/empty.svg';
import LoadingIndicator from '../UI/LoadingIndicator';

import Card from '../UI/Card';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';

import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';

export default function Items({ items = [], loading, onOpenItemMoreActions }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      {items.length > 0 ? (
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
      ) : (
        <IllustrationPlaceholder
          sourceImage={EmptyItemsIllustration}
          alt="No Items"
          title="No items for this folder yet"
          subtitle="Create a new item now"
        />
      )}
    </React.Fragment>
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
