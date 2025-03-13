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

- @Autowired 是 Spring 提供的注解，@Resource 是 JDK 提供的注解。
- Autowired 默认的注入方式为byType（根据类型进行匹配），@Resource默认注入方式为 byName（根据名称进行匹配）。
- 当一个接口存在多个实现类的情况下，@Autowired 和@Resource都需要通过名称才能正确匹配到对应的 Bean。Autowired 可以通过 @Qualifier 注解来显式指定名称，@Resource可以通过 name 属性来显式指定名称。
- @Autowired 支持在构造函数、方法、字段和参数上使用。@Resource 主要用于字段和方法上的注入，不支持在构造函数或参数上使用。

### 注入 Bean 的方式有哪些？

依赖注入的DI的常见方式：
1. 构造函数注入：通过类的构造函数来注入依赖项。
2. Setter注入：通过类的Setter方法来注入依赖项。
3. 字段注入：直接在类的字段上使用注解（如:@Autowird或@Resuorece）来注入依赖项

### 构造函数注入还是 Setter 注入？

Spring官方推荐构造函数注入
- 依赖完整性
- 不可变性
- 初始化保证
- 测试便利性

### Bean的作用域有哪些？

- 单例 ioc容器中只有唯一的bean实例
- 原型 每次获取都会创建一个新的bean实例
- request
- seesion
- application/global-session
- websocket 

### Bean是线程安全的吗？

bean 的线程安全取决于作用域与状态

最常用的两种作用域单例和原型为例介绍。几乎所有场景的bean作用域都是使用默认的单例。

在原型的作用域下，每一个获取都会创建一个新的bean实例，不存在资源竞争的问题，所以不存在线程安全的问题

在单例的作用域下，ioc容器中只有唯一的bean实例，可能会存在资源竞争的问题，主要还是取决于bean是否有状态，如果这个bean是有状态的，那就存在线程安全的问题（有状态是指包含可变的成员变量的对象）

常见的三种解决方法：
- 避免可变成员变量：尽量设计bean为无状态的
- 使用ThreadLocal：将可变成员变量保存在threadlocal中，确保线程安全
- 使用同步机制：利用synchronized或ReentrantLock来进行同步控制，确保线程安全

### Bean的生命周期了解么？

1. 整体上为四步：实例化 -> 属性赋值 -> 初始化 -> 销毁
2. 初始化这一步涉及的步骤比较多，包含Aware接口的依赖注入、BeanPostProcessor在初始化前后的处理以及 InitializingBean 和 init-method 的初始化操作。
3. 销毁这一步会注册相关销毁回调接口，最后通过DisposableBean和destory-method进行销毁

https://chaycao.github.io/2020/02/15/%E5%A6%82%E4%BD%95%E8%AE%B0%E5%BF%86Spring-Bean%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.html

## Spring AOP

### 谈谈自己对于AOP的了解

AOP面向切面编程，能够将那些与业务无关的，却为业务模块所共同调用的逻辑或责任(例如事务处理、日志处理、权限控制)封装起来，减少系统的重复代码，降低模块间的耦合度，并利于未来的可扩展性和可维护性

Spring AOP是基于动态代理的，如果要代理的对象实现了某个接口，那么Spring AOP会使用JDK Proxy，去创建代理对象。

Aop的专业术语你知道有哪些？

目标？代理？连接点？切入点？通知？切面？织入？

AOP（面向切面编程）是一种编程范式，旨在通过分离横切关注点来提高代码的模块化。以下是AOP中的一些关键术语及其解释和示例：

1. **目标（Target）**：
   - **定义**：目标是被一个或多个切面所通知的对象。它通常是业务逻辑的核心类。
   - **示例**：假设有一个`UserService`类，负责处理用户相关的业务逻辑，这个类就是目标。

   ```java
   public class UserService {
       public void addUser(String username) {
           // 添加用户的逻辑
       }
   }
   ```

2. **代理（Proxy）**：
   - **定义**：代理是AOP框架创建的对象，用于在目标对象的方法调用前后插入切面逻辑。
   - **示例**：AOP框架会为`UserService`创建一个代理对象，在调用`addUser`方法时，代理会先执行切面逻辑，再调用实际的`addUser`方法。

3. **连接点（Join Point）**：
   - **定义**：连接点是程序执行过程中的一个点，比如方法调用或异常抛出。在AOP中，连接点是可以在其中插入切面逻辑的点。
   - **示例**：在`UserService`中，`addUser`方法的调用就是一个连接点。

4. **切入点（Pointcut）**：
   - **定义**：切入点是用于定义在哪些连接点上应用切面逻辑的表达式。它决定了哪些连接点会被通知。
   - **示例**：可以使用切入点表达式`execution(* UserService.addUser(..))`来匹配`UserService`中的`addUser`方法。

