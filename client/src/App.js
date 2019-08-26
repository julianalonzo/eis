import React from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import customTheme from './utilities/theme';

import Container from '@material-ui/core/Container';
import NewTemplatePage from './containers/NewTemplatePage';
import MainPage from './containers/MainPage';

const theme = createMuiTheme({
  ...customTheme
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <HashRouter>
          <Switch>
            <Route path="/new-template" component={NewTemplatePage} />
            <Route exact path="/" component={MainPage} />
          </Switch>
        </HashRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
