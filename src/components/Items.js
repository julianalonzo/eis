import React from 'react';

import Item from './Item';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

export default function Items({
  items,
  onCheckItem,
  onSelectItem,
  onOpenConditionOptions,
  loading
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
  loading: PropTypes.bool,
  items: PropTypes.arrayOf(Item.propTypes.item).isRequired,
  onCheckItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onOpenConditionOptions: PropTypes.func.isRequired
};

Items.defaultProps = {
  loading: false
};
