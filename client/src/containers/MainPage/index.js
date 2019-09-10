import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Items from '../../components/Items';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  temporarySidebar: {
    display: 'block',
    width: '100%',
    height: '100vh'
  }
});

function MainPage({ onFetchItems, items, loading }) {
  const classes = useStyles();

  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  return (
    <Grid container>
      <Grid item md={3}>
        <div className={classes.temporarySidebar} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Items items={items} />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    items: state.item.items,
    loading: state.item.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchItems: () => dispatch(actions.fetchItems())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
