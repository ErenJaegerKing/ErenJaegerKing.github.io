---
title: "Nginx"
description: ""
icon: ""
date: 2024-09-21
category:
  - 运维
tag:
  - Nginx
---
## 1.Nginx部署
### Nginx部署
```shell
	1：环境准备
		pcre-devel，C语言库
		zlib-devel，支持图文压缩，便于传输
		gcc，gcc-c++，c和c++编译器
		nginx二进制源码包
	2：安装前检查
		yum list      检查软件包仓库是否能用
		yum install pcre-devel zlib-devel -y 安装pcre，zlib软件
		yum install gcc gcc-c++ -y
	3：安装nginx
		解压到指定目录位置/opt
		tar zxvf nginx-1.12.2.tar.gz  解压到当前目录（在/opt下面直接使用）
		创建管理nginx用户   useradd -M -s /sbin/nologin nginx
		cd进入到nginx目录中进行编译安装
			配置
				./configure \--prefix=/usr/local/nginx \--user=nginx \--group=nginx \--with-http_stub_status_module
			编译
				make
			安装
				make install
		命令优化，便于系统识别直接使用
			ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/
		启动服务
			nginx
		检查服务开启
			netstat -ntap | grep nginx
				看到80端口开启，则nginx服务处于运行状态
		清空防火墙规则，让网站可以被外界访问
			systemctl stop firewalld.service
			setenforce 0
		使用URL访问网站服务
			http://服务器IP/
	管理
		开启服务
			nginx
		关闭服务
			killall -3 nginx
		重启服务
			killall -1 nginx
		检查配置文件语法
			nginx -t
		创建管理文件到指定为止
			vim /etc/init.d/nginx
		使用系统服务管理工具service管理nginx
			管理脚本
				#!/bin/bash# chkconfig: - 99 20# description: Nginx Service Control ScriptPROG="/usr/local/nginx/sbin/nginx"PIDF="/usr/local/nginx/logs/nginx.pid"case "$1" instart)$PROG;;stop)kill -s QUIT $(cat $PIDF);;restart)$0 stop$0 start;;reload)kill -s HUP $(cat $PIDF);;*)echo "Usage: $0 {start|stop|restart|reload}"exit 1esacexit 0
			赋予脚本执行权限
				chmod +x /etc/init.d/nginx
			把nginx服务添加到管理工具中
				chkconfig --add nginx
				chkconfig --list  查看是否添加成功
				chkconfig --level 35 nginx on  在字符和图形化界面模式登录自动开启服务
		日志
			访问日志
				/usr/local/nginx/logs/access.log
			错误日志
				/usr/local/nginx/logs/error.log
		配置文件备份
			mv nginx.conf nginx.conf.bk
			grep -v "#" nginx.conf.bk > nginx.conf
		统计访问数量
			修改nginx.conf配置文件
				location ~ /status {stub_status   on;access_log off;}
			重启nginx服务 service nginx stop，service nginx start
			访问路径http://服务ip/status
		身份验证访问
			网页身份验证工具   yum install httpd-tools -y
			创建访问用户
				htpasswd -c /usr/local/nginx/passwd.db jerry
			设置用户文件权限
				chown nginx /usr/local/nginx/passwd.db
				chmod 400 passwd.db
			配置文件修改
				location / {auth_basic "secret";auth_basic_user_file /usr/local/nginx/passwd.db;root   html;index  index.html index.htm;}
			重启服务
		访问控制
			配置文件中加入
				deny 192.168.100.132;allow all;
```
### DNS服务
```shell
	安装软件包bind
		yum install bind -y
	配置
		主配置文件
			vim /etc/named.conf
			listen-on port 53 { any; };  允许所有地址访问
		区域配置文件
			vim /etc/named.rfc1912.zones
			zone "jky.com" IN {type master;file "jky.com.zone";};
			cp -p named.localhost jky.com.zone
		区域数据配置文件
			vim jky.com.zone
			$TTL 1D@       IN SOA  @ admin.jky.com. (0       ; serial1D      ; refresh1H      ; retry1W      ; expire3H )    ; minimumNS      @A       127.0.0.1www IN  A       192.168.100.128
	启动服务
		systemctl start named
	使用客户端解析
		nslookup www.jky.com
```

