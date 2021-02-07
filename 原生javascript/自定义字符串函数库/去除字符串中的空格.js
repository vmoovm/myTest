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