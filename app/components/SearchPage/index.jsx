import React from "react";
import PropTypes from "prop-types";
import SearchList from '../SearchList/index.jsx';
const propTypes = {};
class SearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var content = this.props.params.content;
        content = content.replace(":", "");
        this.props.actions.getSearchListByContent(content);
    }

    render() {
        return (
            <div>
                < SearchList states={this.props}></SearchList>
            </div>
        )
    }
}
SearchPage.propTypes = propTypes;
export default SearchPage;

