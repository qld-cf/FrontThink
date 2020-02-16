/**
 * 常用的设计模式
 * 为了更好的代码重用性，可读性，可靠性，可维护性
 */

/**
 * 工厂模式
 * 工厂模式就相当于创建实例对象的new，提供一个创建对象的接口
 * 应用场景：JQuery中的$、Vue.component异步组件、React.createElement等
 */

// 某个需要创建的具体对象
class Product {
  constructor(name) {
    this.name = name
  }
  init() { }
}
// 工厂对象
class Creator {
  create(name) {
    return new Product(name)
  }
}
const creator = new Creator()
const p = creator.create(); // 通过工厂对象创建出来的具体对象

/**
 * 单例模式
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点，一般登录、购物车等都是一个单例。
 */

// 单例对象
class SingleObject {
  login() { }
}
// 访问方法
SingleObject.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new SingleObject()
    }
    return instance
  }
})()
const obj1 = SingleObject.getInstance()
const obj2 = SingleObject.getInstance()
console.log(obj1 === obj2) // true

/**
 * 适配器模式
 * 用来解决两个接口不兼容问题，由一个对象来包装不兼容的对象，比如参数转换，允许直接访问
 */

class Adapter {
  specificRequest() {
    return '德国标准插头'
  }
}
// 适配器对象，对原来不兼容对象进行包装处理
class Target {
  constructor() {
    this.adapter = new Adapter()
  }
  request() {
    const info = this.adapter.specificRequest()
    console.log(`${info} - 转换器 - 中国标准插头`)
  }
}
const target = new Target()
console.log(target.request()); // 德国标准插头 - 转换器 - 中国标准插头

/**
 * 装饰器模式
 * 在不改变对象自身的基础上，动态的给某个对象添加新的功能，同时又不改变其接口
 */

class Plane {
  fire() {
    console.log('发射普通子弹')
  }
}
// 装饰过的对象
class Missile {
  constructor(plane) {
    this.plane = plane
  }
  fire() {
    this.plane.fire(); // 调用传入对象的方法
    console.log('发射导弹')
  }
}
let plane = new Plane()
plane = new Missile(plane); // 动态传入实例对象
console.log(plane.fire()); // 依次打印 发射普通子弹 发射导弹

/**
 * 代理模式
 * 为其他对象提供一种代理，便以控制对这个对象的访问，不能直接访问目标对象
 */

class Flower {
}
// 源对象
class Jack {
  constructor(target) {
    this.target = target
  }
  sendFlower(target) {
    const flower = new Flower()
    this.target.receiveFlower(flower)
  }
}
// 目标对象
class Rose {
  receiveFlower(flower) {
    console.log('收到花: ' + flower)
  }
}
// 代理对象
class ProxyObj {
  constructor() {
    this.target = new Rose()
  }
  receiveFlower(flower) {
    this.sendFlower(flower)
  }
  sendFlower(flower) {
    this.target.receiveFlower(flower)
  }
}
const proxyObj = new ProxyObj()
const jack = new Jack(proxyObj)
jack.sendFlower(proxyObj); // 收到花：[object Object]

/**
 * 观察者模式
 * 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
 */

class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notify()
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
  attach(observer) {
    this.observers.push(observer)
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

let sub = new Subject()
let observer1 = new Observer('o1', sub)
let observer2 = new Observer('o2', sub)

sub.setState(1)
