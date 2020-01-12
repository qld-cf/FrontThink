/**
 * 闭包
1.理解：
密闭容器。类似set、map，用于存储数据
类似对象，存储类似key value
形成条件： 1. 函数嵌套 2.内部函数引用外部函数的局部变量
优点： 1.延长外部局部变量的生命周期 2.避免变量污染
缺点： 2.容易造成内存泄露
注意： 合理利用和销毁
 */

function fn1(params) {
  const count = 1;
  function fn2(params) {
    console.log(count)
  }
  fn2() // 执行后作用域(闭包)销毁
}

//==========================================================================================

function fn1(params) {
  const count = 1;
  return function fn2(params) {
    console.log(count)
  }
}

fn1()

//==========================================================================================

// eg

function fn(n, o) {
  console.log(o)
  // 传入n和o两个形参，
  // 表明在内部已声明了n和o
  // var n = n, o = o;
  return {
    fn: function (m) {
      return fn(m, n)
    }
  }
}
let a = fn(0) // output: undefined -> var n=0,o
a.fn(1) // -> function (m) { let m = 1; return fn(m, n) }  -> m对应n， n对应o output: 0
a.fn(2) // 0
a.fn(3) // 0
//==========================================================================================

let b = fn(0).fn(1).fn(2).fn(3)
// fn(0):undefined
// fn(0).fn(1) -> let a= fn(0);a.fn(1) : 0
// fn(0).fn(1) 返回了一个新闭包；然后调用该闭包的fn(), 如fn(0).fn(1).fn(2), 该代码执行后，n是根据前者传入的得到的
//==========================================================================================

let c = fn(0).fn(1) // undefiend、0
c.fn(2) // c为新闭包，且不变；则返回值根据 fn(0).fn(1)中的最后一个参数决定，output： 1
c.fn(3) // output: 1
