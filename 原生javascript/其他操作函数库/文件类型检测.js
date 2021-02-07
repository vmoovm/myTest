/**
 * 文件类型检测
 * @param url  文件路径带后缀
 * @param type 检测类型
 * @returns {boolean}  返回true false
 */
function checkFileType(url, type) {
    let url = url.toLowerCase() || '',
        type = type.toLowerCase() || '',
        point = url.lastIndexOf("."),
        filetype = url.substr(point);
    if (type.indexOf(filetype) < 0 || url == "") {
        return false;
    } else {
        return true;
    }
}