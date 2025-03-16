---
title: "复盘"
description: ""
icon: ""
date: 2025-03-08
category:
  - 复盘
tag:
  - 复盘
---

:::info
胜不骄，败不馁
我最大的敌人就是我自己
心比天高，眼高手低
菜就是菜，不要给自己找借口
将所有相关的场景都自己去实现一遍
:::

## zh

### Linux 中查看占用内存命令

```shell
我在Linux常用的命令

top 查看系统资源使用情况

df -h 查看磁盘空间使用情况

ps -ef | grep java 查看所有包含java的进程 (最主要的参数是%CPU 和 %MEM)

nohup java -jar app.jar > output.log 2>&1 & 后台启动Java应用，并将日志保存到指定文件

netstat -anp | grep 8080 查看端口占用情况

kill -9 pid 强制杀死一个进程

1.查看系统整体内存使用情况
free -h
2.查看各个进程的内存占用
top(按 Shift + M 可以按内存使用排序。)

`top` 命令用于实时显示系统的资源使用情况，包括 CPU、内存、进程等。

top - 14:32:01 up  2:15,  2 users,  load average: 0.15, 0.10, 0.05
Tasks: 120 total,   1 running, 119 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.5 us,  0.5 sy,  0.0 ni, 97.5 id,  0.5 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   8000.0 total,   2000.0 free,   3000.0 used,   3000.0 buff/cache
MiB Swap:   2000.0 total,   1500.0 free,    500.0 used.   4000.0 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1234 user      20   0   12345   6789   1234 S   1.0   0.1   0:00.10 java
 5678 user      20   0   23456   7890   2345 S   0.5   0.2   0:01.20 python

1. 第一行：
   - `14:32:01`：当前时间。
   - `up 2:15`：系统已运行 2 小时 15 分钟。
   - `2 users`：当前有 2 个用户登录。
   - `load average`：系统的平均负载（1 分钟、5 分钟、15 分钟）。

2. 第二行（Tasks）：
   - `120 total`：总进程数。
   - `1 running`：正在运行的进程数。
   - `119 sleeping`：休眠的进程数。
   - `0 stopped`：停止的进程数。
   - `0 zombie`：僵尸进程数。

3. 第三行（%Cpu(s)）：
   - `us`：用户空间占用 CPU 百分比。
   - `sy`：内核空间占用 CPU 百分比。
   - `id`：空闲 CPU 百分比。
   - `wa`：等待 I/O 操作的 CPU 百分比。
   - `hi`：硬件中断占用 CPU 百分比。
   - `si`：软件中断占用 CPU 百分比。
   - `st`：虚拟机偷取的 CPU 百分比。

4. 第四行（MiB Mem）：
   - `total`：总内存。
   - `free`：空闲内存。
   - `used`：已用内存。
   - `buff/cache`：缓存和缓冲区内存。

5. 第五行（MiB Swap）：
   - `total`：总交换分区大小。
   - `free`：空闲交换分区大小。
   - `used`：已用交换分区大小。
   - `avail Mem`：可用内存。

6. 进程列表：
   - `PID`：进程 ID。
   - `USER`：进程所有者。
   - `PR`：进程优先级。
   - `NI`：进程的 nice 值。
   - `VIRT`：虚拟内存使用量。
   - `RES`：物理内存使用量。
   - `SHR`：共享内存使用量。
   - `S`：进程状态（S=休眠，R=运行，Z=僵尸）。
   - `%CPU`：CPU 使用率。
   - `%MEM`：内存使用率。
   - `TIME+`：进程占用 CPU 的总时间。
   - `COMMAND`：进程名称或命令。
```

我的看法是重点关注：%Cpu(s)（特别是 us 和 sy）、MiB Mem（特别是 used 和 avail Mem）、Swap（特别是 used）、进程列表中的 %CPU 和 %MEM。

为什么要重要关注 %CPU 和 %MEM？

%CPU：用于识别占用 CPU 最多的进程，帮助定位 CPU 密集型任务或性能瓶颈。%MEM：用于识别占用内存最多的进程，帮助定位内存泄漏或内存密集型任务。结合使用：通过 %CPU 和 %MEM 可以快速定位系统中的资源瓶颈，并采取相应的优化措施。

### Linux 包括查看特定应用命令

ps aux | grep 应用

top -b -n 1 | grep 应用

### Linux 中查看 8080 端口是否被占用

```shell
唉，敲了那么多遍，你怎么还能忘记的啊？
netstat -tuln | grep 8080
-t：显示TCP端口。
-u：显示UDP端口。
-l：显示监听中的端口。
-n：以数字形式显示地址和端口号。
grep :8080：过滤出包含 8080 端口的行。
```

### Java -jar 命令可以在后台运行吗

```shell
1.使用&在后台运行 =》简单后台运行
java -jar your-app.jar &
2.使用nohup防止进程被终止 =》终端关闭后继续运行
nohup java -jar your-app.jar > output.log 2>&1 &

nohup：忽略挂断信号，使进程在终端关闭后继续运行。
> output.log：将标准输出重定向到 output.log 文件。
2>&1：将标准错误输出重定向到标准输出（即也写入 output.log）。
&：将进程放到后台运行。

和 & 在后台有什么区别

3.使用系统服务（Systemd）=》长期运行服务
4.使用 Docker 容器 怎么使用dockerfile部署Jar

```

### Dockerfile 怎么部署 Jar

