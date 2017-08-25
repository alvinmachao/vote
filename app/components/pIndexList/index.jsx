import React from "react";
import PropTypes from "prop-types";
import "./style.less";
import PIndexListItem from "../pIndexListItem/index.jsx";
const propTypes = {
    states: PropTypes.object.isRequired
};

function PIndexList({states}) {
    const {state,actions} =states;
    var lists = [];
    if (state.rootReducers.listVoted && state.rootReducers.listVoted.length >= 1) {

        lists = state.rootReducers.listVoted.map((item, index)=> (
                <PIndexListItem item={item} action={actions} key={index}></PIndexListItem>
            )
        );
    }
    else if (state.rootReducers.listVoted.length == 0) {
        lists = <p className="noResult">暂无支持者</p>
    }
    else {
        lists = <div className="Loading">loading</div>;
    }
    return (
        <ul className="List">{lists}</ul>
    );
}
PIndexList.propTypes = propTypes;
export default PIndexList;



