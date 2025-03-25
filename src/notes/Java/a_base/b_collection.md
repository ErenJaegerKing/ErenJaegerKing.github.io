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