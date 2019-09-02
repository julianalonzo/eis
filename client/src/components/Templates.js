import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Card from './Card';
import EmptyTemplatesIllustration from '../assets/illustrations/empty_templates.svg';
import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from './IllustrationPlaceholder';

const useStyles = makeStyles(theme => ({
  gridItem: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Templates({ templates }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {templates.length > 0 ? (
        <Grid container spacing={4}>
          {templates.map(template => {
            let thumbnailUrl = null;

            if (template.item.thumbnails.length > 0) {
              thumbnailUrl = `${window.location.protocol}//${window.location.host}/api/files/${template.item.thumbnails[0].filename}`;
            }

            return (
              <Grid
                key={template._id}
                item
                xs={12}
                lg={3}
                md={4}
                className={classes.gridItem}
              >
                <Card
                  title={template.name}
                  subtitle={template.description}
                  image={thumbnailUrl}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <IllustrationPlaceholder
          sourceImage={EmptyTemplatesIllustration}
          primaryText="No templates yet"
          secondaryText="Create a new template now"
          action={{ label: 'Create Template' }}
        />
      )}
    </React.Fragment>
  );
}
