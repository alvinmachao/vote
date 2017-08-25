import RootReducers from "../reducers/index.js";
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk'
import api from "../middleware/api.js";
import {routerMiddleware } from 'react-router-redux';
import { browserHistory} from 'react-router'
import DeferredMiddleware from 'redux-deferred';
const configureStore = preloadedState => createStore(
    RootReducers,
    preloadedState,
    applyMiddleware(DeferredMiddleware),
    applyMiddleware(routerMiddleware(browserHistory))
);

const store = configureStore();

export default store

