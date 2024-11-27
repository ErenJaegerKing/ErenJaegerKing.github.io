---
title: "阿里巴巴规范手册"
description: ""
icon: ""
date: 2024-11-13
category:
  - 开发规范
tag:
  - 阿里规范

---

:::info
阿里巴巴崇山版手册，一下是我在规范手册里面不知晓的，看不懂就打开手册仔细观看
:::

---

# 一、 编程规约 
## (一) 命名风格

6. 【强制】常量命名全部大写，单词间用下划线隔开，**力求语义表达完整清楚，不要嫌名字长**。 

正例：MAX_STOCK_COUNT / CACHE_EXPIRED_TIME 

反例：MAX_COUNT / EXPIRED_TIME

1. 【强制】抽象类命名使用Abstract或Base开头；异常类命名使用Exception结尾；测试类命名以它要测试的类的名称开始，以Test结尾。 

2. 【强制】POJO类中的任何布尔类型的变量，都不要加is前缀，否则部分框架解析会引起序列
化错误。 

说明：在本文MySQL规约中的建表约定第一条，表达是与否的变量采用is_xxx的命名方式，所以，需要
在 resultMap 设置从is_xxx 到xxx 的映射关系。 

反例：定义为基本数据类型Boolean isDeleted的属性，它的方法也是isDeleted()，框架在反向解析的时
候，“误以为”对应的属性名称是deleted，导致属性获取不到，进而抛出异常。

10. 【强制】包名统一使用小写，点分隔符之间有且仅有一个自然语义的英语单词。包名统一使用
单数形式，但是类名如果有复数含义，类名可以使用复数形式。 

正例：应用工具类包名为com.alibaba.ei.kunlun.aap.util、类名为 MessageUtils（此规则参考spring 的框架结构）

11. 以后回看


12. 【强制】杜绝完全不规范的缩写，避免望文不知义。 
 
反例：AbstractClass“缩写”成AbsClass；condition“缩写”成 condi；Function 缩写”成Fu，此类随意缩写严重降低了代码的可阅读性。 

13. 【推荐】为了达到代码自解释的目标，任何自定义编程元素在命名时，使用尽量完整的单词组
合来表达。 

正例：对某个对象引用的volatile字段进行原子更新的类名为AtomicReferenceFieldUpdater。 

反例：常见的方法内变量为int a;的定义方式。

15. 【推荐】如果模块、接口、类、方法使用了设计模式，在命名时需体现出具体模式。 

说明：将设计模式体现在名字中，有利于阅读者快速理解架构设计理念。 

正例：   public class OrderFactory; 
        public class LoginProxy; 
        public class ResourceObserver;

19. 【参考】各层命名规约：  

A) Service/DAO 层方法命名规约 

1） 获取单个对象的方法用get做前缀。 

2） 获取多个对象的方法用list做前缀，复数结尾，如：listObjects。 

3） 获取统计值的方法用count做前缀。 

4） 插入的方法用save/insert做前缀。 

5） 删除的方法用remove/delete做前缀。 

6） 修改的方法用update做前缀。 

B) 领域模型命名规约 

1） 数据对象：xxxDO，xxx即为数据表名。 
2） 数据传输对象：xxxDTO，xxx为业务领域相关的名称。 
3） 展示对象：xxxVO，xxx一般为网页名称。 
4） POJO是DO/DTO/BO/VO的统称，禁止命名成xxxPOJO。 

## (二) 常量定义 

1. 【强制】不允许任何魔法值（即未经预先定义的常量）直接出现在代码中。 

反例： 

// 本例中，开发者A定义了缓存的key，然后开发者B使用缓存时少了下划线，即key是"Id#taobao"+tradeId，导致出现故障 

String key = "Id#taobao_" + tradeId; 

cache.put(key, value); 

2. 【强制】在long或者Long赋值时，数值后使用大写字母L，不能是小写字母l，小写容易跟
数字混淆，造成误解。 

说明：Long a = 2l; 写的是数字的21，还是Long型的2？ 

## (三) 代码格式

3. 【强制】if/for/while/switch/do 等保留字与括号之间都必须加空格。 
   
4. 【强制】任何二目、三目运算符的左右两边都需要加一个空格。 

说明：包括赋值运算符=、逻辑运算符&&、加减乘除符号等。

8. 【强制】单行字符数限制不超过120个，超出需要换行，换行时遵循如下原则： 

