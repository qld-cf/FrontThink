/**
 * 节流和防抖
节流：函数大于某个周期后才执行
 */

function throttle(fn, delay) {
  let lastTime = 0;
  return function () {
    let now = Date.now();
    if (now - lastTime > delay) {
      fn.call(this); // 传递正确this、修正this指向问题
      lastTime = now; // 同步时间
    }
  }
}

// 防抖： 规定时间内，只有最后一次触发才有效，其他无效

function debounce(fn, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this);
    }, delay);
  }
}