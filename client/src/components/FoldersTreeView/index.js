import React from 'react';

import FolderTreeItem from './FolderTreeItem/';

import TreeView from '@material-ui/lab/TreeView';

export default function FoldersTreeView({ folders = [], onOpenFolder }) {
  const rootFolders = folders.filter(folder => folder.parent === null);

  return (
    <TreeView
      onNodeToggle={nodeId => {
        onOpenFolder(nodeId);
      }}
    >
      {rootFolders.map(rootFolder => {
        return (
          <FolderTreeItem
            key={rootFolder._id}
            folders={folders}
            folder={rootFolder}
          />
        );
      })}
    </TreeView>
  );
}
