## js中同步任务、宏任务和微任务介绍/ 参考 md/stack.md 中的任务执行流程图
### 同步任务： 普通任务
#### 宏任务(异步任务，包括各种DOM事件) 来自于h5规范

> 分类： I/O(网络，文件，数据库I/O) setTimeout  setInterval requestAnimationFrame(下次页面重绘前所执行的操作, 浏览器环境才有) setImmediate(nodejs才有)

1. 宏任务所处的队列：宏任务队列
2. 第一个宏任务队列只执行一个任务，执行主线程js代码，
3. 宏任务队列可以有多个任务
#### 微任务(异步任务) 来自于h5规范

> 分类： new Promise().then(回调)、 process.nextTick()(nodejs才有)

1. 微任务所处的队列：微任务队列
2. 只有一个微任务队列
3. 在上一个宏任务队列执行完毕后，如果有微任务队列就会执行微任务队列中的所有任务；

> 执行顺序

当主线程js代码(属于宏任务第一队列)执行完毕后，如果有微任务，则优先执行微任务（process.nextTick优先执行），然后才执行宏任务

## nodejs事件轮询(循环)机制（宏任务）介绍(借助libuv（c / c++）库实现)

> 执行顺序：

1. timer： 定时器阶段 计时和执行到点的回调函数 settimeout
2. pending callbacks 处理某些系统操作(TCP连接错误等)
3. idle prepare 准备工作（nodejs才有）
4. poll 轮询阶段（轮询队列，可以理解为普通异步任务，如网络请求） 先进先出、依次同步取出轮询队列中第一个回调函数执行/知道队列为空 或者 达到系统最大限制
如果队列为空，并且设置过setImmediate，直接进入下一个check阶段（未设置：停留在当前poll阶段等待，直到队列添加了回调函数）
5. check阶段，查阶段，执行setImmediate（nodejs才有）
6. close callbacks 关闭阶段，执行close事件

#### 举个栗子

```
console.log('start') // 顺序1 主线程同步任务
setTimeout(() => { // 顺序6 宏任务，按照事件轮询机制执行
  console.log('setTimeout')
}, 0);

new Promise((resolve, reject) => { // new promise 属于同步主线程任务，优先执行 顺序2
  for (let i = 0; i < 5; i++){ // 同步执行主线程任务
    console.log(i)
  }
  setTimeout(() => {
    console.log('promise settimeout') // 顺序7 次于上一个异步任务
  }, 0);
  resolve()
}).then(() => {
  console.log('Promise回调执行完毕') // 顺序5 new Promise().then(回调)属于微任务 优于宏任务执行
})

setImmediate(function (params) { // 顺序8 宏任务执行，按照事件轮询机制执行
  console.log('setImmediate')
})

process.nextTick(function (params) { // 特例：在同步任务结束后，微任务如果有process.nextTick，优先执行 顺序4
  console.log('nextTick')
})

console.log('main process end') // 顺序3 主线程同步任务

// start
// 0
// 1
// 2
// 3
// 4
// main process end
// nextTick
// Promise回调执行完毕
// setTimeout
// setImmediate

/**
setImmediate 和 setTimeout 的优先级
一般根据定时器setTimeout waittime决定
 */

var t1 = +new Date();
setImmediate(function () {
    console.log('1');
});
setTimeout(function () {
    console.log('2');
},20);

console.log('3');
var t2 = +new Date();
console.log('time: ' + (t2 - t1));
//输出
// 3
// time: 23
// 2
// 1

var t1 = +new Date();
setImmediate(function () {
    console.log('1');
});
setTimeout(function () {
    console.log('2');
},30);

console.log('3');
var t2 = +new Date();
console.log('time: ' + (t2 - t1));
//输出
// 3
// time: 23
// 1
// 2
```
