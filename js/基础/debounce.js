/**
节流：函数大于某个周期后才执行
节流和防抖应用场景

节流是在一定时间内只能触发一次。防抖是一定时间内多次触发只有最后一次生效。

节流多应用在节省性能的地方，比如页面滚动/鼠标滑动，这些事件触发都是毫秒级的，所以为了节省性能，可以用节流函数控制一定时间内只触发一次，但是肉眼无感。

防抖可以多用在模糊搜索时的keyup事件，按钮的点击事件等，是为了防止事件在一定时间内多次触发导致错误。
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
