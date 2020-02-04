/**
 * es6部分整理
 */

/**
 * 1. 箭头函数更加简洁
 * 2. 箭头的this集成函数所处的上下文，涉及到this一般用function；
 * 3. 箭头函数中没有arguments（类数组），能基于...args(剩余参数运算符)传递参数集合
 * 4. 箭头函数无法被new成实例， 它没有prototype原型（constructor），没有自身this
 */
//eg

function fn() {
  console.log('fn this', this) // window
}

fn()

let obj = {
  name: 'OBJ'
}

function fn1() {
  console.log('fn1 this', this)
}

fn1()

fn1.call(obj)
console.log('fn1.call this', fn1)

let fn2 = () => {
  console.log('fn2 this', this) // 属于所处上下文 输出：window
}

fn2.call(obj) // 在外部用call更新箭头函数的作用域，无效 输出：window
fn2()

//======================================================================================

document.body.onclick = () => {
  console.log('body this 箭头函数', this) // this: window 和定义这个箭头函数的父级上下文绑定在一起
}

var obj = {
  id: 1,
  show: () => {
    console.log(this.id)
  }
}
obj.show() // undefiend

var obj1 = {
  id: 1,
  show: function () {
    return () => {
      console.log(this.id)  // this: 父级上下文，即：指向show的作用域
    }
  }
}
obj1.show()() // 1



//=====================================================================

function fn(...args) {
  console.log(arguments) // [1, 2, 4]
  console.log(args) // [1, 2, 4]
  this.show  = function(){
    console.log(...args)
  }
}

fn(1, 2, 4)
const f = new fn(1)
f.show() // [1]

const fnn = (...args) =>{
  console.log(args)
  console.log(arguments) // Uncaught ReferenceError: arguments is not defined
  this.show  = function(){
    console.log(...args)
  }
}

fnn(1, 2, 3)
const f2 = new fnn(2)
f2.show()