1. 准备 JAR 文件
2. 创建 Dockerfile

```shell
# 使用官方的 OpenJDK 镜像作为
# 基础镜像
FROM openjdk:17-jdk-alpine

# 设置工作目录
# 工作目录指令
WORKDIR /app

# 将本地的 JAR 文件复制到容器中的 /app 目录
# 文件操作指令
COPY test.jar /app/test.jar

# 暴露应用程序运行的端口（根据你的 JAR 文件配置修改）
# 暴露端口指令
EXPOSE 8080

# 设置启动命令
# 启动命令指令
ENTRYPOINT ["java", "-jar", "test.jar"]
```

3. 构建 Docker 镜像

docker build -t my-java-app .

4. 运行 Docker 容器

docker run -d -p 8080:8080 --name my-java-container my-java-app

5. 查看容器日志

docker logs -f my-java-container

### Dockerfile 常见的模块（指令）及其作用

```shell
一个典型的 Dockerfile 可能包含以下模块：

FROM：基础镜像。

LABEL：元数据。

WORKDIR：工作目录。

COPY/ADD：复制文件。

RUN：执行命令。

ENV：设置环境变量。

EXPOSE：暴露端口。

CMD/ENTRYPOINT：启动命令。

USER：指定用户。

HEALTHCHECK：健康检查。

VOLUME：定义卷。

ARG：构建参数。

多阶段构建：优化镜像大小。
```

### MySQL 你是怎么配置的

```shell
MySQL 的配置文件通常位于以下路径：

Linux：/etc/my.cnf 或 /etc/mysql/my.cnf

Windows：C:\ProgramData\MySQL\MySQL Server X.X\my.ini

MySQL 配置文件分为多个部分，常见的部分包括：

[mysqld]：MySQL 服务器的配置。

[client]：MySQL 客户端的配置。

[mysql]：MySQL 命令行工具的配置。

[mysqldump]：MySQL 备份工具的配置。

```

### Redis 你是怎么配置的

```shell
我的常见配置文件

Redis 的配置文件通常位于以下路径：

Linux：/etc/redis/redis.conf

Windows：redis.windows.conf

基础配置
# 绑定 IP 地址（默认只允许本地访问）
bind 127.0.0.1

# 监听端口
port 6379

# 守护进程模式（后台运行）
daemonize yes

# 日志文件路径
logfile /var/log/redis/redis.log

# 数据库数量
databases 16

内存管理
# 最大内存限制
maxmemory 2gb

# 内存淘汰策略
maxmemory-policy allkeys-lru  # 最近最少使用淘汰
# 其他策略：
# volatile-lru：只淘汰设置了过期时间的键
# allkeys-random：随机淘汰
# volatile-random：随机淘汰设置了过期时间的键
# noeviction：不淘汰，返回错误

持久化配置
# 启用 RDB 持久化
save 900 1  # 900 秒内至少 1 次修改则保存
save 300 10 # 300 秒内至少 10 次修改则保存
save 60 10000 # 60 秒内至少 10000 次修改则保存

# RDB 文件路径
dbfilename dump.rdb

# RDB 文件存储目录
dir /var/lib/redis

# 启用 AOF 持久化
appendonly yes

# AOF 文件路径
appendfilename "appendonly.aof"

# AOF 同步策略
appendfsync everysec  # 每秒同步一次
# 其他策略：
# always：每次写入都同步
# no：由操作系统决定何时同步

安全配置
# 设置密码
requirepass yourpassword

# 重命名危险命令（防止误操作）
rename-command FLUSHALL ""  # 禁用 FLUSHALL
rename-command FLUSHDB ""   # 禁用 FLUSHDB
rename-command CONFIG ""    # 禁用 CONFIG

性能优化
# 客户端连接数限制
maxclients 10000

# 超时设置（秒）
timeout 300  # 客户端空闲 300 秒后断开连接

# TCP 连接保活
tcp-keepalive 60

# 禁用 THP（透明大页）
disable-thp yes
```

### 线程池你有使用过吗，有几个重要的参数，你有什么了解过吗

```shell
    /**
     * 用给定的初始参数创建一个新的ThreadPoolExecutor。
     */
    public ThreadPoolExecutor(int corePoolSize,//线程池的核心线程数量
                              int maximumPoolSize,//线程池的最大线程数
                              BlockingQueue<Runnable> workQueue,//任务队列，用来储存等待执行任务的队列
                              long keepAliveTime,//当线程数大于核心线程数时，多余的空闲线程存活的最长时间
                              TimeUnit unit,//时间单位
                              ThreadFactory threadFactory,//线程工厂，用来创建线程，一般默认即可
                              RejectedExecutionHandler handler//拒绝策略，当提交的任务过多而不能及时处理时，我们可以定制策略来处理任务
                               ) {
        if (corePoolSize < 0 ||
            maximumPoolSize <= 0 ||
            maximumPoolSize < corePoolSize ||
            keepAliveTime < 0)
            throw new IllegalArgumentException();
        if (workQueue == null || threadFactory == null || handler == null)
            throw new NullPointerException();
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
        this.keepAliveTime = unit.toNanos(keepAliveTime);
        this.threadFactory = threadFactory;
        this.handler = handler;
    }
    3个最重要的参数和4个其他常见参数
```

