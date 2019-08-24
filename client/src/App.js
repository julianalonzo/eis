import React from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import MainPage from './containers/MainPage';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
