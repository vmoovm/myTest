/***********************************************************************************************************************
 * 其他操作
 ***********************************************************************************************************************/

/**
 * 设置cookie
 * @param name cookie名称
 * @param value cookie值
 * @param iDay 保存天数
 */
function setCookie(name, value, iDay) {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}


/**
 * 获取cookie
 * @param name cookie的名称
 * @returns {*}
 */
function getCookie(name) {
    let arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}

/**
 * 删除cookie
 * @param name
 */
function removeCookie(name) {
    setCookie(name, 1, -1);
}

/**
 * 格式化对象 清除对象中的空和null
 * @param obj 对象
 * @returns {{}}  处理完之后的对象
 *
 * filterParams({a:"",b:null,c:"010",d:123})
 * Object {c: "010", d: 123}
 */
function filterParams(obj) {
    let _newPar = {};
    for (let key in obj) {
        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
}

/**
 * 将数组的人民币转换为大写
 * @param n 钱数
 * @returns {string} 转为大写的人民币名称
 *
 * upDigit(168752632)
 * ￥壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
 *
 * upDigit(-1682)
 * -￥壹仟陆佰捌拾贰元整
 */
function upDigit(n) {
    let fraction = ['角', '分', '厘'];
    let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    let head = n < 0 ? '￥-' : '￥';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s;
        s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}


/**
 * 获取URL参数 获取的参数为一个对象
 * @param url URL地址
 * @returns {{}}  返回一个对象
 */
function getUrlPrmt(url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
        let pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}


/**
 * 设置参数
 * @param obj 参数为一个对象
 * @returns {string} 返回一个使用&连接的字符串
 *
 * setUrlPrmt({'a':1,'b':2})
 * a=1&b=2
 */
function setUrlPrmt(obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

/**
 * 返回两个数之间的随机数
 * @param n1 开始值  默认为0
 * @param n2 结束值  默认为255
 * @returns {number}
 *
 * randomNumber(5,10)
 * 返回5-10的随机整数，包括5，10
 *
 * randomNumber(10)
 * 返回0-10的随机整数，包括0，10
 *
 * randomNumber()
 * 返回0-255的随机整数，包括0，255
 */
function randomNumber(n1, n2) {
    if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
    }
    else if (arguments.length === 1) {
        return Math.round(Math.random() * n1)
    }
    else {
        return Math.round(Math.random() * 255)
    }
}

/**
 * 随机产生颜色值
 * @returns {*}  rgb(34,60,238)  一个rgb值
 */
function randomColor() {
    //randomNumber是上面定义的函数
    //写法1
    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';

    //写法2
    //return '#'+Math.random().toString(16).substring(2).substr(0,6);

    //写法3
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += '0123456789abcdef'[randomNumber(15)];
    }
    return color;
}


/**
 * 获取到截止时间的时间
 * @param endTime  截止时间
 * @returns {string}  返回的字符串
 *
 *
 * getEndTime('2017/7/22 16:0:0')
 *
 * "剩余时间6天 2小时 28 分钟20 秒"
 */
function getEndTime(endTime) {
    let startDate = new Date();  //开始时间，当前时间
    let endDate = new Date(endTime); //结束时间，需传入时间参数
    let t = endDate.getTime() - startDate.getTime();  //时间差的毫秒数
    let d = 0, h = 0, m = 0, s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天" + h + "小时 " + m + " 分钟" + s + " 秒";
}

/**
 * 文件类型检测
 * @param url  文件路径带后缀
 * @param type 检测类型
 * @returns {boolean}  返回true false
 */
function checkFileType(url, type) {
    let url = url.toLowerCase() || '',
        type = type.toLowerCase() || '',
        point = url.lastIndexOf("."),
        filetype = url.substr(point);
    if (type.indexOf(filetype) < 0 || url == "") {
        return false;
    } else {
        return true;
    }
}