个人理解，有核心线程数（任务队列未到达列表容量时，最大可以同时运行的线程数量）、最大线程数（任务队列到达列表容量时，当前可以同时运行的线程数量变为最大线程数）、任务队列（新任务来临时先判断当前运行的线程数量是否达到核心线程数，如果到达的话，新任务就会被存放在队列中）、存活时间（当线程池中的线程数量大于核心线程数时，即有非核心线程时，这些非核心线程空闲后不会立即销毁，而是会等待，直到等到存活时间超过为止，才会被回收销毁）、时间单位（存活时间的单位）、线程工厂（excutor创建新线程的时候就会用到）、拒绝策略


### Varchar 和 Char 之间的关系你有了解过吗

CHAR是定长字符串 VARCHAR是变长字符串

1. 存储方式 CHAR是固定长度，未使用部分用空格填充 VARCHAR可变长度，只存储实际内容
2. 存储空间 CHAR固定，占用指定长度空间 VARCHAR根据实际内容动态分配空间
3. 性能 CHAR查询速度通常更快（固定长度） VARCHAR查询速度可能稍慢（可变长度）
4. 适用场景 CHAR适合长度固定的字符串（如国家代码、性别） VARCHAR适合长度不固定的字符串（如姓名、地址）
5. 最大长度 CHAR通常为255字符 VARCHAR通常为65535字符（取决于数据库）

CHAR: 固定长度，适合短且长度固定的字符串。

VARCHAR: 可变长度，适合长度不固定的字符串。

### MySQL 设计数据库表的时候怎么使用常见的数据结构

数值类型：整型（TINYINT、SMALLINT、MEDIUMINT、INT 和 BIGINT）浮点型（FLOAT 和 DOUBLE）、定点型（DECIMAL）

字符串类型：CHAR、VARCHAR、TINYTEXT、TEXT、MEDIUMTEXT、LONGTEXT、TINYBLOB、BLOB、MEDIUMBLOB 和 LONGBLOB 等，最常用的是 CHAR 和 VARCHAR。

日期时间类型：YEAR、TIME、DATE、DATETIME 和 TIMESTAMP 等。

### MySQL 索引失效的问题你有了解过吗

1. 最左匹配原则

> 概念：最左匹配原则顾名思义：最左优先，以最左边的为起点任何连续的索引都能匹配上。同时遇到范围查询(>、<、between、like)就会停止匹配。

那为什么遇到范围查询就停止了呢，因为它是范围查询啊，哈哈哈哈哈哈

如果 INDEX `联合索引`(`sname`, `s_code`, `address`) USING BTREE
```shell
select create_time from student where address = "上海" and sname = "变成派大星"
select create_time from student where sname = "变成派大星" and address = "上海" 
```
那么上面这两句都走了ref索引，因为优化器会自动调整sname，s_code的顺序

我的思考：首先它是发生在联合索引，是闯关游戏的设计，过了第一关才可以开始第二关，过了第二关才可以第三关

底层原理：索引的底层是一颗 B+树，那么联合索引的底层也就是一颗 B+树，只不过联合索引的 B+树节点中存储的是键值。由于构建一棵 B+树只能根据一个值来确定索引关系，所以数据库依赖联合索引最左的字段来构建

MySQL8.0版本开始增加了索引跳跃扫描的功能，当第一列索引的唯一值较少时，即使 where 条件没有第一列索引，查询的时候也可以用到联合索引。比如我们使用的联合索引是 bcd 但是 b 中字段比较少 我们在使用联合索引的时候没有 使用 b 但是依然可以使用联合索引 MySQL 联合索引有时候遵循最左前缀匹配原则，有时候不遵循。

总结：前提 如果创建 b,c,d 联合索引面

- 如果 我 where 后面的条件是c = 1 and d = 1为什么不能走索引呢 如果没有 b 的话 你查询的值相当于*11 我们都知道*是所有的意思也就是我能匹配到所有的数据
- 如果 我 where 后面是b = 1 and d =1 为什么会走索引呢？你等于查询的数据是 1*1我可以通过前面 1 进行索引匹配 所以就可以走索引
- 最左缀匹配原则的最重要的就是 第一个字段

2. select *

```shell
explain select * from leftaffix where b > 1
```

- select * 会走索引
- 范围查找有概率索引失效但是在特定的情况下会生效 范围小就会使用 也可以理解为 返回结果集小就会使用索引
- mysql 中连接查询的原理是先对驱动表进行查询操作，然后再用从驱动表得到的数据作为条件，逐条的到被驱动表进行查询。
- 每次驱动表加载一条数据到内存中，然后被驱动表所有的数据都需要往内存中加载一遍进行比较。效率很低，所以 mysql 中可以指定一个缓冲池的大小，缓冲池大的话可以同时加载多条驱动表的数据进行比较，放的数据条数越多性能 io 操作就越少，性能也就越好。所以，如果此时使用select * 放一些无用的列，只会白白的占用缓冲空间。浪费本可以提高性能的机会。
- select _ 不是造成索引失效的直接原因 大部分原因是 where 后边条件的问题 但是还是尽量少去使用 select _ 多少还是会有影响的

3. 使用函数

在哪里使用函数？

```shell
explain select e from leftaffix where length(b) = 6
```

因为索引保存的是索引字段的原始值，而不是经过函数计算后的值，自然就没办法走索引了。

不过，从 MySQL 8.0 开始，索引特性增加了函数索引，即可以针对函数计算后的值建立一个索引，也就是说该索引的值是函数计算后的值，所以就可以通过扫描索引来查询数据。

