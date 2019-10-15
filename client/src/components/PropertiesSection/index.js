import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import EditPropertyDialogForm from './EditPropertyDialogForm';
import Properties from './Properties';
import PropertyMoreActionsMenuListPopper from './PropertyMoreActionsMenuListPopper';
import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';
import NewPropertyDialogForm from './NewPropertyDialogForm';

function PropertiesSection({
  properties,
  itemId,
  onAddProperty,
  addingProperty,
  onUpdateProperty,
  updatingProperty,
  onRemoveProperty
}) {
  const [
    propertyMoreActionsAnchorEl,
    onOpenPropertyMoreActions,
    onClosePropertyMoreActions
  ] = usePopperState(null);

  const [
    isNewPropertyDialogOpen,
    openNewPropertyDialogHandler,
    closeNewPropertyDialogHandler
  ] = useDialogState(false);

  const [
    isEditPropertyDialogOpen,
    openEditPropertyDialogHandler,
    closeEditPropertyDialogHandler
  ] = useDialogState(false);

  // Property with its more actions opened or being edited
  const [activeProperty, setActiveProperty] = useState({});

  // Property that is currently being updated
  const [propertyOnEdit, setPropertyOnEdit] = useState({});

  const openPropertyMoreActionsHandler = (anchorEl, property) => {
    onOpenPropertyMoreActions(anchorEl);
    setActiveProperty(property);
  };

  const onOpenEditPropertyDialog = (anchorEl, property) => {
    openEditPropertyDialogHandler(anchorEl);
    setPropertyOnEdit(property);
  };

  const addNewPropertyHandler = async property => {
    await onAddProperty(itemId, property);
    closeNewPropertyDialogHandler();
  };

  const updatePropertyHandler = async property => {
    setActiveProperty(property);
    await onUpdateProperty(itemId, property);
    closeEditPropertyDialogHandler();
  };

  const removePropertyHandler = propertyId => {
    onRemoveProperty(itemId, propertyId);
  };

  return (
    <>
      <SectionPaper
        title="Properties"
        actionButton={{
          icon: <AddIcon />,
          action: openNewPropertyDialogHandler
        }}
      >
        <Properties
          properties={properties}
          onOpenPropertyMoreActions={openPropertyMoreActionsHandler}
        />
      </SectionPaper>
      <PropertyMoreActionsMenuListPopper
        isOpen={Boolean(propertyMoreActionsAnchorEl)}
        anchorEl={propertyMoreActionsAnchorEl}
        onClose={onClosePropertyMoreActions}
        property={activeProperty}
        onOpenEditPropertyDialog={onOpenEditPropertyDialog}
        onRemoveProperty={removePropertyHandler}
      />
      <NewPropertyDialogForm
        isOpen={isNewPropertyDialogOpen}
        onClose={closeNewPropertyDialogHandler}
        onSubmit={addNewPropertyHandler}
        submitting={addingProperty}
      />
      <EditPropertyDialogForm
        isOpen={isEditPropertyDialogOpen}
        onClose={closeEditPropertyDialogHandler}
        onSubmit={updatePropertyHandler}
        submitting={updatingProperty}
        initialValues={propertyOnEdit}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    addingProperty: state.item.addingProperty,
    updatingProperty: state.item.updatingProperty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProperty: (itemId, property) =>
      dispatch(actions.addProperty(itemId, property)),
    onUpdateProperty: (itemId, property) =>
      dispatch(actions.updateProperty(itemId, property)),
    onRemoveProperty: (itemId, propertyId) =>
      dispatch(actions.removeProperty(itemId, propertyId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesSection);
