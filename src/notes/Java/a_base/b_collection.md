---
icon: ""
description: ""
title: "Java集合"
date: 2024-09-23
category:
  - Java
tag:
  - Java集合
---

## 集合概述

### Java集合概览

java集合，也叫容器，有两个接口派生，一个collection接口，主要存放单一元素。另一个是Map接口，主要用于存放键值对。对于collection接口，下面又有三个主要的子接口：List、Set、Queue

### 说说 List, Set, Queue, Map 四者的区别？

list 有序的 可重复的
set 无序的 不可重复的
queue 有序的 可重复的 按先后顺序排序的
map 存放键值对的 key是无序的、不可重复的 value是无序的、可重复的

### 集合框架底层数据结构总结

list
- ArrayList：Object[]数组。
- Vector：Object[]数组。
- LinkedList：双向链表（jdk1.6之前为循环链表，jdk1.7取消了循环）

set
- HashSet：基于hashmap实现的，底层采用hashmap俩保存元素
- LinkedHashSet：LinkedHashSet是HashSet的子类，并且其内部是通过LinkedHashMap来实现的
- TreeSet：红黑树（自平衡的排序二叉树）

queue
- PriorityQueue：Object[] 数组来实现小顶堆。
- DelayQueue：PriorityQueue
- ArrayDeque：可扩容动态双向数组。

map
- hashmap：jdk1.8之前hashmap由数组+链表组成的，数组是hashmap 的主体，链表则是主要为了解决哈希冲突而存在的（拉链法解决冲突）。jdk1.8之后在解决哈希冲突时有了较大的变化，当链表长度大于阈值8时，将链表转化为红黑树，以减少搜索时间（将链表转成红黑树前会判断，如果当前数组的长度小于64，那么会选择先进行数组扩容， 而不是转换为红黑树）
- LinedHashMap：LinkedHashMao继承HashMap，所以它的底层仍然是基于拉链式散列结构即由数组和链表或红黑树组成。另外，LinkedHashMao在上面的结构的基础上，增加了一条双向链表，使得上面的结构可以保持键值对的插入顺序。同时通过对链表进行相应的操作，实现了访问顺序的相关逻辑
- hashtable：数组+链表组成的，数组是hashtable的体，链表则是主要为了解决哈希冲突而存在的
- treemap：红黑树（自平衡的排序二叉树）

### 如何选用集合?

- 需要根据键值获取到元素值时就选用map接口下的集合，需要排序时选择treemap，不需要排序时选择hashmap，需要保证线程安全就选用concurrenthashmap
- 只需要存放元素值时，需要保证元素唯一就选择set接口的集合比如treeset或hashset，不需要就选择实现list接口比如说arraylist或linkedlist

### 为什么要使用集合？

当我们需要存储一组类型相同的数据时，数组是最常用且最基本的容器之一

## List

### ArrayList 和 Array（数组）的区别？

ArrayList内部基于动态数组实现，比Array（静态数组）使用起来更加灵活

- ArrayList会根绝实际存储的元素动态地扩容或缩容，而Array被创建之后就不能改变它的长度了
- ArrayList可以使用泛型来确保类型安全，Array则不可以
- ArrayList中只能存储对象。对于基本类型数据，需要使用其对应的包装类。Array可以直接存储基本类型数据，也可以存储对象
- ArrayList支持插入、删除、遍历等常见操作，并且提供了丰富的API操作方法，比如add()、remove()等。Array只是一个固定长度的数组，只能按照下标访问其中的元素，不具备动态添加、删除元素的能力。

长度 泛型 存储对象 是否支持插入、删除、遍历、API

### ArrayList 和 Vector 的区别?

- ArrayList是List的主要实现类，底层使用Object[]存储，适用于频繁的查找工作，线程不全
- Vector是List的古老实现类，底层使用Object[]存储，线程安全。

### Vector 和 Stack 的区别?

- Vector和stack线程安全，都是由synchronized关键字进行同步处理
- Stack继承自Vector，是一个后进先出的栈，而Vector是一个列表

### ArrayList 可以添加 null 值吗？

可以的

可以存储任何类型的对象，包括null值

不建议向ArrayList中添加null值，null值无意义，会让代码难以维护比如忘记做判空处理就会导致空指针异常

### ArrayList 插入和删除元素的时间复杂度？

对于插入：
- 头部插入 o(N)
- 尾部插入，如果没有达到极限，O(1).如果已经达到极限那就需要先进行扩容，需要先执行一次o(n)的操作将原数组复制到新的更大的数组中，然后再执行O(1)的操作添加元素
- 指定位置插入 O（n）

对于删除：
- 头部删除，o(n)
- 尾部删除，o(1)
- 指定位置删除，o（n）

### LinkedList 插入和删除元素的时间复杂度？

- 头部插入/删除：只需要修改头结点的指针即可以完成插入/删除操作，o(1)
- 尾部插入/删除：只需要修改尾结点的指针即可以完成插入/删除操作，o(1)
- 指定位置插入/删除：需要遍历到该位置，然后再插入或者删除，o(n)

### LinkedList 为什么不能实现 RandomAccess 接口？

RandomAcces是一个标记接口，用来表明实现该接口的类支持随机访问（即可以通过索引快速访问元素）。

由于LinkedList底层数据结构是链表，内存地址不连续，只能通过指针来定位，不支持随机快速访问，所以不能实现RandomAccess接口

### ArrayList 与 LinkedList 区别?

- 是否保证线程安全
- 底层数据结构
- 插入和删除是否受元素位置的影响
- 是否支持快速随机访问
- 内存空间占用

### 说一说 ArrayList 的扩容机制吧

1. 初始容量：默认初试容量为10，延迟初始化，也就是说第一次添加元素时才真正创建数组
2. 动态扩容：当元素数量超过当前数组容量时，ArrayList会自动进行扩容
  - 当调用add()方法且当前元素数量等于数组长度时
  - 新容量 = 旧容量 + （旧容量 >> 1）(即大约为旧容量的1.5倍)
  - 创建新数组并将旧数组元素拷贝到新数组中
  - 将内部数组引用指向新数组


### 说说集合中的 fail-fast 和 fail-safe 是什么

不太清楚

## Set

### Comparable 和 Comparator 的区别

### 无序性和不可重复性的含义是什么

- 无序性不等于随机性，无序性是指存储的数据在底层数组中并非按照数组索引的顺序添加，而是根据数据的哈希值决定的
- 不可重复性是指添加的元素按照equals()判断时，返回false，需要同时重写equals()方法和hashcode方法

### 比较 HashSet、LinkedHashSet 和 TreeSet 三者的异同

- 都是set接口，元素唯一，都不是线程安全的
- hashset底层是哈希表  linkedhashset底层是链表和哈希表  treeset底层是红黑树，元素是有序的
- 应用场景不同

## Queue

以后再说

## Map
### HashMap和Hashtable的区别
- 线程是否安全
- 效率
- 对null key和null value的支持
- 初试容量大小和每次扩容大小的不同
- 底层数据结构
- 哈希函数的实现

### HashMap 和 HashSet 区别

- 都实现了map接口
- hashmap存储键值对，hashset存储对象
- hashmap调用put向map中添加元素，调用add方法向set中添加元素
- hashmap使用键计算hashcode，HashSet 使用成员对象来计算 hashcode 值，对于两个对象来说 hashcode 可能相同，所以equals()方法用来判断对象的相等性