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

为什么自己明明会，老是忘掉了，没用的原因吗
:::

### Linux中查看占用内存命令（包括查看特定应用命令）
```shell
我在Linux常用的命令

ps -ef | grep java 查看所有包含java的进程

top 查看系统资源使用情况

df -h 查看磁盘空间使用情况

nohup java -jar app.jar > output.log 2>&1 & 后台启动Java应用，并将日志保存到指定文件

netstat -anp | grep 8080 查看端口占用情况


1.查看系统整体内存使用情况
free -h
2.查看各个进程的内存占用
top(按 Shift + M 可以按内存使用排序。)
3.查看特定应用的内存占用
ps aux | grep 应用名

```
### Linux中查看8080端口是否被占用
```shell
netstat -tuln | grep 8080
-t：显示TCP端口。
-u：显示UDP端口。
-l：显示监听中的端口。
-n：以数字形式显示地址和端口号。
grep :8080：过滤出包含 8080 端口的行。
```

### Java -jar命令可以在后台运行吗

```shell
1.使用&在后台运行
java -jar your-app.jar &
2.使用nohup防止进程被终止
nohup java -jar your-app.jar > output.log 2>&1 &

nohup：忽略挂断信号，使进程在终端关闭后继续运行。
> output.log：将标准输出重定向到 output.log 文件。
2>&1：将标准错误输出重定向到标准输出（即也写入 output.log）。
&：将进程放到后台运行。

3.使用系统服务（Systemd）
4.使用 Docker 容器



```

### Dockerfile怎么部署Jar

```shell
我自用的部署方式
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
### Dockerfile常见的模块（指令）及其作用
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
### RabbitMQ的三大交换机

### Redis搭建主从复制（还有没有其他高可用的架构）


### MySQL索引失效的问题你有了解过吗

### Varchar和Char之间的关系你有了解过吗

### Redis有几种默认的过期时间，你用过哪几种

### MySQL你是怎么配置的

### Redis你是怎么配置的



### MySQL那些字段你会怎么使用，在项目中

### 线程池你有使用过吗，有几个重要的参数，你有什么了解过吗