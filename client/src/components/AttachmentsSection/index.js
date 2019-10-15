import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import Attachments from './Attachments';
import AttachmentMoreActionsMenuListPopper from './Attachments/AttachmentMoreActionsMenuListPopper';
import NewAttachmentsDialogForm from './NewAttachmentsDialogForm';
import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';

function AttachmentsSection({
  attachments,
  itemId,
  onAddAttachments,
  addingAttachments,
  onRemoveAttachment
}) {
  const [activeAttachment, setActiveAttachment] = useState({});

  const [
    attachmentMoreActionsAnchorEl,
    onOpenAttachmentMoreActions,
    onCloseAttachmentMoreActions
  ] = usePopperState(null);

  const [
    isNewAttachmentsDialogOpen,
    openNewAttachmentsDialogHandler,
    closeNewAttachmentsDialogHandler
  ] = useDialogState(false);

  const openAttachmentMoreActionsHandler = (anchorEl, attachment) => {
    onOpenAttachmentMoreActions(anchorEl);
    setActiveAttachment(attachment);
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

  const removeAttachmentHandler = attachmentId => {
    onRemoveAttachment(itemId, attachmentId);
  };

  return (
    <>
      <SectionPaper
        title="Attachments"
        actionButton={{
          icon: <AddIcon />,
          action: openNewAttachmentsDialogHandler
        }}
      >
        <Attachments
          attachments={attachments.map(attachment => ({
            name: attachment.originalname,
            size: attachment.size,
            dateUploaded: attachment.dateUploaded,
            ...attachment
          }))}
          onOpenMoreActions={openAttachmentMoreActionsHandler}
        />
      </SectionPaper>
      <AttachmentMoreActionsMenuListPopper
        isOpen={Boolean(attachmentMoreActionsAnchorEl)}
        anchorEl={attachmentMoreActionsAnchorEl}
        onClose={onCloseAttachmentMoreActions}
        attachment={activeAttachment}
        onRemoveAttachment={removeAttachmentHandler}
      />
      <NewAttachmentsDialogForm
        isOpen={isNewAttachmentsDialogOpen}
        onClose={closeNewAttachmentsDialogHandler}
        onSubmit={addAttachmentsHandler}
        submitting={addingAttachments}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    addingAttachments: state.item.addingAttachments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddAttachments: addAttachmentsData =>
      dispatch(actions.addAttachments(addAttachmentsData)),
    onRemoveAttachment: (itemId, attachmentId) =>
      dispatch(actions.removeAttachment(itemId, attachmentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachmentsSection);
