---
icon: ""
description: ""
title: "Redis的深入学习"
date: 2024-09-15
category:
  - 数据库
tag:
  - Redis
---

### 主从集群

#### 集群结构

![image-20240816143943996](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816143943996-1723790386811-1.png)

如图所示，集群中有一个master节点、两个slave节点（现在叫replica）。当我们通过Redis的Java客户端访问主从集群时，应该做好路由：

- 如果是写操作，应该访问master节点，master会自动将数据同步给两个slave节点
- 如果是读操作，建议访问各个slave节点，从而分担并发压力



建立集群的步骤

第一步是启动多个Redis实例

第二步 输入一下命令

```Bash
# Redis5.0以前
slaveof <masterip> <masterport>
# Redis5.0以后
replicaof <masterip> <masterport>

# 查看集群状态
info replication
```

有临时和永久两种模式：

- 永久生效：在redis.conf文件中利用`slaveof`命令指定`master`节点
- 临时生效：直接利用redis-cli控制台输入`slaveof`命令，指定`master`节点

#### 主从同步原理

这个同步是如何完成的

![image-20240816151823089](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816151823089-1723792705262-3.png)

这里有一个问题，`master`如何得知`salve`是否是第一次来同步呢？？

- **`Replication Id`**：简称`replid`，是数据集的标记，replid一致则是同一数据集。每个`master`都有唯一的`replid`，`slave`则会继承`master`节点的`replid`
- **`offset`**：偏移量，随着记录在`repl_baklog`中的数据增多而逐渐增大。`slave`完成同步时也会记录当前同步的`offset`。如果`slave`的`offset`小于`master`的`offset`，说明`slave`数据落后于`master`，需要更新。

##### 全量同步

主从第一次建立连接时，会执行**全量同步**，将master节点的所有数据都拷贝给slave节点

**master**判断一个节点是否是第一次同步的依据，就是看replid是否一致

![image-20240816153540540](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816153540540-1723793742159-7-1723793743257-9-1723793744378-11.png)

完整流程描述：

- `slave`节点请求增量同步
- `master`节点判断`replid`，发现不一致，拒绝增量同步
- `master`将完整内存数据生成`RDB`，发送`RDB`到`slave`
- `slave`清空本地数据，加载`master`的`RDB`
- `master`将`RDB`期间的命令记录在`repl_baklog`，并持续将log中的命令发送给`slave`
- `slave`执行接收到的命令，保持与`master`之间的同步

##### 增量同步

全量同步需要先做RDB，然后将RDB文件通过网络传输个slave，成本太高了。因此除了第一次做全量同步，其它大多数时候slave与master都是做**增量同步**。

什么是增量同步？就是只更新slave与master存在差异的部分数据。

![image-20240816153700169](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816153700169.png)

##### repl_baklog原理

master怎么知道slave与自己的数据差异在哪里呢?

这就要说到全量同步时的`repl_baklog`文件了。这个文件是一个固定大小的数组，只不过数组是环形，也就是说**角标到达数组末尾后，会再次从0开始读写**，这样数组头部的数据就会被覆盖。

如果slave恢复，需要同步，却发现自己的`offset`都没有了，无法完成增量同步了。只能做**全量同步**。

`repl_baklog`大小有上限，写满后会覆盖最早的数据。如果slave断开时间过久，导致尚未备份的数据被覆盖，则无法基于`repl_baklog`做增量同步，只能再次全量同步。

##### 主从同步优化

主从同步可以保证主从数据的一致性

可以从以下几个方面来优化Redis主从就集群：

- 在master中配置`repl-diskless-sync  yes`启用无磁盘复制，避免全量同步时的磁盘IO。
- Redis单节点上的内存占用不要太大，减少RDB导致的过多磁盘IO
- 适当提高`repl_baklog`的大小，发现slave宕机时尽快实现故障恢复，尽可能避免全量同步
- 限制一个master上的slave节点数量，如果实在是太多slave，则可以采用`主-从-从`链式结构，减少master压力

