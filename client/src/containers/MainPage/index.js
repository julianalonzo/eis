import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import EmptyIllustration from '../../assets/illustrations/empty.svg';
import IllustrationPlaceholder from '../../components/UI/IllustrationPlaceholder';
import Items from '../../components/Items';
import ItemMoreActionsMenuListPopper from '../../components/Items/ItemMoreActionsMenuListPopper';
import Folders from '../../components/Folders';
import FolderMoreActionsPopper from '../../components/Folders/FolderMoreActionsPopper';
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
  folders,
  onFetchFolders,
  fetchingFolders,
  onCreateFolder,
  creatingFolder,
  onRemoveFolder,
  items,
  onFetchItems,
  fetchingItems,
  onResetItems,
  onRemoveItem,
  match: { params },
  history
}) {
  const [currentFolder, setCurrentFolder] = useState(params.folderId || null);

  const [folderChildren, setFolderChildren] = useState(
    folders.filter(folder => folder.parent === currentFolder) || []
  );

  const [
    folderMoreActionsAnchorEl,
    openFolderMoreActionsHandler,
    closeFolderMoreActionsHandler
  ] = usePopperState(null);

  // Folder ID of the folder that has its more actions popper opened
  const [folderIdMoreActions, setFolderIdMoreActions] = useState(null);

  const [
    newButtonAnchorEl,
    openNewButtonHandler,
    closeNewButtonHandler
  ] = usePopperState(null);

  const [
    itemMoreActionsAnchorEl,
    openItemMoreActionsHandler,
    closeItemMoreActionsHandler
  ] = usePopperState(null);

  // Item ID of the item that has its more actions popper opened
  const [itemIdMoreActions, setItemIdMoreActions] = useState(null);

  const [
    isNewFolderDialogOpen,
    openNewFolderDialogHandler,
    closeNewFolderDialogHandler
  ] = useDialogState(false);

  const onOpenFolderMoreActions = (event, id) => {
    openFolderMoreActionsHandler(event.currentTarget);
    setFolderIdMoreActions(id);
  };

  const onCloseFolderMoreActions = () => {
    closeFolderMoreActionsHandler();
    setFolderIdMoreActions(null);
  };

  const onOpenItemMoreActions = (event, id) => {
    openItemMoreActionsHandler(event.currentTarget);
    setItemIdMoreActions(id);
  };

  const onCloseItemMoreActions = () => {
    closeItemMoreActionsHandler();
    setItemIdMoreActions(null);
  };

  const openFolderHandler = folderId => {
    setCurrentFolder(folderId);
  };

  const openSelectTemplatePageHandler = () => {
    history.push(`/folders/${currentFolder}/select-template`);
  };

  const openItemDetailsPageHandler = itemId => {
    history.push(`/items/${itemId}`);
  };

  const getFolderChildren = useCallback(
    folderId => {
      return folders.filter(folder => folder.parent === folderId);
    },
    [folders]
  );

  const getAllFolderParents = useCallback(
    folderId => {
      if (folderId === null) {
        return [];
      }

      const allFolderParents = [];
      let hasFoundAllFolderParents = false;
      let folderIdToBeEvaluated = folderId;

      while (!hasFoundAllFolderParents) {
        let parentFolder = null;
        // eslint-disable-next-line no-loop-func
        const folder = folders.filter(f => f._id === folderIdToBeEvaluated);

        if (folder.length > 0) {
          parentFolder = folder[0].parent;
        }

        if (parentFolder !== null) {
          allFolderParents.push(parentFolder);
          folderIdToBeEvaluated = parentFolder;
        } else {
          hasFoundAllFolderParents = true;
        }
      }

      return allFolderParents;
    },
    [folders]
  );

  const [openedFolders, setOpenedFolders] = useState(
    getAllFolderParents(currentFolder)
  );

  useEffect(() => {
    onFetchFolders();
  }, [onFetchFolders]);

  useEffect(() => {
    setCurrentFolder(params.folderId || null);
  }, [params]);

  useEffect(() => {
    if (currentFolder !== null) {
      history.push(`/folders/${currentFolder}`);
    } else {
      history.push(`/`);
    }
  }, [history, currentFolder]);

  useEffect(() => {
    if (currentFolder !== null) {
      onFetchItems(currentFolder);
    } else {
      onResetItems();
    }
  }, [onFetchItems, currentFolder, onResetItems]);

  useEffect(() => {
    setFolderChildren(getFolderChildren(currentFolder));
  }, [getFolderChildren, currentFolder]);

  useEffect(() => {
    setOpenedFolders(getAllFolderParents(currentFolder).concat(currentFolder));
  }, [getAllFolderParents, currentFolder]);

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
              openedFolders={openedFolders}
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
                  <Folders
                    folders={folderChildren}
                    onOpenFolder={openFolderHandler}
                    onOpenFolderMoreActions={onOpenFolderMoreActions}
                  />
                  <FolderMoreActionsPopper
                    isOpen={Boolean(folderMoreActionsAnchorEl)}
                    anchorEl={folderMoreActionsAnchorEl}
                    onClose={onCloseFolderMoreActions}
                    folderId={folderIdMoreActions}
                    onRemoveFolder={onRemoveFolder}
                  />
                  <Items
                    items={items}
                    onOpenItemMoreActions={onOpenItemMoreActions}
                    onOpenItemDetails={openItemDetailsPageHandler}
                  />
                  <ItemMoreActionsMenuListPopper
                    isOpen={Boolean(itemMoreActionsAnchorEl)}
                    anchorEl={itemMoreActionsAnchorEl}
                    onClose={onCloseItemMoreActions}
                    currentItem={itemIdMoreActions}
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
    folders: state.folder.folders,
    fetchingFolders: state.folder.fetchingFolders,
    creatingFolder: state.folder.creatingFolder,
    items: state.item.items,
    fetchingItems: state.item.fetchingItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFolders: () => dispatch(actions.fetchFolders()),
    onCreateFolder: folder => dispatch(actions.createFolder(folder)),
    onRemoveFolder: folderId => dispatch(actions.removeFolder(folderId)),
    onFetchItems: folderId => dispatch(actions.fetchItems(folderId)),
    onRemoveItem: itemId => dispatch(actions.removeItem(itemId)),
    onResetItems: () => dispatch(actions.resetItems())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
