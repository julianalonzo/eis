import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

import { withRouter } from 'react-router-dom';

import { getParamValueByKey } from '../utilities/helperFunctions';

import NewItemForm from '../components/NewItemForm';

function NewItemPage({
  location,
  onFetchTemplate,
  template,
  fetchingTemplate,
  fetchingTemplateError
}) {
  const templateId = getParamValueByKey(location.search, 'templateId');

  useEffect(() => {
    if (templateId) {
      onFetchTemplate(templateId);
    }
  }, [templateId, onFetchTemplate]);

  return (
    <React.Fragment>
      {fetchingTemplate ? (
        <p>Fetching template...</p>
      ) : (
        <NewItemForm initialValues={template} />
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
    onFetchTemplate: templateId => dispatch(actions.fetchTemplate(templateId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItemPage));
