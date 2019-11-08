import React, { useState } from "react";

import useDialogState from "../../hooks/useDialogState";
import usePopperState from "../../hooks/usePopperState";

import EditPropertyDialogForm from "./EditPropertyDialogForm";
import Properties from "./Properties";
import PropertyMoreActionsMenuListPopper from "./PropertyMoreActionsMenuListPopper";
import SectionPaper from "../UI/SectionPaper";
import TextPlaceholder from "../UI/TextPlaceholder";

import { Add as AddIcon } from "@material-ui/icons";
import NewPropertyDialogForm from "./NewPropertyDialogForm";

function PropertiesSection({ properties, onUpdate, updating }) {
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

    await onUpdate({ properties: updatedProperties }, [], []);

    closeNewPropertyDialogHandler();
  };

  const updatePropertyHandler = async updatedProperty => {
    setActiveProperty(updatedProperty);

    const indexOfUpdatedProperty = properties.findIndex(
      property => property._id === updatedProperty._id
    );

    const updatedProperties = [...properties];
    updatedProperties[indexOfUpdatedProperty] = updatedProperty;

    await onUpdate({ properties: updatedProperties }, [], []);

    closeEditPropertyDialogHandler();
  };

  const removePropertyHandler = propertyId => {
    const updatedProperties = properties.filter(
      property => property._id !== propertyId
    );

    onUpdate({ properties: updatedProperties }, [], []);
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
        {properties.length > 0 ? (
          <Properties
            properties={properties}
            onOpenPropertyMoreActions={openPropertyMoreActionsHandler}
          />
        ) : (
          <TextPlaceholder text="(No properties yet)" />
        )}
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
        submitting={updating}
      />
      <EditPropertyDialogForm
        isOpen={isEditPropertyDialogOpen}
        onClose={closeEditPropertyDialogHandler}
        onSubmit={updatePropertyHandler}
        submitting={updating}
        initialValues={propertyOnEdit}
      />
    </>
  );
}

export default PropertiesSection;
