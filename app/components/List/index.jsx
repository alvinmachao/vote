import React from "react";
import PropTypes from "prop-types";
import "./style.less";
import ListItem from "../ListItem";
const propTypes = {
    states: PropTypes.object.isRequired
};

function List({states}) {
    const {state,actions} =states;
    var lists = [];
    if (state.rootReducers.list.length >= 1) {
        lists = state.rootReducers.list.map((item, index)=> (
                <ListItem item={item} action={actions} key={index}></ListItem>
            )
        );
    } else if (state.rootReducers.list.length == 0) {
        lists=<div className="noResult">暂无数据</div>
    }
    else {
        lists = <div className="Loading">loading</div>
    }
    return (
        <ul className="List">{lists}</ul>
    );
}
List.propTypes = propTypes;
export default List;