import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import IllustrationPlaceholder from '../../components/UI/IllustrationPlaceholder';
import Items from '../../components/Items';
import FoldersTreeView from '../../components/FoldersTreeView';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import MenuListPopper from '../../components/UI/MenuListPopper';
import SelectFolderIllustration from '../../assets/illustrations/select_folder.svg';

import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

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
  onFetchFolders,
  folders,
  fetchingFolders,
  match: { params },
  history
}) {
  const [currentFolder, setCurrentFolder] = useState(params.folderId || '');
  const [itemMoreActionsAnchorEl, setItemMoreActionsAnchorEl] = useState(null);

  const openItemMoreActionsHandler = (event, id) => {
    setItemMoreActionsAnchorEl(event.currentTarget);
  };

  const closeItemMoreActionsHandler = () => {
    setItemMoreActionsAnchorEl(null);
  };

  const openFolderHandler = folderId => {
    setCurrentFolder(folderId);
  };

  const openSelectTemplatePageHandler = () => {
    history.push(`/folders/${currentFolder}/select-template`);
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

  let renderedView = (
    <IllustrationPlaceholder
      sourceImage={SelectFolderIllustration}
      title="You haven't selected a folder yet"
      subtitle="Choose a folder to view its items and subfolders"
    />
  );

  if (currentFolder !== '' && !fetchingItems) {
    renderedView = (
      <React.Fragment>
        <Items
          items={items}
          onOpenItemMoreActions={openItemMoreActionsHandler}
          onOpenNewItemHandler={openSelectTemplatePageHandler}
        />
        <MenuListPopper
          isOpen={Boolean(itemMoreActionsAnchorEl)}
          anchorEl={itemMoreActionsAnchorEl}
          onClose={closeItemMoreActionsHandler}
        >
          <MenuList>
            <MenuItem dense={true}>
              <Typography variant="body2">Delete Item</Typography>
            </MenuItem>
          </MenuList>
        </MenuListPopper>
      </React.Fragment>
    );
  } else if (fetchingItems) {
    renderedView = <LoadingIndicator />;
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
            {!fetchingFolders ? (
              <FoldersTreeView
                folders={folders}
                onOpenFolder={openFolderHandler}
                currentFolder={currentFolder}
              />
            ) : (
              <LoadingIndicator />
            )}
          </Drawer>
        </Hidden>
        <main className={classes.content}>{renderedView}</main>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    items: state.item.items,
    fetchingItems: state.item.fetchingItems,
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
