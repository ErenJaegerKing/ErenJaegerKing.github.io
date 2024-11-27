---
title: "Linux"
description: ""
icon: ""
date: 2024-09-21
category:
  - 运维
tag:
  - Linux
---

## 磁盘管理

```shell
磁盘管理
	查看磁盘设备
		fdisk -l
		查看分区挂载
			df -hT
	磁盘分区
		fdisk /dev/sdb
		m  获取帮助指令
		p   查看分区列表
		n  创建新分区
		d  删除分区
		t  更改分区类型，通过id号更改
		w   分区保存退出
		q   不保存退出
		创建扩展分区
			命令(输入 m 获取帮助)：nPartition type:p   primary (1 primary, 0 extended, 3 free)e   extendedSelect (default p): e分区号 (2-4，默认 2)：3起始 扇区 (10487808-41943039，默认为 10487808)：将使用默认值 10487808Last 扇区, +扇区 or +size{K,M,G} (10487808-41943039，默认为 41943039)：将使用默认值 41943039分区 3 已设置为 Extended 类型，大小设为 15 GiB
		创建主分区
			命令(输入 m 获取帮助)：nPartition type:p   primary (0 primary, 0 extended, 4 free)e   extendedSelect (default p):Using default response p分区号 (1-4，默认 1)：起始 扇区 (2048-41943039，默认为 2048)：将使用默认值 2048Last 扇区, +扇区 or +size{K,M,G} (2048-41943039，默认为 41943039)：+5G分区 1 已设置为 Linux 类型，大小设为 5 GiB
		创建逻辑分区
			命令(输入 m 获取帮助)：nPartition type:p   primary (1 primary, 1 extended, 2 free)l   logical (numbered from 5)Select (default p): l添加逻辑分区 5起始 扇区 (10489856-41943039，默认为 10489856)：将使用默认值 10489856Last 扇区, +扇区 or +size{K,M,G} (10489856-41943039，默认为 41943039)：+7G分区 5 已设置为 Linux 类型，大小设为 7 GiB
		w 保存退出
	格式化和挂载
		格式化xfs文件系统
			mkfs -t xfs /dev/sdb1
		格式化swap交换分区
			命令(输入 m 获取帮助)：t分区号 (1,3,5,6，默认 6)：5Hex 代码(输入 L 列出所有代码)：82已将分区“Linux”的类型更改为“Linux swap / Solaris”命令(输入 m 获取帮助)：p磁盘 /dev/sdb：21.5 GB, 21474836480 字节，41943040 个扇区Units = 扇区 of 1 * 512 = 512 bytes扇区大小(逻辑/物理)：512 字节 / 512 字节I/O 大小(最小/最佳)：512 字节 / 512 字节磁盘标签类型：dos磁盘标识符：0xadf1b809设备 Boot      Start         End      Blocks   Id  System/dev/sdb1            2048    10487807     5242880   83  Linux/dev/sdb3        10487808    41943039    15727616    5  Extended/dev/sdb5        10489856    25169919     7340032   82  Linux swap / Solaris/dev/sdb6        25171968    41943039     8385536   83  Linux
			格式化
				mkswap /dev/sdb5
			[root@localhost ~]# mkswap /dev/sdb5正在设置交换空间版本 1，大小 = 7340028 KiB无标签，UUID=308423b5-aaba-4b52-bc39-d2bb3417c3f5[root@localhost ~]# cat /proc/meminfo | grep SwapSwapCached:            0 kBSwapTotal:       8388604 kBSwapFree:        8388604 kB[root@localhost ~]# swapon /dev/sdb5[root@localhost ~]# cat /proc/meminfo | grep SwapSwapCached:            0 kBSwapTotal:      15728632 kBSwapFree:       15728632 kB[root@localhost ~]# swapoff /dev/sdb5[root@localhost ~]# cat /proc/meminfo | grep SwapSwapCached:            0 kBSwapTotal:       8388604 kBSwapFree:        8388604 kB
		挂载
			创建挂载点
				mkdir /test
			手动挂载
				mount /dev/sdb1 /test
			查看挂载
				df -hT
			解挂载
				umount  /dev/sdb1
				umount  /test
			自动挂载，开机就自行挂载
				vim /etc/fstab
				设备     挂载点    文件系统类型     权限      检测序列
				/dev/sdb1       /test   xfs     defaults        0 0
				mount -a   挂载fstab中所有设备
			光驱挂载
				mount  /dev/cdrom   /mnt
				自动挂载
					vim /etc/fstab
					/dev/cdrom      /mnt    iso9660 defaults        0 0
```
## LVM逻辑卷
```shell
	创建物理卷PV
		划分分区
			命令(输入 m 获取帮助)：p

磁盘 /dev/sdb：21.5 GB, 21474836480 字节，41943040 个扇区
Units = 扇区 of 1 * 512 = 512 bytes
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节
磁盘标签类型：dos
磁盘标识符：0xfd601e3d

   设备 Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048    41943039    20970496   83  Linux

		转换lvm类型
			命令(输入 m 获取帮助)：t
已选择分区 1
Hex 代码(输入 L 列出所有代码)：8e
已将分区“Linux”的类型更改为“Linux LVM”

命令(输入 m 获取帮助)：p

磁盘 /dev/sdb：21.5 GB, 21474836480 字节，41943040 个扇区
Units = 扇区 of 1 * 512 = 512 bytes
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节
磁盘标签类型：dos
磁盘标识符：0xfd601e3d

   设备 Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048    41943039    20970496   8e  Linux LVM

		保存退出  w
		其他磁盘操作同上
		创建物理卷
			 pvcreate /dev/sdb1 /dev/sdc1
		检查物理卷
			pvscan
	创建卷组VG
		vgcreate xykj_web /dev/sdb1 /dev/sdc1
		查看卷组信息
			vgdisplay xykj_web
	创建逻辑卷LV
		lvcreate -L  容量 -n  逻辑卷名称   卷组
		lvcreate -L 30G -n xykjtest01 xykj_web 
	格式化
		mkfs -t xfs /dev/xykj_web/xykjtest01
	挂载
		vim /etc/fstab
		/dev/xykj_web/xykjtest01        /xykjtest       xfs     defaults        0 0
		mount -a
	扩容管理
		扩容卷组
			vgextend xykj_web /dev/sdd1
		扩容逻辑卷
			lvextend -L +25G /dev/xykj_web/xykjtest01
		刷新格式化
			xfs_growfs /dev/xykj_web/xykjtest01
	磁盘配额
		修改添加用户配额和组配额功能
			vim /etc/fstab
			/dev/xykj_web/xykjtest01        /xykjtest       xfs     defaults,usrquota,grpquota      0 0
		创建测试用户jerry
			useradd jerry
			passwd jerry
		对于jerry设置配额
			xfs_quota -x -c 'limit -u bsoft=5M bhard=10M isoft=4 ihard=6 jerry' /xykjtest
			容量：软限制5M  硬限制10M；数量软限制4  数量硬限制6
		查看容量限制
			xfs_quota -c 'quota -uv jerry' /xykjtest
		查看数量限制
			xfs_quota -c 'quota -i -uv jerry' /xykjtest
		验证
			容量
				dd if=/dev/zero of=/xykjtest/data.txt bs=1M count=7
			数量
				touch test{1..5}.txt
```