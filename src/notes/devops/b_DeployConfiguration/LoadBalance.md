---
title: "负载均衡架构"
description: ""
icon: ""
date: 2024-09-21
category:
  - 运维
tag:
  - 负载均衡架构
---

### LVS负载均衡
```shell
LVS负载均衡
	拓扑图
	lvs软件安装
		yum install ipvsadm -y
	Apache软件安装
		yum install httpd -y
	lvs配置双网卡
		systemctl status NetworkManager
网络管理服务：关闭状态不做任何网络修正，开启后自行添加网卡，自行修改地址
		cp -p ifcfg-ens33 ifcfg-ens35
		ens33外网卡  12.0.0.1/24
		ens35内网卡 192.168.200.1/24
		编辑修改ens35
			BOOTPROTO="static"
			IPADDR="192.168.200.1"
NETMASK="255.255.255.0"

			NAME="ens35"
DEVICE="ens35"
			删除UUID行
		编辑修改ens33
			BOOTPROTO="static"
			IPADDR="12.0.0.1"
NETMASK="255.255.255.0"
		重启网络配置
			systemctl restart network
		结果
	web网卡配置
		web1
			IPADDR="192.168.200.110"
NETMASK="255.255.255.0"
GATEWAY="192.168.200.1"
		web2
			IPADDR="192.168.200.120"
NETMASK="255.255.255.0"
GATEWAY="192.168.200.1"
		清空防火墙规则
			iptables -F
			setenforce 0
		启动Apache网站服务
			systemctl start httpd
	配置网站页面
		进入站点
			cd /var/www/html/
			vim index.html
			<h1>this is xykj web1</h1>
			web2服务器配置同上
	lvs服务器启动路由转发
		vim /etc/sysctl.conf
		开启路由转发功能添加    net.ipv4.ip_forward=1
		生效   sysctl -p
		清空防火墙规则
			iptables -F
			清空nat表  iptables -t nat -F
		制定nat转发规则
			iptables -t nat -A POSTROUTING -o ens33 -s 192.168.200.0/24 -j SNAT --to-source 12.0.0.1
	加载lvs内核模块
		modprobe ip_vs
		cat /proc/net/ip_vs
		报错处理：
			ipvsadm --save > /etc/sysconfig/ipvsadm
		制定负载均衡规则
			cd /opt
			vim nat.sh
			#!/bin/bash
ipvsadm -C
ipvsadm -A -t 12.0.0.1:80 -s rr
ipvsadm -a -t 12.0.0.1:80 -r 192.168.200.110:80 -m
ipvsadm -a -t 12.0.0.1:80 -r 192.168.200.120:80 -m
ipvsadm

		启动脚本
			source nat.sh
	客户端配置
		子主题
```

