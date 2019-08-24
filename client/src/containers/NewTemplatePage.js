import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import ButtonLink from '../components/ButtonLink';
import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from '../components/IllustrationPlaceholder';
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

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item md={6}>
        <IllustrationPlaceholder
          headerText="About the template"
          headerSubText="Name and describe your template"
          size="lg"
          sourceImage={TemplateIllustration}
        />
      </Grid>
      <Grid item md={6} className={classes.formContainer}>
        <div className={classes.stepperContainer}>
          <Stepper alternativeLabel>
            {stepsLabels.map(stepLabel => {
              return (
                <Step key={stepLabel}>
                  <StepLabel>{stepLabel}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <TemplateDetailsForm
          templateDetailsData={templateDetails}
        ></TemplateDetailsForm>
        <div className={classes.formActionButtons}>
          <ButtonLink marginRight={48}>Back</ButtonLink>
          <PrimaryButton label="Continue" />
        </div>
      </Grid>
    </Grid>
  );
}
