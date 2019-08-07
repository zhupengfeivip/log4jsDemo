# log4jsDemo
本文档解决了log4js使用js作为配置文件时，修改js文件，不重启程序的情况下，自动加载配置文件。

1、演示Log4js使用方法

编译操作步骤  
1、npm i    
2、npm start  
3、在浏览器中http://localhost:3000/log，查看命令行记录日志  
4、修改log4js.js文件中的level  
5、在浏览器http://localhost:3000/reload，重新加载配置文件  
6、在浏览器中http://localhost:3000/log，查看修改后命令行记录日志  


可以看出，不在重启系统的情况下，Log4js的配置文件已被重载。

配置文件可以使用json也可以使用js  
json配置文件的方式  
app.js
~~~js
var jsonConfig = JSON.parse(fs.readFileSync("log4js.json"));
log4js.configure(jsonConfig);
~~~
index.js
~~~js
  log4js.shutdown(function (err) {
    if (err) return console.log('shutdown failed on', path, 'with error', err)
    console.log('shutdown successful')

  });

  var jsonConfig = JSON.parse(fs.readFileSync("log4js.json"));
  log4js.configure(jsonConfig);
~~~

js配置文件的方式  
app.js
~~~js
log4js.configure(require("./log4js"));
~~~
index.js
~~~js
  log4js.shutdown(function (err) {
    if (err) return console.log('shutdown failed on', path, 'with error', err)
    console.log('shutdown successful')

  });

   log4js.configure(requireUncached("../log4js"));
~~~
~~~js
/**
 * 清除缓存请求文件
 * @param {*} module 
 */
function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}
~~~

这里我比较推荐使用js作为配置文件。网上一般都是介绍js作为配置文件的。  
但是js作为配置文件的好处是可以增加注释。Json文件无法加注释，不方便维护。

js配置文件重载的关键其实是require重载的问题  
开始时 log4js.configure(require("../log4js")); 一直不成功，浪费了大量的时间。  
后来通过反复验证，才发现require("../log4js")并没有真正重新读取文件，在程序不重启时，修改js文件，require("../log4js")加载的实际还是启动前的文件。

测试的方法就是 logger.info(requireUncached("../log4js"));，修改文件前后，日志中打印出来的是一样的内容。



