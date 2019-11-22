import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useHistory, useParams } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import EmptyIllustration from '../../assets/illustrations/empty.svg';
import Folders from './Folders';
import FolderMoreActionsPopper from './Folders/FolderMoreActionsPopper';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';
import Items from './Items';
import ItemMoreActionsMenuListPopper from './Items/ItemMoreActionsMenuListPopper';
import LoadingIndicator from '../UI/LoadingIndicator';
import MainPageToolBar from './MainPageToolBar';
import MoveDialog from '../MoveDialog';
import NewButtonMenuListPopper from '../NewButtonMenuListPopper';
import NewFolderDialog from '../NewFolderDialog';

import Hidden from '@material-ui/core/Hidden';
import NewButtonSpeedDial from './NewButtonSpeedDial';

function MainPageContent({
  folders,
  folder,
  onFetchFolder,
  fetchingFolder,
  onResetFolder,
  onCreateFolder,
  creatingFolder,
  onDeleteFolder,
  onMoveFolder,
  movingFolder,
  onDeleteItem,
  onMoveItem,
  movingItem
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

  const [
    isMoveFolderDialogOpen,
    openMoveFolderDialogHandler,
    closeMoveFolderDialogHandler
  ] = useDialogState(false);

  const [
    isMoveItemDialogOpen,
    openMoveItemDialogHandler,
    closeMoveItemDialogHandler
  ] = useDialogState(false);

  const [
    isNewButtonSpeedDialOpen,
    setIsNewButtonSpeedDialOpen
  ] = React.useState(false);

  const openNewButtonSpeedDialHandler = () => {
    setIsNewButtonSpeedDialOpen(true);
  };

  const closeNewButtonSpeedDialHandler = () => {
    setIsNewButtonSpeedDialOpen(false);
  };

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

  const moveFolderHandler = async folderDestination => {
    await onMoveFolder(
      folderIdMoreActions,
      folderDestination ? folderDestination._id : null
    );
  };

  const moveItemHandler = async folderDestination => {
    await onMoveItem(itemIdMoreActions, folderDestination._id);
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
  let folderChildren;
  let items;

  if (!Boolean(folderId)) {
    folderChildren = folders.filter(folder => folder.parent === null);
    items = [];
    breadcrumbs = [];
  }

  if (Boolean(folderId) && (fetchingFolder || folder === null)) {
    return <LoadingIndicator />;
  }

  if (Boolean(folder)) {
    folderChildren = folder.children;
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
      <Hidden mdUp>
        <NewButtonSpeedDial
          isOpen={isNewButtonSpeedDialOpen}
          onOpen={openNewButtonSpeedDialHandler}
          onClose={closeNewButtonSpeedDialHandler}
          isInFolder={Boolean(folderId)}
          onOpenSelectTemplatePage={openSelectTemplatePageHandler}
          onOpenNewFolderDialog={openNewFolderDialogHandler}
        />
      </Hidden>
      <NewButtonMenuListPopper
        isOpen={Boolean(newButtonAnchorEl)}
        anchorEl={newButtonAnchorEl}
        onClose={closeNewButtonHandler}
        isInFolder={Boolean(folderId)}
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
        <div>
          <Folders
            folders={folderChildren}
            onOpenFolder={openFolderHandler}
            onOpenFolderMoreActions={onOpenFolderMoreActions}
          />
          <FolderMoreActionsPopper
            isOpen={Boolean(folderMoreActionsAnchorEl)}
            anchorEl={folderMoreActionsAnchorEl}
            onClose={onCloseFolderMoreActions}
            onDeleteFolder={deleteFolderHandler}
            onOpenMoveFolderDialog={openMoveFolderDialogHandler}
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
            onOpenMoveItemDialog={openMoveItemDialogHandler}
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
      {/* Move item dialog */}
      <MoveDialog
        title="Move Item"
        isOpen={isMoveItemDialogOpen}
        onClose={closeMoveItemDialogHandler}
        onSubmit={moveItemHandler}
        submitting={movingItem}
        options={folders.filter(folder => folder._id !== folderId)}
        isRequired
      />
      {/* Move folder dialog */}
      <MoveDialog
        title="Move Folder"
        isOpen={isMoveFolderDialogOpen}
        onClose={closeMoveFolderDialogHandler}
        onSubmit={moveFolderHandler}
        submitting={movingFolder}
        options={folders.filter(
          f =>
            f.hierarchy.findIndex(fh => fh._id === folderIdMoreActions) < 0 &&
            f._id !== folderId
        )}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    folders: state.folder.folders,
    folder: state.folder.folder,
    fetchingFolder: state.folder.fetchingFolder,
    creatingFolder: state.folder.creatingFolder,
    movingFolder: state.folder.movingFolder,
    movingItem: state.folder.movingItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFolder: folderId => dispatch(actions.fetchFolder(folderId)),
    onResetFolder: () => dispatch(actions.resetFolder()),
    onCreateFolder: folder => dispatch(actions.createFolder(folder)),
    onDeleteFolder: folderId => dispatch(actions.deleteFolder(folderId)),
    onMoveFolder: (folderId, folderDestination) =>
      dispatch(actions.moveFolder(folderId, folderDestination)),
    onDeleteItem: itemId => dispatch(actions.deleteItem(itemId)),
    onMoveItem: (itemId, folderDestination) =>
      dispatch(actions.moveItem(itemId, folderDestination))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContent);
