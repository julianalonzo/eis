import React from 'react';

import { HOST } from '../../util/constants';

import Truncate from 'react-truncate';

import Card from '../UI/Card';
import EmptyTemplatesIllustration from '../../assets/illustrations/empty_templates.svg';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';
import LoadingIndicator from '../UI/LoadingIndicator';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  subtitle: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary
  },
  italicize: {
    fontStyle: 'italic'
  }
}));

export default function Templates({ loading = false, templates = [] }) {
  const classes = useStyles();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (templates.length === 0) {
    return (
      <IllustrationPlaceholder
        sourceImage={EmptyTemplatesIllustration}
        title="No templates yet"
        subtitle="Create a new template now"
      />
    );
  }

  return (
    <Grid container spacing={4}>
      {templates.map(template => {
        let thumbnailUrl = null;

        if (template.item.thumbnails.length > 0) {
          thumbnailUrl = `${HOST}/api/files/${template.item.thumbnails[0].filename}`;
        }

        return (
          <Grid key={template._id} item xs={12} lg={3} md={4}>
            <Card
              title={template.name}
              thumbnailVariant="image"
              image={thumbnailUrl}
              chip={template.item.category || null}
              onOpenMoreActions={() => {}}
            >
              {template.description ? (
                <Truncate lines={2} ellipsis="..." className={classes.subtitle}>
                  {template.description}
                </Truncate>
              ) : (
                <Typography
                  className={`${classes.subtitle} ${classes.italicize}`}
                >
                  (No description provided)
                </Typography>
              )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
