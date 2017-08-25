/**
 * Created by machao on 2016/12/9.
 */
;
(function () {
    var tools = {
        url: "http://139.217.6.162/data/",
        //获取服务器时间函数
        getServerTime: function () {
            var times = null;
            $.ajax({
                type: 'get',
                cache: false,
                url: tools.url + "system/getTimes",
                async: false,
                dataType: 'json',
                success: function (datas) {
                    times = datas.data.times;
                }
            });
            return times;
        },
        hideIdentifyCard8Str: function (str) {
            if (str.length == 18) {
                return str.substr(0, 6) + "********" + str.substr(14, 4);
            }
            return str.substr(0, 6) + "******" + str.substr(12, 3);

        },
        urlParse: function (str) {
            var obj = {};
            var reg = /([^=?&#]+)=([^=?&#]+)/g;
            str.replace(reg, function () {
                obj[arguments[1]] = arguments[2];
            });
            return obj;
        },
        birthDayFormat: function (str) {
            var str1 = '';
            var reg = /(\d{4})(\d{2})(\d{2})/;
            str.replace(reg, function () {
                str1 = arguments[1] + '年' + arguments[2] + '月' + arguments[3] + '日';
            });
            return str1;
        },
        getGender: function (id) {
            if (id.length == 18) {
                var ge = id.charAt(16);
                var str = Number(ge) % 2 == 0 ? "女" : "男";
                return str;
            }
            else if (id.length == 15) {
                var str = Number(id.charAt(14)) % 2 == 0 ? "女" : "男";
                return str;
            } else {
            }

        },
        getAge: function (id) {
            if (id.length == 18) {
                return new Date().getFullYear() - Number(id.substr(6, 4));
            } else {
                return new Date().getFullYear() - Number("19" + id.substr(6, 2));
            }


        },
        getAddressProvince: function (id) {
            var num = Number(id.substr(0, 2));
            if (!this.province[num]) {
                return "未知";
            }
            return this.province[num];
        },
        removeSpace: function (str) {
            if (typeof str == "undefined" || str == "") {
                return "";
            }
            var reg = /(^\s+)|(\s+$)/g;
            return str.replace(reg, "");
        },
        //判断是否是登录状态，返回时apikey
        getApikey: function (str) {
            var obj = JSON.parse(cookieRender.get(str));
            if (obj) {
                return obj.apikey;
            }
            return null;

        },
        endWith: function (str) {

        },
        addLoading: function () {
            var doc = document.documentElement || document.body;
            var bodyScrollTop=document.body.scrollTop;
            var wi = doc.clientWidth;
            var he = doc.clientHeight;
            var div = document.createElement('div');
            var di2 = document.createElement('div');
            $(di2).addClass('loading').css({
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: '-25px',
                marginTop: '-25px'
            });
            document.body.style.position = "relative";
            $(div).addClass('load').css({
                position: 'absolute',
                width: wi,
                height: he,
                background: 'rgba(255,255,255,0.6)',
                left: 0,
                top:bodyScrollTop,
                zIndex: 999,
            }).append(di2);
            $(document.body).prepend($(div));
        },
        removeLoading: function () {
            $('.load').remove();
        },
        hideThePrompt: function (ele) {
            ele.find('input').on('focus', function () {
                var font = parseFloat(window.getComputedStyle(this, null).fontSize);
                var oldHei = $(this).height();
                var p = (oldHei - font) / 2;
                $(this).css({
                    "lineHeight": font + "px",
                    'paddingTop': p,
                    "paddingBottom": p
                });
                $('.promptWhenSubmit').hide();
            })
        },
        addCommas: function (str) {
            var flag = str.indexOf(".") > 0;
            var reg = /^(\d{1,3})((\d{3})+)$/;
            if (flag) {
                var arr = str.split(".");
                return arr[0].replace(reg, function () {
                        var ar1 = arguments[1];
                        var ar2 = arguments[2];
                        return ar1 + "," + ar2.replace(/\d{3}(?!$)/g, function () {
                                return arguments[0] + ",";
                            })
                    }) + "." + arr[1];
            }
            else {
                return str.replace(reg, function () {
                    var ar1 = arguments[1];
                    var ar2 = arguments[2];
                    return ar1 + "," + ar2.replace(/\d{3}(?!$)/g, function () {
                            return arguments[0] + ",";
                        })
                });

            }
        },

        /*判断是企业还是注册号
         * 2:企业名称
         * 3：工商注册号
         * */
        enterpriseOrNum: function (str) {
            //工商注册号正则
            var reg = /^[a-zA-Z0-9]{15,18}$/;
            if (reg.test(str)) {
                return "3";
            }
            return "2";
        },
        dateToDouble: function (str) {
            if (str) {
                var reg = /(^\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
                var str2 = str.replace(reg, function (p0, p1, p2, p3) {
                    if (p2.toString().length < 2) {
                        p2 = "0" + p2.toString();
                    }
                    if (p3.toString().length < 2) {
                        p3 = "0" + p3.toString();
                    }
                    return p1.toString() + "-" + p2 + "-" + p3;
                });
                return str2;
            }
            return "";
        },
        //在每次调用api查询时候判断是客户的apikey是否过期
        checkApikey: function () {
            if (window.isShared) {
                var base = new Base64();
                apikey = base.decode(decodeURIComponent(cookieRender.get("shareid")));
                if (!apikey) {
                    window.location.href = "./login.html";
                    return;
                }
            }
        },

        verify: {
            isBankCard: function (str) {
                var reg = /^\d{16}|\d{19}$/;
                return reg.test(str);
            }
            ,
            isEmail: function (str) {
                var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                return reg.test(str);
            }
            ,
            isIdentifyCard: function (str) {
                if (str.length == 18) {
                    var reg = /\d{17}(\d|x)/i;
                    return reg.test(str);
                }
                else if (str.length == 15) {
                    var reg1 = /\d{15}/;
                    return reg1.test(str);
                } else {
                    return false;
                }

            }
            ,
            isName: function (str) {
                var reg = /^([\u4e00-\u9fa5a-zA-Z·]){1,20}$/;
                return reg.test(str);
            }
            ,
            isPhone: function (str) {
                var reg = /^\d{11}$/;
                return reg.test(str);
            },
            isFixLine: function (str) {
                //区号（通常3-4位）+号码（7-8位）
                //var reg = /^0\d{2,3}-?\d{7,8}$/;
                var reg = /^0\d{10}$/;
                return reg.test(str);
            }
            ,
            isDianXinPhone: function (str) {
                var reg = /^(133|149|153|173|177|180|181|189)\d{8}$/;
                return reg.test(str);
            },
            isEnterprise: function (str) {
                var reg = /^([\u4e00-\u9fa5a-zA-Z0-9()（）])+$/;
                return reg.test(str);
            },
            isEnterpriseOrName: function (str) {
                var reg = /^([\u4e00-\u9fa5a-zA-Z0-9()（）·])+$/;
                return reg.test(str);
            },
            isEmptyObject: function (obj) {
                for (var key in obj) {
                    return false;
                }
                return true;
            },
            isMerchantCode: function (str) {
                var reg = /^[0-9]{15}$/;
                return reg.test(str);
            },
            isDate: function (str) {
                var reg = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
                return reg.test(str);
            }


        }
    };
    var hex_sha = function (s) {
        var hexcase = 0;
        /* hex output format. 0 - lowercase; 1 - uppercase     */
        var b64pad = "";
        /* base-64 pad character. "=" for strict RFC compliance  */
        var chrsz = 8;
        /* bits per input character. 8 - ASCII; 16 - Unicode    */
        function sha1_vm_test() {
            return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
        }

        /*
         * Calculate the SHA-1 of an array of big-endian words, and a bit length
         */
        function core_sha1(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << (24 - len % 32);
            x[((len + 64 >> 9) << 4) + 15] = len;
            var w = Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                var olde = e;
                for (var j = 0; j < 80; j++) {
                    if (j < 16) w[j] = x[i + j];
                    else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = rol(b, 30);
                    b = a;
                    a = t;
                }
                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde);
            }
            return Array(a, b, c, d, e);
        }

        /*
         * Perform the appropriate triplet combination function for the current
         * iteration
         */
        function sha1_ft(t, b, c, d) {
            if (t < 20) return (b & c) | ((~b) & d);
            if (t < 40) return b ^ c ^ d;
            if (t < 60) return (b & c) | (b & d) | (c & d);
            return b ^ c ^ d;
        }

        /*
         * Determine the appropriate additive constant for the current iteration
         */
        function sha1_kt(t) {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
        }

        /*
         * Calculate the HMAC-SHA1 of a key and some data
         */
        function core_hmac_sha1(key, data) {
            var bkey = str2binb(key);
            if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
            var ipad = Array(16),
                opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
            return core_sha1(opad.concat(hash), 512 + 160);
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        /*
         * Convert an 8-bit or 16-bit string to an array of big-endian words
         * In 8-bit function, characters >255 have their hi-byte silently ignored.
         */
        function str2binb(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
            return bin;
        }

        /*
         * Convert an array of big-endian words to a string
         */
        function binb2str(bin) {
            var str = "";
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < bin.length * 32; i += chrsz)
                str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
            return str;
        }

        /*
         * Convert an array of big-endian words to a hex string.
         */
        function binb2hex(binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
            }
            return str;
        }

        /*
         * Convert an array of big-endian words to a base-64 string
         */
        function binb2b64(binarray) {
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i += 3) {
                var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                    else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                }
            }
            return str;
        }

        return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
    };

    var Base64 = function () {

        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        // public method for decoding
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }

        // private method for UTF-8 encoding
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }

        // private method for UTF-8 decoding
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    };
    window.tools = tools;
    window.hex_sha = hex_sha;
    window.Base64 = Base64;
    var initConfig = function () {
        !(function (doc, win) {
            var docEle = doc.documentElement || doc.body,
                fn = function () {
                    var width = docEle.clientWidth;
                    if (width > 640) {
                        docEle.style.fontSize = 100 + 'px';
                        return;
                    }
                    width && (docEle.style.fontSize = 100 * (width / 640) + "px");
                };
            win.addEventListener('resize', fn, false);
            doc.addEventListener("DOMContentLoaded", fn, false);
        }(document, window));
    };
    //初始化 1.配置自适应页面
    window.initConfig = initConfig;
    initConfig();
})();