import React from "react";
import PropTypes from "prop-types";
import "./style.less";
const propTypes = {};
function Rule(states) {
    const {state,actions} =states;
    return (

        <div className="rule_page">
            <div className="rule_top">
                <div className="r_t_l"><span></span></div>
                <div className="r_t_c">活动规则</div>
                <div className="r_t_r"><span></span></div>
            </div>
            <div className="rule_content">
                <p>一个人最多投5票</p>

                <p>只有注册账户才可以有权限投票</p>

                <p>一个账户不能重复投给同一个人</p>

                <p>用户也可以将票投给自己</p>
            </div>
            <div className="rule_back noSelect" onClick={()=>{
               actions.Back();
            }}>返回</div>
        </div>
    )

}
Rule.propTypes = propTypes;
export default Rule;