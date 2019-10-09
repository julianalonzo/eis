import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import useDialogState from '../../hooks/useDialogState';

import Attachments from '../../components/Attachments';
import EditItemDetailsDialogForm from '../../components/EditItemDetailsDialogForm';
import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
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
  match: { params }
}) {
  const classes = useStyles();

  const [itemId, setItemId] = useState(params.itemId || null);

  const [
    isEditItemDetailsDialogOpened,
    openEditItemDetailsDialogHandler,
    closeEditItemDetailsDialogHandler
  ] = useDialogState(false);

  useEffect(() => {
    setItemId(params.itemId || null);
  }, [params]);

  useEffect(() => {
    onFetchItem(itemId);

    return () => {
      onResetItem();
    };
  }, [itemId, onFetchItem, onResetItem]);

  if (fetchingItem) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      {item !== null ? (
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
                />
              </Grid>
              <Grid item xs={12} className={classes.sectionGridItem}>
                <SectionPaper
                  title="Properties"
                  actionButton={{
                    icon: <AddIcon />,
                    action: () => {}
                  }}
                >
                  <PropertiesSection properties={item.properties} />
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
      ) : null}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    item: state.item.item,
    fetchingItem: state.item.fetchingItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItem: itemId => dispatch(actions.fetchItem(itemId)),
    onResetItem: () => dispatch(actions.resetItem())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemDetailsPage));
