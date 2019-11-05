import React from 'react';

import useDialogState from '../../hooks/useDialogState';

import ItemDetails from './ItemDetails';
import EditItemDetailsDialogForm from './EditItemDetailsDialogForm';
import SectionPaper from '../UI/SectionPaper';

import { Edit as EditIcon } from '@material-ui/icons';

function ItemDetailsSection({ item, onUpdate, updating }) {
  const [
    isEditItemDetailsDialogOpen,
    openEditItemDetailsDialogHandler,
    closeEditItemDetailsDialogHandler
  ] = useDialogState(false);

  const updateItemDetailsHandler = async updatedItemData => {
    let thumbnails = [];
    let fileThumbnails = [];
    for (const thumbnail of updatedItemData.thumbnails) {
      if (thumbnail instanceof File) {
        fileThumbnails = fileThumbnails.concat(thumbnail);
      } else {
        thumbnails = thumbnails.concat(thumbnail);
      }
    }

    const modifiedFields = {
      name: updatedItemData.name,
      category: updatedItemData.category,
      condition: updatedItemData.condition,
      thumbnails: thumbnails
    };

    await onUpdate(modifiedFields, fileThumbnails, []);

    closeEditItemDetailsDialogHandler();
  };

  return (
    <SectionPaper
      title="Item Details"
      actionButton={{
        icon: <EditIcon />,
        action: openEditItemDetailsDialogHandler
      }}
    >
      <ItemDetails item={item} />
      <EditItemDetailsDialogForm
        isOpen={isEditItemDetailsDialogOpen}
        onClose={closeEditItemDetailsDialogHandler}
        item={item}
        onSubmit={updateItemDetailsHandler}
        submitting={updating}
      />
    </SectionPaper>
  );
}

export default ItemDetailsSection;
