import React from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import usePopperState from "../../../hooks/usePopperState";

import { Link } from "react-router-dom";

import MenuListPopper from "../../UI/MenuListPopper";
import SearchBar from "./SearchBar";

import { makeStyles } from "@material-ui/styles";
import {
  AccountCircle as AccountIcon,
  Dashboard as DashboardIcon,
  TurnedIn as TemplatesIcon
} from "@material-ui/icons/";
import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  MenuItem,
  MenuList,
  Toolbar,
  Typography
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  link: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  searchBarContainer: {
    marginRight: theme.spacing(2)
  },
  desktopNav: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  navButtons: {
    marginRight: theme.spacing(4)
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
    <Box className={classes.grow}>
      <MuiAppBar className={classes.root}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <Link to="/" className={classes.link}>
              EIS
            </Link>
          </Typography>
          <Box className={classes.grow}></Box>
          <Box className={classes.desktopNav}>
            <Box className={classes.searchBarContainer}>
              <SearchBar />
            </Box>
            <Box className={classes.navButtons}>
              <IconButton color="inherit">
                <DashboardIcon />
              </IconButton>
              <IconButton color="inherit" component={TemplatesLink}>
                <TemplatesIcon />
              </IconButton>
            </Box>
            <IconButton
              color="inherit"
              onClick={event => {
                openAccountPopperHandler(event.currentTarget);
              }}
            >
              <AccountIcon />
            </IconButton>
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
          </Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar);
