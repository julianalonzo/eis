import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import EmptyIllustration from '../../assets/illustrations/empty.svg';
import IllustrationPlaceholder from '../../components/UI/IllustrationPlaceholder';
import Items from '../../components/Items';
import ItemMoreActionsMenuListPopper from '../../components/Items/ItemMoreActionsMenuListPopper';
import FoldersTreeView from '../../components/FoldersTreeView';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import MainPageToolBar from '../../components/MainPageToolBar';
import NewButtonMenuListPopper from '../../components/NewButtonMenuListPopper';
import NewFolderDialog from '../../components/NewFolderDialog';
import NoFoldersllustration from '../../assets/illustrations/select_folder.svg';

import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'transparent',
    borderRight: 'none'
  },
  content: {
    flexGrow: 1
  },
  toolbar: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(2)
  }
}));

function MainPage({
  onFetchItems,
  items,
  fetchingItems,
  onResetItems,
  onRemoveItem,
  onFetchFolders,
  onCreateFolder,
  creatingFolder,
  folders,
  fetchingFolders,
  match: { params },
  history
}) {
  const currentFolder = params.folderId || null;

  const [folderChildren, setFolderChildren] = useState(
    folders.filter(folder => folder.parent === currentFolder) || []
  );
  const [newButtonAnchorEl, setNewButtonAnchorEl] = useState(null);
  const [itemMoreActionsAnchorEl, setItemMoreActionsAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);

  const openNewButtonHandler = event => {
    setNewButtonAnchorEl(event.currentTarget);
  };

  const closeNewButtonHandler = event => {
    setNewButtonAnchorEl(null);
  };

  const openItemMoreActionsHandler = (event, id) => {
    setItemMoreActionsAnchorEl(event.currentTarget);
    setCurrentItem(id);
  };

  const closeItemMoreActionsHandler = () => {
    setItemMoreActionsAnchorEl(null);
    setCurrentItem(null);
  };

  const openFolderHandler = folderId => {
    history.push(`/folders/${folderId}`);
  };

  const openSelectTemplatePageHandler = () => {
    history.push(`/folders/${currentFolder}/select-template`);
  };

  const openNewFolderDialogHandler = () => {
    setIsNewFolderDialogOpen(true);
  };

  const closeNewFolderDialogHandler = () => {
    setIsNewFolderDialogOpen(false);
  };

  const getFolderChildren = useCallback(
    folderId => {
      return folders.filter(folder => folder.parent === folderId);
    },
    [folders]
  );

  useEffect(() => {
    onFetchFolders();
  }, [onFetchFolders]);

  useEffect(() => {
    setFolderChildren(getFolderChildren(currentFolder));

    if (currentFolder) {
      onFetchItems(currentFolder);
    } else {
      onResetItems();
    }
  }, [
    onFetchItems,
    setFolderChildren,
    getFolderChildren,
    currentFolder,
    onResetItems
  ]);

  const classes = useStyles();

  if (fetchingFolders) {
    return <LoadingIndicator />;
  }

  if (folders.length === 0) {
    return (
      <React.Fragment>
        <IllustrationPlaceholder
          title="No folders yet"
          subtitle="Create your first folder to start using EIS"
          sourceImage={NoFoldersllustration}
          action={{
            label: 'New Folder',
            action: openNewFolderDialogHandler
          }}
        />
        {isNewFolderDialogOpen ? (
          <NewFolderDialog
            isOpen={isNewFolderDialogOpen}
            onClose={closeNewFolderDialogHandler}
            currentFolder={currentFolder}
            submitting={creatingFolder}
            onSubmit={onCreateFolder}
          />
        ) : null}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Hidden smDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.toolbar} />
            <FoldersTreeView
              folders={folders}
              onOpenFolder={openFolderHandler}
              currentFolder={currentFolder}
            />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <MainPageToolBar onOpenNewButtonMenu={openNewButtonHandler} />
          <NewButtonMenuListPopper
            isOpen={Boolean(newButtonAnchorEl)}
            anchorEl={newButtonAnchorEl}
            onClose={closeNewButtonHandler}
            currentFolder={currentFolder}
            onOpenSelectTemplatePage={openSelectTemplatePageHandler}
            onOpenNewFolderDialog={openNewFolderDialogHandler}
          />
          {!fetchingItems ? (
            <React.Fragment>
              {folderChildren.length === 0 && items.length === 0 ? (
                <IllustrationPlaceholder
                  title="This folder seems to be empty"
                  subtitle="Add a new item or folder now"
                  sourceImage={EmptyIllustration}
                />
              ) : (
                <React.Fragment>
                  <Items
                    items={items}
                    onOpenItemMoreActions={openItemMoreActionsHandler}
                  />
                  <ItemMoreActionsMenuListPopper
                    isOpen={Boolean(itemMoreActionsAnchorEl)}
                    anchorEl={itemMoreActionsAnchorEl}
                    onClose={closeItemMoreActionsHandler}
                    currentItem={currentItem}
                    onRemoveItem={onRemoveItem}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <LoadingIndicator label="Fetching items..." />
          )}
        </main>
      </div>
      {isNewFolderDialogOpen ? (
        <NewFolderDialog
          isOpen={isNewFolderDialogOpen}
          onClose={closeNewFolderDialogHandler}
          currentFolder={currentFolder}
          submitting={creatingFolder}
          onSubmit={onCreateFolder}
        />
      ) : null}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    items: state.item.items,
    fetchingItems: state.item.fetchingItems,
    folders: state.folder.folders,
    fetchingFolders: state.folder.fetchingFolders,
    creatingFolder: state.folder.creatingFolder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItems: folderId => dispatch(actions.fetchItems(folderId)),
    onRemoveItem: itemId => dispatch(actions.removeItem(itemId)),
    onResetItems: () => dispatch(actions.resetItems()),
    onFetchFolders: () => dispatch(actions.fetchFolders()),
    onCreateFolder: folder => dispatch(actions.createFolder(folder))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
