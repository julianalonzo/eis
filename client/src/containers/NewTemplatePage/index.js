import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useHistory } from 'react-router-dom';

import TemplateForm from '../../components/TemplateForm';

function NewTemplatePage({ onCreateTemplate, creatingTemplate }) {
  const history = useHistory();

  const createTemplateHandler = async template => {
    const formData = new FormData();

    const {
      templateName,
      templateDescription,
      name,
      category,
      condition,
      thumbnails,
      properties,
      attachments
    } = template;

    formData.append('templateName', templateName);
    formData.append('templateDescription', templateDescription);

    formData.append('name', name);
    formData.append('category', category);
    formData.append('condition', condition);

    for (const thumbnail of thumbnails) {
      formData.append('newThumbnails', thumbnail);
    }
    formData.append('properties', JSON.stringify(properties));

    for (const attachment of attachments) {
      formData.append('newAttachments', attachment);
    }

    await onCreateTemplate(formData);

    history.push(`/templates`);
  };

  return (
    <TemplateForm
      title="New Template"
      onSubmit={createTemplateHandler}
      submitting={creatingTemplate}
      initialValues={{}}
    />
  );
}

const mapStateToProps = state => {
  return {
    creatingTemplate: state.template.creatingTemplate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateTemplate: template => dispatch(actions.createTemplate(template))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTemplatePage);
