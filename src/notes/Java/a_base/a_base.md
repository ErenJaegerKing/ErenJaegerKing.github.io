---
icon: ""
description: ""
title: "Java基础"
date: 2024-09-23
category:
  - Java
tag:
  - Java基础
---

## 基础概念与常识

### Java 语言有哪些特点?

- 简单易学
- 面向对象（封装，继承，多态）
- 平台无关性（ Java 虚拟机实现平台无关性）
- 支持多线程（ C++ 语言没有内置的多线程机制，因此必须调用操作系统的多线程功能来进行多线程程序设计，而 Java 语言却提供了多线程支持）；
- 可靠性（具备异常处理和自动内存管理机制）；

### Java SE vs Java EE

Java SE 是 Java 的基础版本，Java EE 是 Java 的高级版本

Java SE 更适合开发桌面应用程序或简单的服务器应用程序，Java EE 更适合开发复杂的企业级应用程序或 Web 应用程序。

### JVM vs JDK vs JRE

#### JVM

Java 虚拟机（Java Virtual Machine, JVM）是运行 Java 字节码的虚拟机。

#### JDK 和 JRE

JDK（Java Development Kit）是一个功能齐全的 Java 开发工具包，供开发者使用，用于创建和编译 Java 程序。它包含了 JRE（Java Runtime Environment），以及编译器 javac 和其他工具，如 javadoc（文档生成器）、jdb（调试器）、jconsole（监控工具）、javap（反编译工具）等。


### 什么是字节码?采用字节码的好处是什么?

在java中，JVM可以理解的代码就叫做字节码（即扩展名为.class的文件），只面向虚拟机。

