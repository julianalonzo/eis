import React from 'react';

import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import useThumbnailsForm from '../../hooks/useThumbnailsForm';
import useAttachmentsForm from '../../hooks/useAttachmentsForm';

import AttachmentsForm from '../AttachmentsForm';
import Button from '../UI/Button';
import FormPaper from '../UI/FormPaper';
import ItemDetailsForm from '../ItemDetailsForm';
import PropertiesForm from '../PropertiesForm';
import TemplateDetailsForm from '../TemplateDetailsForm';

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

export default function NewTemplateForm({ onSubmit, submitting }) {
  const classes = useStyles();

  const [
    thumbnailsForm,
    addThumbnailsHandler,
    removeThumbnailHandler
  ] = useThumbnailsForm([]);

  const [
    attachmentsForm,
    addAttachmentsHandler,
    removeAttachmentHandler
  ] = useAttachmentsForm([]);

  const submitHandler = values => {
    const templateData = {
      ...values,
      properties: values.properties || [],
      thumbnails: thumbnailsForm || [],
      attachments: attachmentsForm || []
    };

    onSubmit(templateData);
  };

  return (
    <Form
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
                <Typography variant="h6" className={classes.pageHeading}>
                  New Template
                </Typography>
                <FormPaper
                  title="Template Details"
                  subtitle="Name and describe your template to set the template apart from other templates"
                >
                  <TemplateDetailsForm />
                </FormPaper>
                <FormPaper
                  title="Item Details"
                  subtitle="Item details describes the general information of an item. You can
          adopt your own naming system so that items can be distinguished from
          one another."
                >
                  <ItemDetailsForm
                    thumbnails={thumbnailsForm}
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
                    attachments={attachmentsForm}
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
                    {submitting ? 'Saving Template...' : 'Save Template'}
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
