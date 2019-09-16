import React from 'react';

import FolderTreeItem from './FolderTreeItem/';

import TreeView from '@material-ui/lab/TreeView';

export default function FoldersTreeView({ folders = [], onOpenFolder }) {
  return (
    <TreeView
      onNodeToggle={nodeId => {
        onOpenFolder(nodeId);
      }}
    >
      {folders.map(folder => {
        return <FolderTreeItem key={folder._id} folder={folder} />;
      })}
    </TreeView>
  );
}
