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

### @SpringBootAplication注解有了解过吗

### SpringBoot启动项你有了解过吗

### Docker-Compose
### Spring和SpringBoot不熟悉
### SpringBoot的自动装配原理
### SpringBoot Starter
### 为什么要用Redis作为缓存而不用map或者gouva
### MySQL的索引数据结构，你知道多少？
### BIO,NIO,AIO,Netty的区别
### 线程池有两种，你讲一下第二种
### MySQL中事务、索引、锁机制的了解 和一些SQL优化语句
### RabbitMQ的工作原理是什么
### Nacos为什么修改配置之后不用重启服务器就可以更改配置了 
### Redis中的常见数据结构
### JVM的基础知识
### 布隆过滤器实现的原理，里面用的是什么数据结构
### 缓存穿透、缓存击穿、缓存雪崩的问题以及解决方法
### 介绍一下雪花算法，和实现的原理
### JWT令牌技术和ThreadLocal配合拦截器的意义是什么
### SpringCache + Redis的技术介绍一下
### SpringTask定时任务处理
### HashMap的详细原理和介绍
### JUC并发编程知道哪些
### JVM基础知识了解吗
### Spring和SpringBoot的区别和优点是什么 Spring MVC和他们的关系是什么
### 了解微服务的基本框架吗，简单介绍一下微服务架构