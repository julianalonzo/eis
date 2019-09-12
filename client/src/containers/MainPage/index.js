import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Items from '../../components/Items';
import FoldersTreeView from '../../components/FoldersTreeView';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  temporarySidebar: {
    display: 'block',
    width: '100%',
    height: '100vh'
  }
});

function MainPage({
  onFetchItems,
  items,
  fetchingItems,
  onFetchFolders,
  folders,
  fetchingFolders
}) {
  const classes = useStyles();

  useEffect(() => {
    onFetchItems();
    onFetchFolders();
  }, [onFetchItems, onFetchFolders]);

  return (
    <React.Fragment>
      {!(fetchingItems && fetchingFolders) ? (
        <Grid container spacing={2}>
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
