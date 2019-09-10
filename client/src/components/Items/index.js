import React from 'react';

import EmptyIllustration from '../../assets/illustrations/empty.svg';
import Item from './Item';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';

import PropTypes from 'prop-types';

export default function Items({ items }) {
  const primaryActionData = {
    label: 'Add items'
  };

  let renderedView = (
    <IllustrationPlaceholder
      sourceImage={EmptyIllustration}
      alt="No Items"
      primaryText="No items yet"
      secondaryText="Add items from scratch or from saved templates"
      action={primaryActionData}
    />
  );

  if (items.length > 0) {
    renderedView = items.map(item => {
      return <Item key={item._id} item={item} />;
    });
  }

  return <React.Fragment>{renderedView}</React.Fragment>;
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
