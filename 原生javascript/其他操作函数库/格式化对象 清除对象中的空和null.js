/**
 * 格式化对象 清除对象中的空和null
 * @param obj 对象
 * @returns {{}}  处理完之后的对象
 *
 * filterParams({a:"",b:null,c:"010",d:123})
 * Object {c: "010", d: 123}
 */
function filterParams(obj) {
    let _newPar = {};
    for (let key in obj) {
        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
}