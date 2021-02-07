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