1）第二行相对第一行缩进4个空格，从第三行开始，不再继续缩进，参考示例。 

2）运算符与下文一起换行。 

3）方法调用的点符号与下文一起换行。 

4）方法调用中的多个参数需要换行时，在逗号后进行。 

5）在括号前不要换行，见反例。 

```java
正例： 
StringBuilder sb = new StringBuilder(); 
// 超过120个字符的情况下，换行缩进4个空格，并且方法前的点号一起换行  
sb.append("yang").append("hao")... 
    .append("chen")... 
    .append("chen")... 
    .append("chen"); 
反例： 
StringBuilder sb = new StringBuilder(); 
// 超过120个字符的情况下，不要在括号前换行  
sb.append("you").append("are")...append 
    ("lucky"); 
// 参数很多的方法调用可能超过120个字符，逗号后才是换行处  
method(args1, args2, args3, ... 
    , argsX); 
```

10. 【强制】IDE的text file encoding 设置为UTF-8; IDE中文件的换行符使用Unix格式，不要
使用Windows格式。

11. 【推荐】单个方法的总行数不超过80行。 

说明：除注释之外的方法签名、左右大括号、方法内代码、空行、回车及任何不可见字符的总行数不超过
80 行。 

正例：代码逻辑分清红花和绿叶，个性和共性，绿叶逻辑单独出来成为额外方法，使主干代码更加清晰；共
性逻辑抽取成为共性方法，便于复用和维护。

13. 【推荐】不同逻辑、不同语义、不同业务的代码之间插入一个空行分隔开来以提升可读性。 

说明：任何情形，没有必要插入多个空行进行隔开。 

## (四) OOP规约

OOP即面向对象程序设计

6. 【强制】Object的equals方法容易抛空指针异常，应使用常量或确定有值的对象来调用equals。 

正例："test".equals(object); 

反例：object.equals("test"); 

说明：推荐使用JDK7引入的工具类java.util.Objects#equals(Object a, Object b) 

7. 【强制】所有整型包装类对象之间值的比较，全部使用equals方法比较。 

说明：对于Integer var = ? 在-128至127 之间的赋值，Integer对象是在 IntegerCache.cache 产生，会复用已有对象，这个区间内的Integer值可以直接使用==进行判断，但是这个区间之外的所有数据，都会在堆上产生，并不会复用已有对象，这是一个大坑，推荐使用equals方法进行判断。

8. 【强制】任何货币金额，均以最小货币单位且整型类型来进行存储。

9. 【强制】浮点数之间的等值判断，基本数据类型不能用==来比较，包装数据类型不能用equals
来判断。

详细请看官方手册

10. 【强制】如上所示BigDecimal的等值比较应使用compareTo()方法，而不是equals()方法。 

说明：equals()方法会比较值和精度（1.0与1.00返回结果为false），而compareTo()则会忽略精度。

11. 【强制】定义数据对象DO类时，属性类型要与数据库字段类型相匹配。 

正例：数据库字段的bigint必须与类属性的Long类型相对应。 

反例：某个案例的数据库表id字段定义类型bigint unsigned，实际类对象属性为Integer，随着id越来
越大，超过Integer的表示范围而溢出成为负数。

14. 【强制】定义DO/DTO/VO等POJO类时，不要设定任何属性默认值。 

反例：POJO类的createTime默认值为new Date()，但是这个属性在数据提取时并没有置入具体值，在
更新其它字段时又附带更新了此字段，导致创建时间被修改成当前时间。

15. 【强制】序列化类新增属性时，请不要修改serialVersionUID字段，避免反序列失败；如果完全不兼容升级，避免反序列化混乱，那么请修改serialVersionUID值。 

说明：注意serialVersionUID 不一致会抛出序列化运行时异常。

16. 【强制】构造方法里面禁止加入任何业务逻辑，如果有初始化逻辑，请放在init方法中。 

17. 【强制】POJO类必须写toString方法。使用IDE中的工具：source> generate toString
时，如果继承了另一个POJO类，注意在前面加一下super.toString。 

说明：在方法执行抛出异常时，可以直接调用POJO的toString()方法打印其属性值，便于排查问题。 

18. 【强制】禁止在POJO类中，同时存在对应属性xxx的isXxx()和getXxx()方法。 

说明：框架在调用属性xxx的提取方法时，并不能确定哪个方法一定是被优先调用到的。 

