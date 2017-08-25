import * as Utils from "../utils/index.js";
import {SEARCH_LIST,USERS_ALL,USERS_ALL_BY_ID,USERS_LOGINING,USERS_REGISTER,USERS_VOTED,USERS_LOGIN,USERS_LOGIN_CLOSE,USERS_BACK} from "../actions/index.js";
import { combineReducers } from 'redux';
import { routerReducer as routing,routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router'

const states = {
    "list": [],
    "listVoted": [],
    "searchList": [],
    "showLogin": false,
    "loginTitle": "用户登录"

};

const rootReducers = function (state = states, action) {
    switch (action.type) {
        case USERS_ALL:
            if (action.payload.code != undefined && action.payload.code == 0) {
                var list = action.payload.data;
                list.sort(function (a, b) {
                    return b.voteID.length - a.voteID.length;
                });
                return Object.assign({}, state, {"list": list});
            }
            return state;
            break;
        case USERS_ALL_BY_ID:
            if (action.payload.code != undefined && action.payload.code == 0) {
                return Object.assign({}, state, {
                    "listVoted": action.payload.data.data,
                    ranking: action.payload.data.ranking
                });
            }
            return state;
            break;
        case USERS_VOTED:
            if (action.payload.code != undefined && action.payload.code == 0) {
                //此时同样需要更新searchList中的数据(主要是selectedIDs和voteID)
                var arr = action.payload.data;
                var searchList = state.searchList.slice();
                searchList.forEach(function (item) {
                    arr.forEach(function (item1) {
                        if (item.ID == item1.ID) {
                            item.selectedIDs = item1.selectedIDs ? item1.selectedIDs : [];
                            item.voteID = item1.voteID ? item1.voteID : [];
                        }
                    })
                });
                var list = action.payload.data;
                list.sort(function (a, b) {
                    b.voteID = b.voteID ? b.voteID : [];
                    a.voteID = a.voteID ? a.voteID : [];
                    return b.voteID.length - a.voteID.length;
                });
                return Object.assign({}, state, {"list": list, "searchList": searchList});
            }
            if (action.payload.code != undefined && action.payload.code == 2) {
                alert(action.payload.msg);
            }
            if (action.payload.code != undefined && action.payload.code == 3) {
                alert(action.payload.msg);
            }
            return state;
        case USERS_LOGIN:
            if (!state.showLogin) {
                return Object.assign({}, state, {"showLogin": true});
            }
            return state;
            break;
        case USERS_LOGIN_CLOSE:
            if (state.showLogin) {
                return Object.assign({}, state, {"showLogin": false});
            }
            return state;
            break;
        case USERS_LOGINING:
            if (action.payload.code != undefined && action.payload.code == 0) {
                sessionStorage.setItem('user', JSON.stringify(action.payload.data));
                var href = window.location.href;
                if (/\/$/.test(href)) {
                    href += "pIndex";
                } else {
                    href += "/pIndex";
                }
                window.location.href = href;
                return Object.assign({}, state, {"showLogin": false, "loginTitle": "个人中心"});
            }
            if (action.payload.code != undefined && (action.payload.code == 3 || action.payload.code == 4)) {
                alert(action.payload.msg);
                return state;
            }
            break;
        case USERS_BACK:
            browserHistory.goBack();
            return state;
            break;
        case USERS_REGISTER:
            if (action.payload.code != undefined && action.payload.code == 0) {
                alert("您的编号是" + action.payload.data.ID);
                browserHistory.goBack();
                return state;
            }
            if (action.payload.code != undefined && action.payload.code == 2) {
                alert("此名字已经存在");
                return;
            }
            return state;
            break;
        case SEARCH_LIST:
            if (action.payload.code != undefined && action.payload.code == 0) {
                return Object.assign({}, state, {
                    "searchList": action.payload.data
                });
            }
            return state;
            break;

        default:
            return state;

    }
};

const RootReducers = combineReducers({
    rootReducers,
    routing
});
export default RootReducers;