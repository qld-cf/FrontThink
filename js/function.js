/**
 * 函数功能拓展和重写
 */

/**
 * 自定义indexof/some
 */
//==========================================================================================

// 普通-1
Array.prototype.myIndexOf = function (item, start = 0) { // 考虑了start起始位置
  // Object.prototype.myIndexOf = function (item, start = 0) { // 考虑了兼容字符串
  const length = this.length;
  const startPos = start >= 0 ? start : length + start;
  if (start >= length) return -1;
  for (let i = startPos; i < length; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
//==========================================================================================

// 普通-2
function arrayIndexOf (array = [], item) { // 数组
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
}
//==========================================================================================

function stringIndexOf (str = '', subStr) { // 字符串
  if (!subStr) return -1;
  for (let i = 0; i < str.length; i++) {
    if (str.substr(i, subStr.length) === subStr) {
      return i;
    }
  }
  return -1;
}

function _indexOf(string, target) { // 字符串
	if (typeof string !== 'string') {
		throw new Error('string only');
	}
	let mt = string.match(new RegExp(target))
	return mt ? mt.index : -1;
}