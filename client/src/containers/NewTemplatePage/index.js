import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import NewTemplateForm from '../../components/NewTemplateForm';

function NewTemplatePage({ onCreateTemplate, creatingTemplate, history }) {
  const createTemplateHandler = async templateData => {
    const formData = new FormData();

    formData.append('name', templateData.templateName || '');
    formData.append('description', templateData.templateDescription || '');

    formData.append('itemName', templateData.itemName || '');
    formData.append('itemCategory', templateData.itemCategory || '');
    formData.append('itemCondition', templateData.itemCondition || '');

    for (const thumbnail of templateData.thumbnails) {
      formData.append('fileThumbnails', thumbnail);
    }

    let properties = [];
    for (const property of templateData.properties) {
      properties = properties.concat({
        name: property.name,
        value: property.value ? property.value : ''
      });
    }
    formData.append('properties', JSON.stringify(properties));

    for (const attachment of templateData.attachments) {
      formData.append('fileAttachments', attachment);
    }

    await onCreateTemplate(formData);

    history.push(`/templates`);
  };

  return (
    <NewTemplateForm
      onSubmit={createTemplateHandler}
      submitting={creatingTemplate}
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
)(withRouter(NewTemplatePage));