4. 计算操作

```shell
explain select e from leftaffix where b - 1 = 6
```

因为索引保存的是索引字段的原始值，而不是 b - 1 表达式计算后的值，所以无法走索引，只能通过把索引字段的取值都取出来，然后依次进行表达式的计算来进行条件判断，因此采用的就是全表扫描的方式。

总而言之 言而总之 只要是影响到索引列的值 索引就是失效

5. Like %

- %百分号通配符: 表示任何字符出现任意次数(可以是 0 次).
- _下划线通配符: 表示只能匹配单个字符,不能多也不能少,就是一个字符.
- like 操作符: LIKE 作用是指示 mysql 后面的搜索模式是利用通配符而不是直接相等匹配进行比较.

```shell
explain select sname from student where sname like '学生%';
+----+-------------+---------+------------+-------+---------------+----------+---------+------+------+----------+--------------------------+
| id | select_type | table   | partitions | type  | possible_keys | key      | key_len | ref  | rows | filtered | Extra                    |
+----+-------------+---------+------------+-------+---------------+----------+---------+------+------+----------+--------------------------+
|  1 | SIMPLE      | student | NULL       | range | 联合索引      | 联合索引 | 62      | NULL |    3 |   100.00 | Using where; Using index  |
+----+-------------+---------+------------+-------+---------------+----------+---------+------+------+----------+--------------------------+
explain select sname from student where sname like '学生%';
+----+-------------+---------+------------+-------+---------------+----------+---------+------+------+----------+--------------------------+
| id | select_type | table   | partitions | type  | possible_keys | key      | key_len | ref  | rows | filtered | Extra                    |
+----+-------------+---------+------------+-------+---------------+----------+---------+------+------+----------+--------------------------+
|  1 | SIMPLE      | student | NULL       | index | NULL          | 联合索引 | 370     | NULL |    4 |    25.00 | Using where; Using index |
+----+-------------+---------+------------+-------+---------------+----------+---------+------+------+----------+--------------------------+
```

索引的时候和查询范围关系也很大 范围过大造成索引没有意义从而失效的情况也不少

6. 使用 Or 导致索引失效

```shell
explain select e from leftaffix where b = 1 or e = 1;
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | leftaffix | NULL       | ALL  | 联合索引      | NULL | NULL    | NULL |    7 |    57.14 | Using where |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
```
在where子句，如果在or前的条件列是索引列，而在or后的条件列不是索引列，那么索引会失效。

怎么优化？

```shell
explain select e from leftaffix where b = 1 or a = 1;
+----+-------------+-----------+------------+-------------+------------------+------------------+---------+------+------+----------+-------------------------------------------------+
| id | select_type | table     | partitions | type        | possible_keys    | key              | key_len | ref  | rows | filtered | Extra                                           |
+----+-------------+-----------+------------+-------------+------------------+------------------+---------+------+------+----------+-------------------------------------------------+
|  1 | SIMPLE      | leftaffix | NULL       | index_merge | PRIMARY,联合索引 | 联合索引,PRIMARY | 5,4     | NULL |    2 |   100.00 | Using sort_union(联合索引,PRIMARY); Using where |
+----+-------------+-----------+------------+-------------+------------------+------------------+---------+------+------+----------+-------------------------------------------------+
```
这个优化方式就是在Or的时候两边都加上索引，就会使用索引，避免全表扫描

7. in 使用不当

```shell
mysql> explain select e from leftaffix where b in (1);
+----+-------------+-----------+------------+------+---------------+----------+---------+-------+------+----------+-------+
| id | select_type | table     | partitions | type | possible_keys | key      | key_len | ref   | rows | filtered | Extra |
+----+-------------+-----------+------------+------+---------------+----------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | leftaffix | NULL       | ref  | 联合索引      | 联合索引 | 5       | const |    1 |   100.00 | NULL  |
+----+-------------+-----------+------------+------+---------------+----------+---------+-------+------+----------+-------+


mysql> explain select e from leftaffix where b in (1,2,3,4,5);
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | leftaffix | NULL       | ALL  | 联合索引      | NULL | NULL    | NULL |    7 |   100.00 | Using where |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
```

首先使用 In 不是一定会造成全表扫描的 IN 肯定会走索引，但是当 IN 的取值范围较大时会导致索引失效，走全表扫描

in 在结果集 大于 30%的时候索引失效

8. not in 和 In 的失效场景相同
9. order By

```shell
mysql> explain select e from leftaffix order by b;
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+----------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra          |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+----------------+
|  1 | SIMPLE      | leftaffix | NULL       | ALL  | NULL          | NULL | NULL    | NULL |    7 |   100.00 | Using filesort |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+----------------+
```
这一个主要是 Mysql 自身优化的问题 我们都知道 OrderBy 是排序 那就代表我需要对数据进行排序 如果我走索引 索引是排好序的 但是我需要回表 消耗时间 另一种 我直接全表扫描排序 不用回表 也就是
- 走索引 + 回表
- 不走索引 直接全表扫描
Mysql 认为直接全表扫面的速度比 回表的速度快所以就直接走索引了 在 Order By 的情况下 走全表扫描反而是更好的选择

10. 总结

查询范围过大导致失效
- Like %
- Not in
- In
更改字段造成失效
- 使用函数
- 计算操作
字段使用不确定导致索引失效
- or
最优选择导致索引失效
- order By
未遵循最左缀匹配原则
Select * 不会导致失效 降低效率
- 不会直接导致索引失效，因为回表的原因，会有查询效率上面的折扣

