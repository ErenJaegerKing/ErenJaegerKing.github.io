---
icon: ""
description: ""
title: "Redis-javaguide"
date: 2025-01-01
category:
  - 数据库
tag:
  - Redis
order: 3
---

## Redis基础

### 什么是Redis？

Redis是一个基于c语言开发的开源非关系型数据库。

### Redis为什么这么快？

1. Redis基于内存，内存的访问速度比磁盘快很多。
2. Redis基于Reactor模型设计开发了一套高效的事件处理模型，主要是单线程事件循环和IO多路复用。
3. Redis内置了多种优化后的数据类型/结构，性能非常高。
4. Redis通信协议实现简单且解析高效。

### 除了 Redis，你还知道其他分布式缓存方案吗？

memcacheed

tendis

dragonfly

keydb

### 说一下 Redis 和 Memcached 的区别和共同点

相同点：
1. 都是基于内存的数据库，一般都用来当做缓存使用。
2. 都有过期策略。
3. 两者的性能都非常高。

区别：
1. 数据类型：Redis支持更丰富的数据类型，Memcached只支持最简单的k/v数据类型。Redis还支持 list set hash zset等数据结构的支持。
2. 数据持久化：Redis支持数据持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用，而Memcached把数据全部存在内存之中。
3. 集群模式支持：Redis支持，Memcached不支持。
4. 线程模型：Memcached是多线程，非阻塞IO复用的网络模型。Redis使用单线程的多路IO复用模型。
5. 特性支持：Redis支持发布订阅模型、Lua脚本、事务等功能，而Memcached不支持。
6. 过期数据删除：Memcached过期数据的删除策略只用了惰性删除，而Redis同时了惰性删除与定期删除。

### 为什么要用 Redis？

1. 访问速度快，Redis基于内存的
2. 高并发，一般像MySQL这类的数据库的QPS大概都在4K左右(4核8g)，但是使用了Redis缓存之后很容易达到5w+，甚至能达到10w+。
3. 功能全面，Redis除了用作缓存之外，还可以用于分布式锁、限流、消息队列、延时队列等场景。

### 常见的缓存读写策略有哪些？

重点

## Redis应用

### Redis 除了做缓存，还能做什么？

分布式锁：常见的方法。通常是直接用Redission来实现分布式锁的

限流：Redis + Lua

消息队列：List数据结构 或者 Redis5.0增加的Stream

延时队列：Redission内置了延时队列 ZSet

分布式Session：String Hash数据类型保存Session数据

复杂业务场景：Bitmap统计活跃用户、ZSet维护排行榜

### 如何基于 Redis 实现分布式锁？

在Redis中，SETNX命令就是set if not exists（对应Java中的setIfAbsent方法），如果key不存在的话，才会设置key的值。如果key已经存在，setnx啥也不做。

```bash
sentx lockkey uniqueValue
1

sentx lockkey uniqueValue
0
```
怎么释放锁，直接通过DEL命令删除对应的key即可?
```bash
del lockkey
1
```
为了防止误删其他锁，这里使用Lua脚本保证锁操作的原子性。因为Redis在执行Lua脚本时，可以以原子性的方式执行，从而保证了锁释放操作的原子性。
```lua
// 释放锁时，先比较锁对应的value值是否相等，避免锁的误释放
if redis.call("get",KEYS[1]) == ARGV[1] then
    return redis.call("del",KEYS[1])
else
    return 0
end
```

### Redis 可以做消息队列么？

可以，但是不建议。

List RPUSH/LPOP 可以实现简易版消息队列

### Redis 可以做搜索引擎么？

我要用Elasticsearch

### 如何基于 Redis 实现延时任务？

不推荐，可以再看

## Redis 数据类型

### Redis 常用的数据类型有哪些？

5种基础数据结构：字符串、列表、集合、有序集合、散列

3种特殊数据类型：基数统计、位图、地理位置

### String 的应用场景有哪些？

- 常规数据（Session、Token、序列化后的对象、图片的路径）的缓存
- 计数比如用户单位时间的请求数、页面单位时间的访问数
- 分布式锁（利用sentx key value命令简单实现一个分布式锁）

### String 还是 Hash 存储对象数据更好呢？

- 在绝大多数情况下，String更适合存储对象数据，尤其是当对象结构简单且整体读写是主要操作时。
- 如果你需要频繁操作对象的部分字段或节省内存，Hash可能是更好的选择。

### String 的底层实现是什么？

未来攻破

### 购物车信息用 String 还是 Hash 存储更好呢?

由于购物车的商品类别与数量频繁进行修改和变动，建议使用Hash存储：

用户id为key
商品id为field，商品数量为value

怎么维护？
- 用户添加商品就是往hash中添加新的filed与value
- 查询购物车就是遍历对应的hash
- 更改商品的数量就是直接修改对应value值
- 删除商品就是删除hash中对应的field
- 清空购物车直接删除对应的key即可

### 使用 Redis 实现一个排行榜怎么做？

ZSet有序集合。

zrange(升序)、zrevrange（降序）、zrevrank（指定元素排名）

### Redis 的有序集合底层为什么要用跳表，而不用平衡树、红黑树或者 B+树？

难度太大了

### Set 的应用场景是什么？

无序集合，集合中的元素没有先后顺序且都是唯一。

- 存放的数据不能重复的场景：网站UV统计、文章点赞、动态点赞
- 需要获取多个数据源交集、并集和差集的场景：共同好友（交集）、共同粉丝（交集）、共同关注（交集）
- 需要随机获取数据源中的元素的场景：抽奖系统、随机点名

