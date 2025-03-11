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

### 为什么不推荐使用Text和Blob？

不推荐

### DATETIME 和 TIMESTAMP 的区别是什么？

datatime 没有时区信息 timestamp 和时区相关

datatime需要耗费8个字节的存储空间 timestamp只需要使用4个字节的存储空间

DATETIME：1000-01-01 00:00:00 ~ 9999-12-31 23:59:59

Timestamp：1970-01-01 00:00:01 ~ 2037-12-31 23:59:59

### NULL和''的区别是什么？为什么 MySQL 不建议使用 NULL 作为列默认值？

''不占用空间，null是需要占用空间的

null代表一个不确定的值。两个null不一定相等。例如select null = null结果为false，但是我们使用distinct group by order by时，null又被认为是相等的

null会影响到聚合函数的结果。sum avg min max会忽略null值

查询null值，必须使用is null或者is not null，而不能使用= ！= > <之类的运算符，而''是可以使用这些比较运算符的

### Boolean类型如何表示？

mysql并没有专门的布尔类型，而是用tinyint(1)类型来表示布尔值。

tinyint(1)类型可以存储0或1，分别对应false或true

## MySQL基础架构

不了解

## MySQL基础架构

### MySQL支持哪些存储引擎？默认使用哪个？

MyISAM InnoDB 5.5.5 之前是使用前者作为默认引擎的，5.5.5 之后是使用后者作为默认引擎的

### MySQL 存储引擎架构了解吗？

不了解

### MyISAM 和 InnoDB 有什么区别？

MyISAM 性能特别好 最大的缺陷是崩溃之后无法安全恢复

InnoDB 支持事务 行级锁 

1. 是否支持行级锁
m 只有表级 i 有行和表级
2. 是否支持事务

i支持事务 实现了SQL定义的四个隔离标准 具有提交commit和回滚rollback事务的能力

innodb默认是使用的repeatable-read可重读隔离级别是可以解决幻读问题发生的（基于MVCC和Next-Key Lock）

3. 是否支持外键

m不支持 i支持

阿里开发手册禁止使用外键，一切外键概念必须在应用层解决。因为它不适合分布式、高并发集群；级联更新是强阻塞，存在数据库更新风暴的风险；外键影响数据库插入速度；

4. 是否支持数据库异常崩溃后的安全恢复

m不支持 i支持

i崩溃后，重新启动的时候保证数据库恢复到崩溃前的状态。这个恢复的过程依赖于redo log

5. 是否支持MVCC

不了解

6. 索引实现不一样

都是用B+树作为索引结构的

非叶子节点存放的是索引，叶子节点放的是索引+数据

7. 性能有差别

i性能比m更强大

8. 数据缓存策略和机制实现不同

不了解

### MyISAM 和 InnoDB 如何选择？

innodb 在学习高性能的时候，看到一张图片就是i性能是远远超过m的

而且innodb有这些特别好的特性，有什么理由不选择它呢




