import { useState, useEffect } from 'react';

function useItemForm(initialValues) {
  const [itemForm, setItemForm] = useState({
    itemName: initialValues.itemName || '',
    itemCategory: initialValues.itemCategory || '',
    itemCondition: initialValues.itemCondition || '',
    properties: initialValues.properties || [],
    thumbnails: initialValues.thumbnails || [],
    attachments: initialValues.attachments || []
  });

  useEffect(() => {
    setItemForm({
      itemName: initialValues.itemName || '',
      itemCategory: initialValues.itemCategory || '',
      itemCondition: initialValues.itemCondition || '',
      properties: initialValues.properties || [],
      thumbnails: initialValues.thumbnails || [],
      attachments: initialValues.attachments || []
    });
  }, [initialValues]);

  const addThumbnailsHandler = thumbnails => {
    setItemForm(previousItemForm => {
      return {
        ...previousItemForm,
        thumbnails: previousItemForm.thumbnails.concat(thumbnails)
      };
    });
  };

  const removeThumbnailHandler = thumbnailIndex => {
    setItemForm(previousItemForm => {
      return {
        ...previousItemForm,
        thumbnails: previousItemForm.thumbnails.filter(
          (thumbnail, index) => index !== thumbnailIndex
        )
      };
    });
  };

  const addAttachmentsHandler = attachments => {
    setItemForm(previousItemForm => {
      return {
        ...previousItemForm,
        attachments: previousItemForm.attachments.concat(attachments)
      };
    });
  };

  const removeAttachmentHandler = attachmentIndex => {
    setItemForm(previousItemForm => {
      return {
        ...previousItemForm,
        attachments: previousItemForm.attachments.filter(
          (attachment, index) => index !== attachmentIndex
        )
      };
    });
  };

  return [
    itemForm,
    addThumbnailsHandler,
    removeThumbnailHandler,
    addAttachmentsHandler,
    removeAttachmentHandler
  ];
}

export default useItemForm;
