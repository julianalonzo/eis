import React from 'react';

import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import useItemForm from '../../hooks/useItemForm';

import AttachmentsForm from '../AttachmentsForm';
import Button from '../UI/Button';
import FormPaper from '../UI/FormPaper';
import ItemDetailsForm from '../ItemDetailsForm';
import PropertiesForm from '../PropertiesForm';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pageHeading: {
    marginBottom: theme.spacing(4)
  },
  actionButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(4, 0)
  }
}));

export default function NewItemForm({ initialValues, onSubmit, submitting }) {
  const classes = useStyles();

  const [
    itemForm,
    addThumbnailsHandler,
    removeThumbnailHandler,
    addAttachmentsHandler,
    removeAttachmentHandler
  ] = useItemForm(initialValues);

  const submitHandler = values => {
    const itemData = {
      ...values,
      ...itemForm
    };

    onSubmit(itemData);
  };

  return (
    <Form
      initialValues={{ ...itemForm }}
      onSubmit={values => {
        submitHandler(values);
      }}
      mutators={{ ...arrayMutators }}
      render={({
        handleSubmit,
        form: {
          mutators: { push }
        }
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={2} />
              <Grid item xs={12} md={8} className={classes.formContainer}>
                <Typography variant="h5" className={classes.pageHeading}>
                  New Item
                </Typography>
                <FormPaper
                  title="Item Details"
                  subtitle="Item details describes the general information of an item. You can
          adopt your own naming system so that items can be distinguished from
          one another."
                >
                  <ItemDetailsForm
                    thumbnails={itemForm.thumbnails}
                    onAddThumbnails={addThumbnailsHandler}
                    onRemoveThumbnail={removeThumbnailHandler}
                  />
                </FormPaper>
                <FormPaper
                  title="Properties"
                  subtitle="Properties are custom fields that describes attributes of an item. For example, a laptop may have properties such as processor, storage capacity, and price. There's no one stopping you from adding any property you like, so go ahead!"
                >
                  <PropertiesForm onPropertyAdded={push} />
                </FormPaper>
                <FormPaper
                  title="Attachments"
                  subtitle="Attachments are relevant files of an item. These files may be software license, receipts, and images."
                >
                  <AttachmentsForm
                    attachments={itemForm.attachments}
                    onAddAttachments={addAttachmentsHandler}
                    onRemoveAttachment={removeAttachmentHandler}
                  />
                </FormPaper>
                <Box className={classes.actionButtonsContainer}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Saving Item...' : 'Save Item'}
                  </Button>
                </Box>
              </Grid>
              <Grid item md={2} />
            </Grid>
          </form>
        );
      }}
    />
  );
}
