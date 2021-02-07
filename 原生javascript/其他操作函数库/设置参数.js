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