import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useParams } from 'react-router-dom';

import AttachmentsSection from '../../components/AttachmentsSection';
import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import PropertiesSection from '../../components/PropertiesSection';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  sectionGridItem: {
    marginBottom: theme.spacing(6)
  },
  smallLink: {
    textDecoration: 'underline',
    color: theme.palette.text.hint,
    '&:hover': {
      color: theme.palette.grey[800],
      cursor: 'pointer'
    }
  }
}));

function TemplatePage({
  template,
  onFetchTemplate,
  fetchingTemplate,
  onUpdateTemplate,
  updatingTemplate,
  onResetTemplate
}) {
  const classes = useStyles();
  const { templateId } = useParams();

  useEffect(() => {
    onFetchTemplate(templateId);

    return () => {
      onResetTemplate();
    };
  }, [templateId, onFetchTemplate, onResetTemplate]);

  const updateTemplateHandler = async (
    modifiedFields,
    newThumbnails,
    newAttachments
  ) => {
    const updatedTemplate = {
      templateName: modifiedFields.templateName
        ? modifiedFields.templateName
        : template.name,
      templateDescription: modifiedFields.templateDescription
        ? modifiedFields.templateDescription
        : template.description,
      item: {
        ...template.item,
        ...modifiedFields
      }
    };

    const formData = new FormData();

    const thumbnailIds = updatedTemplate.item.thumbnails.map(
      thumbnail => thumbnail._id
    );
    const attachmentIds = updatedTemplate.item.attachments.map(
      attachment => attachment._id
    );

    formData.append('templateName', updatedTemplate.templateName);
    formData.append(
      'templateDescription',
      updatedTemplate.templateDescription || ''
    );
    formData.append('name', updatedTemplate.item.name);
    formData.append('category', updatedTemplate.item.category || '');
    formData.append('condition', updatedTemplate.item.condition || '');
    formData.append('thumbnails', JSON.stringify(thumbnailIds));
    formData.append('attachments', JSON.stringify(attachmentIds));
    formData.append(
      'properties',
      JSON.stringify(updatedTemplate.item.properties)
    );

    for (const newThumbnail of newThumbnails) {
      formData.append('newThumbnails', newThumbnail);
    }

    for (const newAttachment of newAttachments) {
      formData.append('newAttachments', newAttachment);
    }

    await onUpdateTemplate(templateId, formData);
  };

  if (fetchingTemplate || template === null) {
    return <LoadingIndicator />;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8} lg={7}>
        <Grid container>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <Typography variant="h6">{template.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {template.description}
            </Typography>
            <Typography variant="caption" className={classes.smallLink}>
              Edit template details
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <ItemDetailsSection
              item={template.item}
              onUpdate={updateTemplateHandler}
              updating={updatingTemplate}
            />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <PropertiesSection
              properties={template.item.properties}
              onUpdate={updateTemplateHandler}
              updating={updatingTemplate}
            />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <AttachmentsSection
              attachments={template.item.attachments}
              onUpdate={updateTemplateHandler}
              updating={updatingTemplate}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    template: state.template.template,
    fetchingTemplate: state.template.fetchingTemplate,
    updatingTemplate: state.template.updatingTemplate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTemplate: templateId => dispatch(actions.fetchTemplate(templateId)),
    onUpdateTemplate: (templateId, template) =>
      dispatch(actions.updateTemplate(templateId, template)),
    onResetTemplate: () => dispatch(actions.resetTemplate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplatePage);
