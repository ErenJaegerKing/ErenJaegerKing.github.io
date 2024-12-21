---
title: "系统架构"
description: ""
icon: ""
date: 2024-12-11
category:
  - 系统架构
tag:
  - 系统架构

---
## 架构

请你介绍一下你项目的架构，我项目前端技术是使用vuejs以及antDesign组件，并使用Nginx进行动态代理，后端访问控制使用的是spring security，调度用的是spring mvc，
数据访问是spring data jpa，服务启动使用的是springboot，并使用java语言在jvm虚拟机上运行，数据库用的是缓存redis，关系数据库用的是mysql，非关系型数据库用的是mongodb
以及分布式存储的是minio

项目的部署图是

## 定时任务

单机定时任务
- Timer
- ScheduledExecutorService
- DelayQueue
- Spring Task （Y）
- 时间论

分布式定时任务
- Redis
- MQ

分布式任务调度框架
- Quartz
- Elastic-Job
- XXL-JOB（D）24-12-11重点学习的分布式任务调度框架

架构设计：

设计思想？“调度”和“任务”

系统组成？调度中心 和 执行器

架构图：

![](https://drawingbed-686.pages.dev/myblog/202412112212061.png)

优缺点总结：优点：开箱即用（学习成本比较低）、与 Spring 集成、支持分布式、支持集群、支持任务可视化管理。
缺点：不支持动态添加任务（如果一定想要动态创建任务也是支持的）。


- PowerJob

定时任务总结：单机中最常用也比较推荐的是时间轮。

## 参考资料

guide哥 https://javaguide.cn/

XXL-JOB官方文档 https://www.xuxueli.com/xxl-job/

小傅哥 https://mp.weixin.qq.com/s/MOYLEuKtpxk36Zi_dMr7hA