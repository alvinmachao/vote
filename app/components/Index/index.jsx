import React from 'react';
import { render } from 'react-dom';
import List from '../List/index.jsx';
import Login from '../Login/index.jsx';
import Search from '../Search/index.jsx';
import "./style.less";
import Modal from '../modal/index.jsx';
import { Link} from 'react-router';

const PropTypes = {};
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getAllUser();
    }

    login() {
        var curID = "";
        try {
            curID = JSON.parse(sessionStorage.getItem('user')).ID;
        }
        catch (e) {
        }
        if (curID !== "") {
            var href = window.location.href;
            if (/\/$/.test(href)) {
                href += "pIndex";
            } else {
                href += "/pIndex";
            }
            window.location.href = href;
            return;
        }

        //document.body.appendChild(<Login></Login>);
        this.props.actions.login();
    }

    render() {
        var loginName = "用户登录";
        var curID = "";
        try {
            curID = JSON.parse(sessionStorage.getItem('user')).ID;
        }
        catch (e) {
        }
        if (curID !== "") {
            loginName = "个人中心"
        }
        const {state,actions} =this.props;
        var modal = <div></div>;
        if (state.rootReducers.showLogin) {
            modal = <Modal states={this.props}>
                <Login states={this.props}></Login>
            </Modal>;
        }
        return (
            <div className="IndexPage">
                <div className="index_container">
                    <div className="Index_top">
                        <a href="javascript:;" className="login" onClick={()=>{
                    this.login();
                    }}>{loginName}</a>
                        <Link className="rule" to="/rule">活动规则</Link>
                    </div>
                    <div className="index_img">
                        <img src="../../images/top.png"/>
                    </div>
                    <div className="index_register"><Link className="linkRegister" to="/register">我要报名</Link>
                    </div>
                    <Search states={this.props}></Search>
                </div>

                < List states={this.props}></List>
                {modal}

            </div>
        )
    }

}
export default Index;