/**
 * 基础算法
 */

/**
 * 1.去重
 */

// 普通
let arr = [1, 3, 4, 5, 3, 2, 2, 3];
let _arr = [];
_arr[0] = arr[0];
for (let i = 0; i < arr.length; i++){
  for (let k = 0; k < _arr.length; k++){
    if (_arr[k] === arr[i]) {
      break;
    }
    if (k === _arr.length - 1) {
      _arr.push(arr[i])
    }
  }
}
console.log(_arr)
//==========================================================================================

// es6写法

// 1-set
const array = ['🐑', 1,  2, '🐑','🐑', 3];
const uniqueSet = new Set(array);
const backToArray = [...uniqueSet];
console.log('set method-1', backToArray)

console.log('set method-2', Array.from(new Set(array)))

// 2-indexof-filter
const __arr = array.filter((item, index) => {
  return array.indexOf(item) === index;
});
console.log('indexof-filter', __arr)
// 获取重复元素
const _arrD = array.filter((item, index) => {
  return array.indexOf(item) !== index;
});
console.log('get d element', _arrD)
//==========================================================================================

// reduce

const _arrR = array.reduce((unique, item) => {
  return unique.includes(item) ? unique : [...unique, item]
}, []); // 累加器默认值为空数组
console.log('reduce method', _arrR);
//==========================================================================================

/**
 * 反转
 */
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length - 1; i++){
  let temp = arr[i];
  arr[i] = arr[arr.length - 1 - i];
  arr[arr.length - 1 - i] = temp;
}
console.log(arr)


/**
 * 冒泡排序
 * [5,4,3,2,1]
期望: [1,2,3,4,5]
按轮数进行实现 [5,4,3,2,1] => [4,3,2,1,5] => [3,2,1,4,5] => [2,1,3,4,5] => [1,2,3,4,5]
 */

var arr = [2, 3, 9, 4, 5];
// 比较轮数
function bubbleSortArr(arr) {
  let loopTimes = 0
  for (let i = 0; i < arr.length - 1; i++) { // 时间复杂度O(n*n)
    // 比较次数
    for (let j = 0; j < arr.length - 1 - i; j++) { // 需要一个临时变量作为中介 空间复杂度 O(1)
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp; // 判断大小后进行数值交换，并声明临时变量进行存储
      }
    }
    loopTimes++;
  }
  return loopTimes;
}

console.log('优化前 basic bubble sort looptimes', bubbleSortArr(arr));
console.log('优化前 basic bubble sort result', arr);
//==========================================================================================

var arr_1 = [2, 3, 9, 4, 5];

//优化
function bubbleSort(arr) {
  let loopTimes = 0
  for (let i = 0; i < arr.length - 1; i++) { // 时间复杂度O(n*n)
    let finished = true;
    // 比较次数
    for (let j = 0; j < arr.length - 1 - i; j++) { // 需要一个临时变量作为中介 空间复杂度 O(1)
      if (arr[j] > arr[j + 1]) {
        finished = false;
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp; // 判断大小后进行数值交换，并声明临时变量进行存储
      }
    }
    loopTimes++;
    if (finished) { // 本轮遍历没有发生任何一次交换，则终止循环
      break;
    }
  }
  return loopTimes;
}

console.log('优化后 looptimes', bubbleSort(arr_1))
console.log('优化后 arr result', arr_1);
//==========================================================================================

// 进一步优化
function bubbleSortClear(arr) {
  let loopTimes = 0  // 循环计数器
  let steps = 0 // 步数
  let last = arr.length - 1;
  for (let i = 0, len = arr.length; i < len; i++) {
      let finished = true // flag
      let pos = 0;
      for (let j = 0, len = last; j < len; j++) {
          if (arr[j] > arr[j + 1]) {
              finished = false;
              temp = arr[j + 1]
              arr[j + 1] = arr[j]
              arr[j] = temp
              pos = j // 使用pos位置量记录本次交换最远元素，避免遍历末尾已排好序的序列，减少遍历的总步数
          }
          steps++;
      }
      last = pos
      loopTimes++;
      if (finished)
          break
  }
  return { loopTimes, steps }
}

let arr_2 = [6, 4, 3, 5, 2, 1, 9, 10, 11, 12, 14, 15]
let res = bubbleSortClear(arr_2)

console.log('the Array after sorting:' + arr_2)
console.log('steps:' + res.steps)
console.log('loopTimes:' + res.loopTimes)





