import React from 'react';

import useDialogState from '../../hooks/useDialogState';

import SectionPaper from '../UI/SectionPaper';

import { Typography } from '@material-ui/core/';
import { Edit as EditIcon } from '@material-ui/icons';

export default function TemplateDetailsSection({ name, description }) {
  return (
    <SectionPaper
      title="Template Details"
      actionButton={{
        icon: <EditIcon />,
        action: () => {}
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </SectionPaper>
  );
}