5. **通知（Advice）**：
   - **定义**：通知是在特定连接点上执行的动作。常见的通知类型有前置通知（Before）、后置通知（After）、返回通知（After-returning）、异常通知（After-throwing）和环绕通知（Around）。
   - **示例**：在`addUser`方法执行前记录日志的前置通知。

   ```java
   @Before("execution(* UserService.addUser(..))")
   public void beforeAddUser() {
       System.out.println("准备添加用户");
   }
   ```

6. **切面（Aspect）**：
   - **定义**：切面是通知和切入点的结合体。它定义了在哪些连接点上执行哪些通知。
   - **示例**：一个日志切面可以包含多个通知和切入点，用于在多个方法调用前后记录日志。

   ```java
   @Aspect
   public class LoggingAspect {
       @Before("execution(* UserService.addUser(..))")
       public void beforeAddUser() {
           System.out.println("准备添加用户");
       }

       @After("execution(* UserService.addUser(..))")
       public void afterAddUser() {
           System.out.println("用户添加完成");
       }
   }
   ```

7. **织入（Weaving）**：
   - **定义**：织入是将切面应用到目标对象并创建代理对象的过程。织入可以在编译时、类加载时或运行时进行。
   - **示例**：在Spring AOP中，织入通常是在运行时通过动态代理实现的。

   ```java
   @Configuration
   @EnableAspectJAutoProxy
   public class AppConfig {
       @Bean
       public UserService userService() {
           return new UserService();
       }

       @Bean
       public LoggingAspect loggingAspect() {
           return new LoggingAspect();
       }
   }
   ```

通过这些术语和示例，可以更好地理解AOP的核心概念及其在实际应用中的使用。

### Spring AOP 和 AspectJ AOP 有什么区别？

- Spring AOP 属于运行时增强，而 AspectJ 是编译时增强。
- Spring AOP 基于代理(Proxying)，而 AspectJ 基于字节码操作(Bytecode Manipulation)。

### AOP 常见的通知类型有哪些？

- 前置通知
- 后置通知
- 返回通知
- 异常通知
- 环绕通知

### 多个切面的执行顺序如何控制？

1. 通常使用@Order注解直接定义切面顺序
2. 实现Oredered接口重写getOrder方法

## Spring MVC

### 说说自己对于 Spring MVC 了解?

MVC是模型（Modal）、视图（View）、控制器（Controller）的简写，其核心思想是通过将业务逻辑、数据、显示分离来组织代码

Spring MVC时代

MVC是一种设计模式，Spring MVC是一款很优秀的MVC框架。Spring MVC可以帮助我们进行更简洁的Web层的开发，并且它天生与Spring框架集成。

Spring MVC 下我们一般把后端项目分为 Service 层（处理业务）、Dao 层（数据库操作）、Entity 层（实体类）、Controller 层(控制层，返回数据给前台页面)。

### Spring MVC的核心组件有哪些？（也可以说是Spring MVC的工作原理）

- 核心的中央处理器
- 处理器映射器
- 处理器适配器
- 请求处理器
- 视图解析器

### Spring MVC工作原理了解吗？

1. 客户端发送请求，核心中央处理器拦截请求
2. 核心中央处理器会根据请求的信息调用处理器映射器。处理映射器会根据URL路径去匹配查找能处理的请求处理器（也就是我们平时说的Controller控制器），并会将请求涉及到的拦截器和请求处理器一起封装
3. 核心处理器调用处理器适配器去执行请求处理器
4. 请求处理器完成对用户的请求后，会返回一个ModalAndView对象给核心中央处理器（ModalAndView顾名思义，包含了数据模型以及相应的视图信息。Modal是返回的数据对象，View是个逻辑上的View）
5. 视图解析器会根据逻辑View查询实际的View
6. 核心中央处理器把返回的Modal传给View（视图渲染）
7. 把View返回给请求者

### 统一异常处理怎么做？

推荐使用注解的方式统一异常处理，具体会使用到 @ControllerAdvice + @ExceptionHandler 这两个注解 。

这种异常处理方式下，会给所有或者指定controller织入异常处理的逻辑（AOP），当controller中的方法抛出异常的时候，由被@ExceptionHandler注解修饰的方法进行处理。

## Spring框架中用到了哪些设计模式？

- 工厂设计模式：Spring使用工厂模式通过BeanFactory、ApplicationContext创建Bean对象
- 代理设计模式：Spring AOP功能的设计
- 单例设计模式：Spring中的Bean默认都是单例的
- 模板方法模式：Spring中的jdbcTemplate、hibernateTemplate等以Template结尾的对数据库操作的类
- 包装类设计模式：可以根据客户的需求能够动态切换不同的数据源。
- 观察者模式：Spring事务驱动模型
- 适配器模式：Spring AOP的增强或通知（Advice）使用到了适配器模式、Spring MVC中也是用到了适配器模式适配Controller

## Spring循环依赖

### Spring 循环依赖了解吗，怎么解决？

### @Lazy 能解决循环依赖吗？

### SpringBoot 允许循环依赖发生么？

## Spring 事务

### Spring 管理事务的方式有几种？

- 编程式事务
- 声明式事务

