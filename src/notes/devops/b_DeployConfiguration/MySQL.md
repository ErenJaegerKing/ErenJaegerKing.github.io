---
title: "MySQL"
description: ""
icon: ""
date: 2024-09-21
category:
  - 运维
tag:
  - MySQL
---

### MySQL 部署

```shell
MySQL数据库
	结构
		数据->表->数据库
		实体-关系
			E-R
		实体
			属性（字段）
				列
			记录
				行
	关系型与非关系型区别
		关系型有固定表结构存储数据，非关系型无固定结构
		关系型：数据和文本
		非关系型：图片，视频，声音等
		非关系型：键值对
			key-value
			例如：zhangsan：22
			键：对象
				对象中包含很多数据
			方便开发程序提取，不需要做数据格式转化
	版本
		常用版本
			MySQL5.7
		未来
			MySQL8.0
	安装
		环境准备
			yum -y install \
ncurses \
ncurses-devel \
bison \
cmake
			yum install gcc gcc-c++ -y
		创建程序用户
			useradd -s /sbin/nologin mysql
		解压
			tar zxvf mysql-5.7.17.tar.gz -C /opt/
tar zxvf boost_1_59_0.tar.gz -C /usr/local/
cd /usr/local/
mv boost_1_59_0 boost
		配置
			cmake \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \
-DSYSCONFDIR=/etc \
-DSYSTEMD_PID_DIR=/usr/local/mysql \
-DDEFAULT_CHARSET=utf8  \
-DDEFAULT_COLLATION=utf8_general_ci \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_ARCHIVE_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_PERFSCHEMA_STORAGE_ENGINE=1 \
-DMYSQL_DATADIR=/usr/local/mysql/data \
-DWITH_BOOST=/usr/local/boost \
-DWITH_SYSTEMD=1
		编译安装
			make && make install
		chown -R mysql.mysql /usr/local/mysql/
		配置文件
			vim /etc/my.cnf
			[client]
port = 3306
default-character-set=utf8
socket = /usr/local/mysql/mysql.sock

[mysql]
port = 3306
default-character-set=utf8
socket = /usr/local/mysql/mysql.sock

[mysqld]
user = mysql
basedir = /usr/local/mysql
datadir = /usr/local/mysql/data
port = 3306
character_set_server=utf8
pid-file = /usr/local/mysql/mysqld.pid
socket = /usr/local/mysql/mysql.sock
server-id = 1

sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_AUTO_VALUE_ON_ZERO,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,PIPES_AS_CONCAT,ANSI_QUOTES
			chown mysql.mysql /etc/my.cnf
		echo 'PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH' >> /etc/profile
echo 'export PATH' >> /etc/profile
source /etc/profile
		数据库初始化
			cd /usr/local/mysql/
			bin/mysqld \
--initialize-insecure \
--user=mysql \
--basedir=/usr/local/mysql \
--datadir=/usr/local/mysql/data
		便于systemctl管理
			cp /usr/local/mysql/usr/lib/systemd/system/mysqld.service /usr/lib/systemd/system
		重载systemctl
			systemctl daemon-reload
		启动服务
			systemctl start mysqld
		开机自启动
			systemctl enable mysqld
		设置MySQL登录密码
			mysqladmin -u root -p password "abc123"
```

### MySQL 主从复制+读写分离

