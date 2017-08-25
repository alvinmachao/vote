import React from "react";
import PropTypes from "prop-types";
import "./style.less";
import ListItem from "../ListItem";
const propTypes = {
    states: PropTypes.object.isRequired
};

function SearchList({states}) {
    const {state,actions} =states;
    var lists = [];
    if (state.rootReducers.searchList && state.rootReducers.searchList.length >= 1) {
        lists = state.rootReducers.searchList.map((item, index)=> (
                <ListItem item={item} action={actions} key={index}></ListItem>
            )
        );
    }
    else if (state.rootReducers.searchList.length == 0) {
        lists = <div className="noResult">未查到任何数据</div>;
    }
    else {
        lists = <div className="loading">loading</div>;

    }
    return (

        <ul className="List">{lists}</ul>
    );
}
SearchList.propTypes = propTypes;
export default SearchList;