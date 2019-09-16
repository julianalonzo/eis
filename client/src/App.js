import React from 'react';

import customTheme from './util/theme';

import { HashRouter, Route, Switch } from 'react-router-dom';

import AppBar from './components/UI/AppBar';
import NewTemplatePage from './containers/NewTemplatePage';
import MainPage from './containers/MainPage';
import NewItemPage from './containers/NewItemPage';
import SelectTemplatePage from './containers/SelectTemplatePage';
import TemplatesPage from './containers/TemplatesPage';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

const theme = createMuiTheme({
  ...customTheme
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Toolbar />
      <Container maxWidth="lg">
        <HashRouter>
          <Switch>
            <Route path="/templates" component={TemplatesPage} />
            <Route path="/new-template" component={NewTemplatePage} />
            <Route
              path="/folders/:folderId/select-template"
              component={SelectTemplatePage}
            />
            <Route path="/folders/:folderId/new-item" component={NewItemPage} />
            <Route path="/folders/:folderId" component={MainPage} />
            <Route exact path="/" component={MainPage} />
          </Switch>
        </HashRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
