---
title: "Shell命令"
description: ""
icon: ""
date: 2024-09-21
category:
  - 运维
tag:
  - Shell
---

## 一个脚本
```shell
练习：写一个脚本，为指定的磁盘创建分区并格式化
    要求
    1. 列出当前系统上的所有磁盘，让用户选择，并且支持q退出脚本，如果用户选择错误，则让用户重新选择；
    2. 用户选择后，自动创建挂载目录，进行自动挂载

#! /bin/bash
echo "the disks exist list:"
fdisk -l |grep '磁盘 /dev/sd[a-z]'
echo "=================================================="
PS3="chose which disk you want to create:"
select VAR in `ls /dev/sd*|grep -o 'sd[b-z]'|uniq` quit
do
    case $VAR in
    sda)
        fdisk -l /dev/sda
        break ;;
    sd[b-z])
        #create partitions
        echo "n
              p
              w"  | fdisk /dev/$VAR
        #make filesystem
        mkfs.xfs -i size=512 /dev/${VAR}"1" &> /dev/null
	    #mount the system
        mkdir -p /data/${VAR}"1" &> /dev/null
        echo -e "/dev/${VAR}"1" /data/${VAR}"1" xfs defaults 0 0\n" >> /etc/fstab
        mount -a &> /dev/null
        break ;;
    quit)
        break;;
    *)
        echo "wrong disk,please check again";;
    esac
done
```

