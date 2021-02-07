/**
 * 生成字符串
 * @param count 字符串生成总数 0-36
 * @returns {string}  结果字符串
 */
function randomNumber(count) {
    return Math.random().toString(count).substring(2);
}