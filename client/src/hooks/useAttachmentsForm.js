import { useState } from 'react';

function useAttachmentsForm(initialValue) {
  const [attachmentsForm, setAttachmentsForm] = useState(initialValue || []);

  const addAttachmentsHandler = attachments => {
    setAttachmentsForm(previousAttachments => {
      return previousAttachments.concat(attachments);
    });
  };

  const removeAttachmentHandler = attachmentIndex => {
    setAttachmentsForm(previousAttachments => {
      return previousAttachments.filter(
        (attachment, index) => index !== attachmentIndex
      );
    });
  };

  return [attachmentsForm, addAttachmentsHandler, removeAttachmentHandler];
}

export default useAttachmentsForm;