`主-从-从`架构图：

![image-20240816152347936](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816152347936-1723793030616-5.png)

简述全量同步和增量同步区别？

- 全量同步：master将完整内存数据生成RDB，发送RDB到slave。后续命令则记录在repl_baklog，逐个发送给slave。
- 增量同步：slave提交自己的offset到master，master获取repl_baklog中从offset之后的命令给slave

什么时候执行全量同步？

- slave节点第一次连接master节点时
- slave节点断开时间太久，repl_baklog中的offset已经被覆盖时

什么时候执行增量同步？

- slave节点断开又恢复，并且在`repl_baklog`中能找到offset时

### 哨兵

Redis提供了`哨兵`（`Sentinel`）机制来监控主从集群监控状态，确保集群的高可用性。

#### 哨兵原理

##### 哨兵作用

![image-20240816154521815](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816154521815-1723794323531-13-1723794324808-15.png)

##### 状态监控

![image-20240816154851477](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816154851477-1723794532515-17.png)



##### 选举leader

首先，Sentinel集群要选出一个执行`failover`的Sentinel节点，可以成为`leader`。要成为`leader`要满足两个条件：

- 最先获得超过半数的投票
- 获得的投票数不小于`quorum`值

而sentinel投票的原则有两条：

- 优先投票给目前得票最多的
- 如果目前没有任何节点的票，就投给自己

比如有3个sentinel节点，`s1`、`s2`、`s3`，假如`s2`先投票：

- 此时发现没有任何人在投票，那就投给自己。`s2`得1票
- 接着`s1`和`s3`开始投票，发现目前`s2`票最多，于是也投给`s2`，`s2`得3票
- `s2`称为`leader`，开始故障转移

不难看出，**谁先**投票，谁就会称为leader，那什么时候会触发投票呢？

答案是第一个确认master客观下线的人会立刻发起投票，一定会成为leader。

OK，`sentinel`找到`leader`以后，该如何完成`failover`呢？

![image-20240816155455042](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816155455042.png)

##### 实现故障转移（failover）

![image-20240816155722652](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816155722652.png)

##### 总结

Sentinel的三个作用是什么？

- 集群监控
- 故障恢复
- 状态通知

Sentinel如何判断一个redis实例是否健康？

- 每隔1秒发送一次ping命令，如果超过一定时间没有相向则认为是主观下线（`sdown`）
- 如果大多数sentinel都认为实例主观下线，则判定服务客观下线（`odown`）

故障转移步骤有哪些？

- 首先要在`sentinel`中选出一个`leader`，由leader执行`failover`
- 选定一个`slave`作为新的`master`，执行`slaveof noone`，切换到master模式
- 然后让所有节点都执行`slaveof` 新master
- 修改故障节点配置，添加`slaveof` 新master

sentinel选举leader的依据是什么？

- 票数超过sentinel节点数量1半
- 票数超过quorum数量
- 一般情况下最先发起failover的节点会当选

sentinel从slave中选取master的依据是什么？

- 首先会判断slave节点与master节点断开时间长短，如果超过`down-after-milliseconds`` * 10`则会排除该slave节点
- 然后判断slave节点的`slave-priority`值，越小优先级越高，如果是0则永不参与选举（默认都是1）。
- 如果`slave-prority`一样，则判断slave节点的`offset`值，越大说明数据越新，优先级越高
- 最后是判断slave节点的`run_id`大小，越小优先级越高（`通过info server可以查看run_id`）。

##### RedisTemplate连接哨兵集群

分为三步：

- 1）引入依赖
- 2）配置哨兵地址
- 3）配置读写分离

###### 引入依赖

```XML
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

###### 配置哨兵地址

```YAML
spring:
  redis:
    sentinel:
      master: hmaster # 集群名
      nodes: # 哨兵地址列表
        - 192.168.150.101:27001
        - 192.168.150.101:27002
        - 192.168.150.101:27003
