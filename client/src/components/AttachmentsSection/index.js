import React, { useState } from 'react';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import Attachments from './Attachments';
import AttachmentMoreActionsMenuListPopper from './Attachments/AttachmentMoreActionsMenuListPopper';
import NewAttachmentsDialogForm from './NewAttachmentsDialogForm';
import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';

function AttachmentsSection({ attachments, onUpdateItem, updatingItem }) {
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
    await onUpdateItem({}, [], attachments);

    closeNewAttachmentsDialogHandler();
  };

  const removeAttachmentHandler = attachmentId => {
    const updatedAttachments = attachments.filter(
      attachment => attachment._id !== attachmentId
    );

    onUpdateItem({ attachments: updatedAttachments }, [], []);
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
        submitting={updatingItem}
      />
    </>
  );
}

export default AttachmentsSection;
