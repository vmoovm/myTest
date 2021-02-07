/**
 * 删除cookie
 * @param name
 */
function removeCookie(name) {
    setCookie(name, 1, -1);
}