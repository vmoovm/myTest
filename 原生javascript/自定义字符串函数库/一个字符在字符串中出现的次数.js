/**
 * 检测一个字符在字符串中出现的次数
 * @param str 字符串
 * @param strSplit 字符
 * @returns {number} 返回出现的次数
 *
 * let strTest = 'sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
 * countStr(strTest,'blog')
 * 6
 */
function countStr(str, strSplit) {
    return str.split(strSplit).length - 1
}