### 使用 Set 实现抽奖系统怎么做？

实操一下

### 使用 Bitmap 统计活跃用户怎么做？

实操一下

### 使用 HyperLogLog 统计页面 UV 怎么做？

实操一下

## Redis 持久化机制（重要）

Redis 持久化机制（RDB 持久化、AOF 持久化、RDB 和 AOF 的混合持久化）

## Redis 线程模型（重要）

### Redis 单线程模型了解吗？

Redis 基于 Reactor 模式设计开发了一套高效的事件处理模型。

IO多路复用技术的使用让Redis不需要额外创建多余的线程来监听客户端的大量连接，降低了资源的消耗。

### Redis6.0 之前为什么不使用多线程？

不了解

### Redis6.0 之后为何引入了多线程？

不了解

### Redis 后台线程了解吗？

不了解

## Redis内存管理

### Redis 给缓存数据设置过期时间有什么用？

内存是非常宝贵的，如果不对缓存数据设置过期时间，那么内存占用就会一直增长，最终可能会导致OOM问题。通过设置合理的过期时间，Redis会自动删除暂时不需要的数据，为新的缓存数据腾出空间

过期时间除了有助于缓解内存的消耗，还有什么其他用么？5分钟的验证码 用户登录的Token在一天内有效

### Redis 是如何判断数据是否过期的呢？

Redis是通过一个叫做过期字典（可以看作是hash表）来保存数据过期的时间。

过期字典的键指向Redis数据中的某个key（键），过期字典的值是一个long long类型的整数，这个整数保存了key所指向的数据库键的过期时间（毫秒精度的UNIX时间戳）

在查询一个key的时候，Redis首先检查该key是否存在于过期字典中（时间复杂度为O(1)），如果不在就直接返回，在的话需要判断一下这个key是否过期，过期直接删除key然后返回null

### Redis 过期 key 删除策略了解么？

Redis 采用的那种删除策略呢？ 定期删除+惰性删除。定期删除对内存更加友好，惰性删除对 CPU 更加友好。两者各有千秋，结合起来使用既能兼顾 CPU 友好，又能兼顾内存友好。

Redis的定期删除过程是随机的，会周期地随机从设置了过期时间的key中抽查一批。Redis底层通过限制删除操作执行的时长和频率来减少删除操作对CPU时间的影响

每次随机抽查数量是多少？expire.c中定义了每次随机抽查的数量，Redis 7.2 版本为 20 ，也就是说每次会随机选择 20 个设置了过期时间的 key 判断是否过期。

如何控制定期删除的执行频率？在 Redis 中，定期删除的频率是由 hz 参数控制的。hz 默认为 10，代表每秒执行 10 次，也就是每秒钟进行 10 次尝试来查找并删除过期的 key。

为什么定期删除不是把所有过期 key 都删除呢？这样会对性能造成太大的影响。如果我们 key 数量非常庞大的话，挨个遍历检查是非常耗时的，会严重影响性能。Redis 设计这种策略的目的是为了平衡内存和性能。

### 为什么 key 过期之后不立马把它删掉呢？这样不是会浪费很多内存空间吗？

因为不太好办到，或者说这种删除方式的成本太高了。

### 大量 key 集中过期怎么办？

大量key集中过期的话会导致以下问题
- 请求延迟增加：Redis在处理过期的key时需要消耗cpu资源，如果过期key数量庞大，会导致redis实例的cpu占用率升高，进而影响其他请求的处理速度，造成延增加。
- 内存占用过高：过期的key虽然已经失效，但是Redis在真正删除它们之前，仍然会占用内存空间。如果过期key没有及时清理，可能导致内存占用过高，甚至引发内存溢出

解决方案
- 尽量避免key集中过期：在设置键的过期时间时尽量随机一些
- 开启lazy free机制：修改 redis.conf 配置文件，将 lazyfree-lazy-expire 参数设置为 yes，即可开启 lazy free 机制。开启 lazy free 机制后，Redis 会在后台异步删除过期的 key，不会阻塞主线程的运行，从而降低对 Redis 性能的影响。

### Redis 内存淘汰策略了解么？

Redis 的内存淘汰策略只有在运行内存达到了配置的最大内存阈值时才会触发

这个阈值是通过redis.conf的maxmemory参数来定义的。（64 位操作系统下，maxmemory 默认为 0 ，表示不限制内存大小。32 位操作系统下，默认的最大内存值是 3GB。）

1. volatile-lru（least recently used）：从已设置过期时间的数据集  挑选最近最少使用的数据淘汰
2. volatile-ttl：从已设置过期时间的数据集  挑选将要过期的数据淘汰
3. volatile-random：从已设置过期时间的数据集  任意选择数据淘汰
4. volatile-lfu（least frequently used）: 从已设置过期时间的数据集  挑选最不经常使用的数据淘汰。
5. allkeys-lru（least recently used）：从数据集中移除最近最少使用的数据淘汰。
6. allkeys-random：从数据集中移除最近最少使用的数据淘汰。
7. allkeys-lfu（least frequently used）:从数据集中移除最不经常使用的数据淘汰。
8. no-eviction（默认内存淘汰策略）：禁止驱逐数据，当内存不足以容纳新写入数据时，新写入操作会报错。

## Redis事务

## Redis性能优化（重要）

## Redis生产问题（重要）

## Redis集群

## Redis 使用规范

