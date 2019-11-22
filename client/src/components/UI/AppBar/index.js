import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import usePopperState from '../../../hooks/usePopperState';

import { Link } from 'react-router-dom';

import MenuListPopper from '../../UI/MenuListPopper';
import SearchBar from './SearchBar';

import { makeStyles } from '@material-ui/styles';
import {
  AccountCircle as AccountIcon,
  Menu as HamburgerIcon,
  TurnedIn as TemplatesIcon
} from '@material-ui/icons/';
import {
  AppBar as MuiAppBar,
  Hidden,
  IconButton,
  MenuItem,
  MenuList,
  Toolbar,
  Typography
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
  }
}));

function AppBar({ onSignoutUser }) {
  const classes = useStyles();

  const [
    accountPopperAnchorEl,
    openAccountPopperHandler,
    closeAccountPopperHandler
  ] = usePopperState(null);

  const TemplatesLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to="/templates" {...props} />
  ));

  return (
    <MuiAppBar className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <div className={classes.appTitle}>
          <Typography variant="h6" color="inherit">
            <Link to="/" className={classes.link}>
              EIS
            </Link>
          </Typography>
        </div>
        <Hidden smDown>
          <div className={classes.grow} />
        </Hidden>
        <div className={classes.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={classes.navActions}>
          <Hidden mdUp>
            <IconButton color="inherit">
              <HamburgerIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
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
          </Hidden>
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
        </div>
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
