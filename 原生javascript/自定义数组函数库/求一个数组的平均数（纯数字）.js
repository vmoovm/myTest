/**
 * 求一个数组的平均数  基于数字数组
 * @param arr 数组
 * @returns {number} 数组的平均数  返回的结果可能是多位，根据需求处理
 */
function covArr(arr) {
    let sumText = sumArr(arr);
    let covText = sumText / length;
    return covText
}