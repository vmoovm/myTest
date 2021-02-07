/**
 * 求数组的最大值
 * @param arr  数组
 * @returns {*} 数组重的最大值
 */
function maxArr(arr) {
    return Math.max.apply(null, arr);
}

/**
 * 求数组的最小值
 * @param arr 数组
 * @returns {*} 数组的最小值
 */
function minArr(arr) {
    return Math.min.apply(null, arr);
}