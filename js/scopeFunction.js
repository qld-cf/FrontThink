/**
 *  函数表达式、变量提升、原型链查找，实例化查找等
 */


/**
 * 1.经典题目
 */
function Foo(params) {
  getName = function () {
    console.log(1)
  }
  return this;
}

Foo.getName = function (params) {
  console.log(2)
}

Foo.prototype.getName = function (params) {
  console.log(3)
}

var getName = function (params) {
  console.log(4)
}

function getName(params) {
  console.log(5)
}


// // 转换1=====>

// function Foo(params) {
//   getName = function () {
//     console.log(1)
//   }
//   return this;
// }

// var getName

// function getName(params) { // 与getName变量名冲突，优先保留函数，var getName会被忽略
//   console.log(5)
// }

// /****提升后 */
// Foo.getName = function (params) {
//   console.log(2)
// }

// Foo.prototype.getName = function (params) {
//   console.log(3)
// }

// getName = function (params) { // getName被重新赋值了
//   console.log(4)
// }


// // 转换2======>


// function Foo(params) {
//   getName = function () { // 全局变量的重新赋值
//     console.log(1)
//   }
//   return this; // this指向当前函数调用的对象，即window(Foo属于window)
// }

// /****提升后 */
// Foo.getName = function (params) {
//   console.log(2)
// }

// Foo.prototype.getName = function (params) {
//   console.log(3)
// }

// getName = function (params) { // getName被重新赋值了
//   console.log(4)
// }

// 输出

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // => (Foo()).getNamge() 先执行 Foo() => window.Foo()，但是它return了this(window) 则 该方法=> window.getName() output 1
getName(); // getName已经被Foo所改变  output 1
new Foo.getName(); // .的优先级最高 => new (Foo.getName)() => new (function (params) { console.log(2) }) output 2
new Foo().getName(); // => (new Foo()).getName() => foo.getName() 实例对象找属性，遵循隐式原型链查找（先找本身，没有则沿prototype,最终找到Object） =>3
new new Foo().getName(); // -> new ((new Foo()).getName)() -> new (foo.getName)() -> 3


/**
 * 2. 构造实例化方法 _new  实现new实例化的相同结果 | 内置new
 */

function Animal(name) {
  this.name = name;
}
Animal.prototype.sayName = function () {
  console.log('name', this.name);
}

// 普通： let ani = new Animal('狗子'); ani.sayName()

function _new(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype; // 声明一个空对象，它的原型链指向fn.prototype,即可让obj成为fn所属构造函数的一个实例
  // or => let obj = Object.create(fn.prototype);
  fn.call(obj, ...args); // 绑定新的obj的作用域，传递参数
  return obj;
}

let _ani = _new(Animal, '狗子');
_ani.sayName();