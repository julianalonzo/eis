import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useHistory, useParams } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';

import IllustrationPlaceholder from '../../components/UI/IllustrationPlaceholder';

import FoldersTreeView from '../../components/FoldersTreeView';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import MainPageContent from '../../components/MainPageContent';
import NewFolderDialog from '../../components/NewFolderDialog';
import NoFoldersllustration from '../../assets/illustrations/select_folder.svg';

import { makeStyles } from '@material-ui/styles';
import { Container, CssBaseline, Drawer, Hidden } from '@material-ui/core';

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
  onResetFolders
}) {
  const { folderId } = useParams();
  const history = useHistory();

  const [
    isNewFolderDialogOpen,
    openNewFolderDialogHandler,
    closeNewFolderDialogHandler
  ] = useDialogState(false);

  const openFolderHandler = folderId => {
    history.push(`/folders/${folderId}`);
  };

  const createFolderHandler = async name => {
    await onCreateFolder({
      name: name,
      parent: folderId
    });
  };

  useEffect(() => {
    onFetchFolders();

    return () => {
      onResetFolders();
    };
  }, [onFetchFolders, onResetFolders]);

  const classes = useStyles();

  if (fetchingFolders || folders === null) {
    return <LoadingIndicator />;
  }

  if (folders.length === 0) {
    return (
      <Container maxWidth="xl">
        <IllustrationPlaceholder
          title="No folders yet"
          subtitle="Create your first folder to start using EIS"
          sourceImage={NoFoldersllustration}
          action={{
            label: 'New Folder',
            action: openNewFolderDialogHandler
          }}
        />
        <NewFolderDialog
          isOpen={isNewFolderDialogOpen}
          onClose={closeNewFolderDialogHandler}
          submitting={creatingFolder}
          onSubmit={createFolderHandler}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
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
            />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <MainPageContent />
        </main>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    folders: state.folder.folders,
    fetchingFolders: state.folder.fetchingFolders,
    creatingFolder: state.folder.creatingFolder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFolders: () => dispatch(actions.fetchFolders()),
    onResetFolders: () => dispatch(actions.resetFolders()),
    onCreateFolder: folder => dispatch(actions.createFolder(folder))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
