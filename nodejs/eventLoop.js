/**
事件轮询机制
借助libuv（c / c++）库实现
1. timer： 定时器阶段 计时和执行到点的回调函数
2. pending callbacks 处理某些系统操作(TCP连接错误等)
3. idle prepare 准备工作
4. poll 轮询阶段（轮询队列） 先进先出、依次同步取出轮询队列中第一个回调函数执行/知道队列为空 或者 达到系统最大限制
如果队列为空，并且设置过setImmediate，直接进入下一个check阶段（未设置：停留在当前poll阶段等待，直到队列添加了回调函数）
5. check阶段，查阶段，执行setImmediate
6.close callbacks 关闭阶段，执行close事件

 *
 */

setTimeout(() => {
  console.log('setTimeout')
}, 0);

setImmediate(function (params) {
  console.log('setImmediate')
})

process.nextTick(function (params) { // 特例：任意阶段优先执行
  console.log('nextTick')
})