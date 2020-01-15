#### GET/POST区别

1. GET不安全 POST相对安全
2. GET会产生不可控制的缓存，POST不会（resolve:
```
xhr.open('GET', `/temp/list?lx=1000&_=${Math.random()}`);
```
）
3. GET请求参数会被完整保留在浏览器历史记录中，而POST不会
4. GET请求只能进行url编码，而POST支持多种编码方式


#### response status

- 1XX ：指示信息-表示请求已接受、继续处理
- 2XX ：成功 - 表示请求已被成功接收
- 3XX ：成功，但是已经重定向
- 4XX : 客户端错误
- 5XX : 服务端错误

eg：
- 200 OK： 客户端请求成功
- 204 OK： 客户端请求响应成功，但没有信息返回
- 206 Partial Content: 客户发送了一个带有Range头的GET请求，服务器完成了它，即：请求部分资源
- 301 Moved Permamently: 已经永久转至新的url
- 302 Found: 临时转至新的url，当一台服务器达到最大并发数，会转移服务器处理
- 304 Not Modified: 服务器告诉客户，原来的缓存可以继续使用，如CSS/JS/HTML/IMG,Ctrl+F5 304缓存失效
- 302 临时性重定向
- 400 Bad Request: 客户端有语法错误，服务器不能理解
- 401 Unauthorized: 请求未经授权
- 403 Forbidden: 对被请求页面的访问被禁止
- 404 Not Found: 请求资源不存在
- 413 Request Entity Too Large 和服务器交互的内容资源超过最大大小
- 500 Interval Server Error 服务器错误，原来的缓存还能使用
- 503 Service Unavailable
