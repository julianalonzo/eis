import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import Attachments from '../../components/Attachments';
import AttachmentMoreActionsMenuListPopper from '../../components/Attachments/AttachmentMoreActionsMenuListPopper';
import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import NewAttachmentsDialogForm from '../../components/NewAttachmentsDialogForm';
import PropertiesSection from '../../components/PropertiesSection';
import SectionPaper from '../../components/UI/SectionPaper';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon } from '@material-ui/icons';

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
  onAddAttachments,
  onRemoveAttachment,
  addingAttachments,
  match: { params }
}) {
  const classes = useStyles();

  const [itemId, setItemId] = useState(params.itemId || null);

  const [
    attachmentMoreActionsAnchorEl,
    openAttachmentMoreActionsHandler,
    closeAttachmentMoreActionsHandler
  ] = usePopperState(null);

  // Attachment that has its more actions popper opened
  const [attachmentMoreActions, setAttachmentMoreActions] = useState(null);

  const [
    isNewAttachmentsDialogOpened,
    openNewAttachmentsDialogHandler,
    closeNewAttachmentsDialogHandler
  ] = useDialogState(false);

  const onOpenAttachmentMoreActions = (event, attachment) => {
    openAttachmentMoreActionsHandler(event.currentTarget);
    setAttachmentMoreActions(attachment);
  };

  const onCloseAttachmentMoreActions = () => {
    closeAttachmentMoreActionsHandler();
    setAttachmentMoreActions(null);
  };

  const addAttachmentsHandler = async attachments => {
    const formData = new FormData();

    formData.append('itemId', itemId);

    for (const attachment of attachments) {
      formData.append('fileAttachments', attachment);
    }

    await onAddAttachments(formData);

    closeNewAttachmentsDialogHandler();
  };

  const removeAttachmentHandler = async attachmentId => {
    await onRemoveAttachment(itemId, attachmentId);
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

  if (fetchingItem) {
    return <LoadingIndicator />;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={8} lg={6}>
        <Grid container>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <ItemDetailsSection item={item} />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <PropertiesSection properties={item.properties} itemId={item._id} />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <SectionPaper
              title="Attachments"
              actionButton={{
                icon: <AddIcon />,
                action: openNewAttachmentsDialogHandler
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
                onRemoveAttachment={removeAttachmentHandler}
              />
              <NewAttachmentsDialogForm
                isOpen={isNewAttachmentsDialogOpened}
                onClose={closeNewAttachmentsDialogHandler}
                onSubmit={addAttachmentsHandler}
                submitting={addingAttachments}
              />
            </SectionPaper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}></Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    item: state.item.item,
    fetchingItem: state.item.fetchingItem,
    addingProperty: state.item.addingProperty,
    updatingProperty: state.item.updatingProperty,
    removingProperty: state.item.removingProperty,
    addingAttachments: state.item.addingAttachments,
    removingAttachment: state.item.removingAttachment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItem: itemId => dispatch(actions.fetchItem(itemId)),
    onResetItem: () => dispatch(actions.resetItem()),
    onAddProperty: (itemId, property) =>
      dispatch(actions.addProperty(itemId, property)),
    onUpdateProperty: (itemId, property) =>
      dispatch(actions.updateProperty(itemId, property)),
    onRemoveProperty: (itemId, propertyId) =>
      dispatch(actions.removeProperty(itemId, propertyId)),
    onAddAttachments: addAttachmentsData =>
      dispatch(actions.addAttachments(addAttachmentsData)),
    onRemoveAttachment: (itemId, attachmentId) =>
      dispatch(actions.removeAttachment(itemId, attachmentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemDetailsPage));
