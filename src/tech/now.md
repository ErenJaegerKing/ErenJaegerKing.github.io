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

最左匹配原则



### Redis 搭建主从复制（还有没有其他高可用的架构）

### Redis 有几种默认的过期时间，你用过哪几种

### RabbitMQ 的三大交换机

### Docker-Compose

Spring和SpringBoot不熟悉
SpringBoot的自动装配原理
SpringBoot Starter
为什么要用Redis作为缓存而不用map或者gouva
MySQL的索引数据结构，你知道多少？
BIO,NIO,AIO,Netty的区别

Dokcer的命令
Linux基本命令
线程池有两种，你讲一下第二种
MySQL中事务、索引、锁机制的了解 和一些SQL优化语句
RabbitMQ的工作原理是什么
Nacos为什么修改配置之后不用重启服务器就可以更改配置了 
Redis中的常见数据结构
JVM的基础知识

1、布隆过滤器实现的原理，里面用的是什么数据结构
2、缓存穿透、缓存击穿、缓存雪崩的问题以及解决方法
3、介绍一下雪花算法，和实现的原理
4、JWT令牌技术和ThreadLocal配合拦截器的意义是什么
5、SpringCache + Redis的技术介绍一下
6、SpringTask定时任务处理
7、HashMap的详细原理和介绍
8、JUC并发编程知道哪些
9、JVM基础知识了解吗
10、Spring和SpringBoot的区别和优点是什么 Spring MVC和他们的关系是什么
11、了解微服务的基本框架吗，简单介绍一下微服务架构