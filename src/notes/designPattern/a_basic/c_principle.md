---
icon: ""
description: ""
title: "软件开发原则"
date: 2024-11-03
category:
  - 设计模式
tag:
  - 软件开发原则
order: 3
---

:::info
为了降低依赖，降低耦合
:::

# 开闭原则（Open Closed Principle，OCP）
**对扩展开放，对修改关闭**

软件实体应当对扩展开放，对修改关闭（Software entities should be open for extension，but closed for modification），这就是开闭原则的经典定义。

# 里氏代换原则（Liskov Substitution Principle，LSP）
里氏替换原则通俗来讲就是：**子类可以扩展父类的功能，但不能改变父类原有的功能。**

里氏代换原则：任何基类可以出现的地方，子类一定可以出现。

换句话说，子类继承父类时，除添加新的方法完成新增功能外，尽量不要重写父类的方法。

# 依赖倒转原则（Dependence Inversion Principle，DIP）
其核心思想是：**要面向接口编程，不要面向实现编程。**(为了降低客户与实现模块间的耦合)

就是依赖于抽象，不要依赖于具体

依赖倒置原则的原始定义为：高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象（High level modules shouldnot depend upon low level modules.Both should depend upon abstractions.Abstractions should not depend upon details. Details should depend upon abstractions）

# 单一职责原则（Single Responsibility Principle，SRP）
单一职责原则规定一个类应该有且仅有一个引起它变化的原因，否则类应该被拆分（There should never be more than one reason for a class to change）。

# 接口隔离原则（Interface Segregation Principle，ISP）
接口隔离原则(Interface  Segregation Principle, ISP)：使用多个专门的接口，而不使用单一的总接口，即客户端不应该依赖那些它不需要的接口。

# 迪米特法则（Law of Demeter，LoD）
其含义是：**如果两个软件实体无须直接通信，那么就不应当发生直接的相互调用，可以通过第三方转发该调用。**

迪米特法则又叫最少知识原则（Least Knowledge Principle，LKP)。

只和你的直接朋友交谈，不跟“陌生人”说话（Talk only to your immediate friends and not to strangers）。

其目的是降低类之间的耦合度，提高模块的相对独立性。

# 合成复用原则（Composite Reuse Principle，CRP）
合成复用原则是指：复用时要尽量使用组合/聚合关系（关联关系），少用继承。