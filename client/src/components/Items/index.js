import React from 'react';

import Item from './Item';

import PropTypes from 'prop-types';

export default function Items({ items }) {
  return (
    <React.Fragment>
      {items.map(item => {
        return <Item key={item._id} item={item} />;
      })}
    </React.Fragment>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(Item.propTypes.item).isRequired,
  onCheckItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onOpenConditionOptions: PropTypes.func
};

Items.defaultProps = {
  items: []
};
