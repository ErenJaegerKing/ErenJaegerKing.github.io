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


## 加工贸易

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


## 测试过程以及测试方法（未来可能吧）

测试过程：单元测试、集成测试、回归测试、UAT

测试方法：黑盒、白盒、路径覆盖、边界值

## 供应链理论知识
### 企业资源计划 ERP

企业资源计划（Enterprise Resource Planning，ERP）是一种用于管理公司内部多个业务流程的软件系统。ERP通过集成关键业务流程的数据流，如产品规划、制造、销售、营销、财务和人力资源等，来提高效率和业务绩效。

ERP系统旨在整合所有部门的数据，确保信息在组织内的各个部分之间流畅共享，从而帮助企业优化资源利用，降低成本，并提高生产和服务质量。

### 物资需求计划 MRP

物资需求计划（Material Requirements Planning，MRP）是一种用于制造业的生产计划与库存控制系统。它帮助公司确定为了满足产品订单和生产计划所需的原材料、零部件和其他物资的数量和时间安排。

MRP系统通过精确计算物资需求，确保物料在正确的时间以正确的数量到达，从而减少库存成本并提高供应链效率。

### WMS系统

WMS系统，即仓库管理系统（Warehouse Management System），是一种用于优化和自动化仓库或配送中心操作的软件解决方案。它通过提供对库存、订单履行、劳动力和仓库设施的全面控制，帮助企业提高效率、减少错误并降低运营成本。

WMS系统通过智能化管理和优化仓库内部流程，确保货物从入库到出库的整个生命周期都能被高效管理，从而提升供应链的整体性能。

[什么是仓库管理系统（WMS）？WMS系统有什么功能？](https://zhuanlan.zhihu.com/p/706339783)

### MES系统

MES系统，即制造执行系统（Manufacturing Execution System），是用于监控、控制和管理生产车间活动的信息系统。它在企业资源计划（ERP）系统与工厂底层控制系统（如可编程逻辑控制器PLC、传感器等）之间架起了一座桥梁，实现了生产过程的透明化、自动化和优化。

MES通过实时数据采集、分析和反馈，帮助企业优化生产流程、提高产品质量、降低成本，并增强对生产过程的掌控能力。

[什么是MES系统？MES系统十大功能模块详解！](https://zhuanlan.zhihu.com/p/684141242)

### BI

BI工具，即商业智能（Business Intelligence）工具，是指用于收集、分析和展示企业数据的一系列软件应用程序和服务。这些工具帮助企业和组织从大量数据中提取有价值的信息，支持决策制定、业务优化和战略规划。

BI工具通过提供直观的数据可视化和深入的分析功能，使非技术人员也能轻松理解复杂的数据模式，从而帮助企业做出更明智的决策。

eg:Dataease

### BOM理论

物料清单（Bill of Materials，简称BOM）

[数字工厂深入浅出系列（十一）：聊聊BOM基础概念、管理难点与转换实现方法](https://bbs.huaweicloud.com/blogs/408309)

### scor模型（重点）

SCOR模型，即供应链运作参考模型（Supply Chain Operations Reference model），是由供应链管理专业协会（原APICS）开发的一个标准化的流程参考框架。它被广泛应用于全球范围内的企业中，作为评估、改进和沟通供应链绩效的基础工具。

SCOR模型提供了一套通用语言和最佳实践指南，帮助组织理解和优化其供应链活动，从供应商的供应商到客户的客户，涵盖了所有相关的业务流程。

[scor模型的六个基本流程是什么？主要应用在哪些领域？](https://baijiahao.baidu.com/s?id=1784173423923173492&wfr=spider&for=pc)

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

