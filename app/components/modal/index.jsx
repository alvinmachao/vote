import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import  './style.less';
import Login from "../Login/index.jsx";
import { Link} from 'react-router';
const defaultProps = {}

const propTypes = {}

export class Modal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {actions} =this.props.states;
        return (
            <div>
                <div className="m-mask"></div>

                <div className="m-dialog">
                    <div className="md-dialog">
                        <div className="md-dialog-title">
                            <span className="btn">
                                <i className="iconfont" onClick={()=>{
                    actions.CloseLogin();
                    }}>&times;</i>
                            </span>
                        </div>
                        <div className="md-dialog-content">
                            {
                                React.Children.map(this.props.children, function (item) {
                                    return item;
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

Modal.defaultProps = defaultProps
Modal.propTypes = propTypes


export default class extends Component {
    appendMaskIntoDoc() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Modal {...this.props}>
                {this.props.children}
            </Modal>,
            this.container
        )
    }

    componentDidMount() {
        this.container = document.createElement('div')
        document.body.appendChild(this.container)
        this.appendMaskIntoDoc()
    }

    componentDidUpdate() {
        this.appendMaskIntoDoc()
    }

    componentWillUnmount() {
        document.body.removeChild(this.container)
    }

    render() {
        return null
    }
}