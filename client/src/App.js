import React from "react";

import { connect } from "react-redux";
import store from "./store";
import { setUser, signoutUser } from "./store/actions/auth";

import customTheme from "./util/theme";
import setAuthToken from "./util/setAuthToken";

import { HashRouter, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";

import AppBar from "./components/UI/AppBar";
import ItemPage from "./containers/ItemPage";
import NewTemplatePage from "./containers/NewTemplatePage";
import MainPage from "./containers/MainPage";
import NewItemPage from "./containers/NewItemPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import SelectTemplatePage from "./containers/SelectTemplatePage";
import SigninPage from "./containers/SigninPage";
import SignupPage from "./containers/SignupPage";
import TemplatePage from "./containers/TemplatePage";
import TemplatesPage from "./containers/TemplatesPage";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

const theme = createMuiTheme({
  ...customTheme
});

if (localStorage.eisToken) {
  const token = localStorage.eisToken;
  setAuthToken(token);
  const decodedToken = jwt_decode(token);

  store.dispatch(setUser(decodedToken));

  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    store.dispatch(signoutUser());
    window.location("/signin");
  }
}

function App({ isAuthenticated }) {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        {isAuthenticated ? (
          <>
            <AppBar />
            <Toolbar
              variant="dense"
              style={{ marginBottom: theme.spacing(4) }}
            />
          </>
        ) : null}
        <Container maxWidth="xl">
          <Switch>
            <Route path="/signup" component={SignupPage} />
            <Route path="/signin" component={SigninPage} />
            <ProtectedRoute
              exact
              path="/templates/:templateId"
              component={TemplatePage}
            />
            <ProtectedRoute path="/templates" component={TemplatesPage} />
            <ProtectedRoute path="/new-template" component={NewTemplatePage} />
            <ProtectedRoute
              path="/folders/:folderId/select-template"
              component={SelectTemplatePage}
            />
            <ProtectedRoute
              exact
              path="/folders/:folderId"
              component={MainPage}
            />
            <ProtectedRoute
              path="/folders/:folderId/new-item"
              component={NewItemPage}
            />
            <ProtectedRoute exact path="/items/:itemId" component={ItemPage} />
            <ProtectedRoute exact path="/" component={MainPage} />
          </Switch>
        </Container>
      </HashRouter>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(App);
