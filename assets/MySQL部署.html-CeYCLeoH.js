import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as l,o as i}from"./app-B6i9vcjg.js";const p={};function e(c,s){return i(),a("div",null,s[0]||(s[0]=[l(`<h3 id="mysql部署" tabindex="-1"><a class="header-anchor" href="#mysql部署"><span>MySQL部署</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>MySQL数据库</span></span>
<span class="line"><span>	结构</span></span>
<span class="line"><span>		数据-&gt;表-&gt;数据库</span></span>
<span class="line"><span>		实体-关系</span></span>
<span class="line"><span>			E-R</span></span>
<span class="line"><span>		实体</span></span>
<span class="line"><span>			属性（字段）</span></span>
<span class="line"><span>				列</span></span>
<span class="line"><span>			记录</span></span>
<span class="line"><span>				行</span></span>
<span class="line"><span>	关系型与非关系型区别</span></span>
<span class="line"><span>		关系型有固定表结构存储数据，非关系型无固定结构</span></span>
<span class="line"><span>		关系型：数据和文本</span></span>
<span class="line"><span>		非关系型：图片，视频，声音等</span></span>
<span class="line"><span>		非关系型：键值对</span></span>
<span class="line"><span>			key-value</span></span>
<span class="line"><span>			例如：zhangsan：22</span></span>
<span class="line"><span>			键：对象</span></span>
<span class="line"><span>				对象中包含很多数据</span></span>
<span class="line"><span>			方便开发程序提取，不需要做数据格式转化</span></span>
<span class="line"><span>	版本</span></span>
<span class="line"><span>		常用版本</span></span>
<span class="line"><span>			MySQL5.7</span></span>
<span class="line"><span>		未来</span></span>
<span class="line"><span>			MySQL8.0</span></span>
<span class="line"><span>	安装</span></span>
<span class="line"><span>		环境准备</span></span>
<span class="line"><span>			yum -y install \\</span></span>
<span class="line"><span>ncurses \\</span></span>
<span class="line"><span>ncurses-devel \\</span></span>
<span class="line"><span>bison \\</span></span>
<span class="line"><span>cmake</span></span>
<span class="line"><span>			yum install gcc gcc-c++ -y</span></span>
<span class="line"><span>		创建程序用户</span></span>
<span class="line"><span>			useradd -s /sbin/nologin mysql</span></span>
<span class="line"><span>		解压</span></span>
<span class="line"><span>			tar zxvf mysql-5.7.17.tar.gz -C /opt/</span></span>
<span class="line"><span>tar zxvf boost_1_59_0.tar.gz -C /usr/local/</span></span>
<span class="line"><span>cd /usr/local/</span></span>
<span class="line"><span>mv boost_1_59_0 boost</span></span>
<span class="line"><span>		配置</span></span>
<span class="line"><span>			cmake \\</span></span>
<span class="line"><span>-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \\</span></span>
<span class="line"><span>-DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \\</span></span>
<span class="line"><span>-DSYSCONFDIR=/etc \\</span></span>
<span class="line"><span>-DSYSTEMD_PID_DIR=/usr/local/mysql \\</span></span>
<span class="line"><span>-DDEFAULT_CHARSET=utf8  \\</span></span>
<span class="line"><span>-DDEFAULT_COLLATION=utf8_general_ci \\</span></span>
<span class="line"><span>-DWITH_INNOBASE_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DWITH_ARCHIVE_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DWITH_PERFSCHEMA_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DMYSQL_DATADIR=/usr/local/mysql/data \\</span></span>
<span class="line"><span>-DWITH_BOOST=/usr/local/boost \\</span></span>
<span class="line"><span>-DWITH_SYSTEMD=1</span></span>
<span class="line"><span>		编译安装</span></span>
<span class="line"><span>			make &amp;&amp; make install</span></span>
<span class="line"><span>		chown -R mysql.mysql /usr/local/mysql/</span></span>
<span class="line"><span>		配置文件</span></span>
<span class="line"><span>			vim /etc/my.cnf</span></span>
<span class="line"><span>			[client]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysqld]</span></span>
<span class="line"><span>user = mysql</span></span>
<span class="line"><span>basedir = /usr/local/mysql</span></span>
<span class="line"><span>datadir = /usr/local/mysql/data</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>character_set_server=utf8</span></span>
<span class="line"><span>pid-file = /usr/local/mysql/mysqld.pid</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span>server-id = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_AUTO_VALUE_ON_ZERO,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,PIPES_AS_CONCAT,ANSI_QUOTES</span></span>
<span class="line"><span>			chown mysql.mysql /etc/my.cnf</span></span>
<span class="line"><span>		echo &#39;PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>echo &#39;export PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>source /etc/profile</span></span>
<span class="line"><span>		数据库初始化</span></span>
<span class="line"><span>			cd /usr/local/mysql/</span></span>
<span class="line"><span>			bin/mysqld \\</span></span>
<span class="line"><span>--initialize-insecure \\</span></span>
<span class="line"><span>--user=mysql \\</span></span>
<span class="line"><span>--basedir=/usr/local/mysql \\</span></span>
<span class="line"><span>--datadir=/usr/local/mysql/data</span></span>
<span class="line"><span>		便于systemctl管理</span></span>
<span class="line"><span>			cp /usr/local/mysql/usr/lib/systemd/system/mysqld.service /usr/lib/systemd/system</span></span>
<span class="line"><span>		重载systemctl</span></span>
<span class="line"><span>			systemctl daemon-reload</span></span>
<span class="line"><span>		启动服务</span></span>
<span class="line"><span>			systemctl start mysqld</span></span>
<span class="line"><span>		开机自启动</span></span>
<span class="line"><span>			systemctl enable mysqld</span></span>
<span class="line"><span>		设置MySQL登录密码</span></span>
<span class="line"><span>			mysqladmin -u root -p password &quot;abc123&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysql主从复制-读写分离" tabindex="-1"><a class="header-anchor" href="#mysql主从复制-读写分离"><span>MySQL主从复制+读写分离</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>	主从复制</span></span>
<span class="line"><span>		环境准备</span></span>
<span class="line"><span>			关闭防火墙和增强性安全功能</span></span>
<span class="line"><span>			systemctl stop firewalld.service</span></span>
<span class="line"><span>			setenforce 0</span></span>
<span class="line"><span>			时间同步阿里云</span></span>
<span class="line"><span>			ntpdate ntp1.aliyun.com</span></span>
<span class="line"><span>		修改配置</span></span>
<span class="line"><span>			/etc/my.cnf</span></span>
<span class="line"><span>			log-bin = master-binlog-slave-updates = true</span></span>
<span class="line"><span>		重启服务</span></span>
<span class="line"><span>			systemctl restart mysqld</span></span>
<span class="line"><span>		赋予从服务器同步权限</span></span>
<span class="line"><span>			子主题</span></span>
<span class="line"><span>				grant replication slave on *.* to &#39;myslave&#39;@&#39;192.168.100.%&#39; identified by &#39;123456&#39;;</span></span>
<span class="line"><span>		权限刷新</span></span>
<span class="line"><span>			flush privileges;</span></span>
<span class="line"><span>		查看同步位置</span></span>
<span class="line"><span>			show master status;</span></span>
<span class="line"><span>			+-------------------+----------+--------------+------------------+-------------------+| File              | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |+-------------------+----------+--------------+------------------+-------------------++-------------------+----------+--------------+------------------+-------------------+</span></span>
<span class="line"><span>		从服务器配置</span></span>
<span class="line"><span>			/etc/my.cnf</span></span>
<span class="line"><span>			server-id = 2relay-log = relay-log-binrelay-log-index = slave-relay-bin.index</span></span>
<span class="line"><span>		重启从服务</span></span>
<span class="line"><span>			systemctl restart mysqld</span></span>
<span class="line"><span>		进从服务MySQL模式下，同步主MySQL</span></span>
<span class="line"><span>			change master to master_host=&#39;192.168.100.128&#39;,master_user=&#39;myslave&#39;,master_password=&#39;123456&#39;,master_log_file=&#39;master-bin.000001&#39;,master_log_pos=604;</span></span>
<span class="line"><span>		启动从mysql同步</span></span>
<span class="line"><span>			start slave;</span></span>
<span class="line"><span>		查看同步状态</span></span>
<span class="line"><span>			show slave status\\G;</span></span>
<span class="line"><span>	读写分离</span></span>
<span class="line"><span>		环境部署</span></span>
<span class="line"><span>			jdk环境</span></span>
<span class="line"><span>				./jdk-6u14-linux-x64.bin</span></span>
<span class="line"><span>				mv jdk1.6.0_14/ /usr/local/jdk1.6</span></span>
<span class="line"><span>				vim /etc/profile</span></span>
<span class="line"><span>				export JAVA_HOME=/usr/local/jdk1.6export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/libexport PATH=$JAVA_HOME/lib:$JAVA_HOME/jre/bin/:$PATH:$HOME/binexport AMOEBA_HOME=/usr/local/amoebaexport PATH=$PATH:$AMOEBA_HOME/bin</span></span>
<span class="line"><span>				source /etc/profile</span></span>
<span class="line"><span>		amoeba部署</span></span>
<span class="line"><span>			mkdir  /usr/local/amoeba</span></span>
<span class="line"><span>			tar zxvf amoeba-mysql-binary-2.2.0.tar.gz -C /usr/local/amoeba/</span></span>
<span class="line"><span>			chmod -R 755 /usr/local/amoeba/</span></span>
<span class="line"><span>			安装</span></span>
<span class="line"><span>				/usr/local/amoeba/bin/amoeba</span></span>
<span class="line"><span>		mysql放权给amoeba访问</span></span>
<span class="line"><span>			grant all on *.* to test@&#39;192.168.100.%&#39; identified by &#39;123.com&#39;;</span></span>
<span class="line"><span>		修改amoeba配置</span></span>
<span class="line"><span>			vim amoeba.xml</span></span>
<span class="line"><span>			&lt;property name=&quot;user&quot;&gt;amoeba&lt;/property&gt;</span></span>
<span class="line"><span>			&lt;property name=&quot;password&quot;&gt;123456&lt;/property&gt;</span></span>
<span class="line"><span>			&lt;property name=&quot;defaultPool&quot;&gt;master&lt;/property&gt;&lt;property name=&quot;writePool&quot;&gt;master&lt;/property&gt;&lt;property name=&quot;readPool&quot;&gt;slaves&lt;/property&gt;</span></span>
<span class="line"><span>			vim dbServers.xml</span></span>
<span class="line"><span>			&lt;property name=&quot;schema&quot;&gt;mysql&lt;/property&gt;</span></span>
<span class="line"><span>			&lt;property name=&quot;user&quot;&gt;test&lt;/property&gt;</span></span>
<span class="line"><span>			&lt;property name=&quot;password&quot;&gt;123.com&lt;/property&gt;</span></span>
<span class="line"><span>			&lt;dbServer name=&quot;master&quot;  parent=&quot;abstractServer&quot;&gt;&lt;property name=&quot;ipAddress&quot;&gt;192.168.100.128&lt;/property&gt;</span></span>
<span class="line"><span>			&lt;dbServer name=&quot;slave1&quot;  parent=&quot;abstractServer&quot;&gt;</span></span>
<span class="line"><span>			&lt;property name=&quot;ipAddress&quot;&gt;192.168.195.129&lt;/property&gt;</span></span>
<span class="line"><span>			&lt;dbServer name=&quot;slaves&quot; virtual=&quot;true&quot;&gt;&lt;poolConfig class=&quot;com.meidusa.amoeba.server.MultipleServerPool&quot;&gt;</span></span>
<span class="line"><span>			&lt;property name=&quot;poolNames&quot;&gt;slave1,slave2&lt;/property&gt;&lt;/poolConfig&gt;</span></span>
<span class="line"><span>		启动amoeba服务器</span></span>
<span class="line"><span>			/usr/local/amoeba/bin/amoeba start &amp;</span></span>
<span class="line"><span>	验证</span></span>
<span class="line"><span>		在两台slave中断开主从复制</span></span>
<span class="line"><span>			stop slave;</span></span>
<span class="line"><span>		在客户端写入数据验证是否在master上插入</span></span>
<span class="line"><span>		在slave1和slave2节点上添加在数据，并在客户端上读取到</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lnmp架构" tabindex="-1"><a class="header-anchor" href="#lnmp架构"><span>LNMP架构</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>LNMP架构</span></span>
<span class="line"><span>	yum仓库检查</span></span>
<span class="line"><span>		yum clean all 清空yum缓存</span></span>
<span class="line"><span>		yum list 查看yum仓库软件列表</span></span>
<span class="line"><span>	nginx</span></span>
<span class="line"><span>		环境准备</span></span>
<span class="line"><span>			yum install pcre-devel zlib-devel gcc gcc-c++ -y</span></span>
<span class="line"><span>		解压软件包</span></span>
<span class="line"><span>			tar zxvf nginx-1.12.2.tar.gz</span></span>
<span class="line"><span>		创建程序用户</span></span>
<span class="line"><span>			useradd -M -s /sbin/nologin nginx</span></span>
<span class="line"><span>		配置</span></span>
<span class="line"><span>			./configure \\</span></span>
<span class="line"><span>--prefix=/usr/local/nginx \\</span></span>
<span class="line"><span>--user=nginx \\</span></span>
<span class="line"><span>--group=nginx \\</span></span>
<span class="line"><span>--with-http_stub_status_module</span></span>
<span class="line"><span>			make &amp;&amp; make install</span></span>
<span class="line"><span>		优化指令</span></span>
<span class="line"><span>			ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/</span></span>
<span class="line"><span>		服务管理配置</span></span>
<span class="line"><span>			systemctl</span></span>
<span class="line"><span>			vim /lib/systemd/system/nginx.service</span></span>
<span class="line"><span>			[Unit]</span></span>
<span class="line"><span>Description=nginx</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=forking</span></span>
<span class="line"><span>PIDFile=/usr/local/nginx/logs/nginx.pid</span></span>
<span class="line"><span>ExecStart=/usr/local/nginx/sbin/nginx</span></span>
<span class="line"><span>ExecReload=/usr/bin/kill -s HUP $MAINPID</span></span>
<span class="line"><span>ExecStop=/usr/bin/kill -s QUIT $MAINPID</span></span>
<span class="line"><span>PrivateTmp=true</span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span>			赋予启动脚本执行权限</span></span>
<span class="line"><span>				chmod 754 nginx.service</span></span>
<span class="line"><span>		启动服务</span></span>
<span class="line"><span>			systemctl start nginx</span></span>
<span class="line"><span>		停止服务</span></span>
<span class="line"><span>			systemctl stop nginx</span></span>
<span class="line"><span>		清空防火墙规则</span></span>
<span class="line"><span>			iptables -F</span></span>
<span class="line"><span>			setenforce 0</span></span>
<span class="line"><span>	mysql</span></span>
<span class="line"><span>		环境准备</span></span>
<span class="line"><span>			yum install ncurses ncurses-devel -y</span></span>
<span class="line"><span>			yum install bison cmake -y</span></span>
<span class="line"><span>			创建mysql程序用户</span></span>
<span class="line"><span>				useradd -s /sbin/nologin mysql</span></span>
<span class="line"><span>		解压包</span></span>
<span class="line"><span>			tar zxvf mysql-boost-5.7.20.tar.gz</span></span>
<span class="line"><span>		配置</span></span>
<span class="line"><span>			cmake \\</span></span>
<span class="line"><span>-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \\</span></span>
<span class="line"><span>-DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \\</span></span>
<span class="line"><span>-DSYSCONFDIR=/etc \\</span></span>
<span class="line"><span>-DSYSTEMD_PID_DIR=/usr/local/mysql \\</span></span>
<span class="line"><span>-DDEFAULT_CHARSET=utf8  \\</span></span>
<span class="line"><span>-DDEFAULT_COLLATION=utf8_general_ci \\</span></span>
<span class="line"><span>-DWITH_INNOBASE_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DWITH_ARCHIVE_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DWITH_PERFSCHEMA_STORAGE_ENGINE=1 \\</span></span>
<span class="line"><span>-DMYSQL_DATADIR=/usr/local/mysql/data \\</span></span>
<span class="line"><span>-DWITH_BOOST=boost \\</span></span>
<span class="line"><span>-DWITH_SYSTEMD=1</span></span>
<span class="line"><span>		编译</span></span>
<span class="line"><span>			make &amp;&amp; make install</span></span>
<span class="line"><span>			注意：加快编译过程  make -j6</span></span>
<span class="line"><span>		变更目录权限给程序用户mysql</span></span>
<span class="line"><span>			chown -R mysql.mysql /usr/local/mysql/</span></span>
<span class="line"><span>		修改配置文件</span></span>
<span class="line"><span>			vim /etc/my.cnf</span></span>
<span class="line"><span>			[client]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysqld]</span></span>
<span class="line"><span>user = mysql</span></span>
<span class="line"><span>basedir = /usr/local/mysql</span></span>
<span class="line"><span>datadir = /usr/local/mysql/data</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>character_set_server=utf8</span></span>
<span class="line"><span>pid-file = /usr/local/mysql/mysqld.pid</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span>server-id = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_AUTO_VALUE_ON_ZERO,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,PIPES_AS_CONCAT,ANSI_QUOTES</span></span>
<span class="line"><span>			更改配置文件属主和属组</span></span>
<span class="line"><span>				chown mysql.mysql /etc/my.cnf</span></span>
<span class="line"><span>			环境变量配置</span></span>
<span class="line"><span>				echo &#39;PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>				echo &#39;export PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>				生效profile文件</span></span>
<span class="line"><span>					source /etc/profile</span></span>
<span class="line"><span>		初始化数据库</span></span>
<span class="line"><span>			cd /usr/local/mysql</span></span>
<span class="line"><span>			bin/mysqld \\</span></span>
<span class="line"><span>--initialize-insecure \\</span></span>
<span class="line"><span>--user=mysql \\</span></span>
<span class="line"><span>--basedir=/usr/local/mysql \\</span></span>
<span class="line"><span>--datadir=/usr/local/mysql/data</span></span>
<span class="line"><span>		启动服务</span></span>
<span class="line"><span>			cp usr/lib/systemd/system/mysqld.service /usr/lib/systemd/system/</span></span>
<span class="line"><span>			systemctl start mysqld</span></span>
<span class="line"><span>			netstat -ntap | grep 3306</span></span>
<span class="line"><span>		设置数据库管理员登录</span></span>
<span class="line"><span>			mysqladmin -u root -p password   注意：第一次输入密码直接回车</span></span>
<span class="line"><span>			mysql -u root -p  登录</span></span>
<span class="line"><span>	PHP</span></span>
<span class="line"><span>		环境准备</span></span>
<span class="line"><span>			yum -y install \\</span></span>
<span class="line"><span>libxml2 \\</span></span>
<span class="line"><span>libxml2-devel \\</span></span>
<span class="line"><span>openssl \\</span></span>
<span class="line"><span>openssl-devel \\</span></span>
<span class="line"><span>bzip2 \\</span></span>
<span class="line"><span>bzip2-devel \\</span></span>
<span class="line"><span>libcurl \\</span></span>
<span class="line"><span>libcurl-devel \\</span></span>
<span class="line"><span>libjpeg \\</span></span>
<span class="line"><span>libjpeg-devel \\</span></span>
<span class="line"><span>libpng \\</span></span>
<span class="line"><span>libpng-devel \\</span></span>
<span class="line"><span>freetype \\</span></span>
<span class="line"><span>freetype-devel \\</span></span>
<span class="line"><span>gmp \\</span></span>
<span class="line"><span>gmp-devel \\</span></span>
<span class="line"><span>libmcrypt \\</span></span>
<span class="line"><span>libmcrypt-devel \\</span></span>
<span class="line"><span>readline \\</span></span>
<span class="line"><span>readline-devel \\</span></span>
<span class="line"><span>libxslt \\</span></span>
<span class="line"><span>libxslt-devel \\</span></span>
<span class="line"><span>zlib \\</span></span>
<span class="line"><span>zlib-devel \\</span></span>
<span class="line"><span>glibc \\</span></span>
<span class="line"><span>glibc-devel \\</span></span>
<span class="line"><span>glib2 \\</span></span>
<span class="line"><span>glib2-devel \\</span></span>
<span class="line"><span>ncurses \\</span></span>
<span class="line"><span>curl \\</span></span>
<span class="line"><span>gdbm-devel \\</span></span>
<span class="line"><span>db4-devel \\</span></span>
<span class="line"><span>libXpm-devel \\</span></span>
<span class="line"><span>libX11-devel \\</span></span>
<span class="line"><span>gd-devel \\</span></span>
<span class="line"><span>gmp-devel \\</span></span>
<span class="line"><span>expat-devel \\</span></span>
<span class="line"><span>xmlrpc-c \\</span></span>
<span class="line"><span>xmlrpc-c-devel \\</span></span>
<span class="line"><span>libicu-devel \\</span></span>
<span class="line"><span>libmcrypt-devel \\</span></span>
<span class="line"><span>libmemcached-devel</span></span>
<span class="line"><span>			扩展yum源</span></span>
<span class="line"><span>				yum install epel-release -y</span></span>
<span class="line"><span>			yum install libmcrypt libmcrypt-devel -y</span></span>
<span class="line"><span>		解压软件包</span></span>
<span class="line"><span>			tar jxvf php-7.1.10.tar.bz2</span></span>
<span class="line"><span>		配置</span></span>
<span class="line"><span>			./configure \\</span></span>
<span class="line"><span>--prefix=/usr/local/php \\</span></span>
<span class="line"><span>--with-mysql-sock=/usr/local/mysql/mysql.sock \\</span></span>
<span class="line"><span>--with-config-file-path=/etc \\</span></span>
<span class="line"><span>--enable-fpm \\</span></span>
<span class="line"><span>--enable-inline-optimization \\</span></span>
<span class="line"><span>--disable-debug \\</span></span>
<span class="line"><span>--disable-rpath \\</span></span>
<span class="line"><span>--enable-shared \\</span></span>
<span class="line"><span>--enable-soap \\</span></span>
<span class="line"><span>--with-libxml-dir \\</span></span>
<span class="line"><span>--with-xmlrpc \\</span></span>
<span class="line"><span>--with-openssl \\</span></span>
<span class="line"><span>--with-mcrypt \\</span></span>
<span class="line"><span>--with-mhash \\</span></span>
<span class="line"><span>--with-pcre-regex \\</span></span>
<span class="line"><span>--with-sqlite3 \\</span></span>
<span class="line"><span>--with-zlib \\</span></span>
<span class="line"><span>--enable-bcmath \\</span></span>
<span class="line"><span>--with-iconv \\</span></span>
<span class="line"><span>--with-bz2 \\</span></span>
<span class="line"><span>--enable-calendar \\</span></span>
<span class="line"><span>--with-curl \\</span></span>
<span class="line"><span>--with-cdb \\</span></span>
<span class="line"><span>--enable-dom \\</span></span>
<span class="line"><span>--enable-exif \\</span></span>
<span class="line"><span>--enable-fileinfo \\</span></span>
<span class="line"><span>--enable-filter \\</span></span>
<span class="line"><span>--with-pcre-dir \\</span></span>
<span class="line"><span>--enable-ftp \\</span></span>
<span class="line"><span>--with-gd \\</span></span>
<span class="line"><span>--with-openssl-dir \\</span></span>
<span class="line"><span>--with-jpeg-dir \\</span></span>
<span class="line"><span>--with-png-dir \\</span></span>
<span class="line"><span>--with-zlib-dir \\</span></span>
<span class="line"><span>--with-freetype-dir \\</span></span>
<span class="line"><span>--enable-gd-native-ttf \\</span></span>
<span class="line"><span>--enable-gd-jis-conv \\</span></span>
<span class="line"><span>--with-gettext \\</span></span>
<span class="line"><span>--with-gmp \\</span></span>
<span class="line"><span>--with-mhash \\</span></span>
<span class="line"><span>--enable-json \\</span></span>
<span class="line"><span>--enable-mbstring \\</span></span>
<span class="line"><span>--enable-mbregex \\</span></span>
<span class="line"><span>--enable-mbregex-backtrack \\</span></span>
<span class="line"><span>--with-libmbfl \\</span></span>
<span class="line"><span>--with-onig \\</span></span>
<span class="line"><span>--enable-pdo \\</span></span>
<span class="line"><span>--with-mysqli=mysqlnd \\</span></span>
<span class="line"><span>--with-pdo-mysql=mysqlnd \\</span></span>
<span class="line"><span>--with-zlib-dir \\</span></span>
<span class="line"><span>--with-pdo-sqlite \\</span></span>
<span class="line"><span>--with-readline \\</span></span>
<span class="line"><span>--enable-session \\</span></span>
<span class="line"><span>--enable-shmop \\</span></span>
<span class="line"><span>--enable-simplexml \\</span></span>
<span class="line"><span>--enable-sockets \\</span></span>
<span class="line"><span>--enable-sysvmsg \\</span></span>
<span class="line"><span>--enable-sysvsem \\</span></span>
<span class="line"><span>--enable-sysvshm \\</span></span>
<span class="line"><span>--enable-wddx \\</span></span>
<span class="line"><span>--with-libxml-dir \\</span></span>
<span class="line"><span>--with-xsl \\</span></span>
<span class="line"><span>--enable-zip \\</span></span>
<span class="line"><span>--enable-mysqlnd-compression-support \\</span></span>
<span class="line"><span>--with-pear \\</span></span>
<span class="line"><span>--enable-opcache</span></span>
<span class="line"><span>		编译</span></span>
<span class="line"><span>			make &amp;&amp; make install</span></span>
<span class="line"><span>		核心配置文件</span></span>
<span class="line"><span>			cp php.ini-development /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>			vim /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>			1170 mysqli.default_socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span>				连接数据库</span></span>
<span class="line"><span>			939 date.timezone = Asia/Shanghai</span></span>
<span class="line"><span>				设置时区</span></span>
<span class="line"><span>			检查php模块</span></span>
<span class="line"><span>				/usr/local/php/bin/php -m</span></span>
<span class="line"><span>		php-fpm模块</span></span>
<span class="line"><span>			cd /usr/local/php/etc/</span></span>
<span class="line"><span>			cp php-fpm.conf.default php-fpm.conf</span></span>
<span class="line"><span>			cd /usr/local/php/etc/php-fpm.d/</span></span>
<span class="line"><span>			cp www.conf.default www.conf</span></span>
<span class="line"><span>			vim php-fpm.conf</span></span>
<span class="line"><span>			pid = run/php-fpm.pid</span></span>
<span class="line"><span>			启动fpm</span></span>
<span class="line"><span>				/usr/local/php/sbin/php-fpm -c /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>			php命令优化</span></span>
<span class="line"><span>				ln -s /usr/local/php/bin/* /usr/local/bin/</span></span>
<span class="line"><span>		nginx支持php-fpm</span></span>
<span class="line"><span>			vim /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span>			location ~ \\.php$ {</span></span>
<span class="line"><span>            root           html;</span></span>
<span class="line"><span>            fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span>            fastcgi_index  index.php;</span></span>
<span class="line"><span>            fastcgi_param  SCRIPT_FILENAME  /usr/local/nginx/html$fastcgi_script_name;</span></span>
<span class="line"><span>            include        fastcgi_params;</span></span>
<span class="line"><span>        }   </span></span>
<span class="line"><span></span></span>
<span class="line"><span>			网站站点创建php首页</span></span>
<span class="line"><span>				/usr/local/nginx/html</span></span>
<span class="line"><span>				vim index.php</span></span>
<span class="line"><span>				&lt;?php</span></span>
<span class="line"><span>phpinfo();</span></span>
<span class="line"><span>?&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const v=n(p,[["render",e],["__file","MySQL部署.html.vue"]]),r=JSON.parse(`{"path":"/notes/devops/%E9%83%A8%E7%BD%B2%E3%80%81%E9%85%8D%E7%BD%AE/MySQL%E9%83%A8%E7%BD%B2.html","title":"MySQL部署","lang":"zh-CN","frontmatter":{"title":"MySQL部署","description":"MySQL部署 MySQL主从复制+读写分离 LNMP架构","icon":"","date":"2024-09-21T00:00:00.000Z","category":["运维"],"tag":["MySQL"],"head":[["meta",{"property":"og:url","content":"https://ErenJaegerKing.github.io/notes/devops/%E9%83%A8%E7%BD%B2%E3%80%81%E9%85%8D%E7%BD%AE/MySQL%E9%83%A8%E7%BD%B2.html"}],["meta",{"property":"og:site_name","content":"ErenJaeger"}],["meta",{"property":"og:title","content":"MySQL部署"}],["meta",{"property":"og:description","content":"MySQL部署 MySQL主从复制+读写分离 LNMP架构"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-10T07:58:23.000Z"}],["meta",{"property":"article:author","content":"ErenJaegerKing"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2024-09-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-10T07:58:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL部署\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-09-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-10T07:58:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ErenJaegerKing\\",\\"url\\":\\"https://ErenJaegerKing.github.io\\",\\"email\\":\\"erenjaegerking@qq.com\\"}]}"]]},"headers":[{"level":3,"title":"MySQL部署","slug":"mysql部署","link":"#mysql部署","children":[]},{"level":3,"title":"MySQL主从复制+读写分离","slug":"mysql主从复制-读写分离","link":"#mysql主从复制-读写分离","children":[]},{"level":3,"title":"LNMP架构","slug":"lnmp架构","link":"#lnmp架构","children":[]}],"git":{"createdTime":1726899963000,"updatedTime":1728547103000,"contributors":[{"name":"ErenJaeger","email":"ErenJaegerKing@qq.com","commits":1}]},"readingTime":{"minutes":5.19,"words":1556},"filePathRelative":"notes/devops/部署、配置/MySQL部署.md","localizedDate":"2024年9月21日","excerpt":"<h3>MySQL部署</h3>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>MySQL数据库</span></span>\\n<span class=\\"line\\"><span>\\t结构</span></span>\\n<span class=\\"line\\"><span>\\t\\t数据-&gt;表-&gt;数据库</span></span>\\n<span class=\\"line\\"><span>\\t\\t实体-关系</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tE-R</span></span>\\n<span class=\\"line\\"><span>\\t\\t实体</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t属性（字段）</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t列</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t记录</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t行</span></span>\\n<span class=\\"line\\"><span>\\t关系型与非关系型区别</span></span>\\n<span class=\\"line\\"><span>\\t\\t关系型有固定表结构存储数据，非关系型无固定结构</span></span>\\n<span class=\\"line\\"><span>\\t\\t关系型：数据和文本</span></span>\\n<span class=\\"line\\"><span>\\t\\t非关系型：图片，视频，声音等</span></span>\\n<span class=\\"line\\"><span>\\t\\t非关系型：键值对</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tkey-value</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t例如：zhangsan：22</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t键：对象</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t对象中包含很多数据</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t方便开发程序提取，不需要做数据格式转化</span></span>\\n<span class=\\"line\\"><span>\\t版本</span></span>\\n<span class=\\"line\\"><span>\\t\\t常用版本</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tMySQL5.7</span></span>\\n<span class=\\"line\\"><span>\\t\\t未来</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tMySQL8.0</span></span>\\n<span class=\\"line\\"><span>\\t安装</span></span>\\n<span class=\\"line\\"><span>\\t\\t环境准备</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tyum -y install \\\\</span></span>\\n<span class=\\"line\\"><span>ncurses \\\\</span></span>\\n<span class=\\"line\\"><span>ncurses-devel \\\\</span></span>\\n<span class=\\"line\\"><span>bison \\\\</span></span>\\n<span class=\\"line\\"><span>cmake</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tyum install gcc gcc-c++ -y</span></span>\\n<span class=\\"line\\"><span>\\t\\t创建程序用户</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tuseradd -s /sbin/nologin mysql</span></span>\\n<span class=\\"line\\"><span>\\t\\t解压</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\ttar zxvf mysql-5.7.17.tar.gz -C /opt/</span></span>\\n<span class=\\"line\\"><span>tar zxvf boost_1_59_0.tar.gz -C /usr/local/</span></span>\\n<span class=\\"line\\"><span>cd /usr/local/</span></span>\\n<span class=\\"line\\"><span>mv boost_1_59_0 boost</span></span>\\n<span class=\\"line\\"><span>\\t\\t配置</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tcmake \\\\</span></span>\\n<span class=\\"line\\"><span>-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \\\\</span></span>\\n<span class=\\"line\\"><span>-DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \\\\</span></span>\\n<span class=\\"line\\"><span>-DSYSCONFDIR=/etc \\\\</span></span>\\n<span class=\\"line\\"><span>-DSYSTEMD_PID_DIR=/usr/local/mysql \\\\</span></span>\\n<span class=\\"line\\"><span>-DDEFAULT_CHARSET=utf8  \\\\</span></span>\\n<span class=\\"line\\"><span>-DDEFAULT_COLLATION=utf8_general_ci \\\\</span></span>\\n<span class=\\"line\\"><span>-DWITH_INNOBASE_STORAGE_ENGINE=1 \\\\</span></span>\\n<span class=\\"line\\"><span>-DWITH_ARCHIVE_STORAGE_ENGINE=1 \\\\</span></span>\\n<span class=\\"line\\"><span>-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \\\\</span></span>\\n<span class=\\"line\\"><span>-DWITH_PERFSCHEMA_STORAGE_ENGINE=1 \\\\</span></span>\\n<span class=\\"line\\"><span>-DMYSQL_DATADIR=/usr/local/mysql/data \\\\</span></span>\\n<span class=\\"line\\"><span>-DWITH_BOOST=/usr/local/boost \\\\</span></span>\\n<span class=\\"line\\"><span>-DWITH_SYSTEMD=1</span></span>\\n<span class=\\"line\\"><span>\\t\\t编译安装</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tmake &amp;&amp; make install</span></span>\\n<span class=\\"line\\"><span>\\t\\tchown -R mysql.mysql /usr/local/mysql/</span></span>\\n<span class=\\"line\\"><span>\\t\\t配置文件</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tvim /etc/my.cnf</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t[client]</span></span>\\n<span class=\\"line\\"><span>port = 3306</span></span>\\n<span class=\\"line\\"><span>default-character-set=utf8</span></span>\\n<span class=\\"line\\"><span>socket = /usr/local/mysql/mysql.sock</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>[mysql]</span></span>\\n<span class=\\"line\\"><span>port = 3306</span></span>\\n<span class=\\"line\\"><span>default-character-set=utf8</span></span>\\n<span class=\\"line\\"><span>socket = /usr/local/mysql/mysql.sock</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>[mysqld]</span></span>\\n<span class=\\"line\\"><span>user = mysql</span></span>\\n<span class=\\"line\\"><span>basedir = /usr/local/mysql</span></span>\\n<span class=\\"line\\"><span>datadir = /usr/local/mysql/data</span></span>\\n<span class=\\"line\\"><span>port = 3306</span></span>\\n<span class=\\"line\\"><span>character_set_server=utf8</span></span>\\n<span class=\\"line\\"><span>pid-file = /usr/local/mysql/mysqld.pid</span></span>\\n<span class=\\"line\\"><span>socket = /usr/local/mysql/mysql.sock</span></span>\\n<span class=\\"line\\"><span>server-id = 1</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_AUTO_VALUE_ON_ZERO,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,PIPES_AS_CONCAT,ANSI_QUOTES</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tchown mysql.mysql /etc/my.cnf</span></span>\\n<span class=\\"line\\"><span>\\t\\techo 'PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH' &gt;&gt; /etc/profile</span></span>\\n<span class=\\"line\\"><span>echo 'export PATH' &gt;&gt; /etc/profile</span></span>\\n<span class=\\"line\\"><span>source /etc/profile</span></span>\\n<span class=\\"line\\"><span>\\t\\t数据库初始化</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tcd /usr/local/mysql/</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tbin/mysqld \\\\</span></span>\\n<span class=\\"line\\"><span>--initialize-insecure \\\\</span></span>\\n<span class=\\"line\\"><span>--user=mysql \\\\</span></span>\\n<span class=\\"line\\"><span>--basedir=/usr/local/mysql \\\\</span></span>\\n<span class=\\"line\\"><span>--datadir=/usr/local/mysql/data</span></span>\\n<span class=\\"line\\"><span>\\t\\t便于systemctl管理</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tcp /usr/local/mysql/usr/lib/systemd/system/mysqld.service /usr/lib/systemd/system</span></span>\\n<span class=\\"line\\"><span>\\t\\t重载systemctl</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tsystemctl daemon-reload</span></span>\\n<span class=\\"line\\"><span>\\t\\t启动服务</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tsystemctl start mysqld</span></span>\\n<span class=\\"line\\"><span>\\t\\t开机自启动</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tsystemctl enable mysqld</span></span>\\n<span class=\\"line\\"><span>\\t\\t设置MySQL登录密码</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tmysqladmin -u root -p password \\"abc123\\"</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{v as comp,r as data};
