import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import IllustrationPlaceholder from '../../components/UI/IllustrationPlaceholder';
import Items from '../../components/Items';
import FoldersTreeView from '../../components/FoldersTreeView';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import MainPageToolBar from '../../components/MainPageToolBar';
import MenuListPopper from '../../components/UI/MenuListPopper';
import NoFoldersllustration from '../../assets/illustrations/select_folder.svg';

import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import FolderIcon from '@material-ui/icons/Folder';
import Hidden from '@material-ui/core/Hidden';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ItemIcon from '@material-ui/icons/Style';
import Typography from '@material-ui/core/Typography';
import NewFolderDialog from '../../components/NewFolderDialog';

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
  },
  menuList: {
    width: '120px'
  },
  menuItemIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
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

  useEffect(() => {
    if (currentFolder !== '') {
      history.push(`/folders/${currentFolder}`);
      onFetchItems(currentFolder);
    }
  }, [onFetchItems, currentFolder, history]);

  useEffect(() => {
    onFetchFolders();
  }, [onFetchFolders]);

  const classes = useStyles();

  return (
    <React.Fragment>
      {!fetchingFolders ? (
        <React.Fragment>
          {folders.length > 0 ? (
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
                  <MenuListPopper
                    isOpen={Boolean(newButtonAnchorEl)}
                    anchorEl={newButtonAnchorEl}
                    onClose={closeNewButtonHandler}
                  >
                    <MenuList className={classes.menuList}>
                      <MenuItem onClick={openSelectTemplatePageHandler}>
                        <ItemIcon className={classes.menuItemIcon} />
                        <Typography>Item</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          closeNewButtonHandler();
                          openNewFolderDialogHandler();
                        }}
                      >
                        <FolderIcon className={classes.menuItemIcon} />
                        <Typography>Folder</Typography>
                      </MenuItem>
                    </MenuList>
                  </MenuListPopper>
                  <Items
                    items={items}
                    loading={fetchingItems}
                    onOpenItemMoreActions={openItemMoreActionsHandler}
                    onOpenNewItemHandler={openSelectTemplatePageHandler}
                  />
                  <MenuListPopper
                    isOpen={Boolean(itemMoreActionsAnchorEl)}
                    anchorEl={itemMoreActionsAnchorEl}
                    onClose={closeItemMoreActionsHandler}
                  >
                    <MenuList>
                      <MenuItem
                        dense={true}
                        onClick={() => {
                          onRemoveItem(currentItem);
                          closeItemMoreActionsHandler();
                        }}
                      >
                        <Typography variant="body2">Delete Item</Typography>
                      </MenuItem>
                    </MenuList>
                  </MenuListPopper>
                </React.Fragment>
              </main>
            </div>
          ) : (
            <IllustrationPlaceholder
              title="No folders yet"
              subtitle="Create your first folder to start using EIS"
              sourceImage={NoFoldersllustration}
              action={{
                label: 'New Folder',
                action: openNewFolderDialogHandler
              }}
            />
          )}
          <NewFolderDialog
            isOpen={isNewFolderDialogOpen}
            onClose={closeNewFolderDialogHandler}
            currentFolder={currentFolder}
            submitting={creatingFolder}
            onSubmit={onCreateFolder}
          />
        </React.Fragment>
      ) : (
        <LoadingIndicator />
      )}
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
