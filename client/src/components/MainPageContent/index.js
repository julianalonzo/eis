import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useHistory, useParams } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import EmptyIllustration from '../../assets/illustrations/empty.svg';
import Folders from '../Folders';
import FolderMoreActionsPopper from '../Folders/FolderMoreActionsPopper';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';
import Items from '../Items';
import ItemMoreActionsMenuListPopper from '../Items/ItemMoreActionsMenuListPopper';
import NewButtonMenuListPopper from '../NewButtonMenuListPopper';
import NewFolderDialog from '../NewFolderDialog';
import MainPageToolBar from './MainPageToolBar';
import LoadingIndicator from '../UI/LoadingIndicator';

function MainPageContent({
  rootFolders,
  folder,
  onFetchFolder,
  fetchingFolder,
  onResetFolder,
  onCreateFolder,
  creatingFolder,
  onDeleteFolder,
  onDeleteItem
}) {
  const { folderId } = useParams();
  const history = useHistory();

  const [
    newButtonAnchorEl,
    openNewButtonHandler,
    closeNewButtonHandler
  ] = usePopperState(null);

  // Folder ID of the folder that has its more actions popper opened
  const [folderIdMoreActions, setFolderIdMoreActions] = useState(null);

  const [
    folderMoreActionsAnchorEl,
    openFolderMoreActionsHandler,
    closeFolderMoreActionsHandler
  ] = usePopperState(null);

  const [
    isNewFolderDialogOpen,
    openNewFolderDialogHandler,
    closeNewFolderDialogHandler
  ] = useDialogState(false);

  // Item ID of the item that has its more actions popper opened
  const [itemIdMoreActions, setItemIdMoreActions] = useState(null);

  const [
    itemMoreActionsAnchorEl,
    openItemMoreActionsHandler,
    closeItemMoreActionsHandler
  ] = usePopperState(null);

  const onOpenFolderMoreActions = (event, id) => {
    openFolderMoreActionsHandler(event.currentTarget);
    setFolderIdMoreActions(id);
  };

  const onCloseFolderMoreActions = () => {
    closeFolderMoreActionsHandler();
  };

  const onOpenItemMoreActions = (event, id) => {
    openItemMoreActionsHandler(event.currentTarget);
    setItemIdMoreActions(id);
  };

  const onCloseItemMoreActions = () => {
    closeItemMoreActionsHandler();
  };

  const createFolderHandler = async name => {
    await onCreateFolder({
      name: name,
      parent: folderId || ''
    });
  };

  const deleteFolderHandler = () => {
    onDeleteFolder(folderIdMoreActions);
  };

  const deleteItemHandler = () => {
    onDeleteItem(itemIdMoreActions);
  };

  const openFolderHandler = folderId => {
    history.push(`/folders/${folderId}`);
  };

  const openSelectTemplatePageHandler = () => {
    history.push(`/folders/${folderId}/select-template`);
  };

  const openItemDetailsPageHandler = itemId => {
    history.push(`/items/${itemId}`);
  };

  useEffect(() => {
    if (Boolean(folderId)) {
      onFetchFolder(folderId);
    } else {
      onResetFolder();
    }

    return () => {
      onResetFolder();
    };
  }, [folderId, onFetchFolder, onResetFolder]);

  let breadcrumbs;
  let folders;
  let items;

  if (!Boolean(folderId)) {
    folders = rootFolders;
    items = [];
    breadcrumbs = [];
  }

  if (Boolean(folderId) && (fetchingFolder || folder === null)) {
    return <LoadingIndicator />;
  }

  if (Boolean(folder)) {
    folders = folder.children;
    items = folder.items;
    breadcrumbs = folder.hierarchy.map(f => {
      return {
        link: `${f._id}`,
        label: f.name
      };
    });
  }

  return (
    <div>
      <MainPageToolBar
        onOpenNewButtonMenu={openNewButtonHandler}
        breadcrumbs={breadcrumbs}
      />
      <NewButtonMenuListPopper
        isOpen={Boolean(newButtonAnchorEl)}
        anchorEl={newButtonAnchorEl}
        onClose={closeNewButtonHandler}
        isInFolder={Boolean(folderId)}
        onOpenSelectTemplatePage={openSelectTemplatePageHandler}
        onOpenNewFolderDialog={openNewFolderDialogHandler}
      />
      {folders.length === 0 && items.length === 0 ? (
        <IllustrationPlaceholder
          title="This folder seems to be empty"
          subtitle="Add a new item or folder now"
          sourceImage={EmptyIllustration}
        />
      ) : (
        <div>
          <Folders
            folders={folders}
            onOpenFolder={openFolderHandler}
            onOpenFolderMoreActions={onOpenFolderMoreActions}
          />
          <FolderMoreActionsPopper
            isOpen={Boolean(folderMoreActionsAnchorEl)}
            anchorEl={folderMoreActionsAnchorEl}
            onClose={onCloseFolderMoreActions}
            onDeleteFolder={deleteFolderHandler}
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
            onDeleteItem={deleteItemHandler}
          />
        </div>
      )}
      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onClose={closeNewFolderDialogHandler}
        submitting={creatingFolder}
        onSubmit={createFolderHandler}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    folder: state.folder.folder,
    fetchingFolder: state.folder.fetchingFolder,
    creatingFolder: state.folder.creatingFolder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFolder: folderId => dispatch(actions.fetchFolder(folderId)),
    onResetFolder: () => dispatch(actions.resetFolder()),
    onCreateFolder: folder => dispatch(actions.createFolder(folder)),
    onDeleteFolder: folderId => dispatch(actions.deleteFolder(folderId)),
    onDeleteItem: itemId => dispatch(actions.deleteItem(itemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContent);
