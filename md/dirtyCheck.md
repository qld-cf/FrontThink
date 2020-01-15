
 #### angular.js
- AngularJs是mvvm框架，它的组件是vm组件，scope是vm组件的数据集合
- AngularJs通过directive来声明vm的行为，它实现为一个watcher，监听scope的属性的变化，把最新的属性更新UI
- AngularJs的双向绑定：如：一个是将$scope属性值绑定到HTML结构中，当$scope属性值发生变化的时候界面也发生变化；另一个是，当用户在界面上进行操作，例如点击、输入、选择时，自动触发$scope属性的变化（界面也可能跟着变）
- 监听scope的属性变更：脏检查(dirty check )

#### 脏检查
- angular根本不监听数据的变动，而是在恰当的时机($watch)从$rootScope开始遍历所有$scope，
- 检查它们上面的属性值是否有变化，如果有变化，就用一个变量dirty记录为true，再次进行遍历($digest)，
- 如此往复，直到某一个遍历完成时，这些$scope的属性值都没有变化时，结束遍历。
- 由于使用了一个dirty变量作为记录，因此被称为脏检查机制。

> 简而言之：

- 当作用域创建时，angular会去解析模板，将绑定值和事件调用找出来并用$watch绑定；
```
$scope.$watch(string|function, listener, objectEquality, prettyPrintExpression)
// string: 验证值或者function执行后return的string
// listener： 如果验证值不同，则执行该监听函数
// objectEquality：执行深检查
```
- 完成绑定后，就会自动检测这些属性的变化，执行$watch, 那么对应的信息被绑定到angular内部的一个$$watchers中，
- 它是一个队列（数组），而当$digest被触发时，angular就会去遍历这个数组，
- 并且用一个dirty变量记录$$watchers里面记录的那些$scope属性是否有变化
-
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
