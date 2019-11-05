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
  onResetTemplate,
  onCreateItem,
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

  const createItemHandler = async item => {
    const formData = new FormData();

    const {
      name,
      category,
      condition,
      thumbnails,
      properties,
      attachments
    } = item;

    formData.append('name', name);
    formData.append('category', category);
    formData.append('condition', condition);

    let templateThumbnails = [];
    for (const thumbnail of thumbnails) {
      if (thumbnail instanceof File) {
        formData.append('newThumbnails', thumbnail);
      } else {
        templateThumbnails = templateThumbnails.concat(thumbnail._id);
      }
    }
    formData.append('thumbnails', JSON.stringify(templateThumbnails));

    formData.append('properties', JSON.stringify(properties));

    let templateAttachments = [];
    for (const attachment of attachments) {
      if (attachment instanceof File) {
        formData.append('newAttachments', attachment);
      } else {
        templateAttachments = templateAttachments.concat(attachment._id);
      }
    }
    formData.append('attachments', JSON.stringify(templateAttachments));

    formData.append('folder', folderId);

    await onCreateItem(formData);

    history.push(`/folders/${folderId}`);
  };

  if (Boolean(templateId) && (fetchingTemplate || template === null)) {
    return <LoadingIndicator />;
  }

  return (
    <NewItemForm
      initialValues={template ? { ...template.item } : {}}
      onSubmit={createItemHandler}
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
    onCreateItem: item => dispatch(actions.createItem(item)),
    onResetTemplate: () => dispatch(actions.resetTemplate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItemPage));
