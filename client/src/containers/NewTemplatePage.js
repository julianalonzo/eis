import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import ButtonLink from '../components/ButtonLink';
import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from '../components/IllustrationPlaceholder';
import ItemIllustration from '../assets/illustrations/item.svg';
import ItemDetailsForm from '../components/ItemDetailsForm';
import PrimaryButton from '../components/PrimaryButton';
import TemplateIllustration from '../assets/illustrations/template.svg';
import TemplateDetailsForm from '../components/TemplateDetailsForm';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles({
  formContainer: {
    padding: '24px 64px'
  },
  stepperContainer: {
    marginBottom: '36px'
  },
  formActionButtons: {
    marginTop: '64px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

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
    <ItemDetailsForm />
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
            <ButtonLink marginRight={48} action={backStepHandler}>
              Back
            </ButtonLink>
          ) : null}
          <PrimaryButton label="Continue" action={nextStepHandler} />
        </div>
      </Grid>
    </Grid>
  );
}
