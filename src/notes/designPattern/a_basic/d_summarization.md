---
icon: ""
description: ""
title: "设计模式总结"
date: 2024-11-10
category:
  - 设计模式
tag: 
  - 设计模式总结
order: 4
---
:::info
本笔记参考[黑马程序员设计模式](https://www.bilibili.com/video/BV1Np4y1z7BU?vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2&spm_id_from=333.788.videopod.episodes)  [LoveLion](https://blog.csdn.net/lovelion/article/details/17517213) [Rrefactoringguru](https://refactoringguru.cn/) [chenssy](https://www.cnblogs.com/chenssy/p/3357683.html) [程序员鱼皮](http://www.techzhang.cn/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF-by-%E7%A8%8B%E5%BA%8F%E5%91%98%E9%B1%BC%E7%9A%AE/)
:::

优先：

1. 单例模式【学习难度：★☆☆☆☆，使用频率：★★★★☆】
2. 工厂方法模式【学习难度：★★☆☆☆，使用频率：★★★★★】
3. 迭代器模式【学习难度：★★★☆☆，使用频率：★★★★★】
4. 策略模式【学习难度：★☆☆☆☆，使用频率：★★★★☆】
5. 建造者模式【学习难度：★★★★☆，使用频率：★★☆☆☆】
6. 模板方法模式【学习难度：★★☆☆☆，使用频率：★★★☆☆】
7. 代理模式【学习难度：★★★☆☆，使用频率：★★★★☆】
8. 责任链模式【学习难度：★★★☆☆，使用频率：★★☆☆☆】
9. 抽象工厂模式【学习难度：★★★★☆，使用频率：★★★★★】
10. 适配器模式【学习难度：★★☆☆☆，使用频率：★★★★☆】
11. 观察者模式【学习难度：★★★☆☆，使用频率：★★★★★】
12. 外观模式【学习难度：★☆☆☆☆，使用频率：★★★★★】

一般：

1. 桥接模式【学习难度：★★★☆☆，使用频率：★★★☆☆】
2. 组合模式【学习难度：★★★☆☆，使用频率：★★★★☆】
3. 装饰器模式【学习难度：★★★☆☆，使用频率：★★★☆☆】
4. 状态模式【学习难度：★★★☆☆，使用频率：★★★☆☆】
5. 访问者模式【学习难度：★★★★☆，使用频率：★☆☆☆☆】
6. 中介者模式【学习难度：★★★☆☆，使用频率：★★☆☆☆】
7. 命令模式【学习难度：★★★☆☆，使用频率：★★★★☆】
8. 备忘录模式【学习难度：★★☆☆☆，使用频率：★★☆☆☆】

低优先：

1. 原型模式【学习难度：★★★☆☆，使用频率：★★★☆☆】
2. 享元模式【学习难度：★★★★☆，使用频率：★☆☆☆☆】
3. 解释器模式【学习难度：★★★★★，使用频率：★☆☆☆☆】


- Spring
    - 工厂模式：通过 BeanFactory 和 ApplicationContext 来创建对象
    - 单例模式：Spring Bean 默认为单例模式
    - 策略模式：例如 Resource 的实现类，针对不同的资源文件，实现了不同方式的资源获取策略
    - 代理模式：Spring 的 AOP 功能用到了 JDK 的动态代理和 CGLIB 字节码生成技术
    - 模板方法：可以将相同部分的代码放在父类中，而将不同的代码放入不同的子类中，用来解决代码重复的问题。比如RestTemplate、JmsTemplate、JpaTemplate
    - 适配器模式：Spring AOP 的增强或通知（Advice）使用到了适配器模式
    - 观察者模式：Spring 事件驱动模型
    - 桥接模式：可以根据客户的需求能够动态切换不同的数据源。比如我们的项目需要连接多个数据库，客户在每次访问中根据需要会去访问不同的数据库
- Spring MVC
    - 组合模式：WebMvcConfigurerComposite，树枝和树叶都实现了相同的抽象类或接口 WebMvcConfigurer
    - 责任链模式：DispatcherServlet 依次拦截和处理请求
    - 适配器模式：HandlerAdapter 处理器适配
- SpringBoot

- Netty

- Dubbo

- Spring Cloud

- MyBatis
    - Builder + Factory 模式：创建 SqlSession 工厂和 SqlSession
    - 模板方法模式：BaseExecutor 定义执行器基本流程
    - 解释器模式：SqlNode 动态解析 SQL
    - 单例模式：ErrorContext 线程唯一
    - 装饰器模式：Cache 的实现用组合而非继承实现更灵活地缓存方式结合
    - 迭代器模式：PropertyTokenizer 利用迭代器模式实现属性解析器
    - 适配器模式：Log 适配不同的日志框架
- Tomcat