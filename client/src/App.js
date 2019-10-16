import React from 'react';

import customTheme from './util/theme';

import { HashRouter, Route, Switch } from 'react-router-dom';

import AppBar from './components/UI/AppBar';
import ItemPage from './containers/ItemPage';
import NewTemplatePage from './containers/NewTemplatePage';
import MainPage from './containers/MainPage';
import NewItemPage from './containers/NewItemPage';
import SelectTemplatePage from './containers/SelectTemplatePage';
import TemplatePage from './containers/TemplatePage';
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
      <HashRouter>
        <AppBar />
        <Toolbar variant="dense" style={{ marginBottom: theme.spacing(4) }} />
        <Container maxWidth="xl">
          <Switch>
            <Route
              exact
              path="/templates/:templateId"
              component={TemplatePage}
            />
            <Route path="/templates" component={TemplatesPage} />
            <Route path="/new-template" component={NewTemplatePage} />
            <Route
              path="/folders/:folderId/select-template"
              component={SelectTemplatePage}
            />
            <Route exact path="/folders/:folderId" component={MainPage} />
            <Route path="/folders/:folderId/new-item" component={NewItemPage} />
            <Route exact path="/items/:itemId" component={ItemPage} />
            <Route exact path="/" component={MainPage} />
          </Switch>
        </Container>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
