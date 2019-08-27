import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import Button from '../components/Button';
import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from '../components/IllustrationPlaceholder';
import ItemIllustration from '../assets/illustrations/item.svg';
import ItemDetailsForm from '../components/ItemDetailsForm';
import PropertiesIllustration from '../assets/illustrations/properties.svg';
import PropertiesForm from '../components/PropertiesForm';
import TemplateIllustration from '../assets/illustrations/template.svg';
import TemplateDetailsForm from '../components/TemplateDetailsForm';
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
    templateName: '',
    templateDescription: ''
  });

  const stepsLabels = [
    'Template',
    'Item',
    'Properties',
    'Attachments',
    'Notes'
  ];

  const formViews = [
    <TemplateDetailsForm templateDetailsData={templateDetails} />,
    <ItemDetailsForm />,
    <PropertiesForm />
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
    <Grid container>
      <Grid item md={6}>
        <IllustrationPlaceholder {...activeIllustrationProps} size="lg" />
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
        {formViews[activeStep]}
        <div className={classes.formActionButtons}>
          {activeStep > 0 ? (
            <Button margin={4} onClick={backStepHandler}>
              Back
            </Button>
          ) : null}
          <Button variant="contained" color="primary" onClick={nextStepHandler}>
            Next
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
