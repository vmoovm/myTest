/**
 * 获取一个字符在一个字符串中出现的次数 或  一个元素在一个数组中出现的次数
 * @param obj  字符串 数组
 * @param ele  字符   元素
 * @returns {number}  重复出现的次数
 *
 * getEleCount('asd56+asdasdwqe','a')
 * 3
 *
 *
 * getEleCount([1,2,3,4,5,66,77,22,55,22],22)
 * 2
 */
function getEleCount(obj, ele) {
    let num = 0;
    for (let i = 0, len = obj.length; i < len; i++) {
        if (ele == obj[i]) {
            num++;
        }
    }
    return num;
}