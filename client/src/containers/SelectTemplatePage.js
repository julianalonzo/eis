import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

import { HOST } from '../utilities/constants';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';
import Card from '../components/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  pageHeadingContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  pageHeading: {
    fontSize: theme.fontSize * 2,
    fontWeight: theme.fontWeight.bolder
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center'
  },
  noTemplateCard: {
    minHeight: '140px',
    padding: theme.spacing(3),
    maxWidth: '300px',
    width: '300px',
    border: `2px dashed ${theme.palette.primary[400]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    color: theme.palette.primary[400],
    borderRadius: '5px',
    '&:hover': {
      color: theme.palette.primary[500],
      borderColor: theme.palette.primary[500]
    }
  },
  addIcon: {
    fontSize: theme.fontSize * 4,
    marginBottom: theme.spacing(1),
    color: 'inherit'
  },
  noTemplateText: {
    color: 'inherit',
    fontWeight: theme.fontWeight.bold
  }
}));

function SelectTemplatePage({
  templates,
  fetchingTemplates,
  onFetchTemplates,
  history
}) {
  const classes = useStyles();

  useEffect(() => {
    onFetchTemplates();
  }, [onFetchTemplates]);

  return (
    <React.Fragment>
      {fetchingTemplates ? (
        <p>Fetching templates...</p>
      ) : (
        <Grid container>
          <Grid item xs={12} className={classes.pageHeadingContainer}>
            <Typography className={classes.pageHeading}>
              Choose a template to start
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid className={classes.gridItem} item xs={12} lg={3} md={4}>
                <Box
                  className={classes.noTemplateCard}
                  onClick={() => {
                    history.push('/new-item');
                  }}
                >
                  <AddCircleOutlineIcon className={classes.addIcon} />
                  <Typography className={classes.noTemplateText}>
                    No Template
                  </Typography>
                </Box>
              </Grid>
              {templates.map(template => {
                let thumbnailUrl = null;

                if (template.item.thumbnails.length > 0) {
                  thumbnailUrl = `${HOST}/api/files/${template.item.thumbnails[0].filename}`;
                }

                return (
                  <Grid
                    className={classes.gridItem}
                    item
                    xs={12}
                    lg={3}
                    md={4}
                    key={template._id}
                  >
                    <Card
                      title={template.name}
                      subtitle={template.description}
                      image={thumbnailUrl}
                      onClick={() => {
                        history.push(`/new-item?templateId=${template._id}`);
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
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
)(withRouter(SelectTemplatePage));