```

###### 配置读写分离

```Java
@Bean
public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer(){
    return clientConfigurationBuilder -> clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
}
```

这个bean中配置的就是读写策略，包括四种：

- `MASTER`：从主节点读取
- `MASTER_PREFERRED`：优先从`master`节点读取，`master`不可用才读取`slave`
- `REPLICA`：从`slave`节点读取
- `REPLICA_PREFERRED`：优先从`slave`节点读取，所有的`slave`都不可用才读取`master`

### 分片集群

![image-20240816173158687](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816173158687.png)

#### 散列插槽

![image-20240816173943379](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816173943379.png)

![image-20240816174009609](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816174009609-1723801211055-19.png)

#### 故障转移

分片集群的节点之间会互相通过ping的方式做心跳检测，超时未回应的节点会被标记为下线状态。当发现master下线时，会将这个master的某个slave提升为master。

#### 总结

Redis分片集群如何判断某个key应该在哪个实例？

- 将16384个插槽分配到不同的实例
- 根据key计算哈希值，对16384取余
- 余数作为插槽，寻找插槽所在实例即可

如何将同一类数据固定的保存在同一个Redis实例？

- Redis计算key的插槽值时会判断key中是否包含`{}`，如果有则基于`{}`内的字符计算插槽
- 数据的key中可以加入`{类型}`，例如key都以`{typeId}`为前缀，这样同类型数据计算的插槽一定相同

#### Java客户端连接分片集群

1）引入redis的starter依赖

2）配置分片集群地址

3）配置读写分离

```YAML
spring:
  redis:
    cluster:
      nodes:
        - 192.168.150.101:7001
        - 192.168.150.101:7002
        - 192.168.150.101:7003
        - 192.168.150.101:8001
        - 192.168.150.101:8002
        - 192.168.150.101:8003
