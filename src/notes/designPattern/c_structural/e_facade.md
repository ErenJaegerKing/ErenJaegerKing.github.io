---
icon: ""
description: ""
title: "外观模式"
date: 2024-11-11
category:
  - 设计模式
tag:
  - 结构性模式
  - 外观模式
order: 5
---

---

:::info
设计模式-结构性模式-外观模式
:::

---

### 动机

![](https://drawingbed-686.pages.dev/myblog/202411101528953.png)

该模式对外有一个统一接口，外部应用程序不用关心内部子系统的具体的细节，这样会大大降低应用程序的复杂度，提高了程序的可维护性。

外观（Facade）模式是“迪米特法则”的典型应用

### 定义

**又名门面模式，是一种通过为多个复杂的子系统提供一个一致的接口，而使这些子系统更加容易被访问的模式。**

### 结构

外观（Facade）模式包含以下主要角色：

- **外观（Facade）角色**：为多个子系统对外提供一个共同的接口。
- **子系统（Sub System）角色**：实现系统的部分功能，客户可以通过外观角色访问它。

### UML

![](https://drawingbed-686.pages.dev/myblog/202411101526102.png)

### 案例

【例】智能家电控制

![](https://drawingbed-686.pages.dev/myblog/202411101529145.png)

### 优缺点

**好处：**

- **降低了子系统与客户端之间的耦合度**
    
    使得子系统的变化不会影响调用它的客户类。
    
- **减少处理对象数目**
    
    对客户屏蔽了子系统组件，减少了客户处理的对象数目，并使得子系统使用起来更加容易。
    
- **简化接口**

**缺点：**

- **不符合开闭原则，修改很麻烦**

### 适用场景

- 对分层结构系统构建时，使用外观模式定义子系统中每层的入口点可以简化子系统之间的依赖关系。
- 当一个复杂系统的子系统很多时，外观模式可以为系统设计一个简单的接口供外界访问。
- 当客户端与多个子系统之间存在很大的联系时，引入外观模式可将它们分离，从而提高子系统的独立性和可移植性。

### **源码解析**

使用Tomcat作为web容器时，接收浏览器发送过来的请求，Tomcat会将请求信息封装成ServletRequest对象。ServletRequest是一个接口，它还有一个子接口HttpServletRequest，而我们知道该request对象肯定是一个HttpServletRequest对象的子实现类对象，到底是哪个类的对象呢？可以通过输出request对象，我们就会发现是一个名为RequestFacade的类的对象。

RequestFacade类就使用了外观模式。先看结构图：

![](https://drawingbed-686.pages.dev/myblog/202411101557399.png)

**为什么在此处使用外观模式呢？**

定义 RequestFacade 类，分别实现 ServletRequest ，同时定义私有成员变量 Request ，并且方法的实现调用 Request  的实现。然后，将 RequestFacade上转为 ServletRequest  传给 servlet 的 service 方法，这样即使在 servlet 中被下转为 RequestFacade ，也不能访问私有成员变量对象中的方法。既用了 Request ，又能防止其中方法被不合理的访问。