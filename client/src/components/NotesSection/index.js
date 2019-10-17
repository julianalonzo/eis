import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import useDialogState from '../../hooks/useDialogState';

import NewNoteDialogForm from './NewNoteDialogForm';
import Notes from './Notes';
import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';

function NotesSection({ itemId, notes, onAddNote, addingNote, onRemoveNote }) {
  const [
    isNewNoteDialogOpen,
    openNewNoteDialogHandler,
    closeNewNoteDialogHandler
  ] = useDialogState(false);

  const addNoteHandler = async content => {
    await onAddNote(itemId, content);
    closeNewNoteDialogHandler();
  };

  const removeNoteHandler = async noteId => {
    await onRemoveNote(itemId, noteId);
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
        submitting={addingNote}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    removingNote: state.item.removingNote,
    addingNote: state.item.addingNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddNote: (itemId, note) => dispatch(actions.addNote(itemId, note)),
    onRemoveNote: (itemId, noteId) =>
      dispatch(actions.removeNote(itemId, noteId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesSection);
