---
icon: ""
description: ""
title: "读小林coding后的笔记"
date: 2024-09-23
category:
  - 数据库
tag:
  - MySQL
---

:::info
我的MySQL深入学习路径，以下内容是我自学的笔记，我是搬运工，此篇是学习小林coding博客的笔记。
:::

[小林coding](https://xiaolincoding.com/mysql/)
# 基础篇
## MySQL 执行一条 select 查询语句，在 MySQL 中期间发生了什么？
连接器：建立连接，管理连接，校验用户身份

查询缓存：8.0已删除

解析SQL：解析器对SQL查询语法进行词法分析、语法分析，然后构建语法树，方便后续模块读取表明、字段、语句类型

执行SQL:有三个阶段
- 预处理阶段:检查表或字段是否存在；将select* 中的*符号扩展为表上的所有列
- 优化阶段：选择查询成本最小的执行计划
- 执行阶段：根据执行计划执行SQL查询语句，从存储引擎读取记录，返回给客户端

### MySQL 执行流程是怎样的？
mysql的内部架构分为几层？

server层负责干嘛？

存储引擎负责干嘛？

### 第一步：连接器
先连接MySQL，然后才能执行SQL语句

连接的过程需要进行三次挥手，因为MySQL是基于TCP协议进行传输的

> 如何查看MySQL服务被多少个客户端连接了？

```shell
show processlist
```

> 空闲连接会一直占用吗？

不会，MySQL定义了空闲连接的最大空闲时长，由wait_timeout参数控制，默认值是8个小时（28880秒），如果空闲连接超过了这个时间，连接器就会自动将它断开。

```shell
show variables like 'wait_timeout';
```

我们可以手动断开空闲连接 

```shell
kill connection +id;
```

> MySQL的连接数有限制吗？

MySQL的最大连接数由max_connections控制，比如mysql的服务默认是151个，超过这个值，系统就会拒绝接下来的连接请求，并报错提示"Too many connections"

MySQL的连接和HTTP一样，有短连接和长连接的概念

```
// 短连接
连接mysql服务（TCP三次挥手）
执行sql
断开mysql服务（TCP四次挥手）

// 长连接
连接mysql服务（TCP三次挥手）
执行sql
执行sql
执行sql
...
断开mysql服务（TCP四次挥手）
```

使用长连接的好处就是可以减少建立连接和断开连接的过程

但是长连接会导致占用内存增多，会发生MySQL服务异常重启的现象

> 怎么解决长连接占用内存的问题？

定期断开长连接

客户端主动重置连接，MySQL5.7实现了mysql_reset_connection()函数的接口，当执行一个很大的操作后，可以在代码里面调用这个函数来重置连接

总结：连接器的工作,与客户端进行TCP三次握手建立连接，校验客户端的用户名和密码，如果对了，就会读取该用户的权限，然后再后面的权限逻辑判断都会基于此时读取到的权限

### 第二步：查询缓存

很鸡肋的功能，在MySQL8.0开始就不会走查询缓存这个阶段了，也就是server层的查询缓存被移除了

### 第三步：解析SQL

在正式执行SQL查询语句之前，MySQL会先对SQL语句做解析，这个工作由解析器来完成

第一件事情：词法分析

分析后分为 关键字 和 非关键字

第二件事情：语法分析

语法解析器会根据语法规则，判断你输入的SQL语句是否满足MySQL语法，如果没问题就会构建出SQL语法树（方便后面获取SQL类型、表名、字段名、where条件）

### 第四步：执行SQL

正式执行SQL语句，进入三个阶段

1. prepare 预处理阶段

- 检查SQL查询语句中的表或字段是否存在
- 将select * 中 * 符号，扩展为表上的所有列

2. optimize 优化阶段

优化器主要负责将SQL查询语句的执行方案确定下来，比如表里面有多个索引，优化器会基于查询成本的考虑，来决定选择使用哪个索引

explain + 语句命令可以知道选择器选择了哪个索引

3. execute 执行阶段

执行器会与存储引擎交互，以记录为单位

read_first_record

# 索引篇
## 索引常见面试题
### 什么是索引？
索引是数据的目录

存储引擎，就是如何存储数据、如何为存储的数据建立索引和如何更新、查询数据等技术的实现

### 索引的分类
#### 按数据结构分类
常见的索引B+Tree、HASH索引、Full-Text索引


InnoDB会在不同的创景下面选择不同的列作为聚簇索引：会有三种情况

其他索引都属于辅助索引，也被称为二级索引或非聚簇索引。创建的主键索引和二级索引默认使用的是B+Tree索引

B+Tree索引在存储数据中的具体实现是怎么样的？

存储在B+Tree索引时是长什么样子的？

B+Tree是一种多叉树，叶子节点才存放数据，非叶子节点只存放索引，而且每个节点里的数据是按主键顺序存放的。每一层父节点的索引值都会出现在下层子节点的索引值中，因此在叶子节点中，包括了所有的索引值信息，并且每个叶子节点都有两个指针，分别指向下一个叶子节点和上一个叶子节点，形成一个双向链表。

B+树存储千万级的数据只需要3-4层高度就可以满足，这意味这从千万级的表查询目标数据最多需要3-4此磁盘I/O，所以B+Tree相比于B树和二叉树来说，最大的优势在于查询效率很高，因为即便在数据量大的情况，查询一个数据的磁盘I/O依然维持在3-4次。

回表：查两个B+Tree才能查到数据

这种在二级索引的B+Tree就能查询到结果的过程就叫做覆盖索引，也就是只需要查一个B+Tree就能找到数据

> 为什么MySQL InnoDB选择B+Tree作为索引的数据结构

[小林coding关于为什么选择做出的回答](https://mp.weixin.qq.com/s/w1ZFOug8-Sa7ThtMnlaUtQ)

1. B+Tree vs B Tree
2. B+Tree vs 二叉树
3. B+Tree vs Hash

#### 按物理存储分类
索引分为 聚簇索引（主键索引）、二级索引（辅助索引）

就算数据存放在哪里的，

#### 按字段特性分类
1. 主键索引

最多只有一个索引，索引列的值不允许有空值

2. 唯一索引

索引列的值必须唯一，但是允许有空值

3. 普通索引

4. 前缀索引

指对字符类型字段的前几个字符建立的索引，而不是在整个字段上建立的索引，前缀索引可以建立在字段类型为char、varchar、binart、varbinary的列上

使用前缀索引的目的是为了减少索引占用的存储空间，提升查询效率。

#### 按字段个数分类
单列索引、联合索引

联合索引：通过将多个字段组合成一个索引，该索引就被称为联合索引

使用联合索引时，存在最左匹配原则，如果不遵守最左匹配原则，联合索引会失效

就是（a，b，c）联合索引，是先按a排序，所以b和c是全局无序的，局部相对有序

利用索引的前提是索引里的key是有序的

联合索引范围查询

### 什么时候需要/不需要创建索引？
索引最大的好处是提高查询速度，但是索引有缺点：3个 物理空间、创建和维护、降低表的增删改效率

什么时候适合索引？2个 唯一 、WHERE GROUP BY/ORDER BY 

什么时候不需要创建索引？4个 WHERE GROUP BY/ORDER BY 、 重复字段、 数据少、 频繁进行更新

### 有什么优化索引的方法？
4种常见的优化方法
1. 前缀索引优化 减小索引字段大小 局限性
2. 覆盖索引优化 避免回标 减少了大量I/O操作
3. 主键索引最好是自增的 好处是什么  什么情况下会出现页分裂
4. 索引最好设置为NOT NULL 会导致优化器做索引选择的时候更加难count会省略值为NULL的行 会占用至少1字节空间存储NULL值列表
5. 防止索引失效 [小林coding更详细的了解索引失效](https://mp.weixin.qq.com/s/lEx6iRRP3MbwJ82Xwp675w) 执行效率从低到高的顺序为:?

[小林coding关于该索引原理的总结](https://xiaolincoding.com/mysql/index/index_interview.html#%E6%80%BB%E7%BB%93)

## 从数据页的角度看B+树
B+树的节点里存放的是什么呢？查询数据的过程又是怎么样的？
### InnoDB是如何存储数据的？
InnoDB的数据是按数据页为单位来读写的，数据I/O操作的最小单位是页，InnoDB数据页的默认大小是16KB
### B+树是如何进行查询的？
InnoDB采用了B+树作为索引

B+树的特点 每个节点都是一个数据页
- 叶子节点存放数据，非叶子节点仅存放目录项作为索引
- 非叶子节点分为不同层次
- 按照索引键大小排序，构成双向链表，便于范围查询

### 聚簇索引和二级索引
区别：聚簇叶子存放数据，二级叶子存放主键值

什么是回表？什么是索引覆盖
- 如果某个查询语句使用了二级索引，但是查询的数据不是主键值，这时在二级索引找到主键值后，需要去聚簇索引中获取数据行，这个过程就叫做回表，也就是说要查两个B+树才能吃到数据
- 当查询的数据是主键值时，只有二级索引就能查询到，不用聚簇索引查，这个过程就叫做索引覆盖，也就是只需要查询一个B+树就能找到数据

## 为什么MySQL采用B+树作为索引
因为 MySQL 的数据是存储在磁盘中的嘛，MySQL 的数据是持久化的，数据（索引+记录）是保存到磁盘上的
### 怎样的索引的数据结构是好的？
内存的访问速度是纳秒级别，磁盘访问的速度是毫秒级别，读取同样大小的数据，磁盘中读取的速度比从内存中读取的速度要慢上万倍，甚至几十万倍

磁盘读写的最小单位是扇区，扇区的大小只有 512B 大小，操作系统一次会读写多个扇区，所以操作系统的最小读写单位是块（Block）。Linux 中的块大小为 4KB，也就是一次磁盘 I/O 操作会直接读写 8 个扇区。

设计一个适合MySQL索引的数据结构，至少满足一下要求:
- 能在尽可能少的磁盘的 I/O 操作中完成查询工作；
- 要能高效地查询某一个记录，也要能高效地执行范围查找；

### 什么是二分查找？
索引数据最好能按顺序排列，这样可以使用「二分查找法」高效定位数据

时间复杂度就降到了O(logn)

### 什么是二分查找树？
用数组来实现线性排序的数据虽然简单好用，但是插入新元素的时候性能太低。因为插入一个元素，需要将这个元素之后的所有元素后移一位

二叉查找树的特点是一个节点的左子树的所有节点都小于这个节点，右子树的所有节点都大于这个节点

当每次插入的元素都是二叉查找树中最大的元素，二叉查找树就会退化成了一条链表，查找数据的时间复杂度变成了 O(n)，会导致什么：树的高度就等于每次查询数据时磁盘 IO 操作的次数

二叉查找树由于存在退化成链表的可能性，会使得查询操作的时间复杂度从 O(logn) 升为 O(n)

### 什么是自平衡二叉树？
为了解决二叉查找树会在极端情况下退化成链表的问题，后面就有人提出平衡二叉查找树（AVL 树）

主要是在二叉查找树的基础上增加了一些条件约束：每个节点的左子树和右子树的高度差不能超过 1

不管平衡二叉查找树还是红黑树，都会随着插入的元素增多，而导致树的高度变高，这就意味着磁盘 I/O 操作次数多，会影响整体数据查询的效率。

当树的节点越多的时候，并且树的分叉数 M 越大的时候，M 叉树的高度会远小于二叉树的高度

### 什么是 B 树
为了解决降低树的高度的问题，后面就出来了 B 树，它不再限制一个节点就只能有 2 个子节点，而是允许 M 个子节点 (M>2)，从而降低树的高度

但是 B 树的每个节点都包含数据（索引+记录），而用户的记录数据的大小很有可能远远超过了索引数据，这就需要花费更多的磁盘 I/O 操作次数来读到「有用的索引数据」。

另外，如果使用 B 树来做范围查询的话，需要使用中序遍历，这会涉及多个节点的磁盘 I/O 问题，从而导致整体速度下降。

### 什么是 B+ 树？
B+ 树与 B 树差异的点:
- 叶子 非叶子
- 所有索引都会在叶子节点出现，构成一个有序链表
- 非叶子节点中又多少个子节点，就有多少个索引
- 非叶子节点的索引也会同时存在在子节点中，并且是在子节点中所有索引的最大（或最小）

比较下 B+ 和 B 树的性能区别
#### 1、单点查询
B+ 树的非叶子节点不存放实际的记录数据，仅存放索引，因此数据量相同的情况下，相比存储即存索引又存记录的 B 树，B+树的非叶子节点可以存放更多的索引，因此 B+ 树可以比 B 树更「矮胖」，查询底层节点的磁盘 I/O次数会更少。
#### 2、插入和删除效率
B+ 树的插入和删除效率更高
#### 3、范围查询
B+ 树所有叶子节点间还有一个链表进行连接，这种设计对范围查找非常有帮助

因此，存在大量范围检索的场景，适合使用 B+树，比如数据库。而对于大量的单个索引查询的场景，可以考虑 B 树，比如 nosql 的MongoDB。

#### MySQL 中的 B+ 树
- B+ 树的叶子节点之间是用「双向链表」进行连接，这样的好处是既能向右遍历，也能向左遍历。
- B+ 树点节点内容是数据页，数据页里存放了用户的记录以及各种信息，每个数据页默认大小是 16 KB。
- 
### 总结
MySQL 默认的存储引擎 InnoDB 采用的是 B+ 作为索引的数据结构，原因有：
-  叶子节点 和 非叶子节点
-  有大量冗余节点
-  双向链表

## MySQL 单表不要超过 2000W 行，靠谱吗？
索引结构不会影响单表最大行数，2000W 也只是推荐值，超过了这个值可能会导致 B + 树层级更高，影响查询性能。
## 索引失效有哪些？
### 索引存储结构长什么样？
InnoDB 存储引擎根据索引类型不同，分为聚簇索引（上图就是聚簇索引）和二级索引。它们区别在于，聚簇索引的叶子节点存放的是实际数据，所有完整的用户数据都存放在聚簇索引的叶子节点，而二级索引的叶子节点存放的是主键值，而不是实际数据。
### 对索引使用左或者左右模糊匹配
当我们使用左或者左右模糊匹配的时候，也就是 like %xx 或者 like %xx% 这两种方式都会造成索引失效。

> 为什么 like 关键字左或者左右模糊匹配无法走索引呢？

因为索引 B+ 树是按照「索引值」有序排列存储的，只能根据前缀进行比较。

### 对索引使用函数
> 为什么对索引使用函数，就无法走索引了呢？

因为索引保存的是索引字段的原始值，而不是经过函数计算后的值，自然就没办法走索引了。

### 对索引进行表达式计算
在查询条件中对索引进行表达式计算，也是无法走索引的。
> 为什么对索引进行表达式计算，就无法走索引了呢？

原因跟对索引使用函数差不多。

### 对索引隐式类型转换
如果索引字段是字符串类型，但是在条件查询中，输入的参数是整型的话，你会在执行计划的结果发现这条语句会走全表扫描。

MySQL 在遇到字符串和数字比较的时候，会自动把字符串转为数字，然后再进行比较

### 联合索引非最左匹配
需要遵循最左匹配原则
> 为什么联合索引不遵循最左匹配原则就会失效？

原因是，在联合索引的情况下，数据是按照索引第一列排序，第一列数据相同时才会按照第二列排序
### WHERE 子句中的 OR
在 WHERE 子句中，如果在 OR 前的条件列是索引列，而在 OR 后的条件列不是索引列，那么索引会失效。

### 总结
6种

## MySQL 使用 like “%x“，索引一定会失效吗？
