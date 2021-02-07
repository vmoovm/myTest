/**
 * 设置cookie
 * @param name cookie名称
 * @param value cookie值
 * @param iDay 保存天数
 */
function setCookie(name, value, iDay) {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}