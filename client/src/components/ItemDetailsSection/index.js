import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import useDialogState from '../../hooks/useDialogState';

import ItemDetails from '../ItemDetails';
import EditItemDetailsDialogForm from '../EditItemDetailsDialogForm';
import SectionPaper from '../UI/SectionPaper';

import { Edit as EditIcon } from '@material-ui/icons';

function ItemDetailsSection({
  item,
  onUpdateItemDetails,
  updatingItemDetails
}) {
  const [
    isEditItemDetailsDialogOpen,
    openEditItemDetailsDialogHandler,
    closeEditItemDetailsDialogHandler
  ] = useDialogState(false);

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
        submitting={updatingItemDetails}
      />
    </SectionPaper>
  );
}

const mapStateToProps = state => {
  return {
    updatingItemDetails: state.item.updatingItemDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateItemDetails: itemDetails =>
      dispatch(actions.updateItemDetails(itemDetails))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailsSection);
