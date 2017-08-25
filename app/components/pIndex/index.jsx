import React from 'react';
import { render } from 'react-dom';
import "./style.less";
import { Link} from 'react-router';
import PIndexList from "../pIndexList/index.jsx"
import List from "../List/index.jsx"

const PropTypes = {};
class pIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var curID = "";
        try {
            curID = JSON.parse(sessionStorage.getItem('user')).ID;
        }
        catch (e) {
            var href = window.location.href;
            href = href.replace(/\/pIndex/, "");
            window.location.href = href;
        }

        this.props.actions.getVotedUserAndTicketsByID(curID);
    }

    logout() {
        sessionStorage.removeItem('user');
        var href = window.location.href;
        href = href.replace(/\/pIndex/, "");
        window.location.href = href;
    }

    render() {
        const {state,actions} =this.props;
        try {
            var user = JSON.parse(sessionStorage.getItem('user'));
            var sex = user.sex;
            var name = user.name;
            var ID = user.ID;
            var des = user.des;
        }
        catch (e) {
            return (null);
            var href = window.location.href;
            href = href.replace(/\/pIndex/, "");
            window.location.href = href;
        }
        var imgSrc = "../../../images/";
        if (sex == 1) {
            imgSrc += "boy.png";
        } else {
            imgSrc += "girl.png";
        }
        var rank = state.rootReducers.ranking == 0 ? "暂无名次" : "第" + state.rootReducers.ranking + "名";
        return (
            <div className="pIndexPage">
                <div className="index_container">
                    <img src="../../images/bg2.png" className="index_img"/>

                    <div className="pIndex_top">
                        <div className="li_f li_l">
                            <img src={imgSrc} alt=""/>
                        </div>
                        <div className="li_f li_m">
                            <div className="li_r_t">
                                <span>{name}</span><i>编号#<b>{ID}</b></i>
                            </div>

                        </div>
                        <div className="li_f li_r">
                            <div className="li_r_t">
                                <span>{rank}</span>
                                <i>{state.rootReducers.listVoted.length}票</i>
                            </div>

                        </div>
                        <p className="li_des">
                            {des}
                        </p>
                    </div>
                    <Link className="linkIndex" to="/">活动首页</Link>

                    <div className="logout" onClick={()=>{this.logout()}}>退出</div>
                </div>
                <div className="ListTitle">
                    <span></span>

                    <p>已投票的好友</p>
                    <i></i>
                </div>
                < PIndexList states={this.props}></PIndexList>
            </div>
        )
    }

}
export default pIndex;