import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { useHistory, useParams } from "react-router-dom";

import useDialogState from "../../hooks/useDialogState";
import usePopperState from "../../hooks/usePopperState";

import EmptyIllustration from "../../assets/illustrations/empty.svg";
import Folders from "./Folders";
import FolderMoreActionsPopper from "./Folders/FolderMoreActionsPopper";
import IllustrationPlaceholder from "../UI/IllustrationPlaceholder";
import Items from "./Items";
import ItemMoreActionsMenuListPopper from "./Items/ItemMoreActionsMenuListPopper";
import LoadingIndicator from "../UI/LoadingIndicator";
import MainPageToolBar from "./MainPageToolBar";
import MoveDialog from "../MoveDialog";
import NewButtonMenuListPopper from "../NewButtonMenuListPopper";
import NewFolderDialog from "../NewFolderDialog";

function MainPageContent({
  folders,
  folder,
  onFetchFolder,
  fetchingFolder,
  onResetFolder,
  onCreateFolder,
  creatingFolder,
  onDeleteFolder,
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
    isMoveDialogOpen,
    openMoveDialogHandler,
    closeMoveDialogHandler
  ] = useDialogState(false);

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
      parent: folderId || ""
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

  const moveItemHandler = async folderDestination => {
    await onMoveItem(itemIdMoreActions, { folder: folderDestination._id });
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
            onOpenMoveItemDialog={openMoveDialogHandler}
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
      <MoveDialog
        isOpen={isMoveDialogOpen}
        onClose={closeMoveDialogHandler}
        onSubmit={moveItemHandler}
        submitting={movingItem}
        folders={folders}
        currentFolder={folder}
        isRequired
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    folder: state.folder.folder,
    fetchingFolder: state.folder.fetchingFolder,
    creatingFolder: state.folder.creatingFolder,
    movingItem: state.folder.movingItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFolder: folderId => dispatch(actions.fetchFolder(folderId)),
    onResetFolder: () => dispatch(actions.resetFolder()),
    onCreateFolder: folder => dispatch(actions.createFolder(folder)),
    onDeleteFolder: folderId => dispatch(actions.deleteFolder(folderId)),
    onDeleteItem: itemId => dispatch(actions.deleteItem(itemId)),
    onMoveItem: (itemId, folderDestination) =>
      dispatch(actions.moveItem(itemId, folderDestination))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContent);
