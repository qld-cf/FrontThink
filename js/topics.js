/**
 * 其他题目
 */

let obj = { 100: 'test', "100": "new" };
console.log(obj) // {100: "new"} | 后者会把前者替换掉,替换value, 但key为num
let obj1 = { "100": "new", 100: 'test' };
console.log(obj1) // {100: "test"} | 后者会把前者替换掉,替换value, 但key为num

let obj2 = {}, b = '123', c = 123;
obj2[b] = 'b'; // => obj2: {'123': 'b'}
obj2[c] = 'c'; // => obj2: {'123': 'b', 123:'c'} => {123: 'c'} <=> {'123': 'c'}
console.log(obj2[b]) // c

let obj3 = {}, b = Symbol('123'), c = Symbol('123');
obj3[b] = 'b'; // Symbol为特殊类型，创建的数据是唯一， 则b!== c; 则不存在覆盖
obj3[c] = 'c'; //
console.log(obj3) // {Symbol(123): "b", Symbol(123): "c"}
console.log(obj3[b]) // b

let obj4 = {}, b = { key: '123' }, c = { key: '456' }
obj4[b] = 'b'; //对象属性不能为对象，不过该对象会通过obj.toString()转为字符串'[object Object]' => { '[object Object]': 'b' }
obj4[c] = 'c'; // { '[object Object]': 'c' }
console.log(obj4) // { '[object Object]': 'c' }
console.log(obj4[b]) // c 覆盖