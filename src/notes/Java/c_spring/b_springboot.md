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

## SpringBoot 自动装配原理详解

1. 什么是 SpringBoot 自动装配？
2. SpringBoot 是如何实现自动装配的？如何实现按需加载？
3. 如何实现一个 Starter？

### 什么是 SpringBoot 自动装配？

通过注解或者一些简单的配置就能在Spring Boot的帮助下实现某块功能

就比如说没有Spring Boot的时候，如果我们需要引入第三方依赖，需要手动配置，非常麻烦。但是，Spring Boot中，我们直接引入一个Starter即可。比如说你想要在项目中使用Redis的话，直接在项目中引入对应的starter即可。引入 starter 之后，我们通过少量注解和一些简单的配置就能使用第三方组件提供的功能了。

### SpringBoot 是如何实现自动装配的？

SpringBoot的核心注解SpringBootApplication

@SpringBootApplication看作是@Configuration、@EnableAutoConfiguration、@ComponentScan注解的集合。
- @EnableAutoConfiguration：启动SpringBoot的自动配置机制
- @Configuration：允许在上下文中注册额外的bean或导入其他配置类
- @ComponentScan：扫描被@Component注解的Bean，注解默认会扫描启动类所在的包下所有的类，可以自定义不扫描某些bean。如下图所示，容器中将排除TypeExcludeFilter和AutoConfigurationExcludeFilter。

@EnableAutoConfiguration 是实现自动装配的重要注解，我们以这个注解入手。

### @EnableAutoConfiguration:实现自动装配的核心注解

EnableAutoConfiguration 只是一个简单地注解，自动装配核心功能的实现实际是通过 AutoConfigurationImportSelector类。

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage //作用：将main包下的所有组件注册到容器中
@Import({AutoConfigurationImportSelector.class}) //加载自动装配类 xxxAutoconfiguration
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    Class<?>[] exclude() default {};

    String[] excludeName() default {};
}
```
### AutoConfigurationImportSelector:加载自动装配类

可以看出，AutoConfigurationImportSelector 类实现了 ImportSelector接口，也就实现了这个接口中的 selectImports方法，该方法主要用于获取所有符合条件的类的全限定类名，这些类需要被加载到 IoC 容器中。

```java
private static final String[] NO_IMPORTS = new String[0];

public String[] selectImports(AnnotationMetadata annotationMetadata) {
        // <1>.判断自动装配开关是否打开
        if (!this.isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        } else {
          //<2>.获取所有需要装配的bean
            AutoConfigurationMetadata autoConfigurationMetadata = AutoConfigurationMetadataLoader.loadMetadata(this.beanClassLoader);
            AutoConfigurationImportSelector.AutoConfigurationEntry autoConfigurationEntry = this.getAutoConfigurationEntry(autoConfigurationMetadata, annotationMetadata);
            return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
        }
    }
