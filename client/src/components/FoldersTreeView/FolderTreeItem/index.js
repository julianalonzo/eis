import React from 'react';

import { makeStyles } from '@material-ui/styles';
import FolderIcon from '@material-ui/icons/Folder';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: theme.palette.primary[50],
      color: theme.palette.primary[500],
      borderLeft: `3px solid ${theme.palette.primary[500]}`
    }
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    borderLeft: '3px solid transparent'
  },
  label: {
    fontWeight: 'inherit',
    color: 'inherit'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    paddingRight: theme.spacing(4)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  }
}));

export default function FolderTreeItem({ folder: { _id, name, children } }) {
  const classes = useStyles();

  return (
    <TreeItem
      nodeId={_id}
      label={
        <div className={classes.labelRoot}>
          <FolderIcon className={classes.labelIcon} />
          <Typography
            variant="body2"
            className={classes.labelText}
            noWrap={true}
          >
            {name}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        label: classes.label
      }}
    >
      {children.map(child => {
        return <FolderTreeItem key={child._id} folder={child} />;
      })}
    </TreeItem>
  );
}
