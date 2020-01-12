/**
 * 数据类型，基本类型和应用类型判断
 */

// 数据类型判断
var a = 'abc'; console.log(typeof a);//string
var b = 1; console.log(typeof b); //number
var c = false; console.log(typeof c); //boolean
console.log(typeof undefined); //undefined
console.log(typeof null); //object
console.log(typeof {});// object
console.log(typeof []);//object
console.log(typeof (function () { }));//function

// 数组类型判断
var arr = [];
arr instanceof Array;//true

// constructor属性返回对创建此对象的函数的引用。
var arr = [];
arr.constructor === Array; //true

// Object.prototype.toString(),为了每个对象都能通过 Object.prototype.toString() 来检测，需要以 Function.prototype.call() 或者 Function.prototype.apply() 的形式来调用，把需要检测的对象作为第一个参数传入。
var arr = [];
Object.prototype.toString.call(arr) === '[object Array]';//true

//其他类型判断
Object.prototype.toString.call(123) === '[object Number]';
Object.prototype.toString.call('abc') === '[object String]';
Object.prototype.toString.call(undefined) === '[object Undefined]';
Object.prototype.toString.call(true) === '[object Boolean]';
Object.prototype.toString.call(function(){}) === '[object Function]';
Object.prototype.toString.call(new RegExp()) === '[object RegExp]';
Object.prototype.toString.call(null) === '[object Null]';

//Array.isArray() 确定传递的值是否为Array。
var arr = [];
Array.isArray(arr);//true
