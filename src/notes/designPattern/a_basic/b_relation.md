---
icon: ""
description: ""
title: "类与类之间关系的表示方式"
date: 2024-11-03
category:
  - 设计模式
tag:
  - 类与类之间关系的表示方式
order: 2
---

## 关联关系 3种

- 在UML类图中，关联通常使用实现箭头表示
- 关联关系：指的是`类与类之间的联接`，**`它使一个类知道另一个类的属性和方法（实例变量体现）`**。A类依赖于B对象,并且`把B作为A的一个成员变量`, 则A和B存在关联关系.
- **关联可以是双向的，也可以是单向的**。两个类之前是一个层次的，不存在部分跟整体之间的关系。

**关联关系的判断方法：**

- 判断都是从对象的实例上面来看的
- 判断关系必须确定一对属性
- 判断关系必须确定具体需求

### 1、单向关联

在UML类图中单向关联用一个带箭头的实线表示。上图表示每个顾客都有一个地址，这通过让Customer类持有一个类型为Address的成员变量类实现。

![](https://drawingbed-686.pages.dev/myblog/202411032106094.png)

### **2、双向关联**

从上图中我们很容易看出，所谓的双向关联就是双方各自持有对方类型的成员变量。

在UML类图中，双向关联用一个不带箭头的直线表示。上图中在Customer类中维护一个List\<Product>，表示一个顾客可以购买多个商品；在Product类中维护一个Customer类型的成员变量表示这个产品被哪个顾客所购买。

![](https://drawingbed-686.pages.dev/myblog/202411032106846.png)

### 3、**自关联**

自关联在UML类图中用一个带有箭头且指向自身的线表示。上图的意思就是Node类包含类型为Node的成员变量，也就是“自己包含自己”。

![](https://drawingbed-686.pages.dev/myblog/202411032107962.png)

## **聚合关系**

- 在UML类图中，聚合通常使用**空心菱形+实线箭头**表示
- 聚合关系是`关联关系的一种特例`，他体现的是`整体与部分`，是一种`“弱拥有”`的关系，即`has-a`的关系。聚合是`整体`和`个体`之间的关系。
- 例如，汽车类与引擎类、轮胎类，以及其它的零件类之间的关系便整体和个体的关系。
- 与关联关系一样，**`聚合关系`** 也是通过`实例变量`实现的。**`但是关联关系所涉及的两个类是处在同一层次上的，而在聚合关系中，两个类是处在不平等层次上的，一个代表整体，另一个代表部分。`**
- 聚合关系表示整体和个体的关系，整体和个体可以相互独立存在，一定是有两个模块分别管理整体和个体。

![](https://drawingbed-686.pages.dev/myblog/202411032107482.png)

## **组合关系**

- 在UML类图中，组合通常使用**实心菱形+实线箭头**表示
- 组合关系是`关联关系的一种特例`，他体现的是一种`contains-a`(包含)的关系，这种关系比聚合更强，也称为`强聚合`。
- 它要求普通的聚合关系中代表整体的对象负责代表部分对象的生命周期，组合关系是不能共享的。代表整体的对象需要负责保持部分对象和存活，在一些情况下将负责代表部分的对象湮灭掉。代表整体的对象可以将代表部分的对象传递给另一个对象，由后者负责此对象的生命周期。换言之，代表部分的对象在每一个时刻只能与一个对象发生组合关系，由后者排他地负责生命周期。部分和整体的生命周期一样。
- **`整体和个体不能独立存在，一定是在一个模块中同时管理整体和个体，生命周期必须相同(级联)。`**

![](https://drawingbed-686.pages.dev/myblog/202411032107724.png)

## **依赖关系**

- 在UML类图中，依赖通常使用**虚线箭头**表示
- 依赖关系：指的是类与类之间的联接。依赖关系表示`一个类依赖于另一个类的定义`。一般而言，依赖关系在Java语言中体现为`成员变量、局域变量、方法的形参、方法返回值`，或者对**静态方法的调用。**
- 表示一个A类依赖于B类的定义,如果A对象离开B对象,A对象就不能正常编译,则A对象依赖于B对象(A类中使用到了B对象)；
- **比如某人要过河，需要借用一条船，此时人与船之间的关系就是依赖；** 表现在代码层面，类B作为参数被类A在某个method方法中使用。

![](https://drawingbed-686.pages.dev/myblog/202411032108077.png)

## **泛化关系（generalization）/ 继承关系**

- 在UML类图中，继承通常使用 **空心三角+实线** 表示
- 泛化关系其实就是`继承关系`：指的是一个类（称为子类、子接口）继承(`extends`)另外的一个类（称为父类、父接口）的功能，并可以增加自己额外的一些功能，**继承是类与类或者接口与接口之间最常见的关系**

![](https://drawingbed-686.pages.dev/myblog/202411032109620.png)
## **实现关系（realization）**

- 在UML类图中，实现通常使用**空心三角+虚线**表示
- 实现关系：指的是一个class类实现 interface接口（可以实现多个接口）的功能；实现是类与接口之间最常见的关系；

![](https://drawingbed-686.pages.dev/myblog/202411032109656.png)