```shell
	主从复制
		环境准备
			关闭防火墙和增强性安全功能
			systemctl stop firewalld.service
			setenforce 0
			时间同步阿里云
			ntpdate ntp1.aliyun.com
		修改配置
			/etc/my.cnf
			log-bin = master-binlog-slave-updates = true
		重启服务
			systemctl restart mysqld
		赋予从服务器同步权限
			子主题
				grant replication slave on *.* to 'myslave'@'192.168.100.%' identified by '123456';
		权限刷新
			flush privileges;
		查看同步位置
			show master status;
			+-------------------+----------+--------------+------------------+-------------------+| File              | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |+-------------------+----------+--------------+------------------+-------------------++-------------------+----------+--------------+------------------+-------------------+
		从服务器配置
			/etc/my.cnf
			server-id = 2relay-log = relay-log-binrelay-log-index = slave-relay-bin.index
		重启从服务
			systemctl restart mysqld
		进从服务MySQL模式下，同步主MySQL
			change master to master_host='192.168.100.128',master_user='myslave',master_password='123456',master_log_file='master-bin.000001',master_log_pos=604;
		启动从mysql同步
			start slave;
		查看同步状态
			show slave status\G;
	读写分离
		环境部署
			jdk环境
				./jdk-6u14-linux-x64.bin
				mv jdk1.6.0_14/ /usr/local/jdk1.6
				vim /etc/profile
				export JAVA_HOME=/usr/local/jdk1.6export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/libexport PATH=$JAVA_HOME/lib:$JAVA_HOME/jre/bin/:$PATH:$HOME/binexport AMOEBA_HOME=/usr/local/amoebaexport PATH=$PATH:$AMOEBA_HOME/bin
				source /etc/profile
		amoeba部署
			mkdir  /usr/local/amoeba
			tar zxvf amoeba-mysql-binary-2.2.0.tar.gz -C /usr/local/amoeba/
			chmod -R 755 /usr/local/amoeba/
			安装
				/usr/local/amoeba/bin/amoeba
		mysql放权给amoeba访问
			grant all on *.* to test@'192.168.100.%' identified by '123.com';
		修改amoeba配置
			vim amoeba.xml
			<property name="user">amoeba</property>
			<property name="password">123456</property>
			<property name="defaultPool">master</property><property name="writePool">master</property><property name="readPool">slaves</property>
			vim dbServers.xml
			<property name="schema">mysql</property>
			<property name="user">test</property>
			<property name="password">123.com</property>
			<dbServer name="master"  parent="abstractServer"><property name="ipAddress">192.168.100.128</property>
			<dbServer name="slave1"  parent="abstractServer">
			<property name="ipAddress">192.168.195.129</property>
			<dbServer name="slaves" virtual="true"><poolConfig class="com.meidusa.amoeba.server.MultipleServerPool">
			<property name="poolNames">slave1,slave2</property></poolConfig>
		启动amoeba服务器
			/usr/local/amoeba/bin/amoeba start &
	验证
		在两台slave中断开主从复制
			stop slave;
		在客户端写入数据验证是否在master上插入
		在slave1和slave2节点上添加在数据，并在客户端上读取到
```

### LNMP 架构

