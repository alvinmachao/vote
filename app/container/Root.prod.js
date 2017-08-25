import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router ,Route} from 'react-router'
import Index from './Index'
import SearchPage from './SearchPage'
import pIndex from './pIndex'
import Rule from './Rule'
import Register from './Register'

const Root = ({ store, history }) => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Index}/>
            <Route path="rule" component={Rule}/>
            <Route path="pIndex" component={pIndex}/>
            <Route path="register" component={Register}/>
            <Route path="search:content" component={SearchPage}/>

        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
export default Root