```

### 数据结构

#### Redis数据结构

我们常用的Redis数据类型有5种，分别是：

- String
- List
- Set
- SortedSet
- Hash

还有一些高级数据类型，比如Bitmap、HyperLogLog、GEO等，其底层都是基于上述5种基本数据类型。因此在Redis的源码中，其实只有5种数据类型。

##### RedisObject

![image-20240816174731974](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816174731974-1723801653615-21.png)

可以看到整个结构体中并不包含真实的数据，仅仅是对象头信息，内存占用的大小为4+4+24+32+64 = 128bit

也就是16字节，然后指针`ptr`指针指向的才是真实数据存储的内存地址。所以RedisObject的内存开销是很大的。

属性中的`encoding`就是当前对象底层采用的**数据结构**或**编码方式**，可选的有11种之多：

###### 编码方式

![image-20240816175047028](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816175047028-1723801853959-23.png)

###### 数据结构

![image-20240816175108015](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816175108015-1723801869416-25-1723801870850-27.png)

##### SkipList

![image-20240816175733612](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816175733612-1723802257159-29.png)

这种多级指针的查询方式就避免了传统链表的逐个遍历导致的查询效率下降问题。在对有序数据做随机查询和排序时效率非常高。

```C
typedef struct zskiplist {
    // 头尾节点指针
    struct zskiplistNode *header, *tail;
    // 节点数量
    unsigned long length;
    // 最大的索引层级
    int level;
} zskiplist;
```

可以看到SkipList主要属性是header和tail，也就是头尾指针，因此它是支持双向遍历的。

跳表中节点的结构体如下：

```C
typedef struct zskiplistNode {
    sds ele; // 节点存储的字符串
    double score;// 节点分数，排序、查找用
    struct zskiplistNode *backward; // 前一个节点指针
    struct zskiplistLevel {
        struct zskiplistNode *forward; // 下一个节点指针
        unsigned long span; // 索引跨度
    } level[]; // 多级索引数组
} zskiplistNode;
```

每个节点中都包含ele和score两个属性，其中score是得分，也就是节点排序的依据。ele则是节点存储的字符串数据指针。

##### SortedSet

Redis源码中`zset`，也就是`SortedSet`的结构体如下：

```C
typedef struct zset {
    dict *dict; // dict，底层就是HashTable
    zskiplist *zsl; // 跳表
} zset;
```



![image-20240816203006244](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816203006244.png)

### 内存回收

Redis之所以性能强，最主要的原因就是基于内存存储。然而单节点的Redis其内存大小不宜过大，会影响持久化或主从同步性能。

我们可以通过修改redis.conf文件，添加下面的配置来配置Redis的最大内存：

```Properties
maxmemory 1gb
```

当内存达到上限，就无法存储更多数据了。因此，Redis内部会有两套内存回收的策略：

- 内存过期策略
- 内存淘汰策略

#### 内存过期处理

存入Redis中的数据可以配置过期时间，到期后再次访问会发现这些数据都不存在了，也就是被过期清理了。

##### 过期命令

Redis中通过`expire`命令可以给KEY设置`TTL`（过期时间）

```Bash
# 写入一条数据
set num 123
# 设置20秒过期时间
expire num 20
```

不过set命令本身也可以支持过期时间的设置：

```Shell
# 写入一条数据并设置20s过期时间
set num EX 20
```

##### 过期策略

![image-20240816201905014](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816201905014-1723810747176-31-1723810748203-33.png)

![image-20240816202215834](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816202215834-1723810937819-35.png)

Redis的过期KEY删除策略有两种：

![image-20240816202327069](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816202327069-1723811008387-37.png)

#### 内存淘汰策略

![image-20240816202622759](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816202622759.png)比较容易混淆的有两个算法：

- **LRU**（**`L`**`east `**`R`**`ecently `**`U`**`sed`），最近最久未使用。用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高。
- **LFU**（**`L`**`east `**`F`**`requently `**`U`**`sed`），最少频率使用。会统计每个key的访问频率，值越小淘汰优先级越高。

![image-20240816203458140](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816203458140.png)

#### 总结

![image-20240816203603907](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816203603907.png)

![image-20240816203609741](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816203609741.png)

![image-20240816203619364](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816203619364.png)

![image-20240816203625166](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816203625166.png)

![image-20240816203632181](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240816203632181.png)



### 缓存篇

#### 缓存一致性

我们一般会采用Cache Aside 策略，中文是叫旁路缓存策略，然后采用先更新数据库，再删除缓存这个方案，可能也会出现数据不一致的问题，但在实际中，这个问题出现的概率并不高，因为缓存的写入通常要远远快于数据库的写入，所以实际上很难出现请求B已经更新了数据库并且删除了缓存，请求A才更新完缓存的情况，所以「先更新数据库 + 再删除缓存」的方案，是可以保证数据一致性的。但是为了确保万无一失，还是给缓存数据加上过期的时间，就算在这期间存在缓存数据不一致，有过期时间来兜底，这样也能达到最终一致。



但是现在又有一个问题，就是自己明明更新了数据，但是数据要过一段时间才生效。

上面这个问题的原因是：在删除缓存（第二个操作）的时候失败了，导致缓存中的数据是旧值。然后因为添加了过期时间作为保底，所以才会过一段时间才生效。

如何保证「先更新数据库 ，再删除缓存」这两个操作能执行成功？



##### 缓存命中率有很高的要求

「先更新数据库，再删除缓存」的方案虽然保证了数据库与缓存的数据一致性，但是每次更新数据的时候，缓存的数据都会被删除，这样会对缓存的命中率带来影响。**如果我们的业务对缓存命中率有很高的要求，我们可以采用「更新数据库 + 更新缓存」的方案，因为更新缓存并不会出现缓存未命中的情况**。

- 在更新缓存前先加个**分布式锁**，保证同一时间只运行一个请求更新缓存，就会不会产生并发问题了，当然引入了锁后，对于写入的性能就会带来影响。
- 在更新完缓存时，给缓存加上较短的**过期时间**，这样即时出现缓存不一致的情况，缓存的数据也会很快过期，对业务还是能接受的。

##### 针对「先删除缓存，再更新数据库」方案在「读 + 写」并发请求而造成缓存不一致

延迟双删

```text
#删除缓存
redis.delKey(X)
#更新数据库
db.update(X)
#睡眠
Thread.sleep(N)
#再删除缓存
redis.delKey(X)
```

加了个睡眠时间，主要是为了确保请求 A 在睡眠的时候，请求 B 能够在这这一段时间完成「从数据库读取数据，再把缺失的缓存写入缓存」的操作，然后请求 A 睡眠完，再删除缓存。

但是具体睡眠多久其实是个**玄学**，很难评估出来，所以这个方案也只是**尽可能**保证一致性而已，极端情况下，依然也会出现缓存不一致的现象。

##### 如何保证「先更新数据库 ，再删除缓存」这两个操作能执行成功？

![image-20240817225510181](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240817225510181.png)

###### 消息队列重试机制

我们可以引入**消息队列**，将第二个操作（删除缓存）要操作的数据加入到消息队列，由消费者来操作数据。

- 如果应用**删除缓存失败**，可以从消息队列中重新读取数据，然后再次删除缓存，这个就是**重试机制**。当然，如果重试超过的一定次数，还是没有成功，我们就需要向业务层发送报错信息了。
- 如果**删除缓存成功**，就要把数据从消息队列中移除，避免重复操作，否则就继续重试。

![image-20240817225622549](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240817225622549.png)

###### 订阅 MySQL binlog，再操作缓存

「**先更新数据库，再删缓存**」的策略的第一步是更新数据库，那么更新数据库成功，就会产生一条变更日志，记录在 binlog 里。

于是我们就可以通过订阅 binlog 日志，拿到具体要操作的数据，然后再执行缓存删除，阿里巴巴开源的 Canal 中间件就是基于这个实现的。

Canal 模拟 MySQL 主从复制的交互协议，把自己伪装成一个 MySQL 的从节点，向 MySQL 主节点发送 dump 请求，MySQL 收到请求后，就会开始推送 Binlog 给 Canal，Canal 解析 Binlog 字节流之后，转换为便于读取的结构化数据，供下游程序订阅使用。

![image-20240817225732556](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240817225732556.png)



前面我们说到直接用消息队列重试机制方案的话，会对代码造成入侵，那么 Canal 方案就能很好的规避这个问题，因为它是直接订阅 binlog 日志的，和业务代码没有藕合关系，因此我们可以通过 Canal+ 消息队列的方案来保证数据缓存的一致性。

具体的做法是：**将binlog日志采集发送到MQ队列里面，然后编写一个简单的缓存删除消息者订阅binlog日志，根据更新log删除缓存，并且通过ACK机制确认处理这条更新log，保证数据缓存一致性**

这里有一个很关键的点，**必须是删除缓存成功，再回 ack 机制给消息队列**，否则可能会造成消息丢失的问题，比如消费服务从消息队列拿到事件之后，直接回了 ack，然后再执行删除缓存操作的话，如果删除缓存的操作还是失败了，那么因为提前给消息队列回 ack了，就没办重试了。

所以，如果要想保证「先更新数据库，再删缓存」策略第二个操作能执行成功，我们可以使用：

- 消息队列来重试缓存的删除，优点是保证缓存一致性的问题，缺点会对业务代码入侵
- 订阅 MySQL binlog + 消息队列 + 重试缓存的删除，优点是规避了代码入侵问题，也很好的保证缓存一致性的问题，缺点就是引入的组件比较多，对团队的运维能力比较有高要求。

这两种方法有一个共同的特点，都是采用**异步操作缓存**。

##### 为什么是删除缓存，而不是更新缓存呢？

删除一个数据，相比更新一个数据更加轻量级，出问题的概率更小。在实际业务中，缓存的数据可能不是直接来自数据库表，也许来自多张底层数据表的聚合。

比如商品详情信息，在底层可能会关联商品表、价格表、库存表等，如果更新了一个价格字段，那么就要更新整个数据库，还要关联的去查询和汇总各个周边业务系统的数据，这个操作会非常耗时。 从另外一个角度，不是所有的缓存数据都是频繁访问的，更新后的缓存可能会长时间不被访问，所以说，从计算资源和整体性能的考虑，更新的时候删除缓存，等到下次查询命中再填充缓存，是一个更好的方案。

系统设计中有一个思想叫 Lazy Loading，适用于那些加载代价大的操作，删除缓存而不是更新缓存，就是懒加载思想的一个应用。





我们先看下目前企业用的最多的缓存模型。缓存的通用模型有三种：

- `Cache Aside`旁路缓存：有缓存调用者自己维护数据库与缓存的一致性。即：
  - 查询时：命中则直接返回，未命中则查询数据库并写入缓存
  - 更新时：更新数据库并删除缓存，查询时自然会更新缓存
- `Read/Write Through`读穿 / 写穿：数据库自己维护一份缓存，底层实现对调用者透明。底层实现：
  - 查询时：命中则直接返回，未命中则查询数据库并写入缓存
  - 更新时：判断缓存是否存在，不存在直接更新数据库。存在则更新缓存，同步更新数据库
- `Write Behind Cahing`写回缓存：读写操作都直接操作缓存，由线程异步的将缓存数据同步到数据库

![image-20240817213931866](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240817213931866-1723901976206-1.png)

![image-20240817214812547](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240817214812547-1723902495047-3.png)

![image-20240817215601845](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240817215601845.png)

先删除缓存再更新数据库      由于更新数据库的操作本身比较耗时，在期间有线程来查询数据库并更新缓存的概率非常高。因此不推荐这种方案。

先更新数据库再删除缓存      可以发现，异常状态发生的概率极为苛刻，线程1必须是查询数据库已经完成，但是缓存尚未写入之前。线程2要完成更新数据库同时删除缓存的两个操作。要知道线程1执行写缓存的速度在毫秒之间，速度非常快，在这么短的时间要完成数据库和缓存的操作，概率非常之低。

![image-20240817220213380](C:\Users\Jaeger_Eren\Desktop\misc\demo_learn\Eren's Note\Note\assets\image-20240817220213380.png)

#### 缓存穿透

当用户访问的数据，**既不在缓存中，也不在数据库中**，导致请求在访问缓存时，发现缓存缺失，再去访问数据库时，发现数据库中也没有要访问的数据，没办法构建缓存数据，来服务后续的请求。那么当有大量这样的请求到来时，数据库的压力骤增，这就是**缓存穿透**的问题。

##### 非法请求的限制

当有大量恶意请求访问不存在的数据的时候，也会发生缓存穿透，因此在 API 入口处我们要判断求请求参数是否合理，请求参数是否含有非法值、请求字段是否存在，如果判断出是恶意请求就直接返回错误，避免进一步访问缓存和数据库。

##### 缓存空值或者默认值

当我们线上业务发现缓存穿透的现象时，可以针对查询的数据，在缓存中设置一个空值或者默认值，这样后续请求就可以从缓存中读取到空值或者默认值，返回给应用，而不会继续查询数据库。

##### 布隆过滤器

快速判断数据是否存在，避免通过查询数据库来判断数据是否存在。

即使发生了缓存穿透，大量请求只会查询 Redis 和布隆过滤器，而不会查询数据库，保证了数据库能正常运行，Redis 自身也是支持布隆过滤器的。

###### 原理

布隆过滤器由「初始值都为 0 的位图数组」和「 N 个哈希函数」两部分组成。当我们在写入数据库数据时，在布隆过滤器里做个标记，这样下次查询数据是否在数据库时，只需要查询布隆过滤器，如果查询到数据没有被标记，说明不在数据库中。

布隆过滤器会通过 3 个操作完成标记：

- 第一步，使用 N 个哈希函数分别对数据做哈希计算，得到 N 个哈希值；
- 第二步，将第一步得到的 N 个哈希值对位图数组的长度取模，得到每个哈希值在位图数组的对应位置。
- 第三步，将每个哈希值在位图数组的对应位置的值设置为 1；

**当应用要查询数据 x 是否数据库时，通过布隆过滤器只要查到位图数组的第 1、4、6 位置的值是否全为 1，只要有一个为 0，就认为数据 x 不在数据库中**。

布隆过滤器由于是基于哈希函数实现查找的，高效查找的同时**存在哈希冲突的可能性**，比如数据 x 和数据 y 可能都落在第 1、4、6 位置，而事实上，可能数据库中并不存在数据 y，存在误判的情况。

**查询布隆过滤器说数据存在，并不一定证明数据库中存在这个数据，但是查询到数据不存在，数据库中一定就不存在这个数据**。

#### 缓存击穿

如果缓存中的**某个热点数据过期**了，此时大量的请求访问了该热点数据，就无法从缓存中读取，直接访问数据库，数据库很容易就被高并发的请求冲垮，这就是**缓存击穿**的问题。

##### 互斥锁方案

保证同一时间只有一个业务线程更新缓存，未能获取互斥锁的请求，要么等待锁释放后重新读取缓存，要么就返回空值或者默认值。

##### 不给热点数据设置过期时间

由后台异步更新缓存，或者在热点数据准备要过期前，提前通知后台线程更新缓存以及重新设置过期时间；

#### 缓存雪崩

当**大量缓存数据在同一时间过期（失效）或者 Redis 故障宕机**时，如果此时有大量的用户请求，都无法在 Redis 中处理，于是全部请求都直接访问数据库，从而导致数据库的压力骤增，严重的会造成数据库宕机，从而形成一系列连锁反应，造成整个系统崩溃，这就是**缓存雪崩**的问题。

##### 原因

可以看到，发生缓存雪崩有两个原因：

- 大量数据同时过期；
- Redis 故障宕机；

##### 大量数据同时过期

###### 均匀设置过期时间

我们可以在对缓存数据设置过期时间时，**给这些数据的过期时间加上一个随机数**，这样就保证数据不会在同一时间过期。

###### 互斥锁

当业务线程在处理用户请求时，**如果发现访问的数据不在 Redis 里，就加个互斥锁，保证同一时间内只有一个请求来构建缓存**（从数据库读取数据，再将数据更新到 Redis 里），当缓存构建完成后，再释放锁。未能获取互斥锁的请求，要么等待锁释放后重新读取缓存，要么就返回空值或者默认值。

实现互斥锁的时候，最好设置**超时时间**，不然第一个请求拿到了锁，然后这个请求发生了某种意外而一直阻塞，一直不释放锁，这时其他请求也一直拿不到锁，整个系统就会出现无响应的现象。

###### 后台更新缓存

业务线程不再负责更新缓存，缓存也不设置有效期，而是**让缓存“永久有效”，并将更新缓存的工作交由后台线程定时更新**。

##### Redis 故障宕机

###### 服务熔断或请求限流机制

因为 Redis 故障宕机而导致缓存雪崩问题时，我们可以启动**服务熔断**机制，**暂停业务应用对缓存服务的访问，直接返回错误**，不用再继续访问数据库，从而降低对数据库的访问压力，保证数据库系统的正常运行，然后等到 Redis 恢复正常后，再允许业务应用访问缓存服务。

服务熔断机制是保护数据库的正常允许，但是暂停了业务应用访问缓存服系统，全部业务都无法正常工作

为了减少对业务的影响，我们可以启用**请求限流**机制，**只将少部分请求发送到数据库进行处理，再多的请求就在入口直接拒绝服务**，等到 Redis 恢复正常并把缓存预热完后，再解除请求限流的机制。

###### 构建 Redis 缓存高可靠集群

主从节点的方式构建 Redis 缓存高可靠集群。如果 Redis 缓存的主节点故障宕机，从节点可以切换成为主节点，继续提供缓存服务，避免了由于 Redis 故障宕机而导致的缓存雪崩问题。


