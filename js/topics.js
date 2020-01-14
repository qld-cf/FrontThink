/**
 * 一些题目
 */


/**
 * 对象相关
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


/**
 * topic-1
 * 定义一个函数
  function repeat (func, times, wait) {}
  这个函数能返回一个新函数，比如这样用
  var repeatedFun = repeat(console.log, 10, 5000)
  调用这个 repeatedFun ("hellworld")
  会alert十次 helloworld, 每次间隔5秒
 */

function repeat(func, times, wait) {
  //不用匿名函数是为了方便调试
  function repeatImpl() { // or return function(){}
    var handle,
      _arguments = arguments,
      i = 0;
    handle = setInterval(function () {
      i = i + 1;
      //到达指定次数取消定时器
      if (i === times) {
        clearInterval(handle);
        return;
      }
      func.apply(null, _arguments);
    }, wait);
  }
  return repeatImpl;
}

// function repeat(fn, times, wait) {
//   return function () {
//     let handle, _args = arguments, i = 0;
//     handle = setInterval(() => {
//       i++;
//       if (i === times) {
//         clearInterval(handle)
//         return;
//       }
//       fn.call(null, _args)
//     }, wait);
//   }
// }

//测试用例
var repeatFun = repeat(console.log, 4, 3000);
repeatFun("hellworld");