### MySQL执行计划分析

1. 什么是执行计划？

用于SQL性能分析、优化等场景。

执行计划是指一条SQL语句在经过MySQL查询优化器的优化后，具体的执行方式

2. 如何获取执行计划？

Explain + 语句

```shell
id SELECT 查询的序列标识符
select_type SELECT 关键字对应的查询类型
table 用到的表名
partitions 匹配的分区，对于未分区的表，值为 NULL
type 表的访问方法
possible_keys 可能用到的索引
key 实际用到的索引
key_len 所选索引的长度
ref 当使用索引等值查询时，与索引作比较的列或常量
rows 预计要读取的行数
filtered 按表条件过滤后，留存的记录数的百分比
Extra 附加信息如何分析 
```

1. 如何分析EXPLAIN结果？三个比较重要的参数
```shell
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+----------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra          |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+----------------+
|  1 | SIMPLE      | leftaffix | NULL       | ALL  | NULL          | NULL | NULL    | NULL |    7 |   100.00 | Using filesort |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+----------------+

id:？SELECT标识符，用于标识每个SELECT语句的执行顺序。

select_type:主要用于区分普通查询、联合查询、子查询等复杂的查询。
SIMPLE：简单查询，不包含 UNION 或者子查询。
PRIMARY：查询中如果包含子查询或其他部分，外层的 SELECT 将被标记为 PRIMARY。
SUBQUERY：子查询中的第一个 SELECT。
UNION：在 UNION 语句中，UNION 之后出现的 SELECT。
DERIVED：在 FROM 中出现的子查询将被标记为 DERIVED。
UNION RESULT：UNION 查询的结果。

table：表名

type（非常重要）：查询执行的类型，描述了查询是如何执行的。system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL
system：如果表使用的引擎对于表行数统计是精确的（如：MyISAM），且表中只有一行记录的情况下，访问方法是 system ，是 const 的一种特例。
const：表中最多只有一行匹配的记录，一次查询就可以找到，常用于使用主键或唯一索引的所有字段作为查询条件。
eq_ref：当连表查询时，前一张表的行在当前这张表中只有一行与之对应。是除了 system 与 const 之外最好的 join 方式，常用于使用主键或唯一索引的所有字段作为连表条件。
ref：使用普通索引作为查询条件，查询结果可能找到多个符合条件的行。
index_merge：当查询条件使用了多个索引时，表示开启了 Index Merge 优化，此时执行计划中的 key 列列出了使用到的索引。
range：对索引列进行范围查询，执行计划中的 key 列表示哪个索引被使用了。
index：查询遍历了整棵索引树，与 ALL 类似，只不过扫描的是索引，而索引一般在内存中，速度更快。
ALL：全表扫描。

possible_keys：表示 MySQL 执行查询时可能用到的索引

key（重要）：表示 MySQL 实际使用到的索引。如果为 NULL，则表示未用到索引

key_len：key_len 列表示 MySQL 实际使用的索引的最大长度；

rows：表示根据表统计信息及选用情况，大致估算出找到所需的记录或所需读取的行数

Extra（重要）：这列包含了 MySQL 解析查询的额外信息，通过这些信息，可以更准确的理解 MySQL 到底是如何执行查询的。
```
### Redis 过期删除策略

这是Redis功能篇中的，使用的是[惰性删除 + 定期删除]，删除的对象是已过期的Key。

1. 不主动删除过期键，每次从数据库访问key时，都检测key是否过期，如果过期则删除该key
2. 定期删除，每隔一段时间随机从数据库中取出一定数量的key进行筛查，并删除其中过期key

### RabbitMQ 的原理

1. 核心是消息队列，生产者将消息发送到队列，消费者从队列中接收并处理消息。队列遵循FIFO（先进先出）原则，确保消息按顺序处理。
2. 生产者与消费者（负责创建并发送消息到队列 | 从队列中接收并处理消息）。
3. 交换器：生产者不直接将消息发送到队列，而是通过交换器。交换器根据规则将消息路由到一个或多个队列。
   - Direct Exchange：基于路由键精确匹配。
   - Fanout Exchange：广播消息到所有绑定队列。
   - Topic Exchange：基于路由键的模式匹配。
   - Headers Exchange：基于消息头属性路由。
4. 绑定（Binding）：绑定是交换器和队列之间的连接，定义了消息如何从交换器路由到队列。
5. 消息确认：
   - 生产者确认：生产者收到消息已到达交换器的确认。
   - 消费者确认：消费者处理完消息后发送确认，RabbitMQ才会从队列中移除消息。
6. 持久化：为防止消息丢失，RabbitMQ 支持消息和队列的持久化，即使服务器重启，消息也不会丢失。
7. 集群与高可用：RabbitMQ 支持集群模式，多个节点共享队列和交换器信息，提供高可用性和负载均衡。
8. 插件机制：RabbitMQ 支持插件扩展，如管理界面、消息追踪等，增强其功能。

### RabbitMQ有什么交换机

RabbitMQ 常用的 Exchange Type 有 fanout、direct、topic、headers 这四种

广播交换器：将消息交给所有绑定到交换器的队列 将消息发送到所有绑定到该交换器的队列，忽略Routing key。

定向交换器：将消息交给符合指定Routing key的队列 将消息发送到与Routing key完全匹配的队列。

