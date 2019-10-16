import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useHistory, useParams } from 'react-router-dom';

import LoadingIndicator from '../../components/UI/LoadingIndicator';
import TemplateForm from '../../components/TemplateForm';

function TemplatePage({
  template,
  onFetchTemplate,
  fetchingTemplate,
  onUpdateTemplate,
  updatingTemplate
}) {
  const { templateId } = useParams();
  const history = useHistory();

  useEffect(() => {
    onFetchTemplate(templateId);
  }, [templateId, onFetchTemplate]);

  const updateTemplateHandler = async template => {
    const formData = new FormData();

    formData.append('templateId', templateId);
    formData.append('templateName', template.templateName || '');
    formData.append('templateDescription', template.templateDescription || '');

    let thumbnails = [];
    for (const thumbnail of template.thumbnails) {
      if (thumbnail instanceof File) {
        formData.append('fileThumbnails', thumbnail);
      } else {
        thumbnails = thumbnails.concat(thumbnail._id);
      }
    }

    let attachments = [];
    for (const attachment of template.attachments) {
      if (attachment instanceof File) {
        console.log(attachment);
        formData.append('fileAttachments', attachment);
      } else {
        attachments = attachments.concat(attachment._id);
      }
    }

    const item = {
      name: template.itemName || '',
      category: template.itemCategory || '',
      condition: template.itemCondition || '',
      properties: template.properties || [],
      thumbnails: thumbnails || [],
      attachments: attachments || []
    };

    formData.append('item', JSON.stringify(item));

    await onUpdateTemplate(formData);

    history.push('/templates');
  };

  if (fetchingTemplate) {
    return <LoadingIndicator />;
  }

  return (
    <TemplateForm
      title={template.name}
      initialValues={{
        templateName: template.name || '',
        templateDescription: template.description || '',
        itemName: template.item.name || '',
        itemCategory: template.item.category || '',
        itemCondition: template.item.condition || '',
        thumbnails: template.item.thumbnails || [],
        properties: template.item.properties || [],
        attachments: template.item.attachments || []
      }}
      onSubmit={updateTemplateHandler}
      submitting={updatingTemplate}
    />
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
    onUpdateTemplate: template => dispatch(actions.updateTemplate(template))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplatePage);