21. 【推荐】 类内方法定义的顺序依次是：公有方法或保护方法 > 私有方法 > getter / setter 
方法。 

说明：公有方法是类的调用者和维护者最关心的方法，首屏展示最好；保护方法虽然只是子类关心，也可
能是“模板设计模式”下的核心方法；而私有方法外部一般不需要特别关心，是一个黑盒实现；因为承载
的信息价值较低，所有Service和DAO的getter/setter方法放在类体最后。 

24. 【推荐】final可以声明类、成员变量、方法、以及本地变量，下列情况使用final关键字： 

1） 不允许被继承的类，如：String类。 

2） 不允许修改引用的域对象，如：POJO类的域变量。 

3） 不允许被覆写的方法，如：POJO类的setter方法。 

4） 不允许运行过程中重新赋值的局部变量。 

5） 避免上下文重复使用一个变量，使用final关键字可以强制重新定义一个变量，方便更好地进行重构。

26. 【推荐】类成员与方法访问控制从严： 

1） 如果不允许外部直接通过new来创建对象，那么构造方法必须是private。 

2） 工具类不允许有public或default构造方法。 

3） 类非static成员变量并且与子类共享，必须是protected。  

4） 类非static成员变量并且仅在本类使用，必须是private。 

5） 类static 成员变量如果仅在本类使用，必须是private。 

6） 若是static成员变量，考虑是否为final。 

7） 类成员方法只供类内部调用，必须是private。  

8） 类成员方法只对继承类公开，那么限制为protected。 

说明：任何类、方法、参数、变量，严控访问范围。过于宽泛的访问范围，不利于模块解耦。思考：如果
是一个private 的方法，想删除就删除，可是一个public的service成员方法或成员变量，删除一下，不
得手心冒点汗吗？变量像自己的小孩，尽量在自己的视线内，变量作用域太大，无限制的到处跑，那么你
会担心的。

## (五) 日期时间 

1. 【强制】日期格式化时，传入pattern中表示年份统一使用小写的y。 

说明：日期格式化时，yyyy表示当天所在的年，而大写的YYYY代表是week in which year（JDK7之后
引入的概念），意思是当天所在的周属于的年份，一周从周日开始，周六结束，只要本周跨年，返回的YYYY
就是下一年。 

正例：表示日期和时间的格式如下所示： 

new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

2. 【强制】在日期格式中分清楚大写的M和小写的m，大写的H和小写的h分别指代的意义。 

说明：日期格式中的这两对字母表意如下： 

1） 表示月份是大写的M； 

2） 表示分钟则是小写的m； 

3） 24小时制的是大写的H； 

4） 12小时制的则是小写的h。  

3. 【强制】获取当前毫秒数：System.currentTimeMillis(); 而不是new Date().getTime()。 

说明：如果想获取更加精确的纳秒级时间值，使用System.nanoTime的方式。在JDK8中，针对统计时间
等场景，推荐使用Instant类。

4. 【强制】不允许在程序任何地方中使用：1）java.sql.Date。 2）java.sql.Time  3）java.sql.Timestamp。

5. 【强制】不要在程序中写死一年为365天，避免在公历闰年时出现日期转换错误或程序逻辑
错误。 

```java
正例： 
// 获取今年的天数 
int daysOfThisYear = LocalDate.now().lengthOfYear(); 
// 获取指定某年的天数 
LocalDate.of(2011, 1, 1).lengthOfYear(); 
反例： 
// 第一种情况：在闰年366天时，出现数组越界异常 
int[] dayArray = new int[365];  
// 第二种情况：一年有效期的会员制，今年1月26日注册，硬编码365返回的却是1月25日 
Calendar calendar = Calendar.getInstance(); 
calendar.set(2020, 1, 26);  
calendar.add(Calendar.DATE, 365);  
```

6. 【推荐】避免公历闰年2月问题。闰年的2月份有29天，一年后的那一天不可能是2月29
日。

7. 【推荐】使用枚举值来指代月份。如果使用数字，注意Date，Calendar等日期相关类的月份
month 取值在0-11之间。 

说明：参考JDK原生注释，Month value is 0-based. e.g., 0 for January. 

正例： Calendar.JANUARY，Calendar.FEBRUARY，Calendar.MARCH 等来指代相应月份来进行传参或
比较。

## (六) 集合处理
