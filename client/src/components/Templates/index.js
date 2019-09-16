import React from 'react';

import { HOST } from '../../util/constants';

import Card from '../UI/Card';
import EmptyTemplatesIllustration from '../../assets/illustrations/empty_templates.svg';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';

import Grid from '@material-ui/core/Grid';

export default function Templates({ templates }) {
  return (
    <React.Fragment>
      {templates.length > 0 ? (
        <Grid container spacing={4}>
          {templates.map(template => {
            let thumbnailUrl = null;

            if (template.item.thumbnails.length > 0) {
              thumbnailUrl = `${HOST}/api/files/${template.item.thumbnails[0].filename}`;
            }

            return (
              <Grid key={template._id} item xs={12} lg={3} md={4}>
                <Card
                  variant="text-subtitle"
                  title={template.name}
                  subtitle={template.description}
                  image={thumbnailUrl}
                  primaryChip={template.item.category}
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