```shell
LNMP架构
	yum仓库检查
		yum clean all 清空yum缓存
		yum list 查看yum仓库软件列表
	nginx
		环境准备
			yum install pcre-devel zlib-devel gcc gcc-c++ -y
		解压软件包
			tar zxvf nginx-1.12.2.tar.gz
		创建程序用户
			useradd -M -s /sbin/nologin nginx
		配置
			./configure \
--prefix=/usr/local/nginx \
--user=nginx \
--group=nginx \
--with-http_stub_status_module
			make && make install
		优化指令
			ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/
		服务管理配置
			systemctl
			vim /lib/systemd/system/nginx.service
			[Unit]
Description=nginx
After=network.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/bin/kill -s HUP $MAINPID
ExecStop=/usr/bin/kill -s QUIT $MAINPID
PrivateTmp=true
[Install]
WantedBy=multi-user.target
			赋予启动脚本执行权限
				chmod 754 nginx.service
		启动服务
			systemctl start nginx
		停止服务
			systemctl stop nginx
		清空防火墙规则
			iptables -F
			setenforce 0
	mysql
		环境准备
			yum install ncurses ncurses-devel -y
			yum install bison cmake -y
			创建mysql程序用户
				useradd -s /sbin/nologin mysql
		解压包
			tar zxvf mysql-boost-5.7.20.tar.gz
		配置
			cmake \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \
-DSYSCONFDIR=/etc \
-DSYSTEMD_PID_DIR=/usr/local/mysql \
-DDEFAULT_CHARSET=utf8  \
-DDEFAULT_COLLATION=utf8_general_ci \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_ARCHIVE_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_PERFSCHEMA_STORAGE_ENGINE=1 \
-DMYSQL_DATADIR=/usr/local/mysql/data \
-DWITH_BOOST=boost \
-DWITH_SYSTEMD=1
		编译
			make && make install
			注意：加快编译过程  make -j6
		变更目录权限给程序用户mysql
			chown -R mysql.mysql /usr/local/mysql/
		修改配置文件
			vim /etc/my.cnf
			[client]
port = 3306
default-character-set=utf8
socket = /usr/local/mysql/mysql.sock

[mysql]
port = 3306
default-character-set=utf8
socket = /usr/local/mysql/mysql.sock

[mysqld]
user = mysql
basedir = /usr/local/mysql
datadir = /usr/local/mysql/data
port = 3306
character_set_server=utf8
pid-file = /usr/local/mysql/mysqld.pid
socket = /usr/local/mysql/mysql.sock
server-id = 1

sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_AUTO_VALUE_ON_ZERO,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,PIPES_AS_CONCAT,ANSI_QUOTES
			更改配置文件属主和属组
				chown mysql.mysql /etc/my.cnf
			环境变量配置
				echo 'PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH' >> /etc/profile
				echo 'export PATH' >> /etc/profile
				生效profile文件
					source /etc/profile
		初始化数据库
			cd /usr/local/mysql
			bin/mysqld \
--initialize-insecure \
--user=mysql \
--basedir=/usr/local/mysql \
--datadir=/usr/local/mysql/data
		启动服务
			cp usr/lib/systemd/system/mysqld.service /usr/lib/systemd/system/
			systemctl start mysqld
			netstat -ntap | grep 3306
		设置数据库管理员登录
			mysqladmin -u root -p password   注意：第一次输入密码直接回车
			mysql -u root -p  登录
	PHP
		环境准备
			yum -y install \
libxml2 \
libxml2-devel \
openssl \
openssl-devel \
bzip2 \
bzip2-devel \
libcurl \
libcurl-devel \
libjpeg \
libjpeg-devel \
libpng \
libpng-devel \
freetype \
freetype-devel \
gmp \
gmp-devel \
libmcrypt \
libmcrypt-devel \
readline \
readline-devel \
libxslt \
libxslt-devel \
zlib \
zlib-devel \
glibc \
glibc-devel \
glib2 \
glib2-devel \
ncurses \
curl \
gdbm-devel \
db4-devel \
libXpm-devel \
libX11-devel \
gd-devel \
gmp-devel \
expat-devel \
xmlrpc-c \
xmlrpc-c-devel \
libicu-devel \
libmcrypt-devel \
libmemcached-devel
			扩展yum源
				yum install epel-release -y
			yum install libmcrypt libmcrypt-devel -y
		解压软件包
			tar jxvf php-7.1.10.tar.bz2
		配置
			./configure \
--prefix=/usr/local/php \
--with-mysql-sock=/usr/local/mysql/mysql.sock \
--with-config-file-path=/etc \
--enable-fpm \
--enable-inline-optimization \
--disable-debug \
--disable-rpath \
--enable-shared \
--enable-soap \
--with-libxml-dir \
--with-xmlrpc \
--with-openssl \
--with-mcrypt \
--with-mhash \
--with-pcre-regex \
--with-sqlite3 \
--with-zlib \
--enable-bcmath \
--with-iconv \
--with-bz2 \
--enable-calendar \
--with-curl \
--with-cdb \
--enable-dom \
--enable-exif \
--enable-fileinfo \
--enable-filter \
--with-pcre-dir \
--enable-ftp \
--with-gd \
--with-openssl-dir \
--with-jpeg-dir \
--with-png-dir \
--with-zlib-dir \
--with-freetype-dir \
--enable-gd-native-ttf \
--enable-gd-jis-conv \
--with-gettext \
--with-gmp \
--with-mhash \
--enable-json \
--enable-mbstring \
--enable-mbregex \
--enable-mbregex-backtrack \
--with-libmbfl \
--with-onig \
--enable-pdo \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-zlib-dir \
--with-pdo-sqlite \
--with-readline \
--enable-session \
--enable-shmop \
--enable-simplexml \
--enable-sockets \
--enable-sysvmsg \
--enable-sysvsem \
--enable-sysvshm \
--enable-wddx \
--with-libxml-dir \
--with-xsl \
--enable-zip \
--enable-mysqlnd-compression-support \
--with-pear \
--enable-opcache
		编译
			make && make install
		核心配置文件
			cp php.ini-development /usr/local/php/lib/php.ini
			vim /usr/local/php/lib/php.ini
			1170 mysqli.default_socket = /usr/local/mysql/mysql.sock
				连接数据库
			939 date.timezone = Asia/Shanghai
				设置时区
			检查php模块
				/usr/local/php/bin/php -m
		php-fpm模块
			cd /usr/local/php/etc/
			cp php-fpm.conf.default php-fpm.conf
			cd /usr/local/php/etc/php-fpm.d/
			cp www.conf.default www.conf
			vim php-fpm.conf
			pid = run/php-fpm.pid
			启动fpm
				/usr/local/php/sbin/php-fpm -c /usr/local/php/lib/php.ini
			php命令优化
				ln -s /usr/local/php/bin/* /usr/local/bin/
		nginx支持php-fpm
			vim /usr/local/nginx/conf/nginx.conf
			location ~ \.php$ {
            root           html;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  /usr/local/nginx/html$fastcgi_script_name;
            include        fastcgi_params;
        }

			网站站点创建php首页
				/usr/local/nginx/html
				vim index.php
				<?php
phpinfo();
?>
```