主题交换器：通配符，把消息交给符合Routing pattern（路由模式）的队列 根据Routing pattern（路由模式）将消息发送到匹配的队列，支持通配符。

### @SpringBootApplication注解有了解过吗

@SpringBootApplication看作是 @Configuration、@EnableAutoConfiguration、@ComponentScan注解的集合
- @EnableAutoConfiguration 启动SpringBoot的自动配置机制
- @ComponentScan 扫描被@Component（@Repository,@Service,@Controller）注解的Bean，注解默认会扫描该类所在的包下的所有类
- @Configuration 允许在Spring上下文中注册额外的bean或导入其他配置类

### @ComponentScan默认扫描位置

默认扫描当前配置类所在的包及其子包。

可以通过 basePackages 或 basePackageClasses 指定扫描路径。

可以通过 excludeFilters 或 includeFilters 排除或包含特定组件。

在多模块或复杂项目中，显式配置 @ComponentScan 可以提高代码的可读性和可维护性。

## bedl

### 请你先介绍一下你的项目经历和业务

单独开一篇，使用STAR法则

### RabbitMQ的核心原理是什么？

如上

### 项目代码管理是用的什么?

Git

### 你学过数据结构吗？有哪些算法，你可以介绍一下吗？

- 排序算法：快速排序、归并排序、堆排序等
- 搜索算法：二分查找、深度优先搜索、广度优先搜索
- 图算法：不了解，以后一定突击
- 动态规划：背包问题、最长公共子序列、最短路径问题

### Linux中的ubuntn你使用过哪些命令？

ls、cd、pwd、cp、mv、rm、cat、grep、chmod、ps、top

### 你使用过Docker吗，知道哪些命令？你能说说怎么部署Nginx容器的吗

```shell
docker run \
-p 80:80 \
-p 443:443 \
--name nginx \
-v /usr/local/nginx/html/blog:/usr/share/nginx/html \
-v /usr/local/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /usr/local/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /usr/local/nginx/log:/var/log/nginx \
-v /usr/local/nginx/ssl:/etc/nginx/ssl \
--privileged=true -d --restart=always \
-d nginx:latest
```

### 你前端数据发送给后端，这个前端是怎么发送的?

Axios
```javascript
axios({
  method: 'get',
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  params: {
    id: 123
  },
  headers: {
    'X-Custom-Header': 'foobar'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});
```

### 如果发生代码冲突了，你会怎么进行解决?

我回答的没有问吧，我真厉害，哈哈哈哈哈

1. git pull拉取远程代码或者git merge合并分支，如果发生冲突，Git会提示冲突信息。冲突文件会被标记为unmerged状态
2. 打开冲突文件 你写的代码和其他人写的代码
3. 解决冲突
   1. 手动解决，仔细阅读冲突部分，决定保留哪些代码
   2. 使用工具解决，使用Idea自带的冲突解决工具
4. 标记冲突已解决 git add 冲突文件
5. 完成合并
   1. 如果在合并分支时发生的冲突，完成冲突解决后，继续合并：git commit
   2. 如果在拉取代码时发生的冲突，完成冲突解决后，继续拉去：git
   rebase --continue
6. 测试一下
7. 提交代码 git push origin 分支名

### 数据库中的外键是什么意思，请你讲一下?

外键是用于建立和强制表与表之间关系的一种约束。

外键指向另一个表的主键，确保数据的完整性和一致性。

例如，订单表中的用户ID可以是外键，指向用户表的主键，确保每个订单都对应一个有效的用户。

### Linux是怎么查看路径下的硬盘大小?

```shell
df -h /path/to/directory
```

### 你给哪些数据库备份过，请你说一下你是如何给mysql进行备份的，是用的什么命令还是工具

我使用过MySQL的备份工具，常用的方法包括：
- **mysqldump**：使用`mysqldump`命令备份数据库。例如：
  ```bash
  mysqldump -u username -p database_name > backup.sql
  ```
- **自动化备份**：使用cron定时任务定期执行备份脚本。
- **工具**：使用数据库连接工具Navicat将其导出

### Git中的git stash命令有没有用过，是干什么的?你是怎么使用的？

有时候我们需要切换到其他的分支，但是我现在的分支上有代码修改了，无法进行切换，所以我希望将这段代码临时保存一下

1. 临时切换分支
```bash
git stash

git checkout main

git commit -m "Fix Bug"

git checkout feature-branch

git stash pop
```

2. 保存未完成的更改
```bash
git stash save "feature a"

git checkout other-branch 

git checkout feature-branch

git stash apply
```
3. 清理存储条目
```bash
git stash list

git stash drop stash@{1}

git stash clear
```

### MongoDB你在项目中是怎么使用的？简单的讲一下?

MongoDB是一种NoSQL数据库，通常用于存储非结构化或半结构化数据

- 存储文档型数据：MongoDB以BSON格式存储数据，适合存储JSON类似的文档类型
- 高并发读写：MongoDB支持水平扩展，适合高并发读写的场景
- 灵活的模式设计：MongoDB不需要预先定义表结构，适合需要变化频繁的场景

### Docker容器的部署的几种方式，你知道哪些？

1. 单机部署
2. Docker Compose：通过docker-compse.yml文件定义多个容器的部署方式，适合本地开发和测试

### 设计数据库表的时候，有没有什么办法可以只查询一条数据，或者说剔除重复的数据

