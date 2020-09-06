##### 框架路由无外乎用兼容性更好的hash实现或者是H5 History实现，与框架几个只需要做相应的封装即可


### Hash路由

带有#, 通过监听url中的hash变化来进行路由跳转
兼容性更好,在老版IE中都有运行,问题在于url中一直存在#不够美观
当 # 后面的哈希值发生变化时，不会向服务器请求数据，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面
##### 实现

```
// 初始化
class Routers {
  constructor() {
    // 以键值对的形式储存路由
    this.routes = {};
    // 当前路由的URL
    this.currentUrl = '';
  }
}

```

```
// hash储存与执行
class Routers {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
  }
  // 将path路径与对应的callback函数储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }
  // 刷新
  refresh() {
    // 获取当前URL中的hash路径
    this.currentUrl = location.hash.slice(1) || '/';
    // 执行当前hash路径的callback函数
    this.routes[this.currentUrl]();
  }
}

```

```
// 监听对应事件
class Routers {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    this.refresh = this.refresh.bind(this);
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
  }
}

```

// 路由\hash-1.html

```
// 升级: 创建一个数组history来储存过往的hash路由例如/blue,并且创建一个指针currentIndex来随着后退和前进功能移动来指向不同的hash路由
class Routers {
  constructor() {
    // 储存hash与callback键值对
    this.routes = {};
    // 当前hash
    this.currentUrl = '';
    // 记录出现过的hash
    this.history = [];
    // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    // 将当前hash路由推入数组储存
    this.history.push(this.currentUrl);
    // 指针向前移动
    this.currentIndex++;
    this.routes[this.currentUrl]();
  }
  // 后退功能
  backOff() {
    // 如果指针小于0的话就不存在对应hash路由了,因此锁定指针为0即可
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1);
    // 随着后退,location.hash也应该随之变化
    location.hash = `#${this.history[this.currentIndex]}`;
    // 执行指针目前指向hash路由对应的callback
    this.routes[this.history[this.currentIndex]]();
  }
}


window.Router = new Routers();
const content = document.querySelector('body');
const button = document.querySelector('button');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});

button.addEventListener('click', Router.backOff, false);
```

// 路由\hash-2.html



### H5: History API
[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/History)
[参考2](https://javascript.ruanyifeng.com/bom/history.html#toc6)

#### API

```
window.history.back();       // 后退
window.history.forward();    // 前进
window.history.go(-3);       // 后退三个页面

history.pushState  // 用于在浏览历史中添加历史记录,但是并不触发跳转,此方法接受三个参数
1. state:
一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
2. title：
新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
3.
url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。


history.replaceState // 方法的参数与pushState方法一模一样，区别是它修改浏览历史中当前纪录,而非添加记录,同样不触发跳转
popstate  // 每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件

```

##### 实现

```
class Routers {
  constructor() {
    this.routes = {};
    // 在初始化时监听popstate事件
    this._bindPopState();
  }
  // 初始化路由
  init(path) {
    history.replaceState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 将路径和对应回调函数加入hashMap储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 监听popstate事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}

```