/**
 * 打乱数组的顺序
 * @param arr  处理数组
 * @returns {Array.<T>|*} 打乱顺序的数组
 */
function upsetArr(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5
    });
}