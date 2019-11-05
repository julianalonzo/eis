import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useParams, withRouter } from 'react-router-dom';

import AttachmentsSection from '../../components/AttachmentsSection';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import NotesSection from '../../components/NotesSection';
import PropertiesSection from '../../components/PropertiesSection';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  sectionGridItem: {
    marginBottom: theme.spacing(6)
  }
}));

function ItemPage({
  item,
  onFetchItem,
  fetchingItem,
  onResetItem,
  onUpdateItem,
  updatingItem
}) {
  const classes = useStyles();

  const { itemId } = useParams();

  const updateItemHandler = async (
    modifiedFields,
    newThumbnails,
    newAttachments
  ) => {
    const updatedItem = {
      ...item,
      ...modifiedFields
    };

    const formData = new FormData();

    const thumbnailIds = updatedItem.thumbnails.map(thumbnail => thumbnail._id);
    const attachmentIds = updatedItem.attachments.map(
      attachment => attachment._id
    );

    formData.append('name', updatedItem.name);
    formData.append('category', updatedItem.category || '');
    formData.append('condition', updatedItem.condition || '');
    formData.append('thumbnails', JSON.stringify(thumbnailIds));
    formData.append('attachments', JSON.stringify(attachmentIds));
    formData.append('properties', JSON.stringify(updatedItem.properties));
    formData.append('notes', JSON.stringify(updatedItem.notes));

    for (const newThumbnail of newThumbnails) {
      formData.append('newThumbnails', newThumbnail);
    }

    for (const newAttachment of newAttachments) {
      formData.append('newAttachments', newAttachment);
    }

    await onUpdateItem(updatedItem._id, formData);
  };

  useEffect(() => {
    onFetchItem(itemId);

    return () => {
      onResetItem();
    };
  }, [itemId, onFetchItem, onResetItem]);

  if (fetchingItem || item === null) {
    return <LoadingIndicator />;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbs={item.folderHierarchy
            .map(folder => {
              return {
                link: `/folders/${folder._id}`,
                label: folder.name
              };
            })
            .concat({
              label: item.name
            })}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={7}>
        <Grid container>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <ItemDetailsSection
              item={item}
              onUpdate={updateItemHandler}
              updating={updatingItem}
            />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <PropertiesSection
              properties={item.properties}
              onUpdate={updateItemHandler}
              updating={updatingItem}
            />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <AttachmentsSection
              attachments={item.attachments}
              onUpdate={updateItemHandler}
              updating={updatingItem}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8} lg={4}>
        <NotesSection
          notes={item.notes}
          onUpdate={updateItemHandler}
          updating={updatingItem}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    item: state.item.item,
    fetchingItem: state.item.fetchingItem,
    updatingItem: state.item.updatingItem,
    folder: state.folder.folder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItem: itemId => dispatch(actions.fetchItem(itemId)),
    onResetItem: () => dispatch(actions.resetItem()),
    onUpdateItem: (itemId, formData) =>
      dispatch(actions.updateItem(itemId, formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemPage));
