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
 * 2. 冒泡排序
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

/**
 * 3. 阶层 * 尾递归
 */

// 普通 复杂度： O(n)
const factorial1 = n => {
  if (n <= 1) return 1
  return n * factorial1(n - 1)
}

// 尾递归(尾部位置调用函数本身)优化 负责度 O(1) 效率更高 性能更好
const factorial2 = (n, total = 1) => {
  if (n <= 1) return total
  return factorial2(n - 1, total * n)
}

console.log(factorial1(3)) // 6
console.log(factorial2(3)) // 6

/**
 * 4. 二分查找
 */

 //循环不变式 guess 等于l r中间位置
const bsearch = (A, x) => {
  let l = 0
  let r = A.length - 1
  let guess
  while (l <= r) {
    console.log('find')
    guess = Math.floor((l + r) / 2)
    if (A[guess] === x) return guess
    if (A[guess] > x) r = guess - 1
    else l = guess + 1
  }
  return -1
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(bsearch(arr, 6)) // 5

/**
 * 插入排序 O(n*n)
 * 假设数组 arr 中共有 n 个元素，因为比较的话，起码要两个元素，则将要进行 n-1 轮循环。
 * 每一轮循环比较下标为 i-1、i(1 <= i <= arr.length-1) 的元素，
 * 如果后者元素 Unicode 值更大，则将后者元素先保存到一个变量中，并称该变量为「哨兵变量」。
 * 然后进入子循环。从下标为 i-1 的元素开始，每一轮子循环中，
 * 都去比较当前元素与「哨兵变量」的 Unicode 值，若当前元素更大，
 * 则直接将当前元素的值赋给后一个元素（下标加 1 的元素），然后继续下一轮子循环，
 * 直到当前元素不大于「哨兵变量」，则退出子循环，继而进行下一轮的循环。
 */
var insertSort = function(arr){
  var i, j, m, mCnt=0;
  var len = arr.length;

  for (i=1; i<len; i++) {
    if (arr[i] < arr[i-1]) {
      // 将更小的那个元素保存起来
      m = arr[i];
      for (j=i-1; arr[j]>m; j--) {
        // 往后挪
        arr[j+1] = arr[j];
        mCnt++;
      }
      console.log('移动了 '+mCnt+' 次');
      mCnt = 0;
      // 直接插入
      arr[j+1] = m;
    }
  }

  return arr;
};

insertSort([5,4,3,2,1]);
insertSort([3, 2, 1, 7, 8, 9, 0]);

/**
 * 快速排序  空间复杂度： O(nlogn)  时间复杂度： O(nlogn)
 * 把数组按最后一个元素k作为分界点，把数组一分为三。
 * 左子部分全是小于等于k的，右子部分全是大于k的，它们可以进一步递归排序，最后合并这三部分。
 * 递归处理left
   递归处理right
   合并三者结果
 */

const utils = {
  randomNum() {
    return Math.floor(Math.random() * 100)
  },
  randomArray() {
    return Array.from(Array(this.randomNum()), _ => this.randomNum())
  }
}

function quickSort(array) {
  if (array.length < 2) return array
  let pivot = array[array.length - 1]
  let left = array.filter((v, i) => v <= pivot && i != array.length -1)
  let right = array.filter(v => v > pivot)
  return [...quickSort(left), pivot, ...quickSort(right)]
}

let array = utils.randomArray()
console.log(quickSort(array))








