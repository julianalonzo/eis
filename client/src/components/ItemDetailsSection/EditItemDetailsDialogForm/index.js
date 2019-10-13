import React, { useEffect } from 'react';

import { Form } from 'react-final-form';

import useThumbnailsForm from '../../../hooks/useThumbnailsForm';

import Button from '../../UI/Button';
import Dialog from '../../UI/Dialog';
import DialogTitle from '../../UI/Dialog/DialogTitle';
import DialogContent from '../../UI/Dialog/DialogContent';
import DialogActions from '../../UI/Dialog/DialogActions';
import ItemDetailsForm from '../../ItemDetailsForm';

function EditItemDetailsDialogForm({
  isOpen,
  onClose,
  item,
  onSubmit,
  submitting
}) {
  let editItemDetailsForm;

  const [
    thumbnailsForm,
    setThumbnailsForm,
    addThumbnailsHandler,
    removeThumbnailHandler
  ] = useThumbnailsForm(item.thumbnails || []);

  useEffect(() => {
    if (isOpen) {
      editItemDetailsForm.initialize({
        itemName: item.name || '',
        itemCondition: item.condition || '',
        itemCategory: item.category || ''
      });

      setThumbnailsForm(item.thumbnails || []);
    }
  }, [item, setThumbnailsForm, isOpen, editItemDetailsForm]);

  const submitHandler = values => {
    const updatedItemData = {
      ...values,
      thumbnails: thumbnailsForm
    };

    onSubmit(updatedItemData);
  };

  return (
    <Form
      onSubmit={values => {
        submitHandler(values);
      }}
      render={({ handleSubmit, form }) => {
        editItemDetailsForm = form;

        return (
          <form onSubmit={handleSubmit}>
            <Dialog isOpen={isOpen} onClose={onClose}>
              <DialogTitle onClose={onClose}>Edit Item</DialogTitle>
              <DialogContent>
                <ItemDetailsForm
                  thumbnails={thumbnailsForm}
                  onAddThumbnails={addThumbnailsHandler}
                  onRemoveThumbnail={removeThumbnailHandler}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save'}
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    />
  );
}

export default EditItemDetailsDialogForm;
