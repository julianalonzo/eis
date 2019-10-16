import React from 'react';

import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';
import Notes from './Notes';

export default function NotesSection({ notes }) {
  return (
    <SectionPaper
      title="Notes"
      actionButton={{ icon: <AddIcon />, action: () => {} }}
    >
      <Notes notes={notes} />
    </SectionPaper>
  );
}
