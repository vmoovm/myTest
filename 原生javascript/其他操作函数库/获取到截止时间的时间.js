/**
 * 获取到截止时间的时间
 * @param endTime  截止时间
 * @returns {string}  返回的字符串
 *
 *
 * getEndTime('2017/7/22 16:0:0')
 *
 * "剩余时间6天 2小时 28 分钟20 秒"
 */
function getEndTime(endTime) {
    let startDate = new Date();  //开始时间，当前时间
    let endDate = new Date(endTime); //结束时间，需传入时间参数
    let t = endDate.getTime() - startDate.getTime();  //时间差的毫秒数
    let d = 0, h = 0, m = 0, s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天" + h + "小时 " + m + " 分钟" + s + " 秒";
}