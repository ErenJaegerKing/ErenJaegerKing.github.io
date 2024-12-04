---
icon: ""
description: ""
title: "Redis在项目中的使用"
date: 2024-12-04
category:
  - 数据库
tag:
  - Redis
order: 1
---

## 基础

【Redis】对redis这个中间件进行深入学习，要会用，懂原理，并整理成博客记录 （配置文件详解：https://blog.csdn.net/w15558056319/article/details/121414742）

【Redis】用二进制文件安装Redis，设置密码为强密码：XXXXXXX，开放6379安全组 
Redis学习中文网：https://redis.com.cn/

## 实战

### 【Redis】短信登录：
1. 验证手机号以及生成验证码的工具类（hutool）
2. 保存用户信息到Redis中可以隐藏用户敏感信息   Key唯一、Token（hutool）
3. 状态登录刷新的问题（对于不需要拦截的路径）

### 【Redis】缓存三剑客： 
1. 为什么要使用缓存？
2. 缓存模型和思路 
3. 缓存更新/淘汰策略（内存淘汰、超时剔除、主动更新）
4. 数据库缓存不一致的问题（Cache Aside Pattern 人工编码方式：双写方案）三个问题：删除缓存还是更新缓存？如何保证缓存与数据库的操作的同时成功或失败？先操作缓存还是先操作数据库？（主要是两个操作之间所花时间的长短）
5. 缓存穿透 
6. 缓存雪崩 
7. 缓存击穿（互斥锁[SETNX]、逻辑过期）
8. 封装Redis工具类

### 【Redis】高并发下的线程安全： 
1. 分布式全局唯一ID（唯一性、高性能、安全性、递增性、高可用）（符号位、时间戳、序列号） 
2. 乐观锁解决超卖问题 （关键在于数据是否有被修改过 ） 常见的方法：1、版本号法 2、字段对比机制  
```java
UPDATE table_name 
SET stock = stock - 1 
WHERE voucher_id = ? AND stock > 0;
```
为什么可以保证并发安全？(1)、UPDATE语句的原子性(2)、数据库的行级锁机制(3)、条件限制 (stock > 0) (4)、秒杀业务（一人一单）需要控制锁的粒度 synchronized

3. 分布式锁redis：满足分布式系统或集群模式下多进程可见并且互斥的锁（可见性、互斥、高可用、高性能、安全性）常见的分布式锁有三种：MySQL（利用MySQL本身的互斥锁机制）、Redis（利用setnx这样的互斥命令，需要去深入学习这个的原理Lua脚本）、Zookeeper  (1)、利用setnx方法的原子性 有过期时间防止死锁 (2)、会出现锁误删的情况（解决方法：存入线程标示）(3)、会出现原子性问题 （解决方法：使用Lua脚本解决多条命令原子性问题https://www.runoob.com/lua/lua-tutorial.html）Redis调用脚本的常见命令：help @scripting 
4. 分布式锁redission（重入问题（Lock-voaltile+state synchronized-count redission-hash（big-key、exprie、small-key））、不可重试、超时释放、主从一致性）(Lock + Synchronizer)  
 
会出现的问题：(1)、事务与锁会发生事务还没提交(2)、锁就会释放的问题 事务与this会发生不生效的问题（this指向当前实例、代理对象的角色被绕过）
5. 异步秒杀思路：先利用Redis完成库存余量、一人一单判断，完成抢单业务，再将下单业务放入阻塞队列，利用独立线程异步下单

### 【Redis】排序方式 唯一性 查找方式 redis具体场景下的使用
1. Redis消息队列（Stream支持消息持久化、支持阻塞读取、支持消息确认机制、支持消息回溯、受限于队列长度，消费堆积处理 可以利用消费者组提高消费速度，减少堆积）
2. 点赞（set）
3. 排行榜（sortedSet根据score值排序、唯一性为唯一、查找方式为根据元素查找）
4. 共同关注（set 求交集）
5. Feed流（拉模式、推模式、推拉结合）
6. 附近商户 GEO（Geolocation）地理坐标
7. 用户签到（BitMap）
8. UV统计（UV：全称Unique Visitor，也叫独立访客量 PV：全称Page View，也叫页面访问量或点击量）Hyperloglog(HLL)是从Loglog算法派生的概率算法，也就是统计功能



