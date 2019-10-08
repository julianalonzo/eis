import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import LoadingIndicator from '../../components/UI/LoadingIndicator';
import Templates from '../../components/Templates';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pageHeading: {
    marginBottom: theme.spacing(2)
  }
}));

function TemplatesPage({
  templates,
  fetchingTemplates,
  onResetTemplates,
  onFetchTemplates,
  history
}) {
  const classes = useStyles();

  const openNewTemplatePageHandler = () => {
    history.push('/new-template');
  };

  useEffect(() => {
    onFetchTemplates();

    return () => {
      onResetTemplates();
    };
  }, [onFetchTemplates, onResetTemplates]);

  if (fetchingTemplates) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      {templates.length > 0 && (
        <React.Fragment>
          <Typography variant="h6" className={classes.pageHeading}>
            My Templates
          </Typography>
        </React.Fragment>
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
    onFetchTemplates: () => dispatch(actions.fetchTemplates()),
    onResetTemplates: () => dispatch(actions.resetTemplates())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TemplatesPage));
