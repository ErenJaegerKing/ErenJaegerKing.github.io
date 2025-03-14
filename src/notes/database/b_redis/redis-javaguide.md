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


