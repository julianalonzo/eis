import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import usePopperState from '../../../hooks/usePopperState';

import { Link } from 'react-router-dom';

import MenuListPopper from '../../UI/MenuListPopper';
import SearchBar from './SearchBar';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  AccountCircle as AccountIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  TurnedIn as TemplatesIcon
} from '@material-ui/icons/';
import {
  AppBar as MuiAppBar,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  searchBarContainer: {
    marginRight: theme.spacing(2),
    width: 400,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      width: 350
    },
    [theme.breakpoints.down('xs')]: {
      width: 250
    }
  },
  navActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  appTitleNavContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  mobileSearchContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  cancelSearchButton: {
    marginRight: theme.spacing(1)
  }
}));

function AppBar({ onSignoutUser }) {
  const theme = useTheme();
  const classes = useStyles();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [
    accountPopperAnchorEl,
    openAccountPopperHandler,
    closeAccountPopperHandler
  ] = usePopperState(null);

  const [isInMobileSearch, setIsInMobileSearch] = useState(false);

  const TemplatesLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to="/templates" {...props} />
  ));

  useEffect(() => {
    if (!matchesSm && isInMobileSearch) {
      setIsInMobileSearch(false);
    }
  }, [matchesSm, isInMobileSearch]);

  return (
    <MuiAppBar className={classes.root}>
      <Toolbar
        variant={!matchesSm ? 'dense' : undefined}
        className={classes.toolbar}
      >
        {!isInMobileSearch ? (
          <>
            <div className={classes.appTitleNavContainer}>
              <div className={classes.appTitle}>
                <Typography variant="h6" color="inherit">
                  <Link to="/" className={classes.link}>
                    EIS
                  </Link>
                </Typography>
              </div>
            </div>
            <Hidden smDown>
              <div className={classes.grow} />
            </Hidden>
            <div className={classes.navActions}>
              {matchesSm ? (
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setIsInMobileSearch(true);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              ) : (
                <div className={classes.searchBarContainer}>
                  <SearchBar />
                </div>
              )}
              <IconButton color="inherit" component={TemplatesLink}>
                <TemplatesIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={event => {
                  openAccountPopperHandler(event.currentTarget);
                }}
              >
                <AccountIcon />
              </IconButton>
            </div>
            <MenuListPopper
              isOpen={Boolean(accountPopperAnchorEl)}
              anchorEl={accountPopperAnchorEl}
              onClose={closeAccountPopperHandler}
            >
              <MenuList className={classes.menuList}>
                <MenuItem onClick={onSignoutUser}>
                  <Typography>Signout</Typography>
                </MenuItem>
              </MenuList>
            </MenuListPopper>
          </>
        ) : (
          <div className={classes.mobileSearchContainer}>
            <IconButton
              color="inherit"
              className={classes.cancelSearchButton}
              onClick={() => {
                setIsInMobileSearch(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <SearchBar />
          </div>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSignoutUser: () => dispatch(actions.signoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
