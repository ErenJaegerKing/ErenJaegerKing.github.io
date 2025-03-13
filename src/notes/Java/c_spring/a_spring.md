---
icon: ""
description: ""
title: "Spring"
date: 2024-12-13
category:
  - Spring
tag:
  - Spring
order: 1
---

## Spring基础

### 什么是Spring框架？

Spring 是一款开源的轻量级 Java 开发框架

我们一般说 Spring 框架指的都是 Spring Framework，它是很多模块的集合，使用这些模块可以很方便地协助我们进行开发，比如说 Spring 支持 IoC（Inversion of Control:控制反转） 和 AOP(Aspect-Oriented Programming:面向切面编程)、可以很方便地对数据库进行访问、可以很方便地集成第三方组件（电子邮件，任务，调度，缓存等等）、对单元测试支持比较好、支持 RESTful Java 应用程序的开发。

### Spring 包含的模块有哪些？

Spring5.x 版本：
- Core Container：Spring 框架的核心模块，也可以说是基础模块，主要提供 IoC 依赖注入功能的支持。
  - spring-core：Spring 框架基本的核心工具类。
  - spring-beans：提供对 bean 的创建、配置和管理等功能的支持。
  - spring-context：提供对国际化、事件传播、资源加载等功能的支持。
  - spring-expression：提供对表达式语言（Spring Expression Language） SpEL 的支持，只依赖于 core 模块，不依赖于其他模块，可以单独使用。
- AOP
  - spring-aspects：该模块为与 AspectJ 的集成提供支持。
  - spring-aop：提供了面向切面的编程实现。
  - spring-instrument：提供了为 JVM 添加代理（agent）的功能。 
- Data Access/Integration
  - spring-jdbc：提供了对数据库访问的抽象 JDBC。
  - spring-tx：提供对事务的支持。
  - spring-orm：提供对 Hibernate、JPA、iBatis 等 ORM 框架的支持。
  - spring-oxm：提供一个抽象层支撑 OXM(Object-to-XML-Mapping)，例如：JAXB、Castor、XMLBeans、JiBX 和 XStream 等。
  - spring-jms : 消息服务。
- Spring Web
  - spring-web：对 Web 功能的实现提供一些最基础的支持。
  - spring-webmvc：提供对 Spring MVC 的实现。
  - spring-websocket：提供了对 WebSocket 的支持，WebSocket 可以让客户端和服务端进行双向通信。
  - spring-webflux：提供对 WebFlux 的支持。
- Messaging
  - spring-messaging
- Spring Test

### Spring,Spring MVC,Spring Boot 之间什么关系?

Spring是一个开源的轻量级Java开发框架。

Spring MVC是Spring中的一个很重要的模块，主要赋予Spring快速构建MVC架构的Web程序的能力。MVC是模型（Model）、视图（View）、控制器（Controller）的简写，其核心思想就是通过将业务逻辑、数据、显示分离来组织代码。

使用Spring进行开发各种配置过于麻烦比如说开启某些Spring特性时，需要XML或Java进行显示配置。所以Spring Boot就诞生了。

总结一下：
Spring 旨在简化 J2EE 企业应用程序开发。
Spring Boot 旨在简化 Spring 开发（减少配置文件，开箱即用！）。
Spring Boot 只是简化了配置，如果你需要构建 MVC 架构的 Web 程序，你还是需要使用 Spring MVC 作为 MVC 框架，只是说 Spring Boot 帮你简化了 Spring MVC 的很多配置，真正做到开箱即用！

## Spring Ioc

### 谈谈自己对于 Spring IoC 的了解

ioc是控制反转，是一种面向对象的设计思想，而不是一种具体的技术实现。

ioc的思想就是将在程序中手动创建对象的控制权，交由Spring框架来管理。

为什么叫控制反转？控制：就是创建对象的权力 反转：就是将控制权转交给外部环境，比如说spring框架、ioc容器

### 什么是Spring Bean？

就是那些被ioc容器所管理的对象

### 将一个类声明为 Bean 的注解有哪些?

@component：通用的注解，可标注任何类为Spring组件

@Repository：对应持久层即Dao层，主要用于数据库相关操作

@Service：对应服务层，主要设计一些复杂的逻辑，需要用到Dao层

@Controller：对应Spring MVC控制层，主要用于接受用户的请求并调用Service层返回数据给前端页面

### @component 和 @Bean的区别是什么？

- @component注解作用于类，@Bean注解作用于方法
- @component通常是通过类路径扫描来自动侦测以及自动装配到Spring容器中的 （@componentScan注解定义要扫描的路径从中标识了需要装配的类自动装配到Spring的bean容器中）@Bean在标有该注解的方法中定义产生了这个Bean，@Bean告诉了Spring这是某个类的实例，当我需要用它的时候还给我。
- @Bean注解比@Compoennt注解的自定义性更强，很多地方只能通过@Bean注解来注册bean，比如我们引用第三方库中的类需要装配到Spring容器时，则只能通过@Bean来实现

### 注入 Bean 的注解有哪些？

1. Spring内置的@Autowired org.springframework.bean.factory
2. jdk内置的@Rosource和@Inject都可以用于注入Bean javax.annotation Java JSR-250

### @Autowired 和 @Resource 的区别是什么？

@Autowird属于Spring内置的注解，默认的注入方式为byType，会优先根据接口类型去匹配并注入Bean。

@Resource属于JDK内置的注解，默认的注入方式为byName，根据名称进行匹配。

当一个接口存在多个实现类的话，byType这种方式就无法正确注入对象了，因为这个时候 Spring 会同时找到多个满足条件的选择，默认情况下它自己不知道选择哪一个。



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
    - 通知类型（5）

![](https://drawingbed-686.pages.dev/myblog/202412162152105.png)

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

什么是MVC?
什么是Spring MVC?
Spring MVC的请求流程？
Spring MVC案例你写过吗？

### Spring IOC实现原理详解之IOC体系结构设计

![](https://drawingbed-686.pages.dev/myblog/202412172123876.png)

## 参考资料

padi 哥 https://pdai.tech/md/spring/spring.html

spring 官方文档 https://spring.io/projects/spring-framework

到时候复习的时候还是会看padi哥的大纲，现在改变记笔记的方式，要学会自己总结，即便很垃圾M，要用自己的话去总结
