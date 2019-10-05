import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import LoadingIndicator from '../../components/UI/LoadingIndicator';
import Templates from '../../components/Templates';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  pageHeading: {
    marginBottom: theme.spacing(2)
  }
}));

function TemplatesPage({
  templates,
  fetchingTemplates,
  onFetchTemplates,
  history
}) {
  const classes = useStyles();

  const openNewTemplatePageHandler = () => {
    history.push('/new-template');
  };

  useEffect(() => {
    onFetchTemplates();
  }, [onFetchTemplates]);

  if (fetchingTemplates) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      {templates.length > 0 && (
        <Typography variant="h6" className={classes.pageHeading}>
          My Templates
        </Typography>
      )}
      <Templates
        templates={templates}
        onOpenNewTemplatePage={openNewTemplatePageHandler}
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    templates: state.template.templates,
    fetchingTemplates: state.template.fetchingTemplates
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
)(withRouter(TemplatesPage));

TemplatesPage.propTypes = {
  templates: PropTypes.arrayOf(), // @TODO: Put templates schema here
  onFetchTemplates: PropTypes.func.isRequired
};

TemplatesPage.defaultProps = {
  fetchingTemplates: false,
  fetchingTemplatesError: null
};
