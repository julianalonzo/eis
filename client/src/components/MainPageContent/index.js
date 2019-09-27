import React from 'react';

import EmptyIllustration from '../../assets/illustrations/empty.svg';
import Folders from '../Folders';
import Items from '../Items';
import ItemMoreActionsMenuListPopper from '../Items/ItemMoreActionsMenuListPopper';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IllustrationPlaceholder from '../UI/IllustrationPlaceholder';

const useStyles = makeStyles(theme => ({
  mainDataContainer: {
    marginBottom: theme.spacing(8)
  },
  dataHeader: {
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: theme.spacing(2)
  }
}));

export default function MainPageContent({
  folders,
  onOpenFolder,
  items,
  onOpenItemMoreActions,
  itemMoreActionsAnchorEl,
  onCloseItemMoreActions,
  currentItem,
  onRemoveItem
}) {
  const classes = useStyles();

  if (folders.length === 0 && items.length === 0) {
    return (
      <IllustrationPlaceholder
        title="This folder seems to be empty"
        subtitle="Add a new item or folder now"
        sourceImage={EmptyIllustration}
      />
    );
  }

  return (
    <React.Fragment>
      {folders.length > 0 ? (
        <Box className={classes.mainDataContainer}>
          <Typography
            gutterBottom={true}
            color="textSecondary"
            className={classes.dataHeader}
            variant="body2"
          >
            Folders
          </Typography>
          <Folders folders={folders} onOpenFolder={onOpenFolder} />
        </Box>
      ) : null}
      {items.length > 0 ? (
        <Box className={classes.mainDataContainer}>
          <Typography
            gutterBottom={true}
            color="textSecondary"
            className={classes.dataHeader}
            variant="body2"
          >
            Items
          </Typography>
          <Items items={items} onOpenItemMoreActions={onOpenItemMoreActions} />
        </Box>
      ) : null}
      <ItemMoreActionsMenuListPopper
        isOpen={Boolean(itemMoreActionsAnchorEl)}
        anchorEl={itemMoreActionsAnchorEl}
        onClose={onCloseItemMoreActions}
        currentItem={currentItem}
        onRemoveItem={onRemoveItem}
      />
    </React.Fragment>
  );
}
