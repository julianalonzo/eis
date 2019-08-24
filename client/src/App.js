import React from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import NewTemplatePage from './containers/NewTemplatePage';
import MainPage from './containers/MainPage';

function App() {
  return (
    <Container maxWidth="lg">
      <HashRouter>
        <Switch>
          <Route path="/new-template" component={NewTemplatePage} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </HashRouter>
    </Container>
  );
}

export default App;
