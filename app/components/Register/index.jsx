import React from "react";
import PropTypes from "prop-types";
import "./style.less";
const propTypes = {};
class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    submit() {
        var b64 = new Base64();
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        var rPassword = document.getElementById("rPassword").value;
        var phone = document.getElementById("phone").value;
        var des = document.getElementById("des").value;
        var sex = $("input[type='radio']").filter(":checked").val();
        if (!/^([\u4e00-\u9fa5a-zA-Z·]){1,20}$/.test(name)) {
            document.getElementById("name").nextElementSibling.style['display'] = 'block';
            document.getElementById("name").nextElementSibling.innerHTML = "请正确输入用户名";
            return;
        }
        //密码不允许存在空格
        if (/\s+/.test(password)) {
            console.log(password);
            document.getElementById("password").nextElementSibling.style['display'] = 'block';
            document.getElementById("password").nextElementSibling.innerHTML = "请正确输入密码";
            return;
        }
        if (rPassword != password) {
            document.getElementById("rPassword").nextElementSibling.style['display'] = 'block';
            document.getElementById("rPassword").nextElementSibling.innerHTML = "密码与确认密码不一致";
            return;
        }
        if (!/1\d{10}/.test(phone)) {
            document.getElementById("phone").nextElementSibling.style['display'] = 'block';
            document.getElementById("phone").nextElementSibling.innerHTML = "请正确输入手机号";
            return;
        }
        password = b64.encode(password);
        tools.addLoading();
        this.props.actions.register({"name": name, "password": password, 'phone': phone, "des": des, 'sex': sex});
    }

    render() {
        return (
            <div className="register_page">
                <img className="headImg" src="../../images/head.png"/>

                <div className="form">
                    <div className="box">
                        <label for="name">用户名：</label>
                        <input type="text" id="name" onFocus={()=>{
                        document.getElementById("name").nextElementSibling.style['display'] = 'none';
                        }} placeholder="请填写姓名"/>

                        <p className="prompt">11</p>
                    </div>
                    <div className="box">
                        <label for="password">密码：</label>
                        <input type="password" id="password" onFocus={()=>{
                        document.getElementById("password").nextElementSibling.style['display'] = 'none';
                        }} placeholder="请填写密码"/>

                        <p className="prompt">11</p>
                    </div>
                    <div className="box">
                        <label for="rPassword">确认密码：</label>
                        <input type="password" id="rPassword" onFocus={()=>{
                        document.getElementById("rPassword").nextElementSibling.style['display'] = 'none';
                        }} placeholder="请确认密码"/>

                        <p className="prompt">11</p>
                    </div>
                    <div className="box">
                        <label for="phone">手机号：</label>
                        <input type="text" id="phone" onFocus={()=>{
                        document.getElementById("phone").nextElementSibling.style['display'] = 'none';
                        }} placeholder="请填写手机号码"/>

                        <p className="prompt">11</p>

                    </div>
                    <div className="box">
                        <label for="des">自我描述：</label>
                        <input type="text" id="des" onFocus={()=>{
                        document.getElementById("des").nextElementSibling.style['display'] = 'none';
                        }} placeholder="请填写自我描述20字以内"/>

                        <p className="prompt">11</p>
                    </div>
                    <div className="box">
                        <label>性别：</label>
                        <box className="sexBox"><input name="sex" type="radio" value="1" defaultChecked/>男</box>
                        <box className="sexBox"><input name="sex" type="radio" value="2"/>女</box>
                    </div>

                </div>
                <a href="javascript:;" className="submit" onClick={()=>{this.submit()}}>提交</a>

            </div>)
    }

}


Register.propTypes = propTypes;
export default Register;