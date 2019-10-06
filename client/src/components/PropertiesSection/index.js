import React from 'react';

import Property from './Property';

import Grid from '@material-ui/core/Grid';

export default function PropertiesSection({ properties = [] }) {
  return (
    <Grid container>
      {properties.map(({ _id, name, value }) => {
        return (
          <Grid item xs={12} md={10} key={_id}>
            <Property _id={_id} name={name} value={value} />
          </Grid>
        );
      })}
    </Grid>
  );
}
