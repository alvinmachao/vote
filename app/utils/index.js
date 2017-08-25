const STORAGE = window.localStorage;
const STORAGE_KEY = 'vote';
export const URL = "http://localhost:8081/";
export function getAllData() {
    var pro = new Promise(function (resolve, reject) {
        $.ajax({
            url: URL + "getAllList",
            type: 'GET',
            dataType: "jsonp",
            jsonp: 'callback',
            success: function (data) {
                resolve(data.data);
            },
            error: function (e) {
                reject();
            },
            complete: function () {

            }
        })
    });
    return pro;

};


export function getVotedUsers(id) {
    var data = getAllData();
}
export function register() {

}

