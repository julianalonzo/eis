import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import Attachments from '../../components/Attachments';
import AttachmentMoreActionsMenuListPopper from '../../components/Attachments/AttachmentMoreActionsMenuListPopper';
import EditItemDetailsDialogForm from '../../components/EditItemDetailsDialogForm';
import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import EditPropertyDialogForm from '../../components/EditPropertyDialogForm';
import NewPropertyDialogForm from '../../components/NewPropertyDialogForm';
import PropertyMoreActionsMenuListPopper from '../../components/PropertiesSection/PropertyMoreActionsMenuListPopper';
import PropertiesSection from '../../components/PropertiesSection';
import SectionPaper from '../../components/UI/SectionPaper';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon, Edit as EditIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  sectionGridItem: {
    marginBottom: theme.spacing(6)
  }
}));

function ItemDetailsPage({
  item,
  onFetchItem,
  fetchingItem,
  onResetItem,
  onUpdateItemDetails,
  onAddProperty,
  onUpdateProperty,
  onRemoveProperty,
  updatingItemDetails,
  addingProperty,
  updatingProperty,
  removingProperty,
  match: { params }
}) {
  const classes = useStyles();

  const [itemId, setItemId] = useState(params.itemId || null);

  const [
    isEditItemDetailsDialogOpened,
    openEditItemDetailsDialogHandler,
    closeEditItemDetailsDialogHandler
  ] = useDialogState(false);

  const [
    isNewPropertyDialogOpened,
    openNewPropertyDialogHandler,
    closeNewPropertyDialogHandler
  ] = useDialogState(false);

  const [
    isEditPropertyDialogOpened,
    openEditPropertyDialogHandler,
    closeEditPropertyDialogHandler
  ] = useDialogState(false);

  const [
    propertyMoreActionsAnchorEl,
    openPropertyMoreActionsHandler,
    closePropertyMoreActionsHandler
  ] = usePopperState(null);

  // Property that has its more actions popper opened
  const [propertyMoreActions, setPropertyMoreActions] = useState(null);

  // Property that is currently being edited
  const [propertyBeingEdited, setPropertyBeingEdited] = useState(null);

  const onOpenPropertyMoreActions = (event, property) => {
    openPropertyMoreActionsHandler(event.currentTarget);
    setPropertyMoreActions(property);
  };

  const onClosePropertyMoreActions = () => {
    closePropertyMoreActionsHandler();
    setPropertyMoreActions(null);
  };

  const onOpenEditPropertyDialog = property => {
    setPropertyBeingEdited(property);
    openEditPropertyDialogHandler();
    closePropertyMoreActionsHandler();
  };

  const [
    attachmentMoreActionsAnchorEl,
    openAttachmentMoreActionsHandler,
    closeAttachmentMoreActionsHandler
  ] = usePopperState(null);

  // Attachment that has its more actions popper opened
  const [attachmentMoreActions, setAttachmentMoreActions] = useState(null);

  const onOpenAttachmentMoreActions = (event, attachment) => {
    openAttachmentMoreActionsHandler(event.currentTarget);
    setAttachmentMoreActions(attachment);
  };

  const onCloseAttachmentMoreActions = () => {
    closeAttachmentMoreActionsHandler();
    setAttachmentMoreActions(null);
  };

  useEffect(() => {
    setItemId(params.itemId || null);
  }, [params]);

  useEffect(() => {
    onFetchItem(itemId);

    return () => {
      onResetItem();
    };
  }, [itemId, onFetchItem, onResetItem]);

  const updateItemDetailsHandler = async updatedItemData => {
    const formData = new FormData();

    formData.append('itemId', item._id);
    formData.append('name', updatedItemData.itemName);
    formData.append('category', updatedItemData.itemCategory || '');
    formData.append('condition', updatedItemData.itemCondition || '');

    let thumbnails = [];

    for (const thumbnail of updatedItemData.thumbnails) {
      if (thumbnail instanceof File) {
        formData.append('fileThumbnails', thumbnail);
      } else {
        thumbnails = thumbnails.concat(thumbnail._id);
      }
    }

    formData.append('thumbnails', JSON.stringify(thumbnails));

    await onUpdateItemDetails(formData);

    closeEditItemDetailsDialogHandler();
  };

  const addNewPropertyHandler = async property => {
    await onAddProperty(itemId, property);

    closeNewPropertyDialogHandler();
  };

  const updatePropertyHandler = async property => {
    setPropertyBeingEdited(property);

    await onUpdateProperty(itemId, property);

    closeEditPropertyDialogHandler();
  };

  const removePropertyHandler = async property => {
    await onRemoveProperty(itemId, property);

    closePropertyMoreActionsHandler();
  };

  if (fetchingItem) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={8} lg={6}>
          <Grid container>
            <Grid item xs={12} className={classes.sectionGridItem}>
              <SectionPaper
                title="Item Details"
                actionButton={{
                  icon: <EditIcon />,
                  action: openEditItemDetailsDialogHandler
                }}
              >
                <ItemDetailsSection item={item} />
              </SectionPaper>
              <EditItemDetailsDialogForm
                isOpen={isEditItemDetailsDialogOpened}
                onClose={closeEditItemDetailsDialogHandler}
                item={item}
                onSubmit={updateItemDetailsHandler}
                submitting={updatingItemDetails}
              />
            </Grid>
            <Grid item xs={12} className={classes.sectionGridItem}>
              <SectionPaper
                title="Properties"
                actionButton={{
                  icon: <AddIcon />,
                  action: openNewPropertyDialogHandler
                }}
              >
                <PropertiesSection
                  properties={item.properties}
                  onOpenPropertyMoreActions={onOpenPropertyMoreActions}
                />
                <PropertyMoreActionsMenuListPopper
                  isOpen={Boolean(propertyMoreActionsAnchorEl)}
                  anchorEl={propertyMoreActionsAnchorEl}
                  onClose={onClosePropertyMoreActions}
                  property={propertyMoreActions}
                  onOpenEditPropertyDialog={onOpenEditPropertyDialog}
                  onRemoveProperty={removePropertyHandler}
                />
                <NewPropertyDialogForm
                  isOpen={isNewPropertyDialogOpened}
                  onClose={closeNewPropertyDialogHandler}
                  onSubmit={addNewPropertyHandler}
                  submitting={addingProperty}
                />
                <EditPropertyDialogForm
                  isOpen={isEditPropertyDialogOpened}
                  onClose={closeEditPropertyDialogHandler}
                  onSubmit={updatePropertyHandler}
                  submitting={updatingProperty}
                  dialogTitle="Edit Property"
                  initialValues={
                    propertyBeingEdited
                      ? {
                          _id: propertyBeingEdited._id,
                          propertyName: propertyBeingEdited.name,
                          defaultValue: propertyBeingEdited.value
                        }
                      : {}
                  }
                />
              </SectionPaper>
            </Grid>
            <Grid item xs={12} className={classes.sectionGridItem}>
              <SectionPaper
                title="Attachments"
                actionButton={{
                  icon: <AddIcon />,
                  action: () => {}
                }}
              >
                <Attachments
                  attachments={item.attachments.map(attachment => ({
                    name: attachment.originalname,
                    size: attachment.size,
                    dateUploaded: attachment.dateUploaded,
                    ...attachment
                  }))}
                  primaryAction={onOpenAttachmentMoreActions}
                />
                <AttachmentMoreActionsMenuListPopper
                  isOpen={Boolean(attachmentMoreActionsAnchorEl)}
                  anchorEl={attachmentMoreActionsAnchorEl}
                  onClose={onCloseAttachmentMoreActions}
                  attachment={attachmentMoreActions}
                />
              </SectionPaper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    item: state.item.item,
    fetchingItem: state.item.fetchingItem,
    updatingItemDetails: state.item.updatingItemDetails,
    addingProperty: state.item.addingProperty,
    updatingProperty: state.item.updatingProperty,
    removingProperty: state.item.removingProperty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItem: itemId => dispatch(actions.fetchItem(itemId)),
    onResetItem: () => dispatch(actions.resetItem()),
    onUpdateItemDetails: updatedItemDetailsData =>
      dispatch(actions.updateItemDetails(updatedItemDetailsData)),
    onAddProperty: (itemId, property) =>
      dispatch(actions.addProperty(itemId, property)),
    onUpdateProperty: (itemId, property) =>
      dispatch(actions.updateProperty(itemId, property)),
    onRemoveProperty: (itemId, propertyId) =>
      dispatch(actions.removeProperty(itemId, propertyId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemDetailsPage));
