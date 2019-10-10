import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';
import usePopperState from '../../hooks/usePopperState';

import Attachments from '../../components/Attachments';
import EditItemDetailsDialogForm from '../../components/EditItemDetailsDialogForm';
import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import NewPropertyDialogForm from '../../components/NewPropertyDialogForm';
import PropertyMoreActionsMenuListPopper from '../../components/PropertiesSection/PropertyMoreActionsMenuListPopper';
import PropertiesSection from '../../components/PropertiesSection';
import SectionPaper from '../../components/UI/SectionPaper';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Add as AddIcon, Edit as EditIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  sectionGridItem: {
    marginBottom: theme.spacing(6)
  }
}));

function ItemDetailsPage({
  item,
  onFetchItem,
  fetchingItem,
  onResetItem,
  onUpdateItemDetails,
  onAddProperty,
  updatingItemDetails,
  addingProperty,
  match: { params }
}) {
  const classes = useStyles();

  const [itemId, setItemId] = useState(params.itemId || null);

  const [
    isEditItemDetailsDialogOpened,
    openEditItemDetailsDialogHandler,
    closeEditItemDetailsDialogHandler
  ] = useDialogState(false);

  const [
    isNewPropertyDialogOpened,
    openNewPropertyDialogHandler,
    closeNewPropertyDialogHandler
  ] = useDialogState(false);

  const [
    propertyMoreActionsAnchorEl,
    openPropertyMoreActionsHandler,
    closePropertyMoreActionsHandler
  ] = usePopperState(null);

  // Property ID of the property that has its more actions popper opened
  const [propertyIdMoreActions, setPropertyIdMoreActions] = useState(null);

  const onOpenPropertyMoreActions = (event, id) => {
    openPropertyMoreActionsHandler(event.currentTarget);
    setPropertyIdMoreActions(id);
  };

  const onClosePropertyMoreActions = () => {
    closePropertyMoreActionsHandler();
    setPropertyIdMoreActions(null);
  };

  useEffect(() => {
    setItemId(params.itemId || null);
  }, [params]);

  useEffect(() => {
    onFetchItem(itemId);

    return () => {
      onResetItem();
    };
  }, [itemId, onFetchItem, onResetItem]);

  const updateItemDetailsHandler = async updatedItemData => {
    const formData = new FormData();

    formData.append('itemId', item._id);
    formData.append('name', updatedItemData.itemName);
    formData.append('category', updatedItemData.itemCategory || '');
    formData.append('condition', updatedItemData.itemCondition || '');

    let thumbnails = [];

    for (const thumbnail of updatedItemData.thumbnails) {
      if (thumbnail instanceof File) {
        formData.append('fileThumbnails', thumbnail);
      } else {
        thumbnails = thumbnails.concat(thumbnail._id);
      }
    }

    formData.append('thumbnails', JSON.stringify(thumbnails));

    await onUpdateItemDetails(formData);

    closeEditItemDetailsDialogHandler();
  };

  const addNewPropertyHandler = async property => {
    await onAddProperty(itemId, property);

    closeNewPropertyDialogHandler();
  };

  if (fetchingItem) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={8} lg={6}>
          <Grid container>
            <Grid item xs={12} className={classes.sectionGridItem}>
              <SectionPaper
                title="Item Details"
                actionButton={{
                  icon: <EditIcon />,
                  action: openEditItemDetailsDialogHandler
                }}
              >
                <ItemDetailsSection item={item} />
              </SectionPaper>
              <EditItemDetailsDialogForm
                isOpen={isEditItemDetailsDialogOpened}
                onClose={closeEditItemDetailsDialogHandler}
                item={item}
                onSubmit={updateItemDetailsHandler}
                submitting={updatingItemDetails}
              />
            </Grid>
            <Grid item xs={12} className={classes.sectionGridItem}>
              <SectionPaper
                title="Properties"
                actionButton={{
                  icon: <AddIcon />,
                  action: openNewPropertyDialogHandler
                }}
              >
                <PropertiesSection
                  properties={item.properties}
                  onOpenPropertyMoreActions={onOpenPropertyMoreActions}
                />
                <PropertyMoreActionsMenuListPopper
                  isOpen={Boolean(propertyMoreActionsAnchorEl)}
                  anchorEl={propertyMoreActionsAnchorEl}
                  onClose={onClosePropertyMoreActions}
                  currentPropertyId={propertyIdMoreActions}
                />
                <NewPropertyDialogForm
                  isOpen={isNewPropertyDialogOpened}
                  onClose={closeNewPropertyDialogHandler}
                  onSubmit={addNewPropertyHandler}
                  submitting={addingProperty}
                />
              </SectionPaper>
            </Grid>
            <Grid item xs={12} className={classes.sectionGridItem}>
              <SectionPaper
                title="Attachments"
                actionButton={{
                  icon: <AddIcon />,
                  action: () => {}
                }}
              >
                <Attachments
                  attachments={item.attachments.map(attachment => ({
                    name: attachment.originalname,
                    size: attachment.size,
                    dateUploaded: attachment.dateUploaded
                  }))}
                />
              </SectionPaper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    item: state.item.item,
    fetchingItem: state.item.fetchingItem,
    updatingItemDetails: state.item.updatingItemDetails,
    addingProperty: state.item.addingProperty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItem: itemId => dispatch(actions.fetchItem(itemId)),
    onResetItem: () => dispatch(actions.resetItem()),
    onUpdateItemDetails: updatedItemDetailsData =>
      dispatch(actions.updateItemDetails(updatedItemDetailsData)),
    onAddProperty: (itemId, property) =>
      dispatch(actions.addProperty(itemId, property))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemDetailsPage));
