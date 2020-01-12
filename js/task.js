// 宏任务和微任务

/**
 * js：单线程/主线程
 *
 * 宏任务
 * 分类： setTimeout  setInterval（异步任务）
 * 1. 宏任务所处的队列：宏任务队列
 * 2. 第一个宏任务队列只执行一个任务，执行主线程js代码，
 * 3. 宏任务队列可以有多个任务
 * 4. 当主线程js代码(属于宏任务第一队列)执行完毕后，如果有微任务，则优先执行微任务，然后才执行宏任务
 *
 * 微任务
 * 分类： new Promise().then(回调)、 process.nextTick()
 * 1. 微任务所处的队列：微任务队列
 * 2. 只有一个微任务队列
 * 3. 在上一个宏任务队列执行完毕后，如果有微任务队列就会执行微任务队列中的所有任务；
 *
 */

//  eg
setTimeout(() => {
  console.log('settimeout')
}, 0);

new Promise((resolve, reject) => { // new promise 属于同步主线程任务
  for (let i = 0; i < 5; i++){ // 同步执行主线程任务
    console.log(i)
  }
  resolve()
}).then(() => {
  console.log('Promise回调执行完毕')
})

process.nextTick(function (params) { // 在所有任务中（仅次于主线程），优先执行
  console.log('nextTick')
})