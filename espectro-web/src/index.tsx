import * as serviceWorker from './serviceWorker';

import dva from 'dva';
import createBrowserHistory from 'history/createBrowserHistory';
import router from './router';

import "./index.css";
import realtimeModel from './models/realtime';

const app = dva({
  history: createBrowserHistory(),
});

app.model(realtimeModel);

app.router(router);

app.start('#root');

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

