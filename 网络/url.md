
### url输入到返回

1. DNS解析域名，解析为IP地址；
- 优先读取DNS浏览器缓存
- 读取系统本地DNS缓存
- 路由器DNS缓存
- 网络运营商缓存
- 如果运营商缓存依旧无法找到ip，则进行递归搜索：.com 查找域名解析， .baidu.com查找等

2. TCP三次握手
避免浏览器和服务器发送和接收问题；保证双方通信正常；
- 第一次握手：由浏览器发起，通知服务器本地发起请求
- 第二次握手： 由服务器发起，通知浏览器我准备接收，浏览器可以发送了
- 第三次握手： 由浏览器发起，通知服务器本地即将发送请求
![ava](https://upload-images.jianshu.io/upload_images/1813550-4e1ac88364523299?imageMogr2/auto-orient/strip|imageView2/2/w/692/format/webp)

3. 发送请求
- 请求报文：HTTP协议的通信内容

![ava](https://images0.cnblogs.com/blog/347600/201302/05005904-154ba75023f849fabd457dd6d194cd98.jpg)

4. 响应报文

![ava](https://upload-images.jianshu.io/upload_images/1813550-e06f6878c868ba6b?imageMogr2/auto-orient/strip|imageView2/2/w/629/format/webp)

5. 渲染文件
- 遇见html标记，浏览器调用html解析器，解析成Token并构建dom树；
- 遇见link/style标记，调用css解析器，处理css标记并构建css树；
- 遇见script标记，调用js解析器，处理script代码(绑定事件，修改dom/css树)
- 将dom/css树合并成渲染树；
- 根据渲染树来计算布局；
- 将各个节点颜色绘制到屏幕上(渲染)

> 注意：
  五个步骤并不一定按照顺序执行；如果dom/css树被修改了，则可能执行多次布局渲染；
  实际过程中，这几个步骤会执行多次（重排和重绘）

6. 断开连接： TCP四次挥手
- 第一次：由浏览器发起，发送给服务器：请求报文发送完毕，请求关闭
- 第二次：由服务器发起，通知浏览器，报文接收完毕，准备关闭
- 第三次：由服务器发起，通知浏览器，响应报文发送完毕，准备关闭
- 第四次： 由浏览器发起，通知服务器，响应报文接收完毕，准备关闭

![ava](https://upload-images.jianshu.io/upload_images/1813550-d5ec1469a8c83008?imageMogr2/auto-orient/strip|imageView2/2/w/690/format/webp)