### nginx虚拟主机
```shell
	修改配置文件
		server {server_name  www.jky.com;location / {root   /var/www/jky;index  index.html index.php;}}
	创建网站站点
		mkdir -p  /var/www/jky
	创建首页
		vim /var/www/jky/index.html
	重启nginx服务
	创建第2个网站
		添加域名解析www.xykj.com
		配置区域文件
			vim /etc/named.rfc1912.zones
			zone "xykj.com" IN {type master;file "xykj.com.zone";};
		生成对应区域数据文件
			cp -p jky.com.zone xykj.com.zone
			$TTL 1D@       IN SOA  @ admin.xykj.com. (0       ; serial1D      ; refresh1H      ; retry1W      ; expire3H )    ; minimumNS      @A       127.0.0.1www IN  A       192.168.100.128
		重启域名服务器
			systemctl restart named
		修改nginx配置文件
			server {server_name  www.xykj.com;location / {root   /var/www/xykj;index  index.html index.php;}}
		创建站点
			mkdir /var/www/xykj
			vim index.html
		重启nginx服务
```
## 2.Nginx+Tomcat动静分离
```shell
	nginx部署
		nginx安装部署
			环境部署需要安装pcre，zlib，gcc，gcc-c++
			创建用户 useradd -M -s /sbin/nologin nginx
			解压软件包 tar zxvf nginx1.12 -C /user/local
			配置
				./configure \--prefix=/usr/local/nginx \--user=nginx \--group=nginx \--with-http_stub_status_module
			编译和安装
				make && make install
			创建快捷方式
				ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/
			便于service管理
				vim /etc/init.d/nginx
				#!/bin/bash# chkconfig: - 99 20# description: Nginx Service Control ScriptPROG="/usr/local/nginx/sbin/nginx"PIDF="/usr/local/nginx/logs/nginx.pid"case "$1" instart)$PROG;;stop)kill -s QUIT $(cat $PIDF);;restart)$0 stop$0 start;;reload)kill -s HUP $(cat $PIDF);;*)echo "Usage: $0 {start|stop|restart|reload}"exit 1esacexit 0
				赋予权限
					chmod +x /etc/init.d/nginxchkconfig --add nginx
			启动nginx
				service nginx start
		清空防火墙规则
			iptables -F
			setenforce 0
	Tomcat部署
		安装jdk环境
			tar zxvf jdk-8u91-linux-x64.tar.gz -C /usr/local/
			配置环境变量  vim /etc/profile
			export JAVA_HOME=/usr/local/jdk1.8.0_91export JRE_HOME=${JAVA_HOME}/jreexport CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/libexport PATH=${JAVA_HOME}/bin:$PATH
			配置生效 source /etc/profile
			检查Java版本 java -version
		安装Tomcat
			解压软件包 tar zxvf apache-tomcat-8.5.16.tar.gz -C /usr/local/
			重命名目录便于操作 mv apache-tomcat-8.5.16/ tomcat
			建立快捷方式便于Tomcat启动和关闭
				ln -s /usr/local/tomcat/bin/startup.sh /usr/local/bin/
				ln -s /usr/local/tomcat/bin/shutdown.sh /usr/local/bin/
			启动Tomcat
				startup.sh
			检查是否开启
				netstat -ntap | grep 8080
	动静分离配置
		nginx地址：192.168.100.129/24
		Tomcat地址：192.168.100.128/24
		对于Java文件动态请求转发到Tomcat服务中处理
			nginx服务器中配置nginx.conf
			location ~.*.jsp$ {proxy_pass http://192.168.100.128:8080;proxy_set_header Host $host;}
		创建静态页面
			vim /usr/local/nginx/html/index.html
			<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=utf-8"><title>静态页面</title></head><body><h1>静态页面</h1><p>这是个静态页面</p></body></html>
		重启nginx服务
			service nginx stop
			service nginx start
		静态页面呈现
			子主题
		动态请求配置
			在Tomcat服务器中操作
			创建动态页面站点
				mkdir /usr/local/tomcat/webapps/test
				动态页面 vim index.jsp
				<!DOCTYPE html><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.Date" %><%@ page import="java.text.SimpleDateFormat" %><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/ html4/loose.dtd"><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>动态页面</title></head><body><div>动态页面</div></body></html>
			清空Tomcat服务器中防火墙规则
				iptables -F
				setenforce 0
		原理图
			子主题
		图片动静分离处理
			Tomcat服务器中操作，添加页面路径
				vim index.jsp
				<title>动态页面</title><br><img src="fish.jpg">
			nginx服务器中操作
				自动识别处理图片配置nginx.conf
				location ~.*\.(gif|jpg|jpeg|png|bmp|swf|css)$ {root html;expires 30d;}
			tomcat和nginx站点路径保持一致
				mkdir /usr/local/nginx/html/test
			图片放置到nginx服务器的test目录中
			重启Tomcat服务器
```
## 3.Nginx负载均衡
```shell
nginx负载均衡
	部署Tomcat01
		防火墙规则清空
			iptables -F
			setenforce 0
		部署Java环境
			安装jdk
				tar zxvf jdk-8u91-linux-x64.tar.gz -C /usr/local/
			添加Java环境变量
				vim /etc/profile
				export JAVA_HOME=/usr/local/jdk1.8.0_91export JRE_HOME=${JAVA_HOME}/jreexport CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/libexport PATH=${JAVA_HOME}/bin:$PATH
				source /etc/profile
		安装Tomcat
			解压软件包
				tar zxvf apache-tomcat-8.5.16.tar.gz -C /usr/local/
			重命名
				mv apache-tomcat-8.5.16/ tomcat
			优化启动命令
				ln -s /usr/local/tomcat/bin/startup.sh /usr/local/bin/
			优化关闭命令
				ln -s /usr/local/tomcat/bin/shutdown.sh /usr/local/bin/
		启动Tomcat
			startup.sh
		检查端口是否正常运行
			netstat -ntap | grep 8080
		配置站点
			创建站点目录
				mkdir -pv /web/webapp1
				创建首页
					vim index.jsp
				内容
					<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%><html><head><title>JSP test1 page</title></head><body><% out.println("Welcome 幸云科技 web01");%></body></html>
			配置Tomcat识别站点目录
				vim /usr/local/tomcat/conf/server.xml
				<Context docBase="/web/webapp1" path="" reloadable="false"></Context>
		重启Tomcat
			shutdown.sh
			startup.sh
	nginx反向代理配置
		环境配置
			yum -y install pcre-devel zlib-devel gcc-c++
		创建程序用户
			useradd -M -s /sbin/nologin nginx
		解压软件包
			tar -zxvf nginx-1.12.0.tar.gz -C /usr/local/
		配置
			./configure \--prefix=/usr/local/nginx \--user=nginx \--group=nginx \--with-http_stub_status_module \--with-http_gzip_static_module \--with-http_flv_module
			make && make install
		vim /usr/local/nginx/conf/nginx.conf
		服务池名为tomcat_server
			upstream tomcat_server {server 192.168.100.136:8080 weight=1;server 192.168.100.138:8080 weight=1;}
		配置站点转发
			location / {root   html;index  index.html index.htm;proxy_pass http://tomcat_server;}
		启动nginx服务
```
## 4.论坛部署
```shell
论坛部署
	数据库
		进入数据库
			mysql -u root -p 密码abc123
		创建论坛数据库bbs
			mysql> create database bbs;
		提权bbsuser用户从外面任意终端访问bbs数据库
			mysql> grant all on bbs.* to 'bbsuser'@'%' identified by 'admin123';
		提权bbsuser用户从本地服务器访问bbs数据库
			mysql> grant all on bbs.* to 'bbsuser'@'localhost' identified by 'admin123';
		权限刷新，及时生效
			mysql> flush privileges;
		测试数据库连接
			vim /usr/local/nginx/html/index.php
			<?php$link=mysqli_connect('192.168.100.129','bbsuser','admin123');if($link) echo "<h1>Success!!</h1>";else echo "Fail!!";?>
	安装论坛
		解压软件包
			unzip Discuz_X3.4_SC_UTF8.zip -d /tmp
		拷贝安装目录到nginx站点
			cp -r upload/ /usr/local/nginx/html/bbs
		赋予制定目录nginx属主和属组权限
			chown -R root:nginx ./config/chown -R root:nginx ./data/chown -R root:nginx ./uc_client/chown -R root:nginx ./uc_server/
		赋予制定目录nginx读写权限
			chmod -R 777 ./config/chmod -R 777 ./data/chmod -R 777 ./uc_client/chmod -R 777 ./uc_server/
		设置网站和数据库管理员账号及密码
			子主题
```