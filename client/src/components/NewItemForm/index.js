import React, { useState } from 'react';

import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';

import AttachmentsForm from '../AttachmentsForm';
import AttachmentsIllustration from '../../assets/illustrations/upload.svg';
import Button from '../UI/Button';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';
import ItemDetailsForm from '../ItemDetailsForm';
import ItemIllustration from '../../assets/illustrations/item.svg';
import PropertiesForm from '../PropertiesForm';
import PropertiesIllustration from '../../assets/illustrations/properties.svg';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles(theme => ({
  formContainer: {
    padding: theme.spacing(3, 8)
  },
  stepperContainer: {
    marginBottom: theme.spacing(5)
  },
  formActionContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  illustrationContainer: {
    marginTop: '10vh'
  }
}));

export default function NewItemForm({ initialValues, onSubmit }) {
  const classes = useStyles();

  const [stepperActiveStep, setStepperActiveStep] = useState(0);

  const [formValues] = useState({
    itemName: initialValues.item.name || '',
    itemCategory: initialValues.item.category || '',
    itemCondition: initialValues.item.condition || '',
    properties: initialValues.properties || []
  });

  const [thumbnails, setThumbnails] = useState(
    initialValues.item.thumbnails || []
  );

  const [attachments, setAttachments] = useState(
    initialValues.attachments || []
  );

  const addThumbnailsHandler = thumbnails => {
    setThumbnails(previousThumbnails => {
      return previousThumbnails.concat(thumbnails);
    });
  };

  const removeThumbnailHandler = thumbnailIndex => {
    setThumbnails(previousThumbnails => {
      return previousThumbnails.filter(
        (thumbnail, index) => index !== thumbnailIndex
      );
    });
  };

  const addAttachmentsHandler = attachments => {
    setAttachments(previousAttachments => {
      return previousAttachments.concat(attachments);
    });
  };

  const removeAttachmentHandler = attachmentIndex => {
    setAttachments(previousAttachments => {
      return previousAttachments.filter(
        (attachment, index) => index !== attachmentIndex
      );
    });
  };

  const formIllustrations = [
    {
      title: 'Item details',
      subtitle: 'Name and describe your item',
      sourceImage: ItemIllustration
    },
    {
      title: 'Properties',
      subtitle: 'Add custom fields for your item',
      sourceImage: PropertiesIllustration
    },
    {
      title: 'Attachments',
      subtitle: 'Add relevant attachments to your item',
      sourceImage: AttachmentsIllustration
    }
  ];

  const stepLabels = ['Item', 'Properties', 'Attachments'];

  const lastStep = stepLabels.length - 1;

  const nextStepHandler = () => {
    setStepperActiveStep(previousStepperActiveStep => {
      return previousStepperActiveStep + 1;
    });
  };

  const backStepHandler = () => {
    setStepperActiveStep(previousStepperActiveStep => {
      return previousStepperActiveStep - 1;
    });
  };

  const submitHandler = values => {
    if (stepperActiveStep === lastStep) {
      const itemData = {
        ...values,
        thumbnails,
        attachments
      };

      onSubmit(itemData);
    } else {
      nextStepHandler();
    }
  };

  return (
    <Form
      initialValues={{ ...formValues }}
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
              <Grid item md={6} className={classes.illustrationContainer}>
                <IllustrationPlaceholder
                  {...formIllustrations[stepperActiveStep]}
                  size="lg"
                  variant="illustration"
                />
              </Grid>
              <Grid item md={6} className={classes.formContainer}>
                <Box className={classes.stepperContainer}>
                  <Stepper activeStep={stepperActiveStep} alternativeLabel>
                    {stepLabels.map(stepLabel => {
                      return (
                        <Step key={stepLabel}>
                          <StepLabel>{stepLabel}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Box>
                {stepperActiveStep === 0 && (
                  <ItemDetailsForm
                    thumbnails={thumbnails}
                    onAddThumbnails={addThumbnailsHandler}
                    onRemoveThumbnail={removeThumbnailHandler}
                  />
                )}
                {stepperActiveStep === 1 && (
                  <PropertiesForm onPropertyAdded={push} />
                )}
                {stepperActiveStep === 2 && (
                  <AttachmentsForm
                    attachments={attachments}
                    onAddAttachments={addAttachmentsHandler}
                    onRemoveAttachment={removeAttachmentHandler}
                  />
                )}
                <Box className={classes.formActionContainer}>
                  {stepperActiveStep > 0 && (
                    <Button onClick={backStepHandler} margin={4}>
                      Back
                    </Button>
                  )}
                  <Button variant="contained" color="primary" type="submit">
                    {stepperActiveStep < lastStep ? 'Next' : 'Finish'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        );
      }}
    />
  );
}