1. 只查询一条数据
   - limit 1限制查询结果只返回一条数据
   - distinct去除重复的数据
2. 剔除重复数据
   - group by对某个字段进行分组，去除重复数据
   - distinct去除重复的行
   - row_number()窗口函数，配合partition by去除重复数据

### 你对我们公司的业务有什么相关的了解吗？

我觉得提前了解公司的业务领域、产品和服务，结合自己的经验和技能，来说明我如何能够为公司业务带来价值

### 你知道哪些东西可以当作是缓存

1. 内存缓存：如 Redis、Memcached。
2. 浏览器缓存：如 HTTP 缓存头（Cache-Control、ETag 等）。
3. CDN 缓存：用于加速静态资源的访问。
4. 数据库缓存：如 MySQL 的查询缓存（已废弃）、InnoDB 缓冲池。
5. 应用级缓存：如 Spring Cache、Guava Cache。
6. 分布式缓存：如 Redis Cluster、Hazelcast。

### 数据库的索引是怎么设计的或者说是怎么使用的?

1. 索引设计：
 - 单列索引
 - 复合索引
 - 唯一索引
 - 全文索引
2. 索引使用
 - 在查询条件中使用索引字段，避免全表扫描
 - 避免在索引列上使用函数或表达式，否则索引会失效
 - 定期维护索引，删除不必要的索引以减少写操作的开销

### 在项目中你是怎么设计数据表的？

1. 需求分析：明确业务需求，确定表的字段和关系
2. 范式设计：遵循数据库设计范式（1NF、2NF、3NF）,避免数据冗余
3. 主键设计：选择合适的字段作为主键
4. 索引设计：根据查询需求创建合适的索引

### SpringBoot启动项你有了解过吗

SpringApplication类，它是Spring Boot应用的入口

1. 加载配置：读取application.yml文件
2. 初始化上下文，创建ApplicationContext，加载Bean定义
3. 执行Runner：执行 CommandLineRunner 或 ApplicationRunner。
4. 启动内嵌服务器：如Tomcat、Jetty

## tj

### Spring和SpringBoot不熟悉

Spring 是一个轻量级的 Java 开发框架，提供了依赖注入、AOP、事务管理等功能。Spring Boot 是 Spring 的扩展，简化了 Spring 应用的开发和部署，提供了自动配置、内嵌服务器等功能。

### SpringBoot的自动装配原理

Spring Boot 的自动装配通过 @EnableAutoConfiguration 注解实现。它通过 spring.factories 文件加载自动配置类，根据类路径下的依赖自动配置 Bean。

### SpringBoot Starter的原理以及怎么实现

Spring Boot Starter 的核心原理是基于 Spring Boot 的自动装配机制。
1. 依赖管理：Starter 是一个 Maven/Gradle 依赖，它封装了一组相关的依赖库。例如，spring-boot-starter-web 包含了 Spring MVC、Tomcat 等依赖。
2. 自动配置：Spring Boot 通过 spring.factories 文件加载自动配置类。这些自动配置类会根据类路径下的依赖自动配置 Bean。
3. 条件化配置：自动配置类使用 @Conditional 注解（如 @ConditionalOnClass、@ConditionalOnMissingBean）来决定是否创建某个 Bean。

如何实现
1. 创建 Starter 项目：
   - 创建一个 Maven 项目，定义 pom.xml 文件，添加必要的依赖。
   - 在 src/main/resources/META-INF 目录下创建 spring.factories 文件，指定自动配置类。
2. 编写自动配置类：
   - 创建一个配置类，使用 @Configuration 注解。
   - 使用 @Conditional 注解控制 Bean 的创建。
   - 通过 @EnableConfigurationProperties 加载配置属性。
3. 打包发布：
   - 将项目打包成 JAR 文件，发布到 Maven 仓库。

### Redis当作缓存为什么如此快？

1. 基于内存：
- Redis 数据存储在内存中，内存的读写速度远高于磁盘。
- 内存访问延迟通常在纳秒级别，而磁盘访问延迟在毫秒级别。
2. 单线程模型：
- Redis 使用单线程处理命令，避免了多线程的上下文切换和锁竞争。
- 单线程模型简化了数据结构的实现，提高了性能。
3. 高效的数据结构：
- Redis 提供了丰富的数据结构（如字符串、哈希、列表、集合、有序集合），这些数据结构经过高度优化，适合各种场景。
4. 非阻塞 I/O：
- Redis 使用非阻塞 I/O 模型，通过事件驱动机制处理多个客户端请求。
5. 持久化机制：
- Redis 支持 RDB 和 AOF 两种持久化方式，可以在不影响性能的情况下将数据持久化到磁盘。
6. 分布式支持：
- Redis 支持主从复制、哨兵模式和集群模式，适合高可用和高并发的场景。

### Redis和Guava的区别

