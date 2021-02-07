/**
 * 返回两个数之间的随机数
 * @param n1 开始值  默认为0
 * @param n2 结束值  默认为255
 * @returns {number}
 *
 * randomNumber(5,10)
 * 返回5-10的随机整数，包括5，10
 *
 * randomNumber(10)
 * 返回0-10的随机整数，包括0，10
 *
 * randomNumber()
 * 返回0-255的随机整数，包括0，255
 */
function randomNumber(n1, n2) {
    if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
    }
    else if (arguments.length === 1) {
        return Math.round(Math.random() * n1)
    }
    else {
        return Math.round(Math.random() * 255)
    }
}