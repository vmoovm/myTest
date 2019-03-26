// JavaScript Document
/*-----------------------------------------------------
合并对象
-----------------------------------------------------*/
// 合并数组  concat()
a=[1,3,6];
b=[1,3,6];
c=a.concat(b);
// console.log(c);
// 结果:
c=[1,3,6,1,3,6]

//合并字面量对象  Object.assign()(会改变目标对象本身)
var newC={
	a:'.class',
	b:'.name'
}
var oldA={
	check:'zcheck',
	checkB:'.zcheckB'
}
var newS=Object.assign(newC,oldA);
//注意目标对象自身也会改变。
// console.log(newC);{	a:'.class',	b:'.name',	check:'zcheck',	checkB:'.zcheckB'}
// console.log(newS);{	a:'.class',	b:'.name',	check:'zcheck',	checkB:'.zcheckB'}

// 函数实现合并字面量对象(不会改变任何一个目标对象本身)
var o1={a:1, b:2};
var o2={c:3, d:4};
// 把o1和o2合并起来，变成o3={a:1, b:2,c:3, d:4}
// 合并方法：
function mergeObj(o1,o2){
	var o3={};
	for(var key in o1){
		o3[key]=o1[key]
	}
	for(var key in o2){
		o3[key]=o2[key]
	}
	return o3;
}
// 调用方法：
var o3=mergeObj(o1,o2);
console.log(o1);//{a:1, b:2};
console.log(o2);//{c:3, d:4};
console.log(o3);//{a:1, b:2,c:3, d:4};