```
这里我们需要重点关注一下getAutoConfigurationEntry()方法，这个方法主要负责加载自动配置类的。

- 第 1 步:判断自动装配开关是否打开。默认spring.boot.enableautoconfiguration=true，可在 application.properties 或 application.yml 中设置
- 第 2 步：用于获取EnableAutoConfiguration注解中的 exclude 和 excludeName。
- 第 3 步：获取需要自动装配的所有配置类，读取META-INF/spring.factories
- 第 4 步：会进行筛选，@ConditionalOnXXX 中的所有条件都满足，该类才会生效。

### 如何实现一个 Starter

现在就来撸一个 starter，实现自定义线程池

1. 创建一个threadpool-spring-boot-starter工程
2. 引入Spring Boot相关依赖 引入Spring Boot Starter 基础库
3. 创建ThreadPoolAutoConfiguration
4. 在threadpool-spring-boot-starter下的resources包下创建META-INF/spring.factories文件
org.springframwork.boot.autoconfigure.EnableAutoConfiguration=\
org.example.ThreadPoolAutoConfiguration
5. 测试，新建一个工程，引入threadpool starter。将写好的通过@autowired注解进行依赖注入，然后调用一下进行测试‘

### 总结

- Spring Boot 通过@EnableAutoConfiguration开启自动装配
- 通过 SpringFactoriesLoader 最终加载META-INF/spring.factories中的自动配置类实现自动装配
- 自动配置类其实就是通过@Conditional按需加载的配置类
- 想要其生效必须引入spring-boot-starter-xxx包实现起步依赖

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

Applicaiton应用程序进行加载后，ServiceLoader就会加载Provider。

注意事项：

1. 在第三方JAR包中，可以定义多个Provider。
2. Application应用程序不用关注Service的具体实现，只需要和Service的接口进行交互。

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

springboot自动装配的核心流程：
- 1. SpringBoot应用程序启动
- 2. 通过SpringFactories机制加载配置文件
  - 即通过ClassLoader去获取classpath中的配置文件META-INF/spring.factories
- 3. 筛选出所有自动配置类
  - 在所有配置文件META-INF/spring.factories中，筛选出以EnableAutoConfiguraiton为key的配置值
- 4. 将这些类注入到Spring IOC容器中 

### SLF4J原理到实践

两个问题
1. 什么是门面日志框架？
2. 它的作用是什么？解决了什么问题？

如果没有门面日志框架，就会发生以下的问题
- 更换日志框架时，java应用程序需要修改代码
- 如果多种日志框架共存，将不得不维护多套配置文件

SLF4J日志框架示意图（下次复习的时候可以去官网查看，到时候我想我的英文水平也到了一定的高度了，哈哈哈）

SLF4J的实现原理
- 在SLF4J1.7.X之前是基于JVM类加载机制与底层日志框架进行绑定
- 在SLF4J1.8.X是基于Java SPI机制，与底层日志框架进行绑定（经典Java SPI加载Service Provider的过程）

### SpringBoot自动配置

SpringBoot的自动配置，英文名是Auto-Configuration
- 基于引入的jar包，对springboot应用进行自动配置
- 为springboot框架的**开箱即用**提供了基础支撑

下面的不要弄混了
- 自动配置：Auto-Configuration
- 自动装配：Autowire

例子：Redis的自动配置：引入依赖，配置一下，直接使用

可以去查看一个spring-boot-starter-data-redis中的源码，主要查看配置文件及源码其中的自动配置类之一RedisAutoConfiguration

#### SpringBoot的启动流程（简化版）

![springboot启动流程简化版](https://drawingbed-686.pages.dev/myblog/202412200934430.png)

加载并处理所有的配置类processConfigurationClasses

![processConfigurationClasses](https://drawingbed-686.pages.dev/myblog/202412200939694.png)

parse递归代码

![parse递归代码](https://drawingbed-686.pages.dev/myblog/202412200940015.png)

遍历得到了一个配置类集合，将配置类本身注册到IOC容器中，处理配置类中的@Bean方法，并将其返回类型注册到IOC容器中，处理通过@Import导入的ImportBeanDefinitionRegister

- @ComponentScan
  - 对指定的package进行扫描（默认搜索被@Component修饰的配置类）
  - 通过basePackages 或 basePackClasses，来指定要进行扫描的package
  - 如果未指定package，则默认扫描当前 @ComponentScan 所修饰的类所在的package
- @Import
  - 它的作用是提供了一种显式地从其他地方加载配置类的方式（性能好）x
  - 支持导入
    - 普通类 x
    - 接口ImportSelecter的实现类 Y
    - 接口ImportDefinitonRegister的实现类（利用这个特性我们可以给IOC容器动态地导入多个BeanDefinition）x
- @Conditional
  - 它的作用是只有特定条件满足时，才会向IOC容器中注册指定的组件
  - OnBean 容器中存在指定Bean
  - OnMissingBean 容器中不存在指定的Bean
  - OnClass 当classpath中存在指定的类
  - OnMissingClass 当classpath不存在指定的类
  - OnProperty 当指定的属性具备指定的值
  - OnWebApplication 当应用程序是Web应用

#### SpringBoot自动配置的原理解析

![SpringBoot自动配置的原理解析](https://drawingbed-686.pages.dev/myblog/202412200958697.png)

如何实现类 AutoConfigurationImportSelector？
- SpringFactories机制
  - Java SPI机制的延伸和扩展
  - Spring框架的基础机制，在Spring以及SpringBoot源码中导出可见
  - 可以基于它来实现SpringBoot的自动装配功能

**SpingFactories的核心机制**：从classpath中读取到所有jar包中的配置文件META-IF/spring.factories，然后根据指定的key从配置文件中解析出对应的value值

Java SPI 与 Spring Factories 的对比

![Java SPI 与 Spring Factories 的对比](https://drawingbed-686.pages.dev/myblog/202412201006864.png)


![自动配置的流程](https://drawingbed-686.pages.dev/myblog/202412201013455.png)

### 自定义starter（正式工作之后就去手动自主实现一个）

starter是"一站式服务"的JAR包，提供了**自动配置**的功能，开箱即用，提供了**良好的依赖管理**，避免遗漏、版本冲突等问题

### 参考资料

[B站UP主：码场安员外，SPI 自动配置，starter](https://www.bilibili.com/video/BV1RY4y1v7mN?spm_id_from=333.788.videopod.sections&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)
