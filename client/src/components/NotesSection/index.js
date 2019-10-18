import React from 'react';

import useDialogState from '../../hooks/useDialogState';

import NewNoteDialogForm from './NewNoteDialogForm';
import Notes from './Notes';
import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';

function NotesSection({ notes, onUpdateItem, updatingItem }) {
  const [
    isNewNoteDialogOpen,
    openNewNoteDialogHandler,
    closeNewNoteDialogHandler
  ] = useDialogState(false);

  const addNoteHandler = async content => {
    const updatedNotes = notes.concat({ content: content });

    await onUpdateItem({ notes: updatedNotes }, [], []);
    closeNewNoteDialogHandler();
  };

  const removeNoteHandler = async noteId => {
    const updatedNotes = notes.filter(note => note._id !== noteId);

    await onUpdateItem({ notes: updatedNotes }, [], []);
  };

  return (
    <>
      <SectionPaper
        title="Notes"
        actionButton={{ icon: <AddIcon />, action: openNewNoteDialogHandler }}
      >
        <Notes notes={notes} onRemoveNote={removeNoteHandler} />
      </SectionPaper>
      <NewNoteDialogForm
        isOpen={isNewNoteDialogOpen}
        onClose={closeNewNoteDialogHandler}
        onSubmit={addNoteHandler}
        submitting={updatingItem}
      />
    </>
  );
}

export default NotesSection;
