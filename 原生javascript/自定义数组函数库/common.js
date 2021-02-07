/***********************************************************************************************************************
 *数组操作
 ***********************************************************************************************************************/

//ES6新增的Set数据结构，类似于数组，但是里面的元素都是唯一的 ，其构造函数可以接受一个数组作为参数
//let arr=[1,2,1,2,6,3,5,69,66,7,2,1,4,3,6,8,9663,8]
//let set = new Set(array);
//{1,2,6,3,5,69,66,7,4,8,9663}
//ES6中Array新增了一个静态方法from，可以把类似数组的对象转换为数组
//Array.from(set)
//[1,2,6,3,5,69,66,7,4,8,9663]
/**
 *数组去重函数
 *
 * 使用ES6的语法
 * @param arr  数组
 * @returns {Array} 结果
 */
function removeRepeatArray(arr) {
    return Array.from(new Set(arr))
}

/**
 * 打乱数组的顺序
 * @param arr  处理数组
 * @returns {Array.<T>|*} 打乱顺序的数组
 */
function upsetArr(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5
    });
}

/**
 * 求数组的最大值
 * @param arr  数组
 * @returns {*} 数组重的最大值
 */
function maxArr(arr) {
    return Math.max.apply(null, arr);
}

/**
 * 求数组的最小值
 * @param arr 数组
 * @returns {*} 数组的最小值
 */
function minArr(arr) {
    return Math.min.apply(null, arr);
}

/**
 * 求一个数组的和  基于数字数组
 * @param arr
 * @returns {number}
 */
function sumArr(arr) {
    let sumText = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
        sumText += arr[i];
    }
    return sumText
}

/**
 * 求一个数组的平均数  基于数字数组
 * @param arr 数组
 * @returns {number} 数组的平均数  返回的结果可能是多位，根据需求处理
 */
function covArr(arr) {
    let sumText = sumArr(arr);
    let covText = sumText / length;
    return covText
}


/**
 * 随机获取数组中的一个元素
 * @param arr 数组
 * @returns {*}  数组中的任意一个元素
 */
function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


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