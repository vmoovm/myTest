/**
 * Created by Administrator on 2017/8/8.
 * zhanglei
 */


/***********************************************************************************************************************
 * www.zhanglei928.com
 *字符串操作
 *张磊
 ***********************************************************************************************************************/


/**
 *  去除字符串中的空格
 * @param str  字符串
 * @param type  类型   1-所有空格  2-前后空格  3-前空格 4-后空格
 * @returns {*}  处理之后的字符串结果
 */
function trim(str, type) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}
/**
 * 计算字符串的长度
 * @param str 字符串
 * @returns {number}  返回字符串的长度
 *
 * strlen('sadvcasdfsaf')
 * 12
 */
function strlen(str) {
    let regch = /[\u4e00-\u9fa5]/;
    let length = 0;
    for (let i = 0; i < str.length; i++) {
        if (regch.test(str.charAt(i)) == true) {
            // 中文为2个字符
            length += 2;
        } else {
            // 英文一个字符
            length += 1;
        }
    }
    return length;
}


/**
 * 字符串转化
 * @param str 字符串
 * @param type 转换类型  1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
 * @returns {*} 处理之后的字符串
 *
 * changeCase('asdasd',1)
 * Asdasd
 */
function changeCase(str, type) {
    function ToggleCase(str) {
        let itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                }
                else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                }
                else {
                    itemText += item;
                }
            });
        return itemText;
    }

    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

/**
 * 复制字符串
 * @param str  字符串
 * @param count 复制次数
 * @returns {string} 结果字符串
 *
 * repeatStr('abc',3)
 * abcabcabc
 */
function repeatStr(str, count) {
    let text = '';
    for (let i = 0; i < count; i++) {
        text += str;
    }
    return text;
}


/**
 * 替换字符串
 * @param str 字符串
 * @param AFindText 要替换的字符
 * @param ARepText 替换成什么
 * @returns {XML|string|void}
 */
function replaceAll(str, AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return str.replace(raRegExp, ARepText);
}

/**
 * 字符串替换为 *
 * @param str  字符串
 * @param regArr 字符串格式
 * @param type 替换方式
 * @param ARepText 替换字符串 （默认为*）
 * @returns {XML|string|void} 结果
 */
function replaceStr(str, regArr, type, ARepText) {
    let regtext = '', Reg = null, replaceText = ARepText || '*';
    //replaceStr('18819322663',[3,5,3],0)
    //188*****663
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        let replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    //replaceStr('asdasdasdaa',[3,5,3],1)
    //***asdas***
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        let replaceCount1 = repeatSte(replaceText, regArr[0]);
        let replaceCount2 = repeatSte(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    //replaceStr('1asd88465asdwqe3',[5],0)
    //*****8465asdwqe3
    else if (regArr.length === 1 && type == 0) {
        regtext = '(^\\w{' + regArr[0] + '})'
        Reg = new RegExp(regtext);
        let replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    //replaceStr('1asd88465asdwqe3',[5],1,'+')
    //"1asd88465as+++++"
    else if (regArr.length === 1 && type == 1) {
        regtext = '(\\w{' + regArr[0] + '}$)'
        Reg = new RegExp(regtext);
        let replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}

/**
 * 字符串检测
 * @param str 检测字符串
 * @param type 检测类型
 * @returns {boolean}  结果
 *
 * checkType('165226226326','phone')
 * false
 */
function checkType(str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default :
            return true;
    }
}


/**
 * 检测密码的等级强度
 * @param str 密码字符串
 * @returns {number}  强度等级
 *
 * checkPwd('12asdASAD')
 * 3(强度等级为3)
 */
function checkPwd(str) {
    let nowLv = 0;
    if (str.length < 6) {
        return nowLv
    }
    ;
    if (/[0-9]/.test(str)) {
        nowLv++
    }
    ;
    if (/[a-z]/.test(str)) {
        nowLv++
    }
    ;
    if (/[A-Z]/.test(str)) {
        nowLv++
    }
    ;
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    }
    ;
    return nowLv;
}


/**
 * 生成字符串
 * @param count 字符串生成总数 0-36
 * @returns {string}  结果字符串
 */
function randomNumber(count) {
    return Math.random().toString(count).substring(2);
}

/**
 * 检测一个字符在字符串中出现的次数
 * @param str 字符串
 * @param strSplit 字符
 * @returns {number} 返回出现的次数
 *
 * let strTest = 'sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
 * countStr(strTest,'blog')
 * 6
 */
function countStr(str, strSplit) {
    return str.split(strSplit).length - 1
}





