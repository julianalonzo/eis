import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Templates from '../../components/Templates';

import PropTypes from 'prop-types';

function TemplatesPage({
  templates,
  fetchingTemplates,
  fetchingTemplatesError,
  onFetchTemplates
}) {
  useEffect(() => {
    onFetchTemplates();
  }, [onFetchTemplates]);

  return (
    <React.Fragment>
      {fetchingTemplates ? (
        <p>Fetching templates...</p>
      ) : (
        <Templates templates={templates} />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    templates: state.template.templates,
    fetchingTemplates: state.template.fetchingTemplates,
    fetchingTemplatesError: state.template.fetchingTemplatesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTemplates: () => dispatch(actions.fetchTemplates())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplatesPage);

TemplatesPage.propTypes = {
  templates: PropTypes.arrayOf(), // @TODO: Put templates schema here
  onFetchTemplates: PropTypes.func.isRequired
};

TemplatesPage.defaultProps = {
  fetchingTemplates: false,
  fetchingTemplatesError: null
};
