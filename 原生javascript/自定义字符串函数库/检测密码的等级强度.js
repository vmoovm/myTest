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