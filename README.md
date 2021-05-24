## QueryOrmBuilder - 语义化查询构造器

# 简介
语义化查询url构造器，根据规则生成对应查询请求url，自定义查询结果，去除重复数据，节省流量提高速度，提高开发效率
[详细文档](https://mdao-work.github.io/query-orm-builder-doc/index.html)

注意：本组件需配合后端解析类[QueryOrmServer]使用 [源码地址](https://github.com/mdao-work/query-orm-server)


# 安装
1、通过 npm 方式安装使用

在现有项目中使用 QueryOrmBuilder 时，可以通过 npm 进行安装：
```shell
npm i query-orm-builder
```

2、直接通过 `script` 标签方式引入使用

下载本源码包，在具体页面，引入dist目录下的 query-orm-builder.umd.js 

``` html
<script src="dist/query-orm-builder.umd.js" ></script>
```

# 快速使用
1、npm 模式使用
``` javascript
  import QueryOrmBuilder from 'query-orm-builder'
  let queryOrm=new QueryOrmBuilder();
  let res = queryOrm.where('id','=',100).toUriQueryString();
```


2、通过 `script` 标签方式引入
``` javascript
  let queryOrm=new QueryOrmBuilder();
  let res = queryOrm.where('id','=',100).toUriQueryString();
```

上面2种方式运行的res结果都为
```javascript
  filter[id{eq}]=100 
```
将构建后的结果拼接到请求数据的链接上，发送到后台使用，如：
```html
  https://api.test.com/User/DataList?filter[id{eq}]=100 
```

## 使用实例
```javascript
//请求后端接口地址
let apiUrl='https://api.test.com/QueryOrmServerTest/getMenuList';

/**
 * 实例化builder类
 * 说明：如果实例化类有传入apiUrl，则最后调用toUriQueryString方法得到的数据里会自动追加apiUrl，否则仅返回参数数据
 */
let queryOrm=new QueryOrmBuilder(apiUrl);

//拼接需要查询的参数
queryOrm.where('title','like','%列表%')
   .where('pid','<>','0')
   .whereIn('id','1,2,3,4')
   .whereOr('status','=',1)
   .whereOr('is_delete','=',0)
   .select(['id','title','remark:diy_remark'])
   .orderBy('title','asc')
   .orderBy('id','desc')
   .page(1,15);

//构建生成请求地址
var requestUrl = queryOrm.toUriQueryString();
 
```

最终输出 requestUrl为：
```html
https://api.test.com/QueryOrmServerTest/getMenuList?filter%5Btitle%7Blike%7D%5D=%25%E5%88%97%E8%A1%A8%25&filter%5Bpid%7Bneq%7D%5D=0&filter%5Bid%7Bin%7D%5D=1,2,3,4&where_or%5Bstatus%7Beq%7D%5D=1&where_or%5Bis_delete%7Beq%7D%5D=0&select=id,title,remark:diy_remark&order_by=title,id&sorted_by=asc,desc&page=1&page_size=15

```


## 表达式查询的用法示例如下： 

`= ：等于`
---
例如：
```javascript
queryOrm.where('id','=',100).toUriQueryString();
或者
queryOrm.where('id',100).toUriQueryString();
```
生成url为
```javascript
url?filter[id{eq}]=100 
```
表示的查询条件是 id = 100

`!=或<> ：不等于`
---
例如：
```javascript
queryOrm.where('id','<>',100).toUriQueryString();
```
生成url为
```javascript
url?filter[id{neq}]=100 
```
表示的查询条件就是 id != 100

`> ：大于`
---
例如：
```javascript
queryOrm.where('id','>',100).toUriQueryString();
```
生成url为
```javascript
url?filter[id{gt}]=100 
```
表示的查询条件就是 id > 100

`>= ：大于等于`
---
例如：
```javascript
queryOrm.where('id','>=',100).toUriQueryString();
```
生成url为
```javascript
url?filter[id{egt}]=100 
```
表示的查询条件就是 id >= 100

`< ：小于`
---
例如：
```javascript
queryOrm.where('id','<',100).toUriQueryString();
```
生成url为
```javascript
url?filter[id{lt}]=100 
```
表示的查询条件就是 id < 100

`<= ：小于等于`
---
例如：
```javascript
queryOrm.where('id','<=',100).toUriQueryString();
```
生成url为
```javascript
url?filter[id{elt}]=100 
```
表示的查询条件就是 id <= 100

`like ：同sql的LIKE`
---
例如：
```javascript
queryOrm.where('id','like','张三%').toUriQueryString();
```
生成url为
```javascript
url?filter[id{like}]=张三% 
```

`in ：查询 id为1,2,3 的数据`
---
例如：
```javascript
queryOrm.where('id','in','1,2,3').toUriQueryString();
queryOrm.where('id','in',['1,2,3']).toUriQueryString();
或
queryOrm.whereIn('id','1,2,3').toUriQueryString();
queryOrm.whereIn('id',['1,2,3']).toUriQueryString();
```
生成url为
```javascript
url?filter[id{in}]=1,2,3 
```

`or ：查询 或者id=5 的数据`
---
例如：
```javascript
queryOrm.whereOr('id','5').toUriQueryString();
```
生成url为
```javascript
url?filter[or{or}]=5
```

`between ：查询 id为1到8 的数据`
---
例如：
```javascript
queryOrm.where('id','between','1,8').toUriQueryString();
或
queryOrm.whereBetween('id','between','1,8').toUriQueryString();
```
服务端会解析成
```javascript
url?filter[id{between}]=1,8 
```

## 多字段，多条件组合使用
---
```javascript
queryOrm.where('age',1).where('age','<',50).where('sex','<>',20).toUriQueryString();
```
生成url为
```javascript
url?filter[type{eq}]=1&filter[age{lt}]=50&filter[sex{neq}]=2
```
表示的查询条件是 type=1 并且 age<50 并且 sex!=2

## 移除某条件
---
```javascript
queryOrm.removeWhere('age')
```

# 字段过滤
--- 
| 参数名                         | 描述             |
| ------------------------------ | ---------------- |
| select            | 显示的字段以逗号相隔 |

用法示例如下：
```javascript
queryOrm.select(['id','date','content']).toUriQueryString();
```
生成url为
```javascript
url?select=id,date,content
```
表示的是只显示id,date,content 字段

# 字段别名
---
如果想要使用字段的别名可以这样写：
```javascript
queryOrm.select(['id','date','content:text']).toUriQueryString();
```
生成url为
```javascript
url?select=id,date,content:text
```
表示的是只显示id,date,text 字段

# 排序
---
1. 单字段排序

| 参数名                         | 描述             |
| ------------------------------ | ---------------- |
| order_by            | 排序字段 |
| sorted_by           | 排序方式 默认就是升序排列 |
用法示例如下：

```
queryOrm.orderBy('id').toUriQueryString();
或者
queryOrm.orderBy('id','desc').toUriQueryString();
```
生成url为
```javascript
url?order_by=id&sorted_by=desc
```
表示的是根据id降序排序

2. 多字段排序

```javascript
queryOrm.orderBy('id').orderBy('type','asc').toUriQueryString();
或者
queryOrm.orderBy('id').orderBy('type','asc').toUriQueryString();
```
生成url为
```
url?order_by=id,type&sorted_by=desc,asc
```

# 分页
---
| 参数名                         | 描述             |
| ------------------------------ | ---------------- |
| page            | 页码，从1开始 |
| page_size           | 每页几条数据   默认15       |


```javascript
queryOrm.page(1,15).toUriQueryString();
```
生成url为
```javascript
url?page=1&page_size=15
```
# 注意事项
1. 生成的url 默认已经encodeURI编码 如果不需要编码 `toUriQueryString(false)`

# 技术服务与支持
没有资金的支撑就很难得到发展，特别是一个好的产品，如果 QueryOrmBuilder 帮助了您，请为我们点赞。支持我们，您可以得到一些回报，有了这些我们会把公益事业做的更好，回报社区和社会，请给我们一些动力吧，在此非常感谢已支持我们的朋友！
