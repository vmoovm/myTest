/**
 * 截取数组长度
 * @param arr 数组
 * @param n1  开始数组元素
 * @param n2  结束数组元素  默认为数组的长度
 * @returns {Array} 返回截取的新数组
 *
 * getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
 * [5, 6, 7, 8, 9]
 *
 * getArrayNum([0,1,2,3,4,5,6,7,8,9],2)
 * [2, 3, 4, 5, 6, 7, 8, 9]
 *
 */
function getArrayNum(arr, n1, n2) {
    let arr1 = [], len = n2 || arr.length - 1;
    for (let i = n1; i <= len; i++) {
        arr1.push(arr[i])
    }
    return arr1;
}