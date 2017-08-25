import React from "react";
import PropTypes from "prop-types";
import './style.less';
const propTypes = {
    item: PropTypes.object.isRequired
};

function ListItem({item,action}) {

    var ID = item.ID;
    var des = item.des ? item.des : "xx";
    var name = item.name ? item.name : "xx";
    var selectedIDs = item.selectedIDs ? item.selectedIDs : [];
    var voteID = item.voteID ? item.voteID : [];
    var sex = item.sex;
    var imgSrc = "../../../images/";
    if (sex == 1) {
        imgSrc += "boy.png";
    } else {
        imgSrc += "girl.png";
    }
    var curID = "";
    try {
        curID = JSON.parse(sessionStorage.getItem('user')).ID;
    } catch (e) {
        curID = ""
    }
    return (
        <li className="ListItem clear">
            <div className="li_f li_ll">
                <img src={imgSrc} alt=""/></div>
            <div className="li_f li_rr">
                <div className="li_r_tt">
                    <span>{name}</span><i>编号#<b>{ID}</b></i>

                    <div>{voteID.length}票</div>
                </div>
                <div className="li_r_bb">
                    <span>{des}</span>

                    <div onClick={()=>{
                    if(curID==""){
                        action.login();
                        return;
                    }
                    action.getVotedUSer(ID,curID)}

                    }>投TA一票
                    </div>
                </div>
            </div>
        </li>
    )
}
ListItem.prototype = propTypes;
export default ListItem;