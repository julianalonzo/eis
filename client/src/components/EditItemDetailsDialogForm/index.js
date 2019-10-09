import React, { useEffect } from 'react';

import { Form } from 'react-final-form';

import useItemForm from '../../hooks/useItemForm';
import useThumbnailsForm from '../../hooks/useThumbnailsForm';

import Button from '../UI/Button';
import Dialog from '../UI/Dialog';
import DialogTitle from '../UI/Dialog/DialogTitle';
import DialogContent from '../UI/Dialog/DialogContent';
import DialogActions from '../UI/Dialog/DialogActions';
import ItemDetailsForm from '../ItemDetailsForm';

function EditItemDetailsDialogForm({ isOpen, onClose, item }) {
  const [itemDetailsForm, setItemDetailsForm] = useItemForm({
    itemName: item.name || '',
    itemCondition: item.condition || '',
    itemCategory: item.category || ''
  });

  const [
    thumbnailsForm,
    setThumbnailsForm,
    addThumbnailsHandler,
    removeThumbnailHandler
  ] = useThumbnailsForm(item.thumbnails || []);

  useEffect(() => {
    if (isOpen) {
      setItemDetailsForm({
        itemName: item.name || '',
        itemCondition: item.condition || '',
        itemCategory: item.category || ''
      });

      setThumbnailsForm(item.thumbnails || []);
    }
  }, [item, setItemDetailsForm, setThumbnailsForm, isOpen]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogTitle onClose={onClose}>Edit Item</DialogTitle>
      <DialogContent>
        <Form
          initialValues={itemDetailsForm}
          onSubmit={values => {
            console.log(values);
          }}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <ItemDetailsForm
                  thumbnails={thumbnailsForm}
                  onAddThumbnails={addThumbnailsHandler}
                  onRemoveThumbnail={removeThumbnailHandler}
                />
              </form>
            );
          }}
        ></Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditItemDetailsDialogForm;
