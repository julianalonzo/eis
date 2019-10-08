import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import NewTemplateForm from '../../components/NewTemplateForm';

function NewTemplatePage({ onCreateTemplate, creatingTemplate, history }) {
  const createTemplateHandler = async templateData => {
    const formData = new FormData();

    formData.append('name', templateData.templateName);
    formData.append('description', templateData.templateDescription || '');
    formData.append(
      'item',
      JSON.stringify({
        name: templateData.itemName,
        category: templateData.itemCategory || '',
        condition: templateData.itemCondition || ''
      })
    );

    for (const thumbnail of templateData.thumbnails) {
      formData.append('fileThumbnails', thumbnail);
    }

    for (const property of templateData.properties) {
      formData.append(
        'properties',
        JSON.stringify({
          name: property.name,
          value: property.value ? property.value : ''
        })
      );
    }

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
