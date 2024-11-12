import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-BJSAy0hy.js";const l={};function p(t,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h3 id="lvs负载均衡" tabindex="-1"><a class="header-anchor" href="#lvs负载均衡"><span>LVS负载均衡</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>LVS负载均衡</span></span>
<span class="line"><span>	拓扑图</span></span>
<span class="line"><span>	lvs软件安装</span></span>
<span class="line"><span>		yum install ipvsadm -y</span></span>
<span class="line"><span>	Apache软件安装</span></span>
<span class="line"><span>		yum install httpd -y</span></span>
<span class="line"><span>	lvs配置双网卡</span></span>
<span class="line"><span>		systemctl status NetworkManager</span></span>
<span class="line"><span>网络管理服务：关闭状态不做任何网络修正，开启后自行添加网卡，自行修改地址</span></span>
<span class="line"><span>		cp -p ifcfg-ens33 ifcfg-ens35</span></span>
<span class="line"><span>		ens33外网卡  12.0.0.1/24</span></span>
<span class="line"><span>		ens35内网卡 192.168.200.1/24</span></span>
<span class="line"><span>		编辑修改ens35</span></span>
<span class="line"><span>			BOOTPROTO=&quot;static&quot;</span></span>
<span class="line"><span>			IPADDR=&quot;192.168.200.1&quot;</span></span>
<span class="line"><span>NETMASK=&quot;255.255.255.0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			NAME=&quot;ens35&quot;</span></span>
<span class="line"><span>DEVICE=&quot;ens35&quot;</span></span>
<span class="line"><span>			删除UUID行</span></span>
<span class="line"><span>		编辑修改ens33</span></span>
<span class="line"><span>			BOOTPROTO=&quot;static&quot;</span></span>
<span class="line"><span>			IPADDR=&quot;12.0.0.1&quot;</span></span>
<span class="line"><span>NETMASK=&quot;255.255.255.0&quot;</span></span>
<span class="line"><span>		重启网络配置</span></span>
<span class="line"><span>			systemctl restart network</span></span>
<span class="line"><span>		结果</span></span>
<span class="line"><span>	web网卡配置</span></span>
<span class="line"><span>		web1</span></span>
<span class="line"><span>			IPADDR=&quot;192.168.200.110&quot;</span></span>
<span class="line"><span>NETMASK=&quot;255.255.255.0&quot;</span></span>
<span class="line"><span>GATEWAY=&quot;192.168.200.1&quot;</span></span>
<span class="line"><span>		web2</span></span>
<span class="line"><span>			IPADDR=&quot;192.168.200.120&quot;</span></span>
<span class="line"><span>NETMASK=&quot;255.255.255.0&quot;</span></span>
<span class="line"><span>GATEWAY=&quot;192.168.200.1&quot;</span></span>
<span class="line"><span>		清空防火墙规则</span></span>
<span class="line"><span>			iptables -F</span></span>
<span class="line"><span>			setenforce 0</span></span>
<span class="line"><span>		启动Apache网站服务</span></span>
<span class="line"><span>			systemctl start httpd</span></span>
<span class="line"><span>	配置网站页面</span></span>
<span class="line"><span>		进入站点</span></span>
<span class="line"><span>			cd /var/www/html/</span></span>
<span class="line"><span>			vim index.html</span></span>
<span class="line"><span>			&lt;h1&gt;this is xykj web1&lt;/h1&gt;</span></span>
<span class="line"><span>			web2服务器配置同上</span></span>
<span class="line"><span>	lvs服务器启动路由转发</span></span>
<span class="line"><span>		vim /etc/sysctl.conf</span></span>
<span class="line"><span>		开启路由转发功能添加    net.ipv4.ip_forward=1</span></span>
<span class="line"><span>		生效   sysctl -p</span></span>
<span class="line"><span>		清空防火墙规则</span></span>
<span class="line"><span>			iptables -F</span></span>
<span class="line"><span>			清空nat表  iptables -t nat -F</span></span>
<span class="line"><span>		制定nat转发规则</span></span>
<span class="line"><span>			iptables -t nat -A POSTROUTING -o ens33 -s 192.168.200.0/24 -j SNAT --to-source 12.0.0.1</span></span>
<span class="line"><span>	加载lvs内核模块</span></span>
<span class="line"><span>		modprobe ip_vs</span></span>
<span class="line"><span>		cat /proc/net/ip_vs</span></span>
<span class="line"><span>		报错处理：</span></span>
<span class="line"><span>			ipvsadm --save &gt; /etc/sysconfig/ipvsadm</span></span>
<span class="line"><span>		制定负载均衡规则</span></span>
<span class="line"><span>			cd /opt</span></span>
<span class="line"><span>			vim nat.sh</span></span>
<span class="line"><span>			#!/bin/bash</span></span>
<span class="line"><span>ipvsadm -C</span></span>
<span class="line"><span>ipvsadm -A -t 12.0.0.1:80 -s rr</span></span>
<span class="line"><span>ipvsadm -a -t 12.0.0.1:80 -r 192.168.200.110:80 -m</span></span>
<span class="line"><span>ipvsadm -a -t 12.0.0.1:80 -r 192.168.200.120:80 -m</span></span>
<span class="line"><span>ipvsadm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		启动脚本</span></span>
<span class="line"><span>			source nat.sh</span></span>
<span class="line"><span>	客户端配置</span></span>
<span class="line"><span>		子主题</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lvs-keepalived双机热备负载均衡高可用" tabindex="-1"><a class="header-anchor" href="#lvs-keepalived双机热备负载均衡高可用"><span>LVS + keepalived双机热备负载均衡高可用</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>LVS+keepalived双机热备负载均衡高可用</span></span>
<span class="line"><span>	拓扑图</span></span>
<span class="line"><span>	调度器软件部署</span></span>
<span class="line"><span>		yum install ipvsadm keepalived -y</span></span>
<span class="line"><span>	web软件安装</span></span>
<span class="line"><span>		yum install httpd -y</span></span>
<span class="line"><span>	网络配置</span></span>
<span class="line"><span>		所有主机网卡选择仅主机模式</span></span>
<span class="line"><span>		master：192.168.200.201/24</span></span>
<span class="line"><span>		backup：192.168.200.202/24</span></span>
<span class="line"><span>		web1:192.168.200.110/24</span></span>
<span class="line"><span>		web2:192.168.200.120/24</span></span>
<span class="line"><span>		防火墙规则清空</span></span>
<span class="line"><span>			iptables -F</span></span>
<span class="line"><span>			setenforce 0</span></span>
<span class="line"><span>	调度器开启路由转发功能</span></span>
<span class="line"><span>		vim /etc/sysctl.conf</span></span>
<span class="line"><span>		net.ipv4.ip_forward=1</span></span>
<span class="line"><span>net.ipv4.conf.all.send_redirects=0</span></span>
<span class="line"><span>net.ipv4.conf.default.send_redirects=0</span></span>
<span class="line"><span>net.ipv4.conf.ens33.send_redirects=0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		生效 sysctl -p</span></span>
<span class="line"><span>	调度器生成虚拟网卡ens33:0</span></span>
<span class="line"><span>		cd /etc/sysconfig/network-scripts/</span></span>
<span class="line"><span>		cp -p ifcfg-ens33 ifcfg-ens33:0</span></span>
<span class="line"><span>		DEVICE=ens33:0</span></span>
<span class="line"><span>ONBOOT=yes</span></span>
<span class="line"><span>IPADDR=192.168.200.10</span></span>
<span class="line"><span>NETMASK=255.255.255.0</span></span>
<span class="line"><span>		启动虚拟网卡 ifup ens33:0</span></span>
<span class="line"><span>	master上启动LVS</span></span>
<span class="line"><span>		cd /etc/init.d/</span></span>
<span class="line"><span>		vim dr.sh</span></span>
<span class="line"><span>		#!/bin/bash</span></span>
<span class="line"><span>GW=192.168.200.1</span></span>
<span class="line"><span>VIP=192.168.200.10</span></span>
<span class="line"><span>RIP1=192.168.200.110</span></span>
<span class="line"><span>RIP2=192.168.200.120</span></span>
<span class="line"><span>case &quot;$1&quot; in</span></span>
<span class="line"><span>start)</span></span>
<span class="line"><span>        /sbin/ipvsadm --save &gt; /etc/sysconfig/ipvsadm</span></span>
<span class="line"><span>        systemctl start ipvsadm</span></span>
<span class="line"><span>        /sbin/ifconfig ens33:0 $VIP broadcast $VIP netmask 255.255.255.255 broadcast $VIP up</span></span>
<span class="line"><span>        /sbin/route add -host $VIP dev ens33:0</span></span>
<span class="line"><span>        /sbin/ipvsadm -A -t $VIP:80 -s rr</span></span>
<span class="line"><span>        /sbin/ipvsadm -a -t $VIP:80 -r $RIP1:80 -g</span></span>
<span class="line"><span>        /sbin/ipvsadm -a -t $VIP:80 -r $RIP2:80 -g</span></span>
<span class="line"><span>        echo &quot;ipvsadm starting --------------------[ok]&quot;</span></span>
<span class="line"><span>        ;;</span></span>
<span class="line"><span>        stop)</span></span>
<span class="line"><span>        /sbin/ipvsadm -C</span></span>
<span class="line"><span>        systemctl stop ipvsadm</span></span>
<span class="line"><span>        ifconfig ens33:0 down</span></span>
<span class="line"><span>        route del $VIP</span></span>
<span class="line"><span>        echo &quot;ipvsamd stoped----------------------[ok]&quot;</span></span>
<span class="line"><span>         ;;</span></span>
<span class="line"><span>        status)</span></span>
<span class="line"><span>        if [ ! -e /var/lock/subsys/ipvsadm ];then</span></span>
<span class="line"><span>        echo &quot;ipvsadm stoped---------------&quot;</span></span>
<span class="line"><span>        exit 1</span></span>
<span class="line"><span>                else</span></span>
<span class="line"><span>                echo &quot;ipvsamd Runing ---------[ok]&quot;</span></span>
<span class="line"><span>        fi</span></span>
<span class="line"><span>        ;;</span></span>
<span class="line"><span>        *)</span></span>
<span class="line"><span>        echo &quot;Usage: $0 {start|stop|status}&quot;</span></span>
<span class="line"><span>        exit 1</span></span>
<span class="line"><span>        esac</span></span>
<span class="line"><span>        exit 0</span></span>
<span class="line"><span>		chmod +x dr.sh</span></span>
<span class="line"><span>service dr.sh start</span></span>
<span class="line"><span>	网站节点配置</span></span>
<span class="line"><span>		创建页面</span></span>
<span class="line"><span>			vim /var/www/html/index.html</span></span>
<span class="line"><span>			&lt;h1&gt;this is xykj web1&lt;/h1&gt;</span></span>
<span class="line"><span>		配置虚拟网卡</span></span>
<span class="line"><span>			cd /etc/sysconfig/network-scripts/</span></span>
<span class="line"><span>			cp -p ifcfg-lo ifcfg-lo:0</span></span>
<span class="line"><span>			DEVICE=lo:0</span></span>
<span class="line"><span>IPADDR=192.168.200.10</span></span>
<span class="line"><span>NETMASK=255.255.255.0</span></span>
<span class="line"><span>ONBOOT=yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		配置响应重定向脚本</span></span>
<span class="line"><span>			cd /etc/init.d/</span></span>
<span class="line"><span>			vim web.sh</span></span>
<span class="line"><span>			#!/bin/bash</span></span>
<span class="line"><span>VIP=192.168.200.10</span></span>
<span class="line"><span>        case &quot;$1&quot; in</span></span>
<span class="line"><span>        start)</span></span>
<span class="line"><span>                ifconfig lo:0 $VIP netmask 255.255.255.255 broadcast $VIP</span></span>
<span class="line"><span>                /sbin/route add -host $VIP dev lo:0</span></span>
<span class="line"><span>                echo &quot;1&quot; &gt;/proc/sys/net/ipv4/conf/lo/arp_ignore</span></span>
<span class="line"><span>                echo &quot;2&quot; &gt;/proc/sys/net/ipv4/conf/lo/arp_announce</span></span>
<span class="line"><span>                echo &quot;1&quot; &gt;/proc/sys/net/ipv4/conf/all/arp_ignore</span></span>
<span class="line"><span>                echo &quot;2&quot; &gt;/proc/sys/net/ipv4/conf/all/arp_announce</span></span>
<span class="line"><span>                sysctl -p &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span>                echo &quot;RealServer Start OK &quot;</span></span>
<span class="line"><span>                ;;</span></span>
<span class="line"><span>        stop)</span></span>
<span class="line"><span>                ifconfig lo:0 down</span></span>
<span class="line"><span>                route del $VIP /dev/null 2&gt;&amp;1</span></span>
<span class="line"><span>                echo &quot;0&quot; &gt;/proc/sys/net/ipv4/conf/lo/arp_ignore</span></span>
<span class="line"><span>                echo &quot;0&quot; &gt;/proc/sys/net/ipv4/conf/lo/arp_announce</span></span>
<span class="line"><span>                echo &quot;0&quot; &gt;/proc/sys/net/ipv4/conf/all/arp_ignore</span></span>
<span class="line"><span>                echo &quot;0&quot; &gt;/proc/sys/net/ipv4/conf/all/arp_announce</span></span>
<span class="line"><span>                echo &quot;RealServer Stopd&quot;</span></span>
<span class="line"><span>                ;;</span></span>
<span class="line"><span>        *)</span></span>
<span class="line"><span>                echo &quot;Usage: $0 {start|stop}&quot;</span></span>
<span class="line"><span>                exit 1</span></span>
<span class="line"><span>        esac</span></span>
<span class="line"><span>        exit 0</span></span>
<span class="line"><span>			chmod +x web.sh</span></span>
<span class="line"><span>			service web.sh start</span></span>
<span class="line"><span>			ifup lo:0</span></span>
<span class="line"><span>	keepalived配置</span></span>
<span class="line"><span>		cd /etc/keepalived/</span></span>
<span class="line"><span>		vim keepalived.conf</span></span>
<span class="line"><span>		主服务器修改内容</span></span>
<span class="line"><span>			smtp_server 127.0.0.1</span></span>
<span class="line"><span>			router_id LVS_01</span></span>
<span class="line"><span>			state MASTER</span></span>
<span class="line"><span>			interface ens33</span></span>
<span class="line"><span>			virtual_router_id 51</span></span>
<span class="line"><span>			priority 100</span></span>
<span class="line"><span>			 virtual_ipaddress {</span></span>
<span class="line"><span>        192.168.200.10</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			virtual_server 192.168.200.10 80 {</span></span>
<span class="line"><span>			lb_kind DR</span></span>
<span class="line"><span>			real_server 192.168.200.110 80 {</span></span>
<span class="line"><span>        weight 1</span></span>
<span class="line"><span>        TCP_CHECK {</span></span>
<span class="line"><span>            connect_port 80</span></span>
<span class="line"><span>            connect_timeout 3</span></span>
<span class="line"><span>            nb_get_retry 3</span></span>
<span class="line"><span>            delay_before_retry 3</span></span>
<span class="line"><span>        }   </span></span>
<span class="line"><span>    }   </span></span>
<span class="line"><span>    real_server 192.168.200.120 80 {</span></span>
<span class="line"><span>        weight 1</span></span>
<span class="line"><span>        TCP_CHECK {</span></span>
<span class="line"><span>            connect_port 80</span></span>
<span class="line"><span>            connect_timeout 3</span></span>
<span class="line"><span>            nb_get_retry 3</span></span>
<span class="line"><span>            delay_before_retry 3</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }   </span></span>
<span class="line"><span></span></span>
<span class="line"><span>		从服务器修改内容</span></span>
<span class="line"><span>			smtp_server 127.0.0.1</span></span>
<span class="line"><span>			router_id LVS_02</span></span>
<span class="line"><span>			state BACKUP</span></span>
<span class="line"><span>			interface ens33</span></span>
<span class="line"><span>			virtual_router_id 51</span></span>
<span class="line"><span>			priority 90</span></span>
<span class="line"><span>			 virtual_ipaddress {</span></span>
<span class="line"><span>        192.168.200.10</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			virtual_server 192.168.200.10 80 {</span></span>
<span class="line"><span>			lb_kind DR</span></span>
<span class="line"><span>			real_server 192.168.200.110 80 {</span></span>
<span class="line"><span>        weight 1</span></span>
<span class="line"><span>        TCP_CHECK {</span></span>
<span class="line"><span>            connect_port 80</span></span>
<span class="line"><span>            connect_timeout 3</span></span>
<span class="line"><span>            nb_get_retry 3</span></span>
<span class="line"><span>            delay_before_retry 3</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>   real_server 192.168.200.120 80 {</span></span>
<span class="line"><span>        weight 1</span></span>
<span class="line"><span>        TCP_CHECK {</span></span>
<span class="line"><span>            connect_port 80</span></span>
<span class="line"><span>            connect_timeout 3</span></span>
<span class="line"><span>            nb_get_retry 3</span></span>
<span class="line"><span>            delay_before_retry 3</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx负载均衡" tabindex="-1"><a class="header-anchor" href="#nginx负载均衡"><span>Nginx负载均衡</span></a></h3>`,5)]))}const v=n(l,[["render",p],["__file","负载均衡.html.vue"]]),r=JSON.parse('{"path":"/notes/devops/%E9%83%A8%E7%BD%B2%E3%80%81%E9%85%8D%E7%BD%AE/%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html","title":"负载均衡架构","lang":"zh-CN","frontmatter":{"title":"负载均衡架构","description":"LVS负载均衡 LVS + keepalived双机热备负载均衡高可用 Nginx负载均衡","icon":"","date":"2024-09-21T00:00:00.000Z","category":["运维"],"tag":["负载均衡架构"],"head":[["meta",{"property":"og:url","content":"https://ErenJaegerKing.github.io/notes/devops/%E9%83%A8%E7%BD%B2%E3%80%81%E9%85%8D%E7%BD%AE/%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html"}],["meta",{"property":"og:site_name","content":"ErenJaeger"}],["meta",{"property":"og:title","content":"负载均衡架构"}],["meta",{"property":"og:description","content":"LVS负载均衡 LVS + keepalived双机热备负载均衡高可用 Nginx负载均衡"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-10T07:58:23.000Z"}],["meta",{"property":"article:author","content":"ErenJaegerKing"}],["meta",{"property":"article:tag","content":"负载均衡架构"}],["meta",{"property":"article:published_time","content":"2024-09-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-10T07:58:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"负载均衡架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-09-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-10T07:58:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ErenJaegerKing\\",\\"url\\":\\"https://ErenJaegerKing.github.io\\",\\"email\\":\\"erenjaegerking@qq.com\\"}]}"]]},"headers":[{"level":3,"title":"LVS负载均衡","slug":"lvs负载均衡","link":"#lvs负载均衡","children":[]},{"level":3,"title":"LVS + keepalived双机热备负载均衡高可用","slug":"lvs-keepalived双机热备负载均衡高可用","link":"#lvs-keepalived双机热备负载均衡高可用","children":[]},{"level":3,"title":"Nginx负载均衡","slug":"nginx负载均衡","link":"#nginx负载均衡","children":[]}],"git":{"createdTime":1726899963000,"updatedTime":1728547103000,"contributors":[{"name":"ErenJaeger","email":"ErenJaegerKing@qq.com","commits":1}]},"readingTime":{"minutes":3,"words":901},"filePathRelative":"notes/devops/部署、配置/负载均衡.md","localizedDate":"2024年9月21日","excerpt":"<h3>LVS负载均衡</h3>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>LVS负载均衡</span></span>\\n<span class=\\"line\\"><span>\\t拓扑图</span></span>\\n<span class=\\"line\\"><span>\\tlvs软件安装</span></span>\\n<span class=\\"line\\"><span>\\t\\tyum install ipvsadm -y</span></span>\\n<span class=\\"line\\"><span>\\tApache软件安装</span></span>\\n<span class=\\"line\\"><span>\\t\\tyum install httpd -y</span></span>\\n<span class=\\"line\\"><span>\\tlvs配置双网卡</span></span>\\n<span class=\\"line\\"><span>\\t\\tsystemctl status NetworkManager</span></span>\\n<span class=\\"line\\"><span>网络管理服务：关闭状态不做任何网络修正，开启后自行添加网卡，自行修改地址</span></span>\\n<span class=\\"line\\"><span>\\t\\tcp -p ifcfg-ens33 ifcfg-ens35</span></span>\\n<span class=\\"line\\"><span>\\t\\tens33外网卡  12.0.0.1/24</span></span>\\n<span class=\\"line\\"><span>\\t\\tens35内网卡 192.168.200.1/24</span></span>\\n<span class=\\"line\\"><span>\\t\\t编辑修改ens35</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tBOOTPROTO=\\"static\\"</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tIPADDR=\\"192.168.200.1\\"</span></span>\\n<span class=\\"line\\"><span>NETMASK=\\"255.255.255.0\\"</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tNAME=\\"ens35\\"</span></span>\\n<span class=\\"line\\"><span>DEVICE=\\"ens35\\"</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t删除UUID行</span></span>\\n<span class=\\"line\\"><span>\\t\\t编辑修改ens33</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tBOOTPROTO=\\"static\\"</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tIPADDR=\\"12.0.0.1\\"</span></span>\\n<span class=\\"line\\"><span>NETMASK=\\"255.255.255.0\\"</span></span>\\n<span class=\\"line\\"><span>\\t\\t重启网络配置</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tsystemctl restart network</span></span>\\n<span class=\\"line\\"><span>\\t\\t结果</span></span>\\n<span class=\\"line\\"><span>\\tweb网卡配置</span></span>\\n<span class=\\"line\\"><span>\\t\\tweb1</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tIPADDR=\\"192.168.200.110\\"</span></span>\\n<span class=\\"line\\"><span>NETMASK=\\"255.255.255.0\\"</span></span>\\n<span class=\\"line\\"><span>GATEWAY=\\"192.168.200.1\\"</span></span>\\n<span class=\\"line\\"><span>\\t\\tweb2</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tIPADDR=\\"192.168.200.120\\"</span></span>\\n<span class=\\"line\\"><span>NETMASK=\\"255.255.255.0\\"</span></span>\\n<span class=\\"line\\"><span>GATEWAY=\\"192.168.200.1\\"</span></span>\\n<span class=\\"line\\"><span>\\t\\t清空防火墙规则</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tiptables -F</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tsetenforce 0</span></span>\\n<span class=\\"line\\"><span>\\t\\t启动Apache网站服务</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tsystemctl start httpd</span></span>\\n<span class=\\"line\\"><span>\\t配置网站页面</span></span>\\n<span class=\\"line\\"><span>\\t\\t进入站点</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tcd /var/www/html/</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tvim index.html</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t&lt;h1&gt;this is xykj web1&lt;/h1&gt;</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tweb2服务器配置同上</span></span>\\n<span class=\\"line\\"><span>\\tlvs服务器启动路由转发</span></span>\\n<span class=\\"line\\"><span>\\t\\tvim /etc/sysctl.conf</span></span>\\n<span class=\\"line\\"><span>\\t\\t开启路由转发功能添加    net.ipv4.ip_forward=1</span></span>\\n<span class=\\"line\\"><span>\\t\\t生效   sysctl -p</span></span>\\n<span class=\\"line\\"><span>\\t\\t清空防火墙规则</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tiptables -F</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t清空nat表  iptables -t nat -F</span></span>\\n<span class=\\"line\\"><span>\\t\\t制定nat转发规则</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tiptables -t nat -A POSTROUTING -o ens33 -s 192.168.200.0/24 -j SNAT --to-source 12.0.0.1</span></span>\\n<span class=\\"line\\"><span>\\t加载lvs内核模块</span></span>\\n<span class=\\"line\\"><span>\\t\\tmodprobe ip_vs</span></span>\\n<span class=\\"line\\"><span>\\t\\tcat /proc/net/ip_vs</span></span>\\n<span class=\\"line\\"><span>\\t\\t报错处理：</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tipvsadm --save &gt; /etc/sysconfig/ipvsadm</span></span>\\n<span class=\\"line\\"><span>\\t\\t制定负载均衡规则</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tcd /opt</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tvim nat.sh</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t#!/bin/bash</span></span>\\n<span class=\\"line\\"><span>ipvsadm -C</span></span>\\n<span class=\\"line\\"><span>ipvsadm -A -t 12.0.0.1:80 -s rr</span></span>\\n<span class=\\"line\\"><span>ipvsadm -a -t 12.0.0.1:80 -r 192.168.200.110:80 -m</span></span>\\n<span class=\\"line\\"><span>ipvsadm -a -t 12.0.0.1:80 -r 192.168.200.120:80 -m</span></span>\\n<span class=\\"line\\"><span>ipvsadm</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>\\t\\t启动脚本</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tsource nat.sh</span></span>\\n<span class=\\"line\\"><span>\\t客户端配置</span></span>\\n<span class=\\"line\\"><span>\\t\\t子主题</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{v as comp,r as data};
