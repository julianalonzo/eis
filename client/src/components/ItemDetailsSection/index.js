import React from 'react';

import LoadingIndicator from '../UI/LoadingIndicator';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  dataField: {
    marginBottom: theme.spacing(2)
  },
  dataFieldHeader: {
    fontWeight: theme.typography.fontWeightMedium
  },
  name: {
    fontWeight: theme.typography.fontWeightMedium
  },
  italic: {
    fontStyle: 'italic'
  }
}));

export default function ItemDetailsSection({
  item: { name, category, condition },
  loading = false
}) {
  const classes = useStyles();

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className={classes.dataField}>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.dataFieldHeader}
          >
            Item Name
          </Typography>
          <Typography
            variant="body2"
            color="textPrimary"
            className={classes.name}
          >
            {name}
          </Typography>
        </Box>
        <Box className={classes.dataField}>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.dataFieldHeader}
          >
            Category
          </Typography>
          {category !== '' ? (
            <Chip label={category} size="small" />
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.italic}
            >
              Not set
            </Typography>
          )}
        </Box>
        <Box className={classes.dataField}>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.dataFieldHeader}
          >
            Condition
          </Typography>
          {condition !== '' ? (
            <Chip label={condition} size="small" />
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.italic}
            >
              Not set
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
