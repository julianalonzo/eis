import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useHistory, useParams, withRouter } from 'react-router-dom';

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
import { CssBaseline, Drawer, Hidden } from '@material-ui/core/';

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
  folder,
  onFetchFolder,
  fetchingFolder,
  onResetFolder,
  onCreateFolder,
  creatingFolder,
  onRemoveFolder,
  items,
  onFetchItems,
  fetchingItems,
  onResetItems,
  onRemoveItem
}) {
  const { folderId } = useParams();
  const history = useHistory();

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
    history.push(`/folders/${folderId}`);
  };

  const openSelectTemplatePageHandler = folderId => {
    history.push(`/folders/${folderId}/select-template`);
  };

  const openItemDetailsPageHandler = itemId => {
    history.push(`/items/${itemId}`);
  };

  useEffect(() => {
    onFetchFolders();
  }, [onFetchFolders]);

  useEffect(() => {
    if (Boolean(folderId)) {
      onFetchFolder(folderId);
      onFetchItems(folderId);
    } else {
      onResetItems();
      onResetFolder();
    }
  }, [onFetchItems, onFetchFolder, folderId, onResetItems, onResetFolder]);

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
            currentFolder={folderId}
            submitting={creatingFolder}
            onSubmit={onCreateFolder}
          />
        ) : null}
      </React.Fragment>
    );
  }

  // Show root folders on root route (i.e., /)
  let folderChildren;
  if (Boolean(folderId)) {
    folderChildren = folder.children;
  } else {
    folderChildren = folders.filter(f => f.parent === null);
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
              currentFolder={folderId}
              openedFolders={folder.hierarchy.map(f => f._id)}
            />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {!fetchingItems && !fetchingFolder ? (
            <React.Fragment>
              <MainPageToolBar
                onOpenNewButtonMenu={openNewButtonHandler}
                breadcrumbs={folder.hierarchy.map(f => {
                  return {
                    link: `${f._id}`,
                    label: f.name
                  };
                })}
              />
              <NewButtonMenuListPopper
                isOpen={Boolean(newButtonAnchorEl)}
                anchorEl={newButtonAnchorEl}
                onClose={closeNewButtonHandler}
                currentFolder={folderId}
                onOpenSelectTemplatePage={openSelectTemplatePageHandler}
                onOpenNewFolderDialog={openNewFolderDialogHandler}
              />
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
            <LoadingIndicator />
          )}
        </main>
      </div>
      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onClose={closeNewFolderDialogHandler}
        currentFolder={folderId}
        submitting={creatingFolder}
        onSubmit={onCreateFolder}
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    folders: state.folder.folders,
    fetchingFolders: state.folder.fetchingFolders,
    folder: state.folder.folder,
    fetchingFolder: state.folder.fetchingFolder,
    creatingFolder: state.folder.creatingFolder,
    items: state.item.items,
    fetchingItems: state.item.fetchingItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFolders: () => dispatch(actions.fetchFolders()),
    onFetchFolder: folderId => dispatch(actions.fetchFolder(folderId)),
    onResetFolder: () => dispatch(actions.resetFolder()),
    onCreateFolder: (name, parentId) =>
      dispatch(actions.createFolder(name, parentId)),
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
