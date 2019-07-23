import React from 'react';

import PropTypes from 'prop-types';

export default function Item({
  item: { id, thumbnail, name, category, condition, state },
  onCheckItem,
  onSelectItem
}) {
  return <div>{name}</div>;
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }),
  onCheckItem: PropTypes.func,
  onSelectItem: PropTypes.func
};
