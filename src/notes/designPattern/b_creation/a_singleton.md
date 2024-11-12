---
icon: ""
description: ""
title: "单例模式"
date: 2024-11-13
category:
  - 设计模式
tag:
  - 创建型模式
  - 单例模式
order: 1
---

---

:::info
设计模式-创建型模式-单例模式
:::

---

### 意图

**保证一个类只有一个实例，并提供一个访问该实例的全局节点**

### 动机

单例模式（Singleton Pattern）是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。

### 定义

**确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例，这个类称为单例类，它提供全局访问的方法。单例模式是一种对象创建型模式。**

### 结构

单例模式包含以下几个主要角色：

- **单例类**：包含单例实例的类，通常将构造函数声明为私有。
- **静态成员变量**：用于存储单例实例的静态成员变量。
- **获取实例方法**：静态方法，用于获取单例实例。
- **私有构造函数**：防止外部直接实例化单例类。
- **线程安全处理**：确保在多线程环境下单例实例的创建是安全的。

### UML

![](https://drawingbed-686.pages.dev/myblog/202411112239296.png)

### 实现

单例设计模式分类两种：

- 饿汉式：类加载就会导致该单实例对象被创建
- 懒汉式：类加载不会导致该单实例对象被创建，而是首次使用该对象时才会创建

1、饿汉式-方式 1（静态变量方式）

该方式在成员位置声明 Singleton 类型的静态变量，并创建 Singleton 类的对象 instance。instance 对象是随着类的加载而创建的。如果该对象足够大的话，而一直没有使用就会造成内存的浪费。

```java
/**
 * 饿汉式
 *      静态变量创建类的对象
 */
public class Singleton {
    //私有构造方法
    private Singleton() {}

    //在成员位置创建该类的对象
    private static Singleton instance = new Singleton();

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return instance;
    }
}
```

2、饿汉式-方式 2（静态代码块方式）

该方式在成员位置声明 Singleton 类型的静态变量，而对象的创建是在静态代码块中，也是对着类的加载而创建。所以和饿汉式的方式 1 基本上一样，当然该方式也存在内存浪费问题。

```java
/**
 * 恶汉式
 *      在静态代码块中创建该类对象
 */
public class Singleton {

    //私有构造方法
    private Singleton() {}

    //在成员位置创建该类的对象
    private static Singleton instance;

    static {
        instance = new Singleton();
    }

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return instance;
    }
}
```

3、懒汉式-方式 1（线程不安全）

该方式在成员位置声明 Singleton 类型的静态变量，并没有进行对象的赋值操作，那么什么时候赋值的呢？当调用 getInstance()方法获取 Singleton 类的对象的时候才创建 Singleton 类的对象，这样就实现了懒加载的效果。但是，如果是多线程环境，会出现线程安全问题。

```java
/**
 * 懒汉式
 *  线程不安全
 */
public class Singleton {
    //私有构造方法
    private Singleton() {}

    //在成员位置创建该类的对象
    private static Singleton instance;

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {

        if(instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

4、懒汉式-方式 2（线程安全）

该方式也实现了懒加载效果，同时又解决了线程安全问题。但是在 getInstance()方法上添加了 synchronized 关键字，导致该方法的执行效果特别低。从上面代码我们可以看出，其实就是在初始化 instance 的时候才会出现线程安全问题，一旦初始化完成就不存在了。

```java
/**
 * 懒汉式
 *  线程安全
 */
public class Singleton {
    //私有构造方法
    private Singleton() {}

    //在成员位置创建该类的对象
    private static Singleton instance;

    //对外提供静态方法获取该对象
    public static synchronized Singleton getInstance() {

        if(instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

5、懒汉式-方式 3（双重检查锁） 优秀

再来讨论一下懒汉模式中加锁的问题，对于 getInstance()方法来说，绝大部分的操作都是读操作，读操作是线程安全的，所以我们没必让每个线程必须持有锁才能调用该方法，我们需要调整加锁的时机。由此也产生了一种新的实现模式：双重检查锁模式

```java
/**
 * 双重检查方式
 */
public class Singleton {

    //私有构造方法
    private Singleton() {}

    private static Singleton instance;

   //对外提供静态方法获取该对象
    public static Singleton getInstance() {
		//第一次判断，如果instance不为null，不进入抢锁阶段，直接返回实例
        if(instance == null) {
            synchronized (Singleton.class) {
                //抢到锁之后再次判断是否为null
                if(instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

双重检查锁模式是一种非常好的单例实现模式，解决了单例、性能、线程安全问题，上面的双重检测锁模式看上去完美无缺，其实是存在问题，在多线程的情况下，可能会出现空指针问题，出现问题的原因是 JVM 在实例化对象的时候会进行优化和指令重排序操作。

要解决双重检查锁模式带来空指针异常的问题，只需要使用 volatile 关键字,volatile 关键字可以保证可见性和有序性。

```java
/**
 * 双重检查方式
 */
public class Singleton {

    //私有构造方法
    private Singleton() {}

    private static volatile Singleton instance;

   //对外提供静态方法获取该对象
    public static Singleton getInstance() {
		//第一次判断，如果instance不为null，不进入抢锁阶段，直接返回实际
        if(instance == null) {
            synchronized (Singleton.class) {
                //抢到锁之后再次判断是否为空
                if(instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

添加**volatile**关键字之后的双重检查锁模式是一种比较好的单例实现模式，能够保证在多线程的情况下线程安全也不会有性能问题。

6、懒汉式-方式 4（静态内部类方式） 优秀

静态内部类单例模式中实例由内部类创建，由于 JVM 在加载外部类的过程中, 是不会加载静态内部类的, 只有内部类的属性/方法被调用时才会被加载, 并初始化其静态属性。静态属性由于被 static 修饰，保证只被实例化一次，并且严格保证实例化顺序。

```java
/**
 * 静态内部类方式
 */
public class Singleton {

    //私有构造方法
    private Singleton() {}

    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

第一次加载 Singleton 类时不会去初始化 INSTANCE，只有第一次调用 getInstance，虚拟机加载 SingletonHolder

静态内部类单例模式是一种优秀的单例模式，是开源项目中比较常用的一种单例模式。在没有加任何锁的情况下，保证了多线程下的安全，并且没有任何性能影响和空间的浪费。

7、枚举方式 极力推荐

枚举类实现单例模式是极力推荐的单例实现模式，因为枚举类型是线程安全的，并且只会装载一次，设计者充分的利用了枚举的这个特性来实现单例模式，枚举的写法非常简单，而且枚举类型是所用单例实现中唯一一种不会被破坏的单例实现模式。

```java
public enum Singleton {

    // 枚举实例本身就是单例
    INSTANCE;

    // 可以添加单例类的其他方法和属性
    private int value;

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    // 这里不需要静态内部类来持有实例，因为枚举实例本身就是静态且唯一的
    // 对外提供获取单例的方法，但通常不需要，因为可以直接通过Singleton.INSTANCE访问
    public static Singleton getInstance() {
        return INSTANCE;
    }
}

// 使用单例的例子
public class Main {
    public static void main(String[] args) {
        // 获取单例实例
        Singleton singleton = Singleton.INSTANCE;

        // 设置值
        singleton.setValue(1);

        // 获取值
        System.out.println("Singleton value: " + singleton.getValue());

        // 再次获取单例实例，并验证是否为同一个实例
        Singleton anotherSingleton = Singleton.getInstance();
        System.out.println("Is the same instance: " + (singleton == anotherSingleton));
    }
}

```

枚举方式属于饿汉式方式。

### 问题

破坏单例模式：使上面定义的单例类（Singleton）可以创建多个对象，枚举方式除外。有两种方式，分别是序列化和反射。

**序列化和反序列化已经破坏了单例设计模式**。

```java
public class Singleton implements Serializable {

    //私有构造方法
    private Singleton() {}

    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

```java
public class Test {
    public static void main(String[] args) throws Exception {
        //往文件中写对象
        //writeObject2File();
        //从文件中读取对象
        Singleton s1 = readObjectFromFile();
        Singleton s2 = readObjectFromFile();

        //判断两个反序列化后的对象是否是同一个对象
        System.out.println(s1 == s2);
    }

    private static Singleton readObjectFromFile() throws Exception {
        //创建对象输入流对象
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("C:\\Users\\Think\\Desktop\\a.txt"));
        //第一个读取Singleton对象
        Singleton instance = (Singleton) ois.readObject();

        return instance;
    }

    public static void writeObject2File() throws Exception {
        //获取Singleton类的对象
        Singleton instance = Singleton.getInstance();
        //创建对象输出流
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("C:\\Users\\Think\\Desktop\\a.txt"));
        //将instance对象写出到文件中
        oos.writeObject(instance);
    }
}
```

决：在 Singleton 类中添加 readResolve()方法，在反序列化时被反射调用，如果定义了这个方法，就返回这个方法的值，如果没有定义，则返回新 new 出来的对象。

```java
public class Singleton implements Serializable {

    //私有构造方法
    private Singleton() {}

    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }

    /**
     * 下面是为了解决序列化反序列化破解单例模式
     */
    private Object readResolve() {
        return SingletonHolder.INSTANCE;
    }
}
```

**反射已经破坏了单例设计模式。**

```java
public class Singleton {

    //私有构造方法
    private Singleton() {}

    private static volatile Singleton instance;

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {

        if(instance != null) {
            return instance;
        }

        synchronized (Singleton.class) {
            if(instance != null) {
                return instance;
            }
            instance = new Singleton();
            return instance;
        }
    }
}
```

```java
public class Test {
    public static void main(String[] args) throws Exception {
        //获取Singleton类的字节码对象
        Class clazz = Singleton.class;
        //获取Singleton类的私有无参构造方法对象
        Constructor constructor = clazz.getDeclaredConstructor();
        //取消访问检查
        constructor.setAccessible(true);

        //创建Singleton类的对象s1
        Singleton s1 = (Singleton) constructor.newInstance();
        //创建Singleton类的对象s2
        Singleton s2 = (Singleton) constructor.newInstance();

        //判断通过反射创建的两个Singleton对象是否是同一个对象
        System.out.println(s1 == s2);
    }
}
```

解决：当通过反射方式调用构造方法进行创建创建时，直接抛异常。不运行此中操作。

```java
public class Singleton {

    //私有构造方法
    private Singleton() {
        /*
           反射破解单例模式需要添加的代码
        */
        if(instance != null) {
            throw new RuntimeException();
        }
    }

    private static volatile Singleton instance;

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {

        if(instance != null) {
            return instance;
        }

        synchronized (Singleton.class) {
            if(instance != null) {
                return instance;
            }
            instance = new Singleton();
            return instance;
        }
    }
}
```

**注意：枚举方式不会出现这两个问题。**

### **JDK 源码解析-Runtime 类**

Runtime 类就是使用的单例设计模式。

![](https://drawingbed-686.pages.dev/myblog/202411112240391.png)

从上面源代码中可以看出**Runtime 类**使用的是**饿汉式（静态属性）**方式来实现**单例模式**的。

### 应用场景

**如果程序中的某个类对于所有客户端只有一个可用的实例， 可以使用单例模式。**

单例模式禁止通过除特殊构建方法以外的任何方式来创建自身类的对象。 该方法可以创建一个新对象， 但如果该对象已经被创建， 则返回已有的对象。

**如果你需要更加严格地控制全局变量， 可以使用单例模式。**

单例模式与全局变量不同， 它保证类只存在一个实例。 除了单例类自己以外， 无法通过任何方式替换缓存的实例。

请注意， 你可以随时调整限制并设定生成单例实例的数量， 只需修改 `获取实例`方法， 即 getInstance 中的代码即可实现。

### 优缺点

优点：

- 你可以保证一个类只有一个实例。
- 你获得了一个指向该实例的全局访问节点。
- 仅在首次请求单例对象时对其进行初始化。

缺点：

- 违反了*单一职责原则*。 该模式同时解决了两个问题。
- 单例模式可能掩盖不良设计， 比如程序各组件之间相互了解过多等。
- 该模式在多线程环境下需要进行特殊处理， 避免多个线程多次创建单例对象。
- 单例的客户端代码单元测试可能会比较困难， 因为许多测试框架以基于继承的方式创建模拟对象。 由于单例类的构造函数是私有的， 而且绝大部分语言无法重写静态方法， 所以你需要想出仔细考虑模拟单例的方法。 要么干脆不编写测试代码， 或者不使用单例模式。
