import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Link, useHistory } from 'react-router-dom';

import usePopperState from '../../hooks/usePopperState';

import Button from '../../components/UI/Button';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import Templates from '../../components/Templates';
import TemplateMoreActionsMenuListPopper from '../../components/Templates/TemplateMoreActionsMenuListPopper';

import { makeStyles } from '@material-ui/styles';
import { Add as AddIcon } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pageHeading: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function TemplatesPage({
  templates,
  fetchingTemplates,
  onResetTemplates,
  onFetchTemplates,
  onRemoveTemplate
}) {
  const classes = useStyles();

  const history = useHistory();

  const [
    templateMoreActionsAnchorEl,
    openTemplateMoreActionsHandler,
    closeTemplateMoreActionsHandler
  ] = usePopperState(null);

  // ID of the template with its more actions opened
  const [templateIdMoreActions, setTemplateIdMoreActions] = useState(null);

  const onOpenTemplateMoreActions = (anchorEl, templateId) => {
    setTemplateIdMoreActions(templateId);
    openTemplateMoreActionsHandler(anchorEl);
  };

  const onCloseTemplateMoreActions = () => {
    setTemplateIdMoreActions(null);
    closeTemplateMoreActionsHandler();
  };

  const NewTemplatePageLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to="/new-template" {...props} />
  ));

  const openTemplatePageHandler = templateId => {
    history.push(`/templates/${templateId}`);
  };

  const openNewTemplatePageHandler = () => {
    history.push('/new-template');
  };

  useEffect(() => {
    onFetchTemplates();

    return () => {
      onResetTemplates();
    };
  }, [onFetchTemplates, onResetTemplates]);

  if (fetchingTemplates || templates === null) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {templates.length > 0 && (
        <Box className={classes.pageHeading}>
          <Box>
            <Typography variant="h6" className={classes.pageHeading}>
              My Templates
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              component={NewTemplatePageLink}
            >
              <AddIcon /> New Template
            </Button>
          </Box>
        </Box>
      )}
      <Templates
        templates={templates}
        onOpenTemplatePage={openTemplatePageHandler}
        onOpenNewTemplatePage={openNewTemplatePageHandler}
        onOpenMoreActions={onOpenTemplateMoreActions}
      />
      <TemplateMoreActionsMenuListPopper
        isOpen={Boolean(templateMoreActionsAnchorEl)}
        anchorEl={templateMoreActionsAnchorEl}
        onClose={onCloseTemplateMoreActions}
        templateId={templateIdMoreActions}
        onOpenTemplatePage={openTemplatePageHandler}
        onRemoveTemplate={onRemoveTemplate}
      />
    </>
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
    onResetTemplates: () => dispatch(actions.resetTemplates()),
    onRemoveTemplate: templateId => dispatch(actions.removeTemplate(templateId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplatesPage);
