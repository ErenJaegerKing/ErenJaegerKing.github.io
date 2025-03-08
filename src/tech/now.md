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
:::

### Linux中查看占用内存命令（包括查看单独应用命令）
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
### 