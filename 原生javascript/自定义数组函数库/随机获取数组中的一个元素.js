/**
 * 随机获取数组中的一个元素
 * @param arr 数组
 * @returns {*}  数组中的任意一个元素
 */
function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}