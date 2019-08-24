import React from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import NewTemplatePage from './containers/NewTemplatePage';
import MainPage from './containers/MainPage';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/new-template" component={NewTemplatePage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
