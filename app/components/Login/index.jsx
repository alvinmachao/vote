import React from "react";
import PropTypes from "prop-types";
import "./style.less";
import { Link} from 'react-router';

const propTypes = {};
class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    submit() {
        var b64 = new Base64();
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        password = b64.encode(password);
        this.props.states.actions.logining(name, password);
    }

    render() {
        const {state,actions} =this.props.states;

        return (

            <div className="login_container">
                <p className="login_title">请输入用户信息进行验证</p>
                <input placeholder="请输入用户信息进行验证" id="name" type="text"/>
                <input placeholder="请输入用户密码" id="password" type="password"/>
                <a href="javascript:;" className="login_submit" onClick={()=>{
             this.submit();
            }}>提交</a>

                <p className="login_bottom">没有用户名和编号？<Link
                    className="linkRegister" to="/register">请先进行报名</Link ></p>
            </div>
        );
    }

}

Login.propTypes = propTypes;
export default Login;