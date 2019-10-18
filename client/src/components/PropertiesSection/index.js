import React, { useState } from 'react';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import EditPropertyDialogForm from './EditPropertyDialogForm';
import Properties from './Properties';
import PropertyMoreActionsMenuListPopper from './PropertyMoreActionsMenuListPopper';
import SectionPaper from '../UI/SectionPaper';

import { Add as AddIcon } from '@material-ui/icons';
import NewPropertyDialogForm from './NewPropertyDialogForm';

function PropertiesSection({ properties, onUpdateItem, updatingItem }) {
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
    const updatedProperties = properties.concat(property);

    await onUpdateItem({ properties: updatedProperties }, [], []);

    closeNewPropertyDialogHandler();
  };

  const updatePropertyHandler = async updatedProperty => {
    setActiveProperty(updatedProperty);

    const indexOfUpdatedProperty = properties.findIndex(
      property => property._id === updatedProperty._id
    );

    const updatedProperties = [...properties];
    updatedProperties[indexOfUpdatedProperty] = updatedProperty;

    await onUpdateItem({ properties: updatedProperties }, [], []);

    closeEditPropertyDialogHandler();
  };

  const removePropertyHandler = propertyId => {
    const updatedProperties = properties.filter(
      property => property._id !== propertyId
    );

    onUpdateItem({ properties: updatedProperties }, [], []);
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
        submitting={updatingItem}
      />
      <EditPropertyDialogForm
        isOpen={isEditPropertyDialogOpen}
        onClose={closeEditPropertyDialogHandler}
        onSubmit={updatePropertyHandler}
        submitting={updatingItem}
        initialValues={propertyOnEdit}
      />
    </>
  );
}

export default PropertiesSection;
