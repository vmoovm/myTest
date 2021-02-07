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