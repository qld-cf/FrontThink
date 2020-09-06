### 10 个 Ajax 同时发起请求，全部返回展示结果，并且至多允许三次失败，说出设计思路

```
// 非 Promise 写法
let successCount = 0
let errorCount = 0
let datas = []
ajax(url, (res) => {
     if (success) {
         success++
         if (success + errorCount === 10) {
             console.log(datas)
         } else {
             datas.push(res.data)
         }
     } else {
         errorCount++
         if (errorCount > 3) {
            // 失败次数大于3次就应该报错了
             throw Error('失败三次')
         }
     }
})
// Promise 写法
let errorCount = 0
let p = new Promise((resolve, reject) => {
    if (success) {
         resolve(res.data)
     } else {
         errorCount++
         if (errorCount > 3) {
            // 失败次数大于3次就应该报错了
            reject(error)
         } else {
             resolve(error)
         }
     }
})
Promise.all([p]).then(v => {
  console.log(v);
});

```

### promise().then(1).then(2); promise().then(3).then(4); 这里执行顺序是1324

依次上一个then执行后，下一个链式的then才会被加入微任务，所以先执行1 3之后 才将2 4 推到微任务里