```java


特性	Redis	Guava Cache
存储位置	内存 + 磁盘（支持持久化）	内存（仅限 JVM 内部）
分布式支持	支持（通过 Redis Cluster）	不支持（仅限于单机）
数据结构	支持字符串、哈希、列表、集合、有序集合等	支持简单的键值对
性能	极高（基于内存 + 非阻塞 I/O）	高（基于内存，但受 JVM 限制）
持久化	支持 RDB 和 AOF	不支持
适用场景	分布式缓存、高并发场景	单机缓存、本地缓存
内存管理	支持 LRU、LFU 等淘汰策略	支持 LRU、最大容量限制
复杂度	需要部署和维护	无需额外部署，直接集成到应用中

// 使用 RedisTemplate 操作 Redis
@Autowired
private RedisTemplate<String, String> redisTemplate;

public void setValue(String key, String value) {
    redisTemplate.opsForValue().set(key, value);
}

public String getValue(String key) {
    return redisTemplate.opsForValue().get(key);
}

// 创建 Guava Cache
Cache<String, String> cache = CacheBuilder.newBuilder()
    .maximumSize(1000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build();

// 存入缓存
cache.put("key", "value");

// 获取缓存
String value = cache.getIfPresent("key");
```

Redis 适合分布式、高并发、大数据量的场景。

Guava Cache 适合单机、本地缓存、数据量较小的场景。

### MySQL的索引数据结构，你知道多少？

1. B+Tree：InnoDB的默认索引结构，适合范围查询
2. Hash：适合等值查询，但不支持范围查询
3. 全文索引

### BIO,NIO,AIO,Netty的区别

- BIO:同步阻塞I/O，每一个连接需要一个线程处理
- NIO:同步非阻塞I/O,使用多路复用器处理多个连接
- AIO:异常非阻塞I/O,基于时间回调
- Netty:基于NIO的高性能网络框架，简化了NIO的编程

### 如何从 5 亿个数中找出中位数？

分治法

### 如何在大量的数据中判断一个数是否存在？

分治法

## tzsr

### 线程池有两种，你讲一下第二种

ThreadPoolExecutor：Java 提供的线程池实现，支持自定义核心线程数、最大线程数、队列等。

ForkJoinPool：适合处理分治任务的线程池，支持工作窃取算法。

### MySQL中事务、索引、锁机制的了解 和一些SQL优化语句

事务：通过 BEGIN、COMMIT、ROLLBACK 控制事务的原子性、一致性、隔离性、持久性。

索引：通过创建合适的索引提高查询性能。

锁机制：包括行锁、表锁、乐观锁、悲观锁。

SQL 优化：

避免使用 SELECT *。

使用 EXPLAIN 分析查询计划。

避免在 WHERE 子句中使用函数。

### Nacos为什么修改配置之后不用重启服务器就可以更改配置了 

Nacos 通过长轮询或 WebSocket 实时推送配置变更，应用可以通过监听配置变化动态更新配置，无需重启。

### Redis中的常见数据结构

String、List、Set、Hash、ZSet

### JVM的基础知识

内存结构：包括堆、栈、方法区、本地方法栈、程序计数器。

垃圾回收：包括新生代、老年代、GC 算法（如标记-清除、复制、标记-整理）。

类加载机制：包括加载、验证、准备、解析、初始化。

### 布隆过滤器实现的原理，里面用的是什么数据结构

布隆过滤器通过多个哈希函数将元素映射到位数组中，用于判断元素是否存在。

它使用位数组和哈希函数实现。

### 缓存穿透、缓存击穿、缓存雪崩的问题以及解决方法

- 缓存穿透：查询不存在的数据，解决方法：使用布隆过滤器或缓存空值。
- 缓存击穿：热点数据失效，解决方法：使用互斥锁或永不过期。
- 缓存雪崩：大量缓存同时失效，解决方法：设置不同的过期时间或使用高可用缓存集群。

### 介绍一下雪花算法，和实现的原理

雪花算法（Snowflake）是 Twitter 开源的分布式 ID 生成算法，生成 64 位的 ID，包含时间戳、机器 ID、序列号等部分。

### JWT令牌技术和ThreadLocal配合拦截器的意义是什么

JWT（JSON Web Token）用于无状态认证，ThreadLocal 用于在同一个线程中共享数据。拦截器可以在请求处理前后进行身份验证和数据传递。

### SpringCache + Redis的技术介绍一下

Spring Cache 提供了缓存抽象，支持多种缓存实现（如 Redis）。通过注解（如 @Cacheable、@CacheEvict）可以方便地管理缓存。

### SpringTask定时任务处理

Spring Task 提供了简单的定时任务支持，通过 @Scheduled 注解可以定义任务的执行时间。

### HashMap的详细原理和介绍

HashMap 是基于哈希表实现的键值对存储结构，通过哈希函数计算键的存储位置，支持快速的插入、删除、查找操作。

### JUC并发编程知道哪些

JUC（Java Util Concurrent）提供了并发编程的工具类，包括：

线程池：如 ThreadPoolExecutor。

锁：如 ReentrantLock。

并发集合：如 ConcurrentHashMap。

原子类：如 AtomicInteger。

### JVM基础知识了解吗

JVM 是 Java 虚拟机，负责执行 Java 字节码。其核心组件包括类加载器、运行时数据区、执行引擎、垃圾回收器等。

### Spring和SpringBoot的区别和优点是什么，Spring MVC和他们的关系是什么

Spring：是一个轻量级的 Java 开发框架，提供了依赖注入、AOP 等功能。

Spring Boot：是 Spring 的扩展，简化了 Spring 应用的开发和部署，提供了自动配置、内嵌服务器等功能。

Spring MVC：是 Spring 的一个模块，用于开发 Web 应用。

### 了解微服务的基本框架吗，简单介绍一下微服务架构

Spring Cloud：提供了服务发现、配置管理、负载均衡等功能。

Dubbo：阿里巴巴开源的 RPC 框架。