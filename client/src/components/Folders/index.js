import React from 'react';

import Card from '../UI/Card';

import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';

export default function Folders({ folders }) {
  return (
    <Grid container spacing={4}>
      {folders.map(folder => {
        return (
          <Grid item key={folder._id} xs={12} sm={6} md={4} xl={3}>
            <Card title={folder.name} image={FolderIcon} />
          </Grid>
        );
      })}
    </Grid>
  );
}
