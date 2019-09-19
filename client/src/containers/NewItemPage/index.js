import React, { useEffect } from 'react';

import { getParamValueByKey } from '../../util/helperFunctions';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import NewItemForm from '../../components/NewItemForm';

function NewItemPage({
  location,
  onFetchTemplate,
  template,
  fetchingTemplate,
  fetchingTemplateError,
  onCreateItems,
  history,
  match: { params }
}) {
  const templateId = getParamValueByKey(location.search, 'templateId');

  const folderId = params.folderId || null;

  useEffect(() => {
    if (templateId) {
      onFetchTemplate(templateId);
    }
  }, [templateId, onFetchTemplate]);

  const createItemsHandler = itemData => {
    const formData = new FormData();

    formData.append('name', itemData.itemName || '');
    formData.append('category', itemData.itemCategory || '');
    formData.append('condition', itemData.itemCondition || '');

    for (const thumbnail of itemData.thumbnails) {
      if (thumbnail instanceof File) {
        formData.append('fileThumbnails', thumbnail);
      } else {
        formData.append('templateThumbnails', JSON.stringify(thumbnail));
      }
    }

    for (const property of itemData.properties) {
      formData.append(
        'properties',
        JSON.stringify({
          name: property.name,
          value: property.value
        })
      );
    }

    for (const attachment of itemData.attachments) {
      if (attachment instanceof File) {
        formData.append('fileAttachments', attachment);
      } else {
        formData.append('templateAttachments', JSON.stringify(attachment));
      }
    }

    formData.append('folder', folderId);

    onCreateItems(formData);

    history.push(`/folders/${folderId}`);
  };

  return (
    <React.Fragment>
      {fetchingTemplate ? (
        <p>Fetching template...</p>
      ) : (
        <NewItemForm initialValues={template} onSubmit={createItemsHandler} />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    template: state.template.template,
    fetchingTemplate: state.template.fetchingTemplate,
    fetchingTemplateError: state.template.fetchingTemplateError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTemplate: templateId => dispatch(actions.fetchTemplate(templateId)),
    onCreateItems: item => dispatch(actions.createItems(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItemPage));
