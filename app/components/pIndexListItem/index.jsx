import React from "react";
import PropTypes from "prop-types";
import './style.less';
const propTypes = {
    item: PropTypes.object.isRequired
};

function PIndexListItem({item,action}) {
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
        curID = JSON.parse(sessionStorage.getItem('user')).id
    } catch (e) {
        curID = ""
    }
    return (
        <li className="ListItem clear">
            <div className="li_f li_l">
                <img src={imgSrc} alt=""/></div>
            <div className="li_f li_m">
                <div className="li_m_t">
                    <span>{name}</span><i>编号#<b>{ID}</b></i>

                </div>
            </div>
            <div className="li_r"> 投了一票</div>
        </li>
    )
}
PIndexListItem.prototype = propTypes;
export default PIndexListItem;