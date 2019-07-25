import React from 'react';

import PropertyGroup from './PropertyGroup';

import PropTypes from 'prop-types';

export default function Properties({
  propertyGroups,
  onOpenEditPropertyDialog,
  onOpenDeletePropertyDialog
}) {
  const propertyEvents = {
    onOpenEditPropertyDialog,
    onOpenDeletePropertyDialog
  };

  return (
    <div>
      {propertyGroups.map(propertyGroup => {
        return (
          <PropertyGroup
            propertyGroup={{ ...propertyGroup }}
            {...propertyEvents}
          />
        );
      })}
    </div>
  );
}

Properties.propTypes = {
  propertyGroups: PropTypes.arrayOf(PropertyGroup.propTypes.propertyGroup)
    .isRequired,
  onOpenEditPropertyDialog: PropTypes.func.isRequired,
  onOpenDeletePropertyDialog: PropTypes.func.isRequired
};
