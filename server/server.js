var http = require("http"),
    url = require("url"),
    fs = require("fs");
var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    var callback = query.callback;
    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var suffixMIME = suffix === 'HTML' ? 'text/html' : (suffix === 'CSS' ? 'text/css' : 'text/javascript');
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            response.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8;'});
            response.end(conFile);
        } catch (e) {
            response.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            response.end('request file is not found!');
        }
        return;
    }

    //->数据API请求处理:客户端的JS代码中我们通过JSONP向服务器发送的请求
    var userRecord = fs.readFileSync('./data/actionRecord.json', 'utf-8');
    userRecord.length === 0 ? userRecord = '[]' : null;
    userRecord = JSON.parse(userRecord);
    //voteID表示都有谁投了当事人
    //selectedIDs表示当事人都投过谁
    var allUser = fs.readFileSync('./data/userInfo.json', 'utf-8');
    allUser.length === 0 ? allUser = '[]' : null;
    allUser = JSON.parse(allUser);

    var result = {
        code: 1,
        msg: '失败',
        data: null
    };

    var customId = null;

    //1)获取所有的客户信息
    if (pathname === '/getAllList') {
        if (allUser.length) {
            var allList = [];
            allUser.forEach(function (item1) {
                allList.push(item1);
                var isExitInuserRecord = false;
                if (userRecord.length) {
                    for (var i = 0; i < userRecord.length; i++) {
                        var item2 = userRecord[i];
                        if (item1.ID == item2.ID) {
                            isExitInuserRecord = true;
                            item1.selectedIDs = item2.selectedIDs ? item2.selectedIDs : [];
                            item1.voteID = item2.voteID ? item2.voteID : [];
                            return;
                        }
                    }
                }
                if (!isExitInuserRecord) {
                    item1.selectedIDs = [];
                    item1.voteID = [];
                }

            });
            result = {
                code: 0,
                msg: '成功',
                data: allList
            };
        }
        else {
            result = {
                code: 0,
                msg: '成功',
                data: []
            };
        }
        var callback = query.callback;
        var callbackS = callback + '(' + JSON.stringify(result) + ');';
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        //response.writeHead("Access-Control-Allow-Origin","*");
        response.end(callbackS);
        return;
    }
    //2(注册)
    if (pathname === "/register") {
        var name = query['name'];
        var password = query['password'];
        var phone = query['phone'];
        var des = query['des'];
        var sex = query['sex'];
        var nameIsExit = false;
        if (allUser.length) {
            var ID = Number(allUser[allUser.length - 1].ID) + 1;
            var user = {ID, name, password, phone, des, sex};
            allUser.forEach(function (item) {
                if (item.name == name) {
                    nameIsExit = true;
                }
            });
            if (nameIsExit) {
                var result = {
                    code: 2,
                    msg: '此名字已经存在'
                };
                callbackS = callback + '(' + JSON.stringify(result) + ');';
                response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                response.end(callbackS);
                return;
            }
            allUser.push(user);
            fs.writeFileSync('./data/userInfo.json', JSON.stringify(allUser), 'utf8');
            result = {
                code: 0,
                msg: '成功',
                data: user
            };
        }
        else {
            var user = {ID: 1, name, password, phone, des, sex};
            allUser.push(user);
            fs.writeFileSync('./data/userInfo.json', JSON.stringify(allUser), 'utf8');
            result = {
                code: 0,
                msg: '成功',
                data: user
            };
        }
        callbackS = callback + '(' + JSON.stringify(result) + ');';
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(callbackS);
    }
    //3(投票)
    if (pathname == "/vote") {
        var id = query['id'];
        var votedId = query['votedId'];
        var obj = {};
        //voteID表示都有谁投了当事人
        //selectedIDs表示当事人都投过谁
        if (allUser.length) {
            for (var i = 0; i < allUser.length; i++) {
                var item = allUser[i];
                if (votedId == item.ID) {
                    //表示在actionRecord 中是否存在这条记录
                    var bok1 = false;
                    for (var j = 0; j < userRecord.length; j++) {
                        var itemRecord = userRecord[j];
                        if (itemRecord.ID == votedId) {
                            bok1 = true;
                            if (itemRecord.selectedIDs && itemRecord.selectedIDs.length >= 5) {
                                result = {
                                    code: 3,
                                    msg: '一个人最多投5票'
                                };
                                var callbackSss = callback + '(' + JSON.stringify(result) + ');';
                                response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                                response.end(callbackSss);
                                return;
                            }
                            else if (itemRecord.selectedIDs != undefined) {
                                if (itemRecord.selectedIDs && itemRecord.selectedIDs.indexOf(id) >= 0) {
                                    //已经存在了
                                    result = {
                                        code: 2,
                                        msg: '每个人对同一个人只又一次投票机会'
                                    };
                                    var callbackSss = callback + '(' + JSON.stringify(result) + ');';
                                    response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                                    response.end(callbackSss);
                                    return;
                                }
                                else {
                                    itemRecord.selectedIDs.push(id);
                                }
                            } else {
                                itemRecord.selectedIDs = [id]
                            }
                        }
                    }
                    if (!bok1) {
                        obj.ID = votedId;
                        obj.selectedIDs = [id];
                        userRecord.push(obj);
                    }

                }
                if (item.ID == id) {
                    //表示在actionRecord 中是否存在这条记录
                    var bok = false;
                    for (var k = 0; k < userRecord.length; k++) {
                        var itemRecord2 = userRecord[k];
                        if (itemRecord2.ID == id) {
                            bok = true;
                            if (itemRecord2.voteID) {
                                if (itemRecord2.voteID && itemRecord2.voteID.indexOf(votedId) >= 0) {
                                    //已经存在了
                                    result = {
                                        code: 2,
                                        msg: '每个人对同一个人只又一次投票机会'
                                    };
                                    var callbackSsss = callback + '(' + JSON.stringify(result) + ');';
                                    response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                                    response.end(callbackSsss);
                                    return;
                                } else {
                                    itemRecord2.voteID.push(votedId);
                                }
                            } else {
                                itemRecord2.voteID = [votedId];
                            }
                        }
                    }
                    if (!bok) {
                        obj.ID = id;
                        obj.voteID = [votedId];
                        userRecord.push(obj);
                    }

                }
            }
            fs.writeFileSync('./data/actionRecord.json', JSON.stringify(userRecord), 'utf8');

            if (userRecord.length) {
                var allLists = [];
                allUser.forEach(function (item1) {
                    allLists.push(item1);
                    for (var i = 0; i < userRecord.length; i++) {
                        var item2 = userRecord[i];
                        if (item1.ID == item2.ID) {
                            item1.selectedIDs = item2.selectedIDs ? item2.selectedIDs : [];
                            item1.voteID = item2.voteID ? item2.voteID : [];
                            return;
                        }
                    }

                });
                result = {
                    code: 0,
                    msg: '成功',
                    data: allLists
                };
            }
            var callbackSs = callback + '(' + JSON.stringify(result) + ');';
            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            response.end(callbackSs);
            return;
        }
    }
    //4登录
    if (pathname == "/login") {
        var name = query['name'];
        var password = query['password'];
        var isExit = false;
        if (allUser.length) {
            allUser.forEach(function (item) {
                if (/\d+/.test(name)) {//编号登录
                    if (item.ID == name) {
                        isExit = true;
                        if (item.password == password) {
                            result = {
                                code: 0,
                                msg: '登录成功',
                                data: item
                            };
                            callbackS = callback + '(' + JSON.stringify(result) + ');';
                            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                            response.end(callbackS);
                            return;
                        } else {
                            result = {
                                code: 4,
                                msg: '密码不正确'
                            };
                            callbackS = callback + '(' + JSON.stringify(result) + ');';
                            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                            response.end(callbackS);
                            return;
                        }
                    }
                } else {//名字登录
                    if (item.name == name) {
                        isExit = true;
                        if (item.password == password) {
                            result = {
                                code: 0,
                                msg: '登录成功',
                                data: item
                            };
                            callbackS = callback + '(' + JSON.stringify(result) + ');';
                            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                            response.end(callbackS);
                            return;
                        } else {
                            result = {
                                code: 4,
                                msg: '密码不正确'
                            };
                            callbackS = callback + '(' + JSON.stringify(result) + ');';
                            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                            response.end(callbackS);
                            return;
                        }

                    }
                }
            });
            if (!isExit) {
                result = {
                    code: 3,
                    msg: '用户名或者编号不存在'
                };
            }
        } else {
            result = {
                code: 3,
                msg: '用户名或者编号不存在'
            };
        }
        var callbackS = callback + '(' + JSON.stringify(result) + ');';
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(callbackS);
    }
    //5获取给某一个用户被投票的list以及名次
    if (pathname == "/getAllListById") {
        var id = query['id'];
        var data = [];
        var voted = [];
        var ranking = 0;
        for (var i = 0; i < userRecord.length; i++) {
            var rec = userRecord[i];
            if (rec.ID == id) {
                if (rec.voteID && rec.voteID.length > 0) {
                    voted = voted.concat(rec.voteID);
                }
            }
        }
        userRecord.sort(function (a, b) {
            b.voteID = b.voteID ? b.voteID : [];
            a.voteID = a.voteID ? a.voteID : [];
            return b.voteID.length - a.voteID.length;
        });
        userRecord.forEach(function (item, index) {
            if (item.ID == id) {
                ranking = Number(index) + 1;
            }
        });

        voted.forEach(function (item) {
            allUser.forEach(function (allUserItem) {
                if (allUserItem.ID == item) {
                    data.push(allUserItem);
                }
            })
        });
        result = {
            code: 0,
            msg: '成功',
            data: {data, ranking}
        };
        callbackS = callback + '(' + JSON.stringify(result) + ');';
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(callbackS);
    }
    //6获取搜索列表
    if (pathname == '/search') {
        var content = query['content'];
        var isNum = false;
        if (/\d+/.test(content)) {
            //表示搜索的是编号
            isNum = true;
        } else {
            //表示搜索的是名字
            isNum = false;
        }
        var allList = [];
        allUser.forEach(function (item1) {
            if (isNum) {
                if (item1.ID == content) {
                    allList.push(item1);
                }
            } else {
                if (item1.name.indexOf(content) >= 0) {
                    allList.push(item1);
                }
            }
        });
        allList.map(function (item) {
            for (var i = 0; i < userRecord.length; i++) {
                var item2 = userRecord[i];
                if (item.ID == item2.ID) {
                    item.selectedIDs = item2.selectedIDs;
                    item.voteID = item2.voteID;

                    return;
                }
            }
            return item;
        });
        result = {
            code: 0,
            msg: '成功',
            data: allList
        };
        var callback = query.callback;
        var callbackS = callback + '(' + JSON.stringify(result) + ');';
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(callbackS);
        return;
    }
    response.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
    response.end('request url is not found!');
});
server1.listen(8081, function () {
    console.log("server is success,listening on 8081 port!");
});