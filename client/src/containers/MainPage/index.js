import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import IllustrationPlaceholder from '../../components/UI/IllustrationPlaceholder';
import FoldersTreeView from '../../components/FoldersTreeView';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import MainPageContent from '../../components/MainPageContent';
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
  onRemoveItem,
  onFetchFolders,
  onCreateFolder,
  creatingFolder,
  folders,
  fetchingFolders,
  match: { params },
  history
}) {
  const [currentFolder, setCurrentFolder] = useState(params.folderId || '');
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
    setCurrentFolder(folderId);
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
    if (currentFolder !== '') {
      history.push(`/folders/${currentFolder}`);
      setFolderChildren(getFolderChildren(currentFolder));
      onFetchItems(currentFolder);
    }
  }, [
    onFetchItems,
    currentFolder,
    setFolderChildren,
    getFolderChildren,
    history
  ]);

  const classes = useStyles();

  if (fetchingFolders) {
    return <LoadingIndicator />;
  }

  if (folders.length === 0) {
    return (
      <IllustrationPlaceholder
        title="No folders yet"
        subtitle="Create your first folder to start using EIS"
        sourceImage={NoFoldersllustration}
        action={{
          label: 'New Folder',
          action: openNewFolderDialogHandler
        }}
      />
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
          <React.Fragment>
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
              <MainPageContent
                folders={folderChildren}
                items={items}
                onOpenItemMoreActions={openItemMoreActionsHandler}
                itemMoreActionsAnchorEl={itemMoreActionsAnchorEl}
                onCloseItemMoreActions={closeItemMoreActionsHandler}
                currentItem={currentItem}
                onRemoveItem={onRemoveItem}
              />
            ) : (
              <LoadingIndicator label="Fetching items..." />
            )}
          </React.Fragment>
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
    onFetchFolders: () => dispatch(actions.fetchFolders()),
    onCreateFolder: folder => dispatch(actions.createFolder(folder))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
