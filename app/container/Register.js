import Register from '../components/Register/index.jsx';
import { connect } from 'react-redux';
import store from "../store/index.js";
import {actionCreators}  from "../actions/index.js";
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
export default connect(function (state) {
        return {};
    }
    , dispatch => ({
        actions: bindActionCreators(actionCreators, dispatch)
    })
)(Register);