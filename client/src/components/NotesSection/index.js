import React from "react";

import useDialogState from "../../hooks/useDialogState";

import NewNoteDialogForm from "./NewNoteDialogForm";
import Notes from "./Notes";
import SectionPaper from "../UI/SectionPaper";
import TextPlaceholder from "../UI/TextPlaceholder";

import { Add as AddIcon } from "@material-ui/icons";

function NotesSection({ notes, onUpdate, updating }) {
  const [
    isNewNoteDialogOpen,
    openNewNoteDialogHandler,
    closeNewNoteDialogHandler
  ] = useDialogState(false);

  const addNoteHandler = async content => {
    const updatedNotes = notes.concat({ content: content });

    await onUpdate({ notes: updatedNotes }, [], []);
    closeNewNoteDialogHandler();
  };

  const removeNoteHandler = async noteId => {
    const updatedNotes = notes.filter(note => note._id !== noteId);

    await onUpdate({ notes: updatedNotes }, [], []);
  };

  return (
    <>
      <SectionPaper
        title="Notes"
        actionButton={{ icon: <AddIcon />, action: openNewNoteDialogHandler }}
      >
        {notes.length > 0 ? (
          <Notes notes={notes} onRemoveNote={removeNoteHandler} />
        ) : (
          <TextPlaceholder text="(No notes yet)" />
        )}
      </SectionPaper>
      <NewNoteDialogForm
        isOpen={isNewNoteDialogOpen}
        onClose={closeNewNoteDialogHandler}
        onSubmit={addNoteHandler}
        submitting={updating}
      />
    </>
  );
}

export default NotesSection;
