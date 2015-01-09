# amd_deps_viewer

展示针对amd模块声明方式的模块之间的依赖关系

````javascript
+ npm install
+ bower install
+ node index 
````
methods
=======

-d 目录路径 必须 
------------------
js模块所在目录
````
node index -d './m/public/js'
````

-o 文件路径 【默认：./deps.json】
------------------
json生成地址
````
node index -o './test/deps.json' -d './m/public/js'

````

-g 图表类型 【默认：dfl】
------------------
不同的图表会有不同的数据格式
目前支持的有：
[-g fe](http://bost.ocks.org/mike/fisheye/)
[-g dfl](http://mbostock.github.com/d3/ex/force.html)
````
node index -g fe -d './m/public/js'
````

-f 数据过滤加工类型 【默认：无】
------------------
不同的使用场景会有对依赖关系进行加工
目前支持
[-f autonavi] 根据模块名进行自定义分组
````
node index -f autonavi -d './m/public/js'
````
