/**
 * 删除值为'val'的数组元素
 * @param arr 数组
 * @param val 删除的元素
 * @param type 删除的类型  默认为完全匹配  加% 关键字匹配哦
 *
 *
 * removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
 * ["aaa"]   带有'test'的都删除
 *
 * removeArrayForValue(['test','test1','test2','test','aaa'],'test')
 * ["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
 */
function removeArrayForValue(arr, val, type) {
    arr.filter(function (item) {
        return type === '%' ? item.indexOf(val) !== -1 : item !== val
    })
}