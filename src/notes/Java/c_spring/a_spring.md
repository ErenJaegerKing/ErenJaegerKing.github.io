---
icon: ""
description: ""
title: "Spring"
date: 2024-12-13
category:
  - Java
tag:
  - Spring
order: 1
---

## Spring Framework 5 基础

![](https://drawingbed-686.pages.dev/myblog/202412151903547.png)

### Spring 和 Spring 框架的组成

- 它的诞生是为了解决什么问题？
- 它的特性和优势？Spring Framework 有哪些特性，用了这个框架对开发而言有什么好处呢？
- 它有哪些组件呢？Spring Framework 有哪些组件呢？
  - Core
  - Data
  - Web
  - AOP、Aspects...
  - Test
- 为什么用 Spring？

### Spring 要点

- Spring有哪些核心要点
  - IOC
  - AOP
- Spring 框架设计如何逐步简化开发的
  - Java 配置
  - 注解配置
  - SpringBoot 托管配置
  - 结合Spring和SpringBoot的发展

### Spring核心之控制反转（IOC）

- 如何理解IOC
  - Spring Bean是什么
  - IOC是什么
  - IOC能做什么
  - IOC和DI是什么关系
- IOC配置的三种方式
  - xml配置
  - Java配置
  - 注解配置
- 依赖注入的三种方式
  - setter方式
  - 构造函数
  - 注解注入
- IOC和DI使用问题小结
  - 为什么推荐构造器注入方式？
  - 建议去博主博客上看（金句）
  - @Autowired和@Resource以及@Inject等注解注入有何区别？

### Spring核心之面向切面编程（AOP）

- 如何理解AOP
  - AOP是什么
  - AOP术语
    - 8
    - 通知类型（4）
  - Spring AOP和AspectJ是什么关系
- AOP的配置方式
  - XML配置方法
  - AspectJ注释方式
    - JDK
    - CGLIB
-  AOP使用问题  
   - 切入点的申明规则
   - 多种增加通知的顺序
   - Spring AOP 和 AspectJ之间的关键区别
   - Spring AOP 还是完全使用AspectJ? 

### SpringMVC请求流程和案例

## 参考资料

padi 哥 https://pdai.tech/md/spring/spring.html

spring 官方文档 https://spring.io/projects/spring-framework

到时候复习的时候还是会看padi哥的大纲，现在改变记笔记的方式，要学会自己总结，即便很垃圾
