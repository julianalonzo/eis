import React from 'react';

import Property from './Property';

import Grid from '@material-ui/core/Grid';

export default function Properties({
  properties = [],
  onOpenPropertyMoreActions
}) {
  return (
    <Grid container>
      {properties.map(property => {
        return (
          <Grid item xs={12} md={10} key={property._id}>
            <Property
              property={property}
              onOpenPropertyMoreActions={onOpenPropertyMoreActions}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
