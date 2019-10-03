import React from 'react';

import { makeStyles } from '@material-ui/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FolderIcon from '@material-ui/icons/Folder';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: theme.palette.text.secondary,
    '&:focus > $content': props => ({
      color: theme.palette.primary[500],
      borderLeft: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor: theme.palette.primary[50]
    })
  }),
  content: props => ({
    color: props.isActive
      ? theme.palette.primary[500]
      : theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    borderLeft: props.isActive
      ? `3px solid ${theme.palette.primary[500]}`
      : '3px solid transparent',
    backgroundColor: props.isActive ? theme.palette.primary[50] : 'transparent'
  }),
  label: props => ({
    fontWeight: 'inherit',
    color: 'inherit'
  }),
  labelRoot: props => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    paddingRight: theme.spacing(4)
  }),
  labelIcon: props => ({
    marginRight: theme.spacing(1)
  }),
  labelText: props => ({
    fontWeight: 'inherit',
    flexGrow: 1
  })
}));

export default function FolderTreeItem({
  folders,
  folder: { _id, name },
  currentFolder
}) {
  const classes = useStyles({ isActive: currentFolder === _id });

  let expandIcon = <div style={{ width: '24px' }} />;
  let collapseIcon = <div style={{ width: '24px' }} />;

  const children = folders.filter(f => f.parent === _id);

  if (children.length > 0) {
    expandIcon = <ArrowRightIcon />;
    collapseIcon = <ArrowDropDownIcon />;
  }

  return (
    <TreeItem
      expandIcon={expandIcon}
      collapseIcon={collapseIcon}
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
        return (
          <FolderTreeItem
            key={child._id}
            folders={folders}
            folder={child}
            currentFolder={currentFolder}
          />
        );
      })}
    </TreeItem>
  );
}
