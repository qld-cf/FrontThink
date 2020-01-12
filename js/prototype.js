/**
 * 对象和原型等
 */

// 实现(5).add(3).minus(2)输出

// 简易-1

Number.prototype.add = function (num) {
  return this + num
  // or => return this.valueOf()+num
}
Number.prototype.minus = function (num) {
  return this - num
  // or => return this.valueOf()-num
}
//==========================================================================================

// 优化-1  可以扩展到数字字符串类型和排除 NaN 值

Number.prototype.add = function (value) {
  let  number = parseFloat(value);
  if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new Error('请输入数字或者数字字符串～');
  };
  return this + number;
};
Number.prototype.minus = function (value) {
  let  number = parseFloat(value);
  if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new Error('请输入数字或者数字字符串～');
  }
  return this - number;
};
//==========================================================================================

// 优化-2 解决js浮点数问题

Number.MAX_SAFE_DIGITS = Number.MAX_SAFE_INTEGER.toString().length-2
Number.prototype.digits = function(){
	let result = (this.valueOf().toString().split('.')[1] || '').length
  return result > Number.MAX_SAFE_DIGITS ? Number.MAX_SAFE_DIGITS : result
// 【大数加减：直接通过 Number 原生的安全极值来进行判断，超出则直接取安全极值】
// 【超级多位数的小数加减：取JS安全极值位数-2作为最高兼容小数位数】
}
Number.prototype.add = function(i=0){
	if (typeof i !== 'number') {
        	throw new Error('请输入正确的数字');
    	}
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum + i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
Number.prototype.minus = function(i=0){
	if (typeof i !== 'number') {
        	throw new Error('请输入正确的数字');
    	}
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum - i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
//==========================================================================================

// 其他思路

let myFun = {
  add(number) {
      if (typeof number !== 'number') {
          throw new Error('请输入数字')
    }
    return this + number
  },
  minus(number) {
      if (typeof number !== 'number') {
          throw new Error('请输入数字')
    }
    return this - number
  }
}
// 挂载到原型上
Object.assign(Number.prototype, myFun)
//==========================================================================================


// 注意
// 8.add，是因为数值后面的点，会被解释为小数点，而不是点运算符。
// 将数值放在圆括号中，数字就会自动转化为基本包装类型，就可以使用点运算符调用方法了。


