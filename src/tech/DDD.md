---
title: "领域驱动设计"
description: ""
icon: ""
date: 2024-12-23
category:
  - 领域驱动设计
tag:
  - 领域驱动设计
  - DDD

---
:::info
之前直接在敲代码，其实仔细一想，好像都是增删改查，都不需要动脑，现在有一个模块是需要动脑的，我觉得是一个很好锻炼自己大脑的一件事情，但是为什么这篇跟DDD领域驱动设计有关系，但是有没多大关系呢，主要是我想试试用DDD领域驱动设计的思想去实现我负责的模块
:::


## 测试过程以及测试方法

测试过程：单元测试、集成测试、回归测试、UAT

测试方法：黑盒、白盒、路径覆盖、边界值

## BI(business Inteligence)供应链

## Dataease

## 企业资源计划

## 物资需求计划

## WMS系统

[什么是仓库管理系统（WMS）？WMS系统有什么功能？](https://zhuanlan.zhihu.com/p/706339783)

## MES系统

[什么是MES系统？MES系统十大功能模块详解！](https://zhuanlan.zhihu.com/p/684141242)

## scor模型

[scor模型的六个基本流程是什么？主要应用在哪些领域？](https://baijiahao.baidu.com/s?id=1784173423923173492&wfr=spider&for=pc)

## BOM理论

[数字工厂深入浅出系列（十一）：聊聊BOM基础概念、管理难点与转换实现方法](https://bbs.huaweicloud.com/blogs/408309)

## 加工贸易业务模块

还是要先理解业务是怎么实现的


先理解概念

[官方对加工贸易的定义](http://gdfs.customs.gov.cn/shenzhen_customs/511683/jgmycjsfw86/index.html?VbY7rnwef3WG=1735220772702#rcep-nav-jj)

[揭秘 | 你不知道的加工贸易](https://mp.weixin.qq.com/s?__biz=MzI2NDk0MDA3Nw==&mid=2247491545&idx=2&sn=3155ce2b4d74ada41d6feb419d441c2f&chksm=eaa5a09bddd2298d253ad9d2c9adb31f66ccd5c64227b6819fad7ec51ae84701491cac011440&mpshare=1&scene=1&srcid=&sharer_sharetime=1591283174536&sharer_shareid=9f26ae67f599df3a787d78f095e17c35&key=06d78db2315ea10672700f292097d0d1275d6371120abf70391efe49d41500a5d0a5c407b6a25aa4393ef5061c0fb0b1f5e45a7c48db0aee3dddc0d0374caeac2c2c76e6e92cb7576da89a0752bf97ce&ascene=1&uin=MjU3NjY0NTcxNQ%3D%3D&devicetype=Windows+10+x64&version=6209007b&lang=zh_CN&exportkey=AwXUfI8MKfZ9dojvcgHWc1c%3D&pass_ticket=bCCcJ7sG0yvejbZGrMzIaB22Io3bqyglDyVrfeFsuD5e0QsZFkc4kkfk4iKyLuLq)

加工贸易手册 - 表头 料件 成品 单耗 随附单据

1. 理清项目业务（泳道图）

2. 功能模块设计（用例图）

3. 数据模型设计（E-R图 概念数据模型 逻辑数据模型 物理数据模型）

[数据库实体关系图（ERD）及其画法](https://blog.csdn.net/WHEgqing/article/details/108998283)

[数据库管理系统——数据库设计](https://blog.csdn.net/n04j04h06/article/details/144607310)

## B站 - 技术蛋老师

[SSH协议握手核心过程](https://www.bilibili.com/video/BV13P4y1o76u/?spm_id_from=333.788.videopod.sections&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

[HTTPS是什么？加密原理和证书。SSL/TLS握手过程](https://www.bilibili.com/video/BV1KY411x7Jp/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

[Nginx实战 - 配置HTTPS | 数字证书和私钥 | Docker Compose容器](https://www.bilibili.com/video/BV1uH4y1w7je/?vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

[Nginx入门必须懂3大功能配置 - Web服务器/反向代理/负载均衡](https://www.bilibili.com/video/BV1TZ421b7SD/?vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

## 参考资料

小傅哥 https://bugstack.cn/md/road-map/ddd.html

美团技术团队 https://tech.meituan.com/tags/ddd.html

[揭秘 | 你不知道的加工贸易](https://mp.weixin.qq.com/s?__biz=MzI2NDk0MDA3Nw==&mid=2247491545&idx=2&sn=3155ce2b4d74ada41d6feb419d441c2f&chksm=eaa5a09bddd2298d253ad9d2c9adb31f66ccd5c64227b6819fad7ec51ae84701491cac011440&mpshare=1&scene=1&srcid=&sharer_sharetime=1591283174536&sharer_shareid=9f26ae67f599df3a787d78f095e17c35&key=06d78db2315ea10672700f292097d0d1275d6371120abf70391efe49d41500a5d0a5c407b6a25aa4393ef5061c0fb0b1f5e45a7c48db0aee3dddc0d0374caeac2c2c76e6e92cb7576da89a0752bf97ce&ascene=1&uin=MjU3NjY0NTcxNQ%3D%3D&devicetype=Windows+10+x64&version=6209007b&lang=zh_CN&exportkey=AwXUfI8MKfZ9dojvcgHWc1c%3D&pass_ticket=bCCcJ7sG0yvejbZGrMzIaB22Io3bqyglDyVrfeFsuD5e0QsZFkc4kkfk4iKyLuLq)

[加工贸易场景式服务](http://gdfs.customs.gov.cn/shenzhen_customs/511683/jgmycjsfw86/index.html#rcep-nav-jj)

