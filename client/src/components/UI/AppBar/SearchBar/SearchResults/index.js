import React from 'react';

import Breadcrumbs from '../../../Breadcrumbs';
import Thumbnail from '../../../Thumbnail';

import { List, ListItem, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  searchResult: {
    maxHeight: 300,
    overflowY: 'auto',
    width: 'inherit',
    position: 'absolute',
    marginTop: theme.spacing(0.25)
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.grey[300]
  },
  noResultPlaceholder: {
    padding: theme.spacing(2)
  },
  list: {
    marginBottom: 0
  },
  result: {
    display: 'flex',
    alignItems: 'center'
  },
  mainText: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default function SearchResults({ searchedItems, onOpenItem }) {
  const classes = useStyles();

  return (
    <Paper className={classes.searchResult} elevation={3}>
      {searchedItems.length === 0 ? (
        <div className={classes.noResultPlaceholder}>
          <Typography variant="body2">No results</Typography>
        </div>
      ) : (
        <List className={classes.list}>
          {searchedItems.map(item => {
            let thumbnailUrl;

            if (item.thumbnails.length > 0) {
              thumbnailUrl = item.thumbnails[0].path;
            }

            return (
              <ListItem
                key={item._id}
                button
                onMouseDown={() => {
                  onOpenItem(item._id);
                }}
              >
                <div className={classes.result}>
                  <div>
                    <Thumbnail
                      variant="image"
                      image={thumbnailUrl}
                      marginRight={2}
                    />
                  </div>
                  <div>
                    <Typography variant="body2" className={classes.mainText}>
                      {item.name}
                    </Typography>
                    <Breadcrumbs
                      disabled
                      breadcrumbs={item.folderHierarchy.map(i => {
                        return { label: i.name };
                      })}
                    />
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>
      )}
    </Paper>
  );
}
