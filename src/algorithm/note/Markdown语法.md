---
title: "Markdown语法"
description: ""
icon: ""
date: 2024-09-15
category:
  - 数据结构与算法
tag:
  - 语法
---

## 基础语法
### 1. 标题 [数个 "#" + 空格 前置]

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 2. 强调 [用 "**" 或 "__" 包围]

```
**欢迎报考南京大学!** (我喜欢用这种)
__欢迎报考南京大学!__
```

或者选中想要强调的文字按下 `Ctrl` + `B`. 

E.G. 

**欢迎报考南京大学!**

### 3. 斜体 [用 "*" 或 "_" 包围]

```
*欢迎大佬来浇浇我各种知识* (我喜欢用这种)
_欢迎大佬来浇浇我各种知识_
```

或者选中想要强调的文字按下 `Ctrl` + `I`. 

E.G. 

欢迎大佬来浇浇我各种知识

(PS ***斜体并强调*** [用 "***" 或 "___" 包围])

### 4. 删除线 [用 "~~" 包围]

```
~~我宣布个事儿, 我是Sabiyary!~~
```

E.G. 

~~我宣布个事儿, 我是Sabiyary!~~

### 5. *高亮 [用 "==" 包围]

**(注意: 此为扩展语法)**

```
==我喜欢黄色, 也喜欢绿色==
```

E.G. 

==我喜欢黄色, 也喜欢绿色==

### 6. 代码 [用"`"包围]