### Spring 事务中哪几种事务传播行为?

事务传播行为是为了解决业务层方法之间的互相调用的事务问题

1. TransactionDefinition.PROPAGATION_REQUIRED propagation_required 有则行，无则建
如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。
2. TransactionDefinition.PROPAGATION_REQUIRES_NEW propagation_requires_new 都新建
创建一个新的事务，如果当前存在事务，则把当前事务挂起。
3. TransactionDefinition.PROPAGATION_NESTED propagation_nested 嵌套
如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于TransactionDefinition.PROPAGATION_REQUIRED
4. TransactionDefinition.PROPAGATION_MANDATORY propagation_mandatory 
如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。（mandatory：强制性）

若是错误的配置以下 3 种事务传播行为，事务将不会发生回滚：
- TransactionDefinition.PROPAGATION_SUPPORTS: 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
- TransactionDefinition.PROPAGATION_NOT_SUPPORTED:以非事务方式运行，如果当前存在事务，则把当前事务挂起。
- TransactionDefinition.PROPAGATION_NEVER: 以非事务方式运行，如果当前存在事务，则抛出异常。

### Spring 事务中的隔离级别有哪几种?

- ISOLATION_DEFAULT 使用后端数据库默认的隔离级别
- ISOLATION_READ_UNCOMMITTED 最低隔离级别 可能会导致脏读、幻读或者不可重复读
- ISOLATION_READ_COMMITTED 允许读取并发事务已经提交的数据 可以阻止脏读，但是幻读或不可重复读
- ISOLATION_REPEATABLE_READ 对同一个字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改 可以阻止脏读和不可重复读，但幻读仍有可能发生
- ISOLATION_SERIALIZABLE 最高的隔离级别，完全服从ACID的隔离级别 该级别可以防止脏读、不可重复读以及幻读。

### @Transactional(rollbackFor = Exception.class)注解了解吗？

Exception 分为运行时异常 RuntimeException 和非运行时异常。 

@Transactional 注解默认回滚策略是只有在遇到RuntimeException(运行时异常) 或者 Error 时才会回滚事务，而不会回滚 Checked Exception（受检查异常）。这是因为 Spring 认为RuntimeException和 Error 是不可预期的错误，而受检异常是可预期的错误，可以通过业务逻辑来处理。

如果想要修改默认的回滚策略，可以使用 @Transactional 注解的 rollbackFor 和 noRollbackFor 属性来指定哪些异常需要回滚，哪些异常不需要回滚。
- 如果想要让所有的异常都回滚事务，可以使用如下的注解：rollbackFor
- 如果想要让某些特定的异常不回滚事务，可以使用如下的注解：noRollbackFor

## Spring Data JPA

### 如何使用 JPA 在数据库中非持久化一个字段？

@Transient注解

### JPA 的审计功能是做什么的？有什么用？

审计功能主要是帮助我们记录数据库操作的具体行为比如某条记录是谁创建的、什么时间创建的、最后修改人是谁、最后修改时间是什么时候。

### 实体之间的关联关系注解有哪些？

- @OneToOne : 一对一。
- @ManyToMany：多对多。
- @OneToMany : 一对多。
- @ManyToOne：多对一。

## Spring Security

有哪些控制请求访问权限的方法？
- permitAll()：无条件允许任何形式访问，不管你登录还是没有登录。
- anonymous()：允许匿名访问，也就是没有登录才可以访问。
- denyAll()：无条件决绝任何形式的访问。
- authenticated()：只允许已认证的用户访问。
- fullyAuthenticated()：只允许已经登录或者通过 remember-me 登录的用户访问。
- hasRole(String) : 只允许指定的角色访问。
- hasAnyRole(String) : 指定一个或者多个角色，满足其一的用户即可访问。
- hasAuthority(String)：只允许具有指定权限的用户访问
- hasAnyAuthority(String)：指定一个或者多个权限，满足其一的用户即可访问。
- hasIpAddress(String) : 只允许指定 ip 的用户访问。

### hasRole 和 hasAuthority 有区别吗？

hasRole(String) : 只允许指定的角色访问。

hasAuthority(String)：只允许具有指定权限的用户访问

### 如何对密码进行加密？

Spring Security 提供了多种加密算法的实现，开箱即用，非常方便。这些加密算法实现类的接口是 PasswordEncoder ，如果你想要自己实现一个加密算法的话，也需要实现 PasswordEncoder 接口。

官方推荐使用基于 bcrypt 强哈希函数的加密算法实现类。

### 如何优雅更换系统使用的加密算法？

推荐的做法是通过 DelegatingPasswordEncoder 兼容多种不同的密码加密方案，以适应不同的业务需求。从名字也能看出来，DelegatingPasswordEncoder 其实就是一个代理类，并非是一种全新的加密算法，它做的事情就是代理上面提到的加密算法实现类。在 Spring Security 5.0 之后，默认就是基于 DelegatingPasswordEncoder 进行密码加密的。

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
