/**
 * 数组相关
 */

/**
 * 数组扁平化
 */

let arr = [1, 3, [1, 1, [3, 4]]];
arr = arr.flat(Infinity);
console.log(arr)
//==========================================================================================

/**
 * 自定义 push和pop
 */

Array.prototype.myPush = function (...rest) {
  this.splice(this.length, 0, ...rest)
  return this.length;
}

Array.prototype.myPop = function () {
  return this.splice(this.length - 1, 1)[0];
}
//==========================================================================================

/**
 * 数组合并
 */

console.log([...[1, 2], ...[3, 4]])

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2); // 更改push原型方法，往arr1绑定arr2（同时传参）
console.log(arr1) // [1,2,3,4,5,6]

arr1.concat(arr2);
//==========================================================================================


/**
 * 对象处理成指定数组
 */
// {1: 111, 2: 222, 5: 555} => [111,222,null,null,555,null]

let obj = {
  1: 111,
  2: 222,
  5: 555
}

let arr = new Array(6).fill(null).map((item, index) => {
  return obj[index + 1] || null
})

console.log(arr)

//or

obj.length = 7;
let arr = Array.from(obj).slice(1).map(item => {
  return typeof item === 'undefined' ? null : item
})
console.log(arr)

// or

let arr = new Array(6).fill(null);
Object.keys(obj).forEach(item => {
  arr[item - 1] === obj[item];
})
console.log(arr)

//==========================================================================================

/**
 * 数组交集
 */
let a = [101, 201, 601]
let b = [201, 301, 801]

let intersection = a.filter(v => b.includes(v)) // [201]

//or
let intersection = Array.from(new Set(a.filter(v => new Set(b).has(v))))
//or
let intersection = a.filter(v => new Set(b).has(v))  // [201]
//or
let intersection = a.filter(function (v) { return b.indexOf(v) > -1 }) // [201]
//or
let intersection = []
a.forEach(function (item) {
  b.forEach(function (v) {
    if (item === v) {
      intersection.push(v)
    }
  })
}) // [201]
//==========================================================================================

/**
 * 数组并集
 */
let a = [101, 201, 601]
let b = [201, 301, 801]

let union = a.concat(b.filter(v => {
  return !a.includes(v)
}
)) // [101, 201, 601, 301, 801]

// or
let union = Array.from(new Set(a.concat(b))) // [101, 201, 601, 301, 801]

// or
let union = a.concat(b.filter(function (v) {
  return a.indexOf(v) === -1
})) // [101, 201, 601, 301, 801]

//==========================================================================================

/**
 * 数组差集
 */

let difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v))  // [101, 601, 301, 801]

//or
let difference = Array.from(new Set(a.concat(b).filter(
  v => !new Set(a).has(v) || !new Set(b).has(v)
))) // [101, 601, 301, 801]

//or
let difference = a.filter(function (v) {
  return b.indexOf(v) === -1
}).concat(b.filter(function (v) {
  return a.indexOf(v) === -1
})) // [101, 601, 301, 801]
//==========================================================================================

/**
 * 手写map/filter/reduce
 */

Array.prototype.map = function (arr, mapCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr));
      // 将 mapCallback 返回的结果 push 到 result 数组中
    }
    return result;
  }
}

Array.prototype.filter = function (arr, filterCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      // 检查 filterCallback 的返回值是否是真值
      if (filterCallback(arr[i], i, arr)) {
        // 如果条件为真，则将数组元素 push 到 result 中
        result.push(arr[i]);
      }
    }
    return result; // return the result array
  }
}

Array.prototype.reduce = function (arr, reduceCallback, initialValue) {
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') {
    return []
  }
  let value = initialValue !== undefined ? initialValue : arr[0];
  for (let i = initialValue !== undefined ? initialValue : 0; i < arr.length; i++){
    value = reduceCallback(value, arr[i], i, arr);
  }
  return value;
}
//==========================================================================================

















