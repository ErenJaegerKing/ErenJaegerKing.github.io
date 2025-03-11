---
icon: ""
description: ""
title: "MySQL-javaguide"
date: 2025-03-11
category:
  - 数据库
tag:
  - MySQL
---

## MySQL基础

### 什么是关系型数据库？

就是一种建立在关系型模型（表示存储数据之间的联系 一对一、一对多、多对多）上面的数据库。

### 什么是SQL?

结构化查询语言，专门用来与数据库打交道的

### 什么是MySQL?

它是开源免费的关系型数据库，主要用于持久化存储我们系统中的一些数据比如用户信息。

### MySQL有什么优点？

免费开源 成熟稳定，功能完善 支持事务 多种引擎 文档丰富 社区活跃 支持分表分库、读写分离、高可用

## MySQL字段类型

三大类：

数值型：
- 整型：tinyint smallint mediumint int bigint
- 浮点型：float double
- 定点型：decimal

字符串类型：
- 常用：CHAR VARCHAR
- TEXT类：tinytext text mediumtext longtext
- BLOB类：tinyblob blob mediumblob longblob

日期时间类型：
- 常用：year time date datetime timestamp

### 整数类型的unsigned属性有什么用？

tinyint unsigned 取值范围是0~255

int unsigned 取值范围0~4294967295

整数类型可以使用可选的unsigned属性来表示不允许负值的无符号整数。使用unsigned属性可以将正整数的上限提升一倍

### CHAR VARCHAR 的区别

定长字符串 用空格填充以达到指定的长度     eg：身份证 性别

变长字符串                              eg：用户昵称、文章标题

### VARCHAR(100) VARCHAR(10) 的区别

100 表示能存储100个字符

相同字符串的话，占用的磁盘存储空间是一样的

但是100会消耗更多的内存。因为varchar在排序的时候，在内存上面会占用100个长度的内存

### decimal 和 float double 的区别是什么

decimal 是 定点数 存储精确的小数值  

float / double 是浮点数 存储近似的小数值

eg：decimal存储具有精确要求的小数，例如与货币相关的数据，可以避免浮点数带来的精度损失

在java中，mysql中的decimal类型对应的是java中的java.math.BigDecimal

### MYSQL索引失效的场景

1. 不遵守最左匹配原则，就是在一个联合索引中 abc，如果没有a 那么就会索引失效
2. in not in 如果查询的范围超过数据30%，就会范围过大，造成索引失效
3. 在条件中，使用了函数计算和表达式计算，就会造成索引值不匹配，就会索引失效
4. like % 进行匹配的时候 %在左边就会因为范围过大，造成索引失效
5. 使用or表达式 左右两边都必须是索引，如果有一边不是索引，就会造成索引失效
6. order by 排序的时候，这是mysql自身优化的问题，就是会进行回表，mysql就会认为全表查询会更优，就会造成索引失效

