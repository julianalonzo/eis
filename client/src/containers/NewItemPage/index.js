import React, { useState, useEffect } from 'react';

import { getParamValueByKey } from '../../util/helperFunctions';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import LoadingIndicator from '../../components/UI/LoadingIndicator';
import NewItemForm from '../../components/NewItemForm';

function NewItemPage({
  location,
  onFetchTemplate,
  template,
  fetchingTemplate,
  fetchingTemplateError,
  onResetTemplate,
  onCreateItems,
  creatingItem,
  history,
  match: { params }
}) {
  const [templateId, setTemplateId] = useState(
    getParamValueByKey(location.search, 'templateId') || null
  );

  const folderId = params.folderId || null;

  useEffect(() => {
    setTemplateId(getParamValueByKey(location.search, 'templateId') || null);
  }, [location.search]);

  useEffect(() => {
    if (templateId !== null) {
      onFetchTemplate(templateId);
    } else {
      onResetTemplate();
    }

    return () => {
      onResetTemplate();
    };
  }, [templateId, onFetchTemplate, onResetTemplate]);

  const createItemsHandler = async itemData => {
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

    await onCreateItems(formData);

    history.push(`/folders/${folderId}`);
  };

  if (fetchingTemplate) {
    return <LoadingIndicator />;
  }

  return (
    <NewItemForm
      initialValues={{
        itemName: template.item.name || '',
        itemCategory: template.item.category || '',
        itemCondition: template.item.condition || '',
        thumbnails: template.item.thumbnails || [],
        properties: template.item.properties || [],
        attachments: template.item.attachments || []
      }}
      onSubmit={createItemsHandler}
      submitting={creatingItem}
    />
  );
}

const mapStateToProps = state => {
  return {
    template: state.template.template,
    fetchingTemplate: state.template.fetchingTemplate,
    creatingItem: state.item.creatingItem,
    fetchingTemplateError: state.template.fetchingTemplateError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTemplate: templateId => dispatch(actions.fetchTemplate(templateId)),
    onCreateItems: item => dispatch(actions.createItems(item)),
    onResetTemplate: () => dispatch(actions.resetTemplate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItemPage));
