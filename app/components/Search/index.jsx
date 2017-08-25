import React from "react";
import PropTypes from "prop-types";
import "./style.less";
const propTypes = {
    states: PropTypes.object.isRequired
};
class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    searchHandle() {
        var content = document.getElementById("searchInput").value;
        var reg = /\s^|\s$/;
        content = content.replace(reg, "");
        if (content == "") {
            return;
        }
        var href = window.location.href;
        if (/\/$/.test(href)) {
            href += "search:" + content;
        } else {
            href += "/search" + content;
        }
        window.location.href = href;
    }

    render() {
        return (
            <div className="SearchBox">
                <input type="text" id="searchInput"/><a href="javascript:;" onClick={()=>{
                this.searchHandle();
                }}>搜索</a>
            </div>
        )
    }

}
Search.propTypes = propTypes;
export default Search;