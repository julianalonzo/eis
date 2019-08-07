import React from 'react';

import Item from './Item';

import PropTypes from 'prop-types';

export default function Items({
  items,
  onCheckItem,
  onSelectItem,
  onOpenConditionOptions
}) {
  const itemEvents = {
    onCheckItem,
    onSelectItem,
    onOpenConditionOptions
  };

  return (
    <div>
      {items.map(item => {
        return <Item item={item} {...itemEvents} />;
      })}
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(Item.propTypes.item).isRequired,
  onCheckItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onOpenConditionOptions: PropTypes.func.isRequired
};

Items.defaultProps = {
  loading: false
};
