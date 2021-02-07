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