import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import EmptyItemsIllustration from '../../assets/illustrations/empty.svg';
import Items from '../../components/Items';
import IllustrationPlaceholder from '../../components/UI/IllustrationPlaceholder';
import FoldersTreeView from '../../components/FoldersTreeView';

import Grid from '@material-ui/core/Grid';

function MainPage({
  onFetchItems,
  items,
  fetchingItems,
  onFetchFolders,
  folders,
  fetchingFolders,
  match: { params },
  history
}) {
  const [currentFolder, setCurrentFolder] = useState(params.folderId || '');

  const openFolderHandler = folderId => {
    setCurrentFolder(folderId);
  };

  const openSelectTemplatePageHandler = () => {
    history.push(`/folders/${currentFolder}/select-template`);
  };

  useEffect(() => {
    if (currentFolder) {
      history.push(`/folders/${currentFolder}`);
      onFetchItems(currentFolder);
    }

    onFetchFolders();
  }, [onFetchItems, onFetchFolders, currentFolder, history]);

  return (
    <React.Fragment>
      {!(fetchingItems && fetchingFolders) ? (
        <Grid container spacing={4}>
          <Grid item md={3}>
            <FoldersTreeView
              folders={folders}
              onOpenFolder={openFolderHandler}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            {items.length > 0 ? (
              <Items items={items} />
            ) : (
              <IllustrationPlaceholder
                sourceImage={EmptyItemsIllustration}
                alt="No Items"
                primaryText="No items yet"
                secondaryText="Add items from scratch or from saved templates"
                action={{
                  label: 'New Item',
                  action: openSelectTemplatePageHandler
                }}
              />
            )}
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
    onFetchItems: folderId => dispatch(actions.fetchItems(folderId)),
    onFetchFolders: () => dispatch(actions.fetchFolders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
