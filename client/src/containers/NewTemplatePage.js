import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

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

function NewTemplatePage({ onCreateTemplate, loading }) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [templateDetails, setTemplateDetails] = useState({
    templateName: '',
    templateDescription: ''
  });
  const [itemDetails, setItemDetails] = useState({
    itemName: '',
    itemCategory: '',
    itemCondition: ''
  });

  const [thumbnails, setThumbnails] = useState([]);

  const [properties, setProperties] = useState({
    properties: []
  });

  const [attachments, setAttachments] = useState({
    attachments: []
  });

  const stepsLabels = ['Template', 'Item', 'Properties', 'Attachments'];

  const saveTemplateDetails = values => {
    setTemplateDetails(previousTemplateDetails => {
      return {
        ...previousTemplateDetails,
        ...values
      };
    });
  };

  const saveItemDetails = values => {
    setItemDetails(previousItemDetails => {
      return { ...previousItemDetails, ...values };
    });
  };

  const saveProperties = values => {
    setProperties(previousProperties => {
      return { ...previousProperties, ...values };
    });
  };

  const saveAttachments = values => {
    // This is necessary for having a consistent process in the stepper
  };

  const addThumbnails = values => {
    setThumbnails(previousThumbnails => {
      return previousThumbnails.concat(...values);
    });
  };

  const removeThumbnail = thumbnailIndex => {
    setThumbnails(previousThumbnails => {
      return previousThumbnails.filter(
        (thumbnail, index) => index !== thumbnailIndex
      );
    });
  };

  const addAttachments = values => {
    setAttachments(previousAttachments => {
      return {
        ...previousAttachments,
        attachments: [...previousAttachments.attachments].concat(...values)
      };
    });
  };

  const removeAttachment = attachmentIndex => {
    setAttachments(previousAttachments => {
      return {
        ...previousAttachments,
        attachments: [...previousAttachments.attachments].filter(
          (attachment, index) => index !== attachmentIndex
        )
      };
    });
  };

  const createTemplate = () => {
    const formData = new FormData();
    formData.append('name', templateDetails.templateName);
    formData.append('description', templateDetails.templateDescription);
    formData.append(
      'item',
      JSON.stringify({
        name: itemDetails.itemName,
        category: itemDetails.itemCategory,
        condition: itemDetails.itemCondition
      })
    );

    for (let i = 0; i < thumbnails.length; i++) {
      formData.append('thumbnails', thumbnails[i]);
    }

    for (let i = 0; i < properties.properties.length; i++) {
      formData.append(
        'properties',
        JSON.stringify({
          name: properties.properties[i].name,
          value: properties.properties[i].value
            ? properties.properties[i].value
            : ''
        })
      );
    }

    for (let i = 0; i < attachments.attachments.length; i++) {
      formData.append('attachments', attachments.attachments[i]);
    }

    onCreateTemplate(formData);
  };

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
      onSubmit={values => {
        if (activeStep < stepsLabels.length - 1) {
          formActions[activeStep](values);
          nextStepHandler();
        } else {
          createTemplate();
        }
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
                {activeStep === 0 && <TemplateDetailsForm />}
                {activeStep === 1 && (
                  <ItemDetailsForm
                    thumbnails={thumbnails}
                    onAddThumbnails={addThumbnails}
                    onRemoveThumbnail={removeThumbnail}
                  />
                )}
                {activeStep === 2 && <PropertiesForm onPropertyAdded={push} />}
                {activeStep === 3 && (
                  <AttachmentsForm
                    attachments={attachments.attachments}
                    onAddAttachments={addAttachments}
                    onRemoveAttachment={removeAttachment}
                  />
                )}
                <div className={classes.formActionButtons}>
                  {activeStep > 0 ? (
                    <Button
                      margin={4}
                      onClick={() => {
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

const mapStateToProps = state => {
  return {
    loading: state.template.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateTemplate: template => {
      dispatch(actions.createTemplate(template));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTemplatePage);
