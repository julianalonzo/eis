import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';
import Notes from './Notes';

function NotesSection({ itemId, notes, onRemoveNote }) {
  const removeNoteHandler = async noteId => {
    await onRemoveNote(itemId, noteId);
  };

  return (
    <SectionPaper
      title="Notes"
      actionButton={{ icon: <AddIcon />, action: () => {} }}
    >
      <Notes notes={notes} onRemoveNote={removeNoteHandler} />
    </SectionPaper>
  );
}

const mapStateToProps = state => {
  return {
    removingNote: state.item.removingNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveNote: (itemId, noteId) =>
      dispatch(actions.removeNote(itemId, noteId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesSection);
