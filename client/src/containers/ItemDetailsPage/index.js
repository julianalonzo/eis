import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import SectionPaper from '../../components/UI/SectionPaper';

import Grid from '@material-ui/core/Grid';

function ItemDetailsPage({
  item,
  onFetchItem,
  fetchingItem,
  onResetItem,
  match: { params }
}) {
  const [itemId, setItemId] = useState(params.itemId || null);

  useEffect(() => {
    setItemId(params.itemId || null);
  }, [params]);

  useEffect(() => {
    onFetchItem(itemId);

    return () => {
      onResetItem();
    };
  }, [itemId, onFetchItem, onResetItem]);

  if (fetchingItem) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={8}>
          {item !== null && (
            <SectionPaper title="Item Details">
              <ItemDetailsSection item={item} />
            </SectionPaper>
          )}
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </React.Fragment>
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
    onFetchItem: itemId => dispatch(actions.fetchItem(itemId)),
    onResetItem: () => dispatch(actions.resetItem())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemDetailsPage));
