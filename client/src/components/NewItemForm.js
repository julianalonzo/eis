import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import Button from './Button';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from '../components/IllustrationPlaceholder';
import ItemDetailsForm from './ItemDetailsForm';
import ItemIllustration from '../assets/illustrations/item.svg';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles(theme => ({
  formContainer: {
    padding: theme.spacing(3, 8)
  },
  formActionContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}));

export default function NewItemForm({ initialValues }) {
  const classes = useStyles();

  const [stepperActiveStep, setStepperActiveStep] = useState(0);

  const [formValues, setFormValues] = useState({
    itemName: initialValues.item.name || '',
    itemCategory: initialValues.item.category || '',
    itemCondition: initialValues.item.condition || ''
  });

  const [thumbnails, setThumbnails] = useState(
    initialValues.item.thumbnails || []
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

  const formIllustrations = [
    {
      headerText: 'Item details',
      headerSubText: 'Name and describe your item',
      sourceImage: ItemIllustration
    }
  ];

  const stepLabels = ['Item', 'Properties', 'Attachments'];

  const lastStep = stepLabels.length - 1;

  return (
    <Form
      initialValues={{ ...formValues }}
      onSubmit={values => {}}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={6}>
                <IllustrationPlaceholder
                  {...formIllustrations[stepperActiveStep]}
                  size="lg"
                />
              </Grid>
              <Grid item md={6} className={classes.formContainer}>
                <Box>
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
                <Box className={classes.formActionContainer}>
                  {stepperActiveStep > 0 && <Button margin={4}>Back</Button>}
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
