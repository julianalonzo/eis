import React from 'react';

import Truncate from 'react-truncate';

import Card from '../UI/Card';
import EmptyTemplatesIllustration from '../../assets/illustrations/empty_templates.svg';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';
import LoadingIndicator from '../UI/LoadingIndicator';

import { Image as NoThumbnailIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

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

export default function Templates({
  loading = false,
  templates = [],
  onOpenMoreActions,
  onOpenTemplatePage,
  onOpenNewTemplatePage
}) {
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
        action={{ label: 'New Template', action: onOpenNewTemplatePage }}
      />
    );
  }

  return (
    <Grid container spacing={4}>
      {templates.map(template => {
        return (
          <Grid key={template._id} item xs={12} lg={3} md={4}>
            <Card
              title={template.name}
              thumbnailVariant={
                template.item.thumbnails.length > 0 ? 'image' : 'icon'
              }
              image={
                template.item.thumbnails.length > 0
                  ? template.item.thumbnails[0].path
                  : undefined
              }
              icon={<NoThumbnailIcon />}
              chip={template.item.category || null}
              onClick={() => {
                onOpenTemplatePage(template._id);
              }}
              onOpenMoreActions={event => {
                event.stopPropagation();
                onOpenMoreActions(event.currentTarget, template._id);
              }}
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
