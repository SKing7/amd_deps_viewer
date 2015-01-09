# amd_deps_viewer

展示针对amd模块声明方式的模块之间的依赖关系

````javascript
+ npm install
+ bower install
+ node index 
````
methods
=======

-d 目录路径 
------------------
js模块所在目录

-o 文件路径
------------------
json生成地址

-g 图表类型
------------------
不同的图表会有不同的数据格式
目前支持的有：
````
[-g fe](http://bost.ocks.org/mike/fisheye/)
[-g dfl](http://mbostock.github.com/d3/ex/force.html)
````

-f 数据过滤加工类型
------------------
不同的使用场景会有对依赖关系进行加工
目前支持
````
[-f autonavi]
````
