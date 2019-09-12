import React from 'react';

import FolderTreeItem from './FolderTreeItem/';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeView from '@material-ui/lab/TreeView';

export default function FoldersTreeView({ folders = [] }) {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {folders.map(folder => {
        return <FolderTreeItem folder={folder} />;
      })}
    </TreeView>
  );
}
