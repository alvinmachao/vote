import React from 'react';
import { render } from 'react-dom';
import store from "./store/index.js";
import Root from "./container/Root.js";
import { syncHistoryWithStore } from 'react-router-redux';
import { Route,Router,browserHistory ,hashHistory} from 'react-router'
const container = document.body.appendChild(
    document.createElement('div')
);
const history = syncHistoryWithStore(browserHistory, store);
render(
    <Root store={store} history={history}/>,
    container
);


