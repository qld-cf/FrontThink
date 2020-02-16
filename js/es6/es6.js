/**
 * es6部分整理
 */

/**
 * 1. 箭头函数更加简洁
 * 2. 箭头的this集成函数所处的上下文，涉及到this一般用function；（call apply依旧无法改变this指向）
 * 3. 箭头函数中没有arguments（类数组），能基于...args(剩余参数运算符)传递参数集合
 * 4. 箭头函数无法被new成实例， 它没有prototype原型（constructor），没有自身this
 */
//eg

let obj = {
  name: 'OBJ'
}

function fn1() {
  console.log(this)
}

fn1.call(obj)
console.log(fn1)

let fn2 = () => {
  console.log(this) // 属于所处上下文
}

fn2.call(obj)
console.log(fn2)

//======================================================================================

document.body.onclick = () => {
  console.log(this) // this: window
}

document.body.onclick = function () {
  console.log(this) // this: body
  someArr.sort(function (a, b) {
    return a - b; // this: window 回调函数中this一般指window；
    // 可通过call等改变this
  })
  someArr.sort((a, b) => {
    return a - b; // this: 上下文中的body
  })
}

//=====================================================================

function fn(...args) {
  console.log(args)
}

console.log(fn(1,2,4))
