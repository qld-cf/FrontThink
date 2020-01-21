> angularjs实现了双向绑定，与vue的defineProperty不同，它的原理在于它的脏检查机制，以下做了一些总结；


### angular.js介绍
- AngularJs是mvvm框架，它的组件是vm组件，scope是vm组件的数据集合
- AngularJs通过directive来声明vm的行为，它实现为一个watcher，监听scope的属性的变化，把最新的属性更新UI
- AngularJs的双向绑定：如：一个是将$scope属性值绑定到HTML结构中，当$scope属性值发生变化的时候界面也发生变化；另一个是，当用户在界面上进行操作，例如点击、输入、选择时，自动触发$scope属性的变化（界面也可能跟着变）
- 监听scope的属性变更：脏检查(dirty check )

#### 脏检查
- angular根本不监听数据的变动，而是在恰当的时机($watch)从$rootScope开始遍历所有$scope，
- 检查它们上面的属性值是否有变化，如果有变化，就用一个变量dirty记录为true，再次进行遍历($digest)，
- 如此往复，直到某一个遍历完成时，这些$scope的属性值都没有变化时，结束遍历。
- 由于使用了一个dirty变量作为记录，因此被称为脏检查机制。

> 简而言之： 当作用域创建时，angular会去解析模板，将绑定值和事件调用找出来并用$watch绑定；
```
$scope.$watch(string|function, listener, objectEquality, prettyPrintExpression)
// string: 验证值或者function执行后return的string
// listener： 如果验证值不同，则执行该监听函数
// objectEquality：执行深检查
```
- 完成绑定后，就会自动检测这些属性的变化，执行$watch, 那么对应的信息被绑定到angular内部的一个$$watchers中，
- 它是一个队列（数组），而当$digest被触发时，angular就会去遍历这个数组，
- 并且用一个dirty变量记录$$watchers里面记录的那些$scope属性是否有变化

> 接下来的流程:

1. 判断dirty是否为true，如果为false，则不进行$digest递归。（dirty默认为true）
2. 遍历$$watchers，取出对应的属性值的老值和新值根据objectEquality进行新老值的对比。
3. 如果两个值不同，则继续往下执行。如果两个值相同，则设置dirty为false。
4. 检查完所有的watcher之后，如果dirty还为true, 设置dirty为true用新值代替老值;
5. 这样，在下一轮递归的时候，老值就是这一轮的新值再次调用$digest(简单说就是执行两次递归遍历检查新旧值变化)
6. 将变化后的$scope重新渲染到界面

#### $apply触发$digest

- 一般不调用$digest, 调用$apply，它内部会触发$digest递归遍历
- angular的内部指令封装了$apply，比如ng-click，所以一般不用手动调用apply

#### 手动调用apply

- 部分时候需要手动触发

```
function($timeout) {
  // 当我们通过on('click')的方式触发某些更新的时候，可以这样做
  $timeout(() => { // 内置语法糖 $http, $timeout已经包含了apply
    $scope.name = 'lily'
  })
  // 也可以这样做
  $element.on('click', () => {
    $scope.name = 'david'
    $scope.$apply()
  })
}
```

##### 注意：在递归过程中，绝对不能手动调用$apply，比如在ng-click的函数中，比如在$watch的回调函数中。

> 最后，实现一个简易脏检查机制

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>angularjs脏检查实现</title>
</head>
<style type="text/css">
  button {
    height: 60px;
    width: 100px;
  }

  p {
    margin-left: 20px;
  }
</style>

<body>
  <div>
    <button type="button" ng-click="increase">增加</button>
    <button type="button" ng-click="decrease">减少</button> 数量：
    <span ng-bind="data">0</span>
  </div>
  <br>
</body>
<script>
  window.onload = function () {
    /**
     * 声明构造函数
     */
    function Scope() {
      this.$$watchList = []; // angular内部会声明一个数组(包含监听的对象)，在digest执行时去遍历
    }

    /**
     * 属性赋值给$scope
     * 类似angular解析controller的模板，把模板中的属性解析出来，属性赋值给$scope
     */
    Scope.prototype.getNewValue = function () {
      return $scope[this.name];
    }

    /**
     * 实现监听
     */
    Scope.prototype.$watch = function (name, listener) {
      let watch = {
        name: name,
        getNewValue: this.getNewValue,
        listener: listener || function () { }
      };
      // 当作用域创建时，angular会去解析模板，$watch用来绑定监听值和监听函数
      this.$$watchList.push(watch);
    }

    /**
    * 检查dirty，循环更新scope上的最新值
    */
    Scope.prototype.$digest = function () {
      console.log('$digest');
      let dirty = true; // 默认dirty变量为true
      let checkTimes = 0;
      while (dirty) {
        dirty = this.$valScope();
        checkTimes++;
        if (checkTimes > 10 && dirty) {
          throw new Error("循环过多");
        }
      }
    }

    /**
     * 验证值是否有变化
     */
    Scope.prototype.$valScope = function () {
      let dirty;
      let list = this.$$watchList;
      for (let i = 0; i < list.length; i++) {
        let watch = list[i];
        let newValue = watch.getNewValue();
        let oldValue = watch.last || undefined;
        if (newValue !== oldValue) {
          watch.listener(newValue, oldValue);
          dirty = true; // 如果新旧值不同，则继续遍历
        } else {
          dirty = false;
        }
        watch.last = newValue;
      }
      return dirty;
    }

    /**
     * 刷新scope
     */
    Scope.prototype.$apply = function (params) {
      let list = document.querySelectorAll('[ng-bind]');
      console.log('list', list)
      for (let i = 0, l = list.length; i < l; i++) {
        let bindData = list[i].getAttribute('ng-bind');
        console.log('bindData', bindData)
        console.log('list[i]', list[i])
        list[i].innerHTML = $scope[bindData];
      }
    }

    let $scope = new Scope(); // 实例化，声明$scope对象集合
    $scope.data = 0;
    $scope.increase = function () {
      this.data++;
    };
    $scope.decrease = function () {
      this.data--;
    };

    $scope.$watch('data', function(newValue, oldValue) { // 监听
        console.log("new: " + newValue + "=========" + "old: " + oldValue);
    });


    // 手动为button按钮添加onclick事件，并为通过闭包为其绑定了全局scope对象，绑定apply方法
    // 类似angular内部实现
    function startBind() {
      let list = document.querySelectorAll('[ng-click]');
      for (let i = 0, l = list.length; i < l; i++) {
        list[i].onclick = (function (index) {
          return function () {
            let func = this.getAttribute('ng-click');
            $scope[func]($scope);
            $scope.$digest();
            $scope.$apply()
          }
        })(i)
      }
    }

    // 初始化
    startBind();
  }

</script>

</html>
```
