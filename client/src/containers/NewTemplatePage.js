import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import arrayMutators from 'final-form-arrays';
import AttachmentsForm from '../components/AttachmentsForm';
import Button from '../components/Button';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from '../components/IllustrationPlaceholder';
import ItemIllustration from '../assets/illustrations/item.svg';
import ItemDetailsForm from '../components/ItemDetailsForm';
import PropertiesIllustration from '../assets/illustrations/properties.svg';
import PropertiesForm from '../components/PropertiesForm';
import TemplateIllustration from '../assets/illustrations/template.svg';
import TemplateDetailsForm from '../components/TemplateDetailsForm';
import UploadIllustration from '../assets/illustrations/upload.svg';
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
  formActionButtons: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}));

export default function NewTemplatePage() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [templateDetails, setTemplateDetails] = useState({
    name: '',
    description: ''
  });
  const [itemDetails, setItemDetails] = useState({
    name: '',
    category: '',
    condition: '',
    thumbnails: []
  });

  const [properties, setProperties] = useState({
    properties: []
  });

  const [attachments, setAttachments] = useState({
    attachments: []
  });

  const stepsLabels = ['Template', 'Item', 'Properties', 'Attachments'];

  const saveTemplateDetails = values => {
    setTemplateDetails({
      ...templateDetails,
      ...values
    });
  };

  const saveItemDetails = values => {
    setItemDetails({ ...itemDetails, ...values });
  };

  const saveProperties = values => {
    setProperties({ ...properties, ...values });
  };

  const saveAttachments = values => {
    // This is necessary for having a consistent process in the stepper
  };

  const addAttachments = values => {
    setAttachments({
      ...attachments,
      attachments: [...attachments.attachments].concat(...values)
    });
  };

  const removeAttachment = attachmentIndex => {
    setAttachments({
      ...attachments,
      attachments: [...attachments.attachments].filter(
        (attachment, index) => index !== attachmentIndex
      )
    });
  };

  const formInitialState = [
    templateDetails,
    itemDetails,
    properties,
    attachments
  ];

  const formActions = [
    saveTemplateDetails,
    saveItemDetails,
    saveProperties,
    saveAttachments
  ];

  const formIllustration = [
    {
      headerText: 'Template details',
      headerSubText: 'Name and describe your template',
      sourceImage: TemplateIllustration
    },
    {
      headerText: 'Item details',
      headerSubText: 'Name and describe your item',
      sourceImage: ItemIllustration
    },
    {
      headerText: 'Properties',
      headerSubText: 'Add custom fields for your item',
      sourceImage: PropertiesIllustration
    },
    {
      headerText: 'Attachments',
      headerSubText: 'Add relevant attachments to your item',
      sourceImage: UploadIllustration
    }
  ];

  const nextStepHandler = () => {
    setActiveStep(previousStep => previousStep + 1);
  };

  const backStepHandler = () => {
    setActiveStep(previousStep => previousStep - 1);
  };

  const activeIllustrationProps = formIllustration[activeStep];

  return (
    <Form
      initialValues={formInitialState[activeStep]}
      onSubmit={values => {
        formActions[activeStep](values);
        nextStepHandler();
      }}
      mutators={{ ...arrayMutators }}
      render={({
        handleSubmit,
        values,
        form: {
          mutators: { push },
          change
        }
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={6}>
                <IllustrationPlaceholder
                  {...activeIllustrationProps}
                  size="lg"
                />
              </Grid>
              <Grid item md={6} className={classes.formContainer}>
                <div className={classes.stepperContainer}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {stepsLabels.map(stepLabel => {
                      return (
                        <Step key={stepLabel}>
                          <StepLabel>{stepLabel}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </div>
                {activeStep === 0 && (
                  <TemplateDetailsForm templateDetails={templateDetails} />
                )}
                {activeStep === 1 && (
                  <ItemDetailsForm itemDetails={itemDetails} />
                )}
                {activeStep === 2 && <PropertiesForm onPropertyAdded={push} />}
                {activeStep === 3 && (
                  <AttachmentsForm
                    attachments={attachments.attachments}
                    onUploadChange={change}
                    onAddAttachments={addAttachments}
                    onRemoveAttachment={removeAttachment}
                  />
                )}
                <div className={classes.formActionButtons}>
                  {activeStep > 0 ? (
                    <Button
                      margin={4}
                      onClick={() => {
                        formActions[activeStep](values);
                        backStepHandler();
                      }}
                    >
                      Back
                    </Button>
                  ) : null}
                  {activeStep < stepsLabels.length - 1 ? (
                    <Button variant="contained" color="primary" type="submit">
                      Next
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" type="submit">
                      Finish
                    </Button>
                  )}
                </div>
              </Grid>
            </Grid>
          </form>
        );
      }}
    />
  );
}
