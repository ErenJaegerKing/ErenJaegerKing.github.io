---
icon: ""
description: ""
title: "SpringBoot"
date: 2024-12-17
category:
  - Spring
tag:
  - SpringBoot
order: 2
---

### SPI机制？
灵魂三问：
1. 它的**作用**是什么？解决了什么问题？**优点**是什么？
2. 如果**手撕**一个SPI应用，需要怎么做？应用场景是什么？
3. 背后的**设计思想**是什么？我们能得到什么启示？

设计思想：面向接口 + 配置文件 + 反射技术 即使用约定的配置文件、谁提供jar包，也负责提供配置文件（高内聚低耦合）、
使用ClassLoader的getResource和getResources方法，来读取classpath中的配置文件

#### SPI是什么
SPI:全称是**S**ervice **P**rovider **I**nterface
它是从Java6开始引入的，是一种基于ClassLoader来**发现并加载服务**的机制。

一个标准的SPI由三个组件构成
- Service 公开的接口或抽象类，定义了一个抽象的功能模块
- Service Provider 服务的实现类
- ServiceLoader 是SPI机制的核心组件，负责在运行时发现并加载Service Provider
#### Java SPI的运行流程

Applicaiton应用程序进行加载，ServiceLoader加载Provider。（1、在第三方JAR包中，可以定义多个Provider。2、Application应用程序不用关注Service的具体实现，只需要和Service的接口进行交互

#### Java SPI在JDBC中的应用

在java spi出现之前，程序员需要使用Class.forName来加载数据库驱动，比如说引入mysql的jar包后，需要再forName厂商给的com.mysql.jdbc.Driver

是不是过于麻烦，我们不仅要引入jar包，使用的时候还要根据JDBC的不同换不同forName，所以这时候，我们可以用SPI的思想，将配置文件一并写入JAR中。用Java SPI思想的ClassLoader，它除了可以加载类之外，还提供了方法getResource / getResources，可以根据指定的路径，去读取classpath中对应的文件。所以可以用ClassLoader来读取厂商放在JAR包中的配置文件，但是我们要事先约定好配置文件的路径和格式。

上面的这套机制，我们就叫SPI吧

使用JDBC的使用导入JAR就可以了，再也不用class.forName

#### Java SPI的三大规范要素（以MYSQL的JDBC为主）
- 规范的配置文件
  - 文件路径：必须是JAR包中的META-INF/service目录下
  - 文件名称：Service接口的全限定名
  - 文件内容：Service Provider的全限定名。有几个就写几个
- Service Provider类必须具备无参的默认构造方法（需要通过反射技术实例化它）
- 保证能加载到配置文件和Service Provider类：
  - method1：将Service Provider的JAR包放在classpath中（最常用的）
  - method2：将JAR包安装到JRE的扩展目录中
  - method3：自定义一个ClassLoader
#### 手撕一个SPI应用实例

准备一个api项目为Service功能抽象类

再由服务供应商去实现这个抽象类，实现为provider类，并且需要配置文件目录META-INF.services，再配置一个service接口全限类名，
文件中的内容是Provider类的全限定名，有几个Provider就写几个

再准备一个运行的项目，使用ServiceLoader发现并加载服务

#### Java SPI与SpringBoot自动配置

自动配置，即是Auto-Configuraiton
- 基于你引入的依赖JAR包，对SpringBoot应用进行自动配置
- 提供了自动配置功能的依赖JAR包，通常被称为starter，例如mybatis-spring-boot-starter


为什么要有这个注解配置呢？
- SpringBoot项目会默认自动扫描当前项目的package，将其中的配置类注入到IOC容器中
- 其他框架，MyBatis、RabbitMQ不支持直接扫描注入，就要用到Auto-Configuraiton

你会怎么设计Auto-Configuraiton？

![Spring的SPI自动配置](https://drawingbed-686.pages.dev/myblog/202412192048740.png)

springboot自动装配案例：MyBatis？

![springboot自动装配案例mybatis](https://drawingbed-686.pages.dev/myblog/202412192052282.png)

**springboot自动装配的核心流程**：
- SpringBoot应用程序启动
- 通过SpringFactories机制加载配置文件
  - 即通过ClassLoader去获取classpath中的配置文件META-INF/spring.factories
- 筛选出所有自动配置类
  - 在所有配置文件META-INF/spring.factories中，筛选出以EnableAutoConfiguraiton为key的配置值
- 将这些类注入到Spring IOC容器中 

### SLF4J原理到实践

两个问题
1. 什么是门面日志框架？
2. 它的作用是什么？解决了什么问题？

如果没有门面日志框架，就会发生以下的问题
- 更换日志框架时，java应用程序需要修改代码
- 如果多种日志框架共存，将不得不维护多套配置文件

SLF4J日志框架示意图（下次复习的时候可以去官网查看，到时候我想我的英文水平也到了一定的高度了，哈哈哈）

SLF4J的实现原理
- 在SLF4J1.7.X之前是基于JVM类加载机制与底层日志框架进行绑定，在SLF4J1.8.X是基于Java SPI机制，与底层日志框架进行绑定
- 经典Java SPI加载Service Provider的过程

### SPI与SpringBoot自动配置

Redis的自动配置：引入依赖，配置一下，直接使用

#### SpringBoot的启动流程（简化版）



### 自定义starter







### 参考资料

[B站UP主：码场安员外，SPI 自动装配，starter](https://www.bilibili.com/video/BV1RY4y1v7mN?spm_id_from=333.788.videopod.sections&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)


https://mp.weixin.qq.com/s/TnofWzuaH-WDcfYVfp-UoA?spm=a2c6h.12873639.article-detail.4.6d019c0eCsgKO3