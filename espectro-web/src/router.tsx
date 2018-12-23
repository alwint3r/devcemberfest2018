import React from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import createHashHistory from 'history/createHashHistory';

import IndexPage from './routes/IndexPage';
import withApp from './util/withApp';

function RouterConfig(routerParams: RouterAPI | undefined) {
  const history = routerParams ? routerParams.history : createHashHistory();
  
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={withApp(IndexPage)} />
      </Switch>
    </Router>

  )
}

export default RouterConfig;
