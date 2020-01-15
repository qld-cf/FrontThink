/**
 * angular.js 脏检查机制 伪代码
 */

import { isEqual } from 'lodash'

class Scope {
  constructor() {
    this.$$dirty = true
    this.$$count = 0
    this.$$watchers = []
  }
  $watch(property, listener, deepEqual) {
    let watcher = {
      property,
      listener,
      deepEqual,
    }
    this.$$watchers.push(watcher)
  }
  $digest() {
    if (this.$$count >= 10) {
      throw new Error('$digest超过10次')
    }

    this.$$watchers.forEach(watcher => {
      let newValue = eval('return this.' + watcher.property)
      let oldValue = watcher.oldValue
      if (watcher.deepEqual && isEqual(newValue, oldValue)) {
        watcher.dirty = false
      }
      else if (newValue === oldValue) {
        watcher.dirty = false
      }
      else {
        watcher.dirty = true
        eval('this.' + watcher.property + ' = ' + newValue)
        watcher.listener(newValue, oldValue) // 注意，listener是在newValue赋值给$scope之后执行的
        watcher.oldValue = newValue
      }
      // 这里的实现和angular逻辑里面有一点不同，angular里面，当newValue和oldValue都为undefined时，listener会被调用，可能是angular里面在$watch的时候，会自动给$scope加上原本没有的属性，因此认为是一次变动
    })

    this.$$count ++

    this.$$dirty = false
    for (let watcher of this.$$watchers) {
      if (watcher.dirty) {
        this.$$dirty = true
        break
      }
    }

    if (this.$$dirty) {
      this.$digest()
    }
    else {
       this.$patch()
       this.$$dirty = true
       this.$$count = 0
    }
  }
  $apply() {
    if (this.$$count) {
      return // 当$digest执行的过程中，不能触发$apply
    }
    this.$$dirty = true
    this.$$count = 0
    this.$digest()
  }
  $patch() {
    // 重绘界面
  }
}

function ControllerRegister(controllerTemplate, controllerFunction) {
  let $scope = new Scope()
  $paser(controllerTemplate, $scope) // 解析controller的模板，把模板中的属性全部都解析出来，并且把这些属性赋值给$scope
  controllerFunction($scope) // 在controllerFunction内部可能又给$scope添加了一些属性，注意，不能在运行controllerFunction的时候调用$scope.$apply()

  let properties = Object.keys($scope) // 找出$scope上的所有属性
  // 要把$scope上的一些内置属性排除掉
  properties = properties.filter(item => item.indexOf('$') !== 0) // 当然，这种排除方法只能保证在用户不使用$作为属性开头的时候有用

  properties.forEach(property => {
    $scope.$watch(property, () => {}, true)
  })

  $scope.$digest()
}