```
`sudo rm -rf /*`
```

E.G. 

`sudo rm -rf /*` (没事别乱敲这个! )

~~"请输入管理员密码: (闪烁的光标)"~~

### 7. 代码块 [按三个 "`" 并敲回车]

````c
#include <stdio.h>
int mian() {
    print（“Hello, world!\n"）;
    retrun O;
}
 
````


### 8. 引用 [">" + 空格 前置]

```
> 24岁, 是学生.
> > 学生特有的无处不在(恼)
```

引用是可以嵌套的!

E.G. 

> 24岁, 是学生.
>
> > 学生特有的无处不在(恼)

### 9. 无序列表 ["-" 或  "+" + 空格 前置]

```
- 一颗是枣树 (我喜欢用这种)
+ 另一颗还是枣树
* (其实这种也可以, 不过由于在 Typora 中很难单个输入, 故不常用)
```

三种前置符都可以, 敲回车会自动补全, 可在 Typora 设置中调整补全的符号, 敲回车后按下 `Tab` 会缩进一级. 

E.G. 

- 一颗是枣树
- 另一颗还是枣树

### 10. 有序列表 [数字 + "." + 空格 前置]

```
我来这里就为了三件事:
1. 公平
2. 公平
3. 还是tm的公平!
```

敲回车会自动补全, 敲回车后按下 `Tab` 会缩进一级. 

E.G. 

我来这里就为了三件事:

1. 公平
2. 公平
3. 还是tm的公平!

### 11. 注释 ["[^]" 后置]

```
> 今日我们相聚于此, 是为了学习 Markdown 的使用, 它的教程对于全体「观众」而言, 值得足足两个硬币的支持鼓励![^1]

[^1]: 沃兹·基·硕德 改编自「公鸡」普契涅拉.
```

需要在文末写上注释对应的内容

E.G. 

> 今日我们相聚于此, 是为了学习 Markdown 的使用, 它的教程对于全体「观众」而言, 值得足足两个硬币的支持鼓励![^1]

[^1]: 沃兹·基·硕德 改编自「公鸡」普契涅拉.

### 12. 链接 [常用 "[ ]" + "( )" 分别包围文本与链接]

**(注意: 文内跳转为扩展用法)**

```
[来看看github的仓库](https://github.com)
```

支持网页链接与文内跳转, 按住 `Ctrl` 并 `单击鼠标左键` 即可跳转.

E.G. 

[来看看我贫瘠的仓库罢](https://github.com)

### 13. 任务列表 ["- [ ]" + 空格 前置]

```
TodoList:
- [ ] 刷B站
- [ ] 写代码
- [x] 起床
```

用 `x` 代替 `[ ]` 中的空格来勾选任务列表

E.G. TodoList:

- [ ] 刷B站
- [ ] 写代码
- [x] 起床

### 14. 表格 [用 "|" 绘制表格边框]

```
| 学号 | 姓名  | 年龄 |
| :--- | :---: | ---: | (引号的位置代表着 左对齐, 居中, 右对齐)
|114514|田所|24|
|1919810|浩三|25|
```

第一行为表头, 并由第二行分割线决定对齐方式与长度, 第三行及之后即表格数据

E.G. 

| 学号    | 姓名 | 年龄 |
| :------ | :--: | ---: |
| 114514  | 田所 |   24 |
| 1919810 | 浩三 |   25 |

### 15. 图片 [直接拖进来或者复制粘贴]

```
![图片](图片的位置)
```

### 16. 分割线 [按三个 "*" 或 "-" 或 "_" 并敲回车]

```
***
--- (我喜欢用这种)
___
// (其实按三个及以上都可以)
```

由于 `*` 与 `_` 均会自动补全, 所以我觉得 `-` 最为方便.

E.G. 

***

---

___

### 17. Emoji表情 [":" 前置]

**(注意: 英文输入为扩展语法)**

```
:sweat_smile: 
:drooling_face:
:clown_face:
// (敲回车或者鼠标点击, 后置的":"一般不需要手动输)
```

这个功能唯一的要求就是英语水平要高, 或者大概记得各个 Emoji 的英文名. 

E.G. 

:sweat_smile: 
:drooling_face:
:clown_face:

对于其余普通的 Markdown 文本编辑器, 可以直接将 Emoji 表情复制进来, 这是直接**硬编码**的 (~~刻进DNA里~~)

E.G. 

😅🤤🤡🔥


这里分享一个可以复制[全Emoji的网站](https://emojipedia.org/apple/)



##  进阶教程


### 内联 HTML 代码 [用 "<> </>" 包围]

```
<div style="text-align:center">
  <font style="color:red">我不会 HTML 呜呜呜... 浇浇我</font>
</div>

<center>简单的文字居中也可以这样</center>

<u>我差点忘了还有下划线这东西...</u>
```

只要你会写, 你完全可以把 Markdown 当作 **HTML** 来写.

同时, `.md` 文件可以直接导出成一个网页.

下划线可以选中想要下划的文字按下 `Ctrl` + `U`. 

E.G. 

<div style="text-align:center">
  <font style="color:red">我不会 HTML 呜呜呜... 浇浇我</font>
</div>


<center>简单的文字居中也可以这样</center>

<u>我差点忘了还有下划线这东西...</u>

### 3内联 $\LaTeX$ 公式 [用 "$" 包围]

**(注意: 部分编译器会不识别部分符号)**

```
$\LaTeX$ 是最好用的论文排版语言! 不信你看!

$a^n+b^n=c^n$

$$
%\usepackage{unicode-math}
\displaystyle \ointctrclockwise\mathcal{D}[x(t)]
\sqrt{\frac{\displaystyle3\uppi^2-\sum_{q=0}^{\infty}(z+\hat L)^{q}
\exp(\symrm{i}q^2 \hbar x)}{\displaystyle (\symsfup{Tr}\symbfcal{A})
\left(\symbf\Lambda_{j_1j_2}^{i_1i_2}\Gamma_{i_1i_2}^{j_1j_2}
\hookrightarrow\vec D\cdot \symbf P \right)}}
=\underbrace{\widetilde{\left\langle \frac{\notin \emptyset}
{\varpi\alpha_{k\uparrow}}\middle\vert
\frac{\partial_\mu T_{\mu\nu}}{2}\right\rangle}}_{\mathrm{K}_3
\mathrm{Fe}(\mathrm{CN})_6} ,\forall z \in \mathbb{R}
$$
```

用 `$` 包围为单条公式, 按下两个 `$` 并敲回车即生成公式块.

E.G. 

$\LaTeX$ 是最好用的论文排版语言! 不信你看!

$a^n+b^n=c^n$

$$
%\usepackage{unicode-math}
\displaystyle \ointctrclockwise\mathcal{D}[x(t)]
\sqrt{\frac{\displaystyle3\uppi^2-\sum_{q=0}^{\infty}(z+\hat L)^{q}
\exp(\symrm{i}q^2 \hbar x)}{\displaystyle (\symsfup{Tr}\symbfcal{A})
\left(\symbf\Lambda_{j_1j_2}^{i_1i_2}\Gamma_{i_1i_2}^{j_1j_2}
\hookrightarrow\vec D\cdot \symbf P \right)}}
=\underbrace{\widetilde{\left\langle \frac{\notin \emptyset}
{\varpi\alpha_{k\uparrow}}\middle\vert
\frac{\partial_\mu T_{\mu\nu}}{2}\right\rangle}}_{\mathrm{K}_3
\mathrm{Fe}(\mathrm{CN})_6} ,\forall z \in \mathbb{R}
$$











 