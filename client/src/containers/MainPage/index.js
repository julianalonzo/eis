import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Items from '../../components/Items';
import FoldersTreeView from '../../components/FoldersTreeView';

import Grid from '@material-ui/core/Grid';

function MainPage({
  onFetchItems,
  items,
  fetchingItems,
  onFetchFolders,
  folders,
  fetchingFolders
}) {
  useEffect(() => {
    onFetchItems();
    onFetchFolders();
  }, [onFetchItems, onFetchFolders]);

  return (
    <React.Fragment>
      {!(fetchingItems && fetchingFolders) ? (
        <Grid container spacing={4}>
          <Grid item md={3}>
            <FoldersTreeView folders={folders} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Items items={items} />
          </Grid>
        </Grid>
      ) : (
        <p>Fetching data...</p>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    items: state.item.items,
    loading: state.item.loading,
    folders: state.folder.folders,
    fetchingFolders: state.folder.fetchingFolders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItems: () => dispatch(actions.fetchItems()),
    onFetchFolders: () => dispatch(actions.fetchFolders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