### LVS + keepalived双机热备负载均衡高可用
```shell
LVS+keepalived双机热备负载均衡高可用
	拓扑图
	调度器软件部署
		yum install ipvsadm keepalived -y
	web软件安装
		yum install httpd -y
	网络配置
		所有主机网卡选择仅主机模式
		master：192.168.200.201/24
		backup：192.168.200.202/24
		web1:192.168.200.110/24
		web2:192.168.200.120/24
		防火墙规则清空
			iptables -F
			setenforce 0
	调度器开启路由转发功能
		vim /etc/sysctl.conf
		net.ipv4.ip_forward=1
net.ipv4.conf.all.send_redirects=0
net.ipv4.conf.default.send_redirects=0
net.ipv4.conf.ens33.send_redirects=0

		生效 sysctl -p
	调度器生成虚拟网卡ens33:0
		cd /etc/sysconfig/network-scripts/
		cp -p ifcfg-ens33 ifcfg-ens33:0
		DEVICE=ens33:0
ONBOOT=yes
IPADDR=192.168.200.10
NETMASK=255.255.255.0
		启动虚拟网卡 ifup ens33:0
	master上启动LVS
		cd /etc/init.d/
		vim dr.sh
		#!/bin/bash
GW=192.168.200.1
VIP=192.168.200.10
RIP1=192.168.200.110
RIP2=192.168.200.120
case "$1" in
start)
        /sbin/ipvsadm --save > /etc/sysconfig/ipvsadm
        systemctl start ipvsadm
        /sbin/ifconfig ens33:0 $VIP broadcast $VIP netmask 255.255.255.255 broadcast $VIP up
        /sbin/route add -host $VIP dev ens33:0
        /sbin/ipvsadm -A -t $VIP:80 -s rr
        /sbin/ipvsadm -a -t $VIP:80 -r $RIP1:80 -g
        /sbin/ipvsadm -a -t $VIP:80 -r $RIP2:80 -g
        echo "ipvsadm starting --------------------[ok]"
        ;;
        stop)
        /sbin/ipvsadm -C
        systemctl stop ipvsadm
        ifconfig ens33:0 down
        route del $VIP
        echo "ipvsamd stoped----------------------[ok]"
         ;;
        status)
        if [ ! -e /var/lock/subsys/ipvsadm ];then
        echo "ipvsadm stoped---------------"
        exit 1
                else
                echo "ipvsamd Runing ---------[ok]"
        fi
        ;;
        *)
        echo "Usage: $0 {start|stop|status}"
        exit 1
        esac
        exit 0
		chmod +x dr.sh
service dr.sh start
	网站节点配置
		创建页面
			vim /var/www/html/index.html
			<h1>this is xykj web1</h1>
		配置虚拟网卡
			cd /etc/sysconfig/network-scripts/
			cp -p ifcfg-lo ifcfg-lo:0
			DEVICE=lo:0
IPADDR=192.168.200.10
NETMASK=255.255.255.0
ONBOOT=yes

		配置响应重定向脚本
			cd /etc/init.d/
			vim web.sh
			#!/bin/bash
VIP=192.168.200.10
        case "$1" in
        start)
                ifconfig lo:0 $VIP netmask 255.255.255.255 broadcast $VIP
                /sbin/route add -host $VIP dev lo:0
                echo "1" >/proc/sys/net/ipv4/conf/lo/arp_ignore
                echo "2" >/proc/sys/net/ipv4/conf/lo/arp_announce
                echo "1" >/proc/sys/net/ipv4/conf/all/arp_ignore
                echo "2" >/proc/sys/net/ipv4/conf/all/arp_announce
                sysctl -p >/dev/null 2>&1
                echo "RealServer Start OK "
                ;;
        stop)
                ifconfig lo:0 down
                route del $VIP /dev/null 2>&1
                echo "0" >/proc/sys/net/ipv4/conf/lo/arp_ignore
                echo "0" >/proc/sys/net/ipv4/conf/lo/arp_announce
                echo "0" >/proc/sys/net/ipv4/conf/all/arp_ignore
                echo "0" >/proc/sys/net/ipv4/conf/all/arp_announce
                echo "RealServer Stopd"
                ;;
        *)
                echo "Usage: $0 {start|stop}"
                exit 1
        esac
        exit 0
			chmod +x web.sh
			service web.sh start
			ifup lo:0
	keepalived配置
		cd /etc/keepalived/
		vim keepalived.conf
		主服务器修改内容
			smtp_server 127.0.0.1
			router_id LVS_01
			state MASTER
			interface ens33
			virtual_router_id 51
			priority 100
			 virtual_ipaddress {
        192.168.200.10
    }

			virtual_server 192.168.200.10 80 {
			lb_kind DR
			real_server 192.168.200.110 80 {
        weight 1
        TCP_CHECK {
            connect_port 80
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
        }   
    }   
    real_server 192.168.200.120 80 {
        weight 1
        TCP_CHECK {
            connect_port 80
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
        }
    }   

		从服务器修改内容
			smtp_server 127.0.0.1
			router_id LVS_02
			state BACKUP
			interface ens33
			virtual_router_id 51
			priority 90
			 virtual_ipaddress {
        192.168.200.10
    }

			virtual_server 192.168.200.10 80 {
			lb_kind DR
			real_server 192.168.200.110 80 {
        weight 1
        TCP_CHECK {
            connect_port 80
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
        }
    }
   real_server 192.168.200.120 80 {
        weight 1
        TCP_CHECK {
            connect_port 80
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
        }
    }
```