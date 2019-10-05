import React, { useEffect } from 'react';

import { HOST } from '../../util/constants';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Truncate from 'react-truncate';
import { withRouter } from 'react-router-dom';

import Card from '../../components/UI/Card';
import LoadingIndicator from '../../components/UI/LoadingIndicator';

import { makeStyles } from '@material-ui/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  pageHeading: { marginBottom: theme.spacing(2) },
  noTemplateCard: {
    padding: theme.spacing(3),
    height: '110px',
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
    marginBottom: theme.spacing(1),
    color: 'inherit'
  },
  noTemplateText: {
    color: 'inherit'
  },
  subtitle: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary
  }
}));

function SelectTemplatePage({
  templates,
  fetchingTemplates,
  onFetchTemplates,
  history,
  match: { params }
}) {
  const classes = useStyles();

  const folderId = params.folderId || null;

  useEffect(() => {
    onFetchTemplates();
  }, [onFetchTemplates]);

  if (fetchingTemplates) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Typography variant="h6" className={classes.pageHeading}>
          Choose template
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={3} md={4}>
            <Box
              className={classes.noTemplateCard}
              onClick={() => {
                history.push(`/folders/${folderId}/new-item`);
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
                  thumbnailVariant="image"
                  image={thumbnailUrl}
                  chip={template.item.category || null}
                  onClick={() => {
                    history.push(
                      `/folders/${folderId}/new-item?templateId=${template._id}`
                    );
                  }}
                >
                  <Truncate
                    lines={2}
                    ellipsis="..."
                    className={classes.subtitle}
                  >
                    {template.description}
                  </Truncate>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
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
