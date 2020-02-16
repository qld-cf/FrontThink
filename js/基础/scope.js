/**
 * 作用域相关
 */

// scope-1
let num1 = 55;
let num2 = 66;

function fn(num, num1) {
  num = 100;
  num1 = 100;
  num2 = 100;
}

fn(num1, num2); // 注意参数在fn作用域的改变和全局变量的改变
console.log(num1);
console.log(num2);
console.log(num);
//==========================================================================================

// scope-2 值类型和应用类型的传递

function Person(name, age, salary) { // 构造函数
  this.name = name;
  this.age = age;
  this.salary = salary;
}

function fn(person) {
  person.name = 'jack';
  person = new Person('hock', 12, 12); // 堆内存地址指向发生了变化
}

let p = new Person('snow', 11, 11); // p: 栈内存声明  new Person(): 堆内存声明，生成地址后赋值给p
console.log(p.name);
fn(p); // p地址 => person, 同时指向了new Person('snow', 11, 11)
console.log(p.name);

//==========================================================================================

/**
 * call、apply、bind
 *
 * /

/**
 * call/apply 区别和性能比较
    都是改变this指向，调整作用域, 都是原型方法
    call 按顺序传参 a.call(obj, 10, 20, 30)
    apply 传数组参数 a.apply(obj, [10, 20, 30])
    bind方法预先处理this，并未马上执行
    当传入参数超过三个以上时，call性能更好
 */

//eg
let arr = [10, 20, 30]
let obj = {}
function fn(x, y, z) { }
fn.apply(obj, arr) // => fn(10,20,30)
fn.call(obj, arr) // => fn([10,20,30])
fn.call(obj, ...arr) // => fn(10,20,30)


// console时间性能测试
// console.log('start', +new Date())
// for(let i=0;i<100000;i++){}
// console.log('end', +new Date())

//console.time('time')
// for(let i = 0;i< 1000000;i++){}
// console.timeEnd('time')
//==========================================================================================

// 循环输出和闭包应用/bind/块级作用域/自执行


for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 100)
}

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 100)
}

for (let i = 0; i < 10; i++) {
  ~function () {
    setTimeout(() => {
      console.log(i)
    }, 100)
  }()
}

var fn = function (i) { console.log(i) }
for (var i = 0; i < 10; i++) {
  setTimeout(fn.bind(null, i), 100) // 基于bind预先处理机制，将i预先传给函数
}