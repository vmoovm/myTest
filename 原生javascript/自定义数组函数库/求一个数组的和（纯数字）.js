/**
 * 求一个数组的和  基于数字数组
 * @param arr
 * @returns {number}
 */
function sumArr(arr) {
    let sumText = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
        sumText += arr[i];
    }
    return sumText
}
