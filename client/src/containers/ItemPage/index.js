import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

import AttachmentsSection from '../../components/AttachmentsSection';
import ItemDetailsSection from '../../components/ItemDetailsSection';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import PropertiesSection from '../../components/PropertiesSection';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import NotesSection from '../../components/NotesSection';

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
  match: { params }
}) {
  const classes = useStyles();

  const [itemId, setItemId] = useState(params.itemId || null);

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
    <Grid container spacing={4}>
      <Grid item xs={12} md={8} lg={7}>
        <Grid container>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <ItemDetailsSection item={item} />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <PropertiesSection properties={item.properties} itemId={item._id} />
          </Grid>
          <Grid item xs={12} className={classes.sectionGridItem}>
            <AttachmentsSection
              itemId={item._id}
              attachments={item.attachments}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8} lg={4}>
        <NotesSection itemId={item._id} notes={item.notes} />
      </Grid>
    </Grid>
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
)(withRouter(ItemPage));
