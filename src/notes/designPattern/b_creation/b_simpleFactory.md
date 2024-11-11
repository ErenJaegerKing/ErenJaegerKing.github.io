---
icon: ""
description: ""
title: "简单工厂模式"
date: 2024-11-13
category:
  - 设计模式
tag: 
  - 创建型模式
  - 简单工厂模式
order: 2
---

---

:::info
设计模式-创建型模式-简单工厂模式
:::

---

### 动机

简单工厂不是一种设计模式，反而比较像是一种编程习惯。

### **结构**

- **抽象产品** ：定义了产品的规范，描述了产品的主要特性和功能。
- **具体产品** ：实现或者继承抽象产品的子类
- **具体工厂** ：提供了创建产品的方法，调用者通过该方法来获取产品。

### UML

### 案例


### 优缺点

**优点：**

- **封装了创建对象的过程，可以通过参数直接获取对象。**
    
    把对象的创建和业务逻辑层分开，这样以后就避免了修改客户代码，如果要实现新产品直接修改工厂类，而不需要在原代码中修改，这样就降低了客户代码修改的可能性，更加容易扩展。
    

**缺点：**

- **违背了“开闭原则”**
    
    增加新产品时还是需要修改工厂类的代码。
    

### 扩展

**静态工厂**

在开发中也有一部分人将工厂类中的创建对象的功能定义为静态的，这个就是静态工厂模式，它也不是23种设计模式中的。

```java
public class SimpleCoffeeFactory {

    public static Coffee createCoffee(String type) {
        Coffee coffee = null;
        if("americano".equals(type)) {
            coffee = new AmericanoCoffee();
        } else if("latte".equals(type)) {
            coffee = new LatteCoffee();
        }
        return coffe;
    }
}
```
