import React from 'react';

import FolderTreeItem from './FolderTreeItem/';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeView from '@material-ui/lab/TreeView';

export default function FoldersTreeView({ folders = [] }) {
  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
    >
      {folders.map(folder => {
        return (
          <FolderTreeItem key={folder._id} folder={folder} nestingLevel={1} />
        );
      })}
    </TreeView>
  );
}
