---
title: "兴趣爱好"
description: ""
icon: ""
date: 2024-12-31
category:
  - 兴趣爱好
tag:
  - 兴趣爱好

---
:::info
学习是一种能力，不要自我感动，要动脑子
:::

## Godot

### 跟着Brackeys来学Godot引擎！

1. 创建文件结构和导入素材
2. 玩家1.0/2.0
 - Node2D 建立主场景
   - CharacterBody2D 建立玩家场景
     - AnimatedSprite2D 创建玩家动画
     - CollisionShape2D 添加碰撞
     - player.gd 添加移动脚本
   - Camera2D 添加2D相机节点
   - StaticBody2D 添加站立碰撞箱
     - CollisionShape2D 添加碰撞 
3. 场景搭建1.0/2.0
 - TileMap 添加2D图块的地图节点
4. 移动平台
 - AnimatableBody2D 
   - Sprite2D
   - CollisionShape2D
   - AnimationPlayer 用于播放动画的节点
5. 可拾取道具
  - Area2D 检测碰撞体的进入或退出
   - AnimatedSprite2D
   - CollisionShape2D
   - coin.gd 添加硬币脚本
     - body_entered(body:Node2D)信号
6. 死亡1.0/2.0
  - Area2D 死亡检测区
    - killzone.gd 创建死亡区域检测脚本
    - Timer 添加延迟来判断重启游戏 
    - CollisionShape2D 
7. 敌人
  - Node2D
    - AnimatedSprite2D
    - killzone 添加死亡检测区域
      - CollisionShape2D
    - slime.gd
    - RayCast2D 2D空间中的射线来判断是否撞墙
8. 说明文字和计分文字
  - Label 纯文字说明文字
  - Node 计分文字
    - game_manager.gd 
    - Label
9. 音效系统
  - AudioStreamPlayer2D
10. 导出

### 那些年看过的资料

[Godot 自学指南](https://dasasdhba.github.io/tutorial-Godot/#%E5%89%8D%E8%A8%80)


## Blender

目标：建造一个属于自己的世外桃源

[Blender自学路线推荐](https://www.bilibili.com/video/BV1ys421T73p/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

- 精简任务: 建议在时间有限的情况下，只学习硬表面建模、雕刻和简单渲染，避免不必要的学习压力。
- 构建框架: 理解Blender的三种建模模式（物体模式、编辑模式、雕刻模式），认识到它们之间的相互配合和切换。
- 专项学习: 根据个人学习习惯和空闲时间，选择适合的教程。推荐tips老师的新手必刷教程、浩克肥虫老师的雕刻入门教程等。
- 案例巩固: 通过观看和实践案例，巩固快捷键、建模思路和工作流程。特别推荐夏明游艺老师的手搓高达教程和辣椒酱的3分钟上手布兰德雕刻教程。
- 公开课资源: 感谢提供公开课的教师，鼓励大家根据自己的学习习惯选择适合的资源。

1. 建模 - [【Kurt】Blender零基础入门教程 | Blender中文区新手必刷教程(已完结)](https://www.bilibili.com/video/BV14u41147YH?spm_id_from=333.788.videopod.episodes&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2&p=3)

**建模全流程工具与操作**

![建模全流程工具与操作](https://drawingbed-686.pages.dev/myblog/202501042142731.png)

**让手听话**

![让手听话](https://drawingbed-686.pages.dev/myblog/202501010024999.png)

**认识界面**

![认识界面](https://drawingbed-686.pages.dev/myblog/202501010106645.png)

**点线面的选择与控制**

![点线面的选择与控制](https://drawingbed-686.pages.dev/myblog/202501041138619.png)

**十大建模操作**

![十大建模操作](https://drawingbed-686.pages.dev/myblog/202501041210243.png)

**使用修改器建模的优势**
- 建模快，效率高，能快速直观地实现一个效果
- 非破坏性，在不改变原来模型的基础上，可以很精确地控制参数
- 灵活，可重复使用，可叠加多个效果

2. 雕刻 - [【第七季】Blender雕刻功能闪耀万古（字幕重制版）](https://www.bilibili.com/video/BV1dc411f79E?spm_id_from=333.788.recommend_more_video.0&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

3. 雕刻工作流意识 - [上手Blender雕刻只需要3分钟](https://www.bilibili.com/video/BV1JL4y1A75k/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

4. 硬表面建模 - [◈原创◈Blender硬核入门教程：详细到即使初学者也能跟着完成的高达头部建模](https://www.bilibili.com/video/BV1uD4y1F7YV/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

## 爱好

学习流：达芬奇、OBS Studio

正在学：Aseprite、Godot、Blender

- 建模：Blender
- 录制：OBS Studio
- 剪辑：达芬奇
- 绘图：Aseprite、PS
- 引擎：Godot、Unity、UE
- 音乐：FL Studio
