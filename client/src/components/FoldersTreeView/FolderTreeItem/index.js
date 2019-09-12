import React from 'react';

import TreeItem from '@material-ui/lab/TreeItem';

export default function FolderTreeItem({ folder: { _id, name, children } }) {
  return (
    <TreeItem nodeId={_id} label={name}>
      {children.map(child => {
        return <FolderTreeItem folder={child} />;
      })}
    </TreeItem>
  );
}
