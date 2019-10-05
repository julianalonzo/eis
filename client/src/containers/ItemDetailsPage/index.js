import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import LoadingIndicator from '../../components/UI/LoadingIndicator';

function ItemDetailsPage({
  item,
  fetchingItem,
  onFetchItem,
  match: { params }
}) {
  const [itemId, setItemId] = useState(params.itemId || null);

  useEffect(() => {
    setItemId(params.itemId || null);
  }, [params]);

  useEffect(() => {
    onFetchItem(itemId);
  }, [itemId, onFetchItem]);

  if (fetchingItem) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <h1>Item Details Page</h1>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    item: state.item.item,
    fetchingItem: state.item.fetchingItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItem: itemId => dispatch(actions.fetchItem(itemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemDetailsPage));
