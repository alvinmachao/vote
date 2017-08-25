import * as Utils from "../utils/index.js";

import { push } from 'react-router-redux';
export const USERS_ALL = "USERS_ALL";
export const USERS_VOTED = "USERS_VOTED";
export const USERS_LOGIN = "USERS_LOGIN";
export const USERS_LOGIN_CLOSE = "USERS_LOGIN_CLOSE";
export const USERS_BACK = "USERS_BACK";
export const USERS_REGISTER = "USERS_REGISTER";
export const USERS_LOGINING = "USERS_LOGINING";
export const USERS_ALL_BY_ID = "USERS_ALL_BY_ID";
export const SEARCH_LIST = "SEARCH_LIST";

const getAllUser = function () {

    return {
        type: USERS_ALL,
        payload: $.ajax({
            url: Utils.URL + "getAllList",
            type: 'GET',
            dataType: "jsonp",
            jsonp: 'callback'
        })
    }
};
const getVotedUserAndTicketsByID = function (id) {
    var d = {"id": id};
    return {
        type: USERS_ALL_BY_ID,
        payload: $.ajax({
            url: Utils.URL + "getAllListById",
            type: 'GET',
            data: d,
            dataType: "jsonp",
            jsonp: 'callback'
        })
    }
};
const getVotedUSer = function (id, votedId) {
    var data1 = {id: id, votedId: votedId};
    return {
        type: USERS_VOTED,
        payload: $.ajax({
            url: Utils.URL + "vote",
            data: data1,
            type: 'GET',
            dataType: "jsonp",
            jsonp: 'callback'
        })
    }
};
const login = function () {
    return {
        type: USERS_LOGIN
    }
};
const logining = function (name, password) {
    var logData = {name: name, password: password};
    return {
        type: USERS_LOGINING,
        payload: $.ajax({
            url: Utils.URL + "login",
            data: logData,
            type: 'GET',
            dataType: "jsonp",
            jsonp: 'callback'
        })
    }
};
const CloseLogin = function () {
    return {
        type: USERS_LOGIN_CLOSE
    }
};

const Back = function () {
    return {
        type: USERS_BACK
    }
};
const register = function (obj) {
    return {
        type: USERS_REGISTER,
        payload: $.ajax({
            url: Utils.URL + "register",
            type: 'GET',
            data: {name: obj.name, password: obj.password, phone: obj.phone, des: obj.des, sex: obj.sex},
            dataType: "jsonp",
            jsonp: 'callback',
            complete: function () {
                tools.removeLoading();
            }
        })
    }
};
const getSearchListByContent = function (content) {
    var con = {content};
    return {
        type: SEARCH_LIST,
        payload: $.ajax({
            url: Utils.URL + "search",
            type: 'GET',
            data: con,
            dataType: "jsonp",
            jsonp: 'callback'
        })
    }
}
export const actionCreators = {
    getSearchListByContent,
    getVotedUserAndTicketsByID,
    register,
    Back,
    CloseLogin,
    login,
    logining,
    getVotedUSer,
    getAllUser
};


