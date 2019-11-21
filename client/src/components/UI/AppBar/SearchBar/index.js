import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { useHistory } from 'react-router-dom';

import SearchResults from './SearchResults';

import { InputBase, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'relative'
  },
  searchBarPaper: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchResult: {
    position: 'absolute',
    marginTop: theme.spacing(0.25),
    padding: theme.spacing(1),
    width: '100%'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.grey[300]
  }
}));

function SearchBar({
  searchedItems = [],
  onSearchItems,
  onResetSearchedItems
}) {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState('');

  const [isSearchResultsShown, setIsSearchResultsShown] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (searchQuery !== '') {
      onSearchItems(searchQuery);
    } else {
      onResetSearchedItems();
    }
  }, [searchQuery, onSearchItems, onResetSearchedItems]);

  const openItemHandler = itemId => {
    setSearchQuery('');
    history.push(`/items/${itemId}`);
  };

  const showSearchResultsHandler = () => {
    setIsSearchResultsShown(true);
  };

  const hideSearchResultsHandler = () => {
    setIsSearchResultsShown(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.searchBarPaper} elevation={0}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase
          placeholder="Search item..."
          fullWidth
          value={searchQuery}
          onChange={event => {
            setSearchQuery(event.target.value);
          }}
          onFocus={showSearchResultsHandler}
          onBlur={hideSearchResultsHandler}
        />
      </Paper>
      {isSearchResultsShown && searchQuery !== '' ? (
        <SearchResults
          searchedItems={searchedItems}
          onOpenItem={openItemHandler}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    searchedItems: state.item.searchedItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchItems: searchQuery => dispatch(actions.searchItems(searchQuery)),
    onResetSearchedItems: () => dispatch(actions.resetSearchedItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
