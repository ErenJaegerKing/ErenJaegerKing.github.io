---
title: "Docker学校课堂笔记"
description: ""
icon: ""
date: 2024-09-24
category:
  - 运维
tag:
  - Docker
---
:::info
这是我学校课程的课堂笔记，很详细
:::
## 1.简介
- Docker是一个开源的应用容器引擎
- 诞生于2013年初，基于Go语言实现，dotCloud公司出品（后改名为Docker  inc）
- Docker可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux机器上；
- 容器是完全使用沙箱机制，相互隔离
- 容器性能开销极低
- Docker从17.03版本之后  分为CE（Community  Edition：社区版）和EE（Enterprise  Edition企业版）

小结：docker是一种容器技术，解决软件跨环境迁移的问题；
## 2.安装Docker
Docker可以 运行在MAC、Windows、CentOS、UBUNTU等操作系统上，我们基于Centos安装Docker。官网：https://www.docker.com
安装Docker步骤命令：
```shell
1.yum包更新到最新
    yum  update  -y
2.安装需要的软件包，yum-util提供yum-config-manager功能，另外两个是devicemapper驱动依赖的；
   yum  install  -y  yum-utils  device-mapper-persistent-data  1vm2
3.设置yum源
wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo

如下方式以前的时候也能 用 但是最近不行了
yum-config-manager --add-repo  https://download.docker.com/linux/centos/docker-ce.repo

4.安装docker，出现输入的界面都按y
yum  install  -y   docker-ce
5.查看docker版本  验证是否验证成功
docker -v
6.设置docker 开机自启动
systemctl   enable  docker
```
## 3.Docker架构
![Docker架构](https://drawingbed-686.pages.dev/myblog/202409241259032.png)
- 镜像（Image）：Docker镜像（Image），就相当于是一个root文件系统。比如官方镜像ubuntu：16.04就包含了完整的一套Ubuntu16.04最小系统的root文件系统。
- 容器（Container）：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和对象的关系，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动停止、删除、暂停等；
- 仓库（Repository）：仓库可看成一个代码控制中心，用来保存镜像；

记住一点：镜像 跟容器 之前关系紧密，先有镜像 然后 就可以 生产出很多个该镜像对应的容器出来；

## 4.配置docker镜像加速器
 默认情况下，将来从docker  hub（https://hub.docker.com/）上下载docker镜像太慢。一般都会配置镜像加速器，国内镜像加速器有：
 
 - USTC：中科大镜像加速器（https://docker.mirrors.ustc.edu.cn）
 - 阿里云
 - 网易云
 - 腾讯云

容器镜像服务：选择自己对应的系统按照阿里给出的提示指令进行复制黏贴操作这些指令

最新镜像加速器：
```shell
{
  "registry-mirrors":["https://hub.atomgit.com"]
}
```
更换加速器 通用方法  但是其中 镜像地址  要根据情况  随时更换：
```shell
step1：
在etc目录下创建一个叫做docker的文件夹（如若没有就创建一下）
step2 ：
在/etc/docker 目录下创建一个文件  文件里面书写 我们的镜像仓库配置内容；
vim  daemon.json
在该配置文件当中书写：
{
    "registry-mirrors":["https://docker.anyhub.us.kg"]
}
step3:
重新load一下配置文件
systemctl     daemon-reload
step4:
重启我们的docker 服务
systemctl   restart  docker
 
测试下拉镜像：
docker  pull   nginx
```
当我们进行下载镜像的时候 如果镜像名称后面 没有书写 版本号的话那么默认下载的就是最新的 当前镜像版本 也就是latest（最新的）
如果需要下载指定版本的 某镜像的话可以去docker  hub上搜索对应的镜像所有版本  查找到自己需要的镜像的版本号：
docker  pull  镜像名称:镜像版本号  
这样就可以下载到我们需要的指定版本的 镜像了；
## 5.Docker命令
忘记命令的话可以去  https://www.runoob.com/docker/docker-command-manual.html  查找相关命令

### docker服务相关命令
- 启动docker服务   systemctl   start  docker
- 停止docker服务   systemctl   stop  docker
- 重启docker服务   systemctl  restart  docker
- 查看docker服务状态systemctl  status  docker
- 开机启动docker服务  systemctl    enable  docker

### docker镜像相关命令
- 查看镜像 (查看本地已经存在的镜像) docker  images
- 查看所有镜像的  ID      docker  images -q
- 搜索镜像：从网络中查找需要的镜像   docker   search 镜像名称（该命令并不能帮助我们查找所有某镜像的版本 帮我们查找的内容是含有搜索内容的名称的所有镜像）
- 拉取镜像  从Docker仓库下载镜像到本地，镜像名称格式为 名称：版本号，如果版本号不指定则是最新的版本。如果不知道镜像版本，可以去docker  hub 搜索对应镜像查看版本；
      docker  pull   镜像名称
- 删除镜像:删除本地镜像  docker   rmi  镜像id      也可以  docker  rmi  镜像名称:版本号 
- 删除所有本地镜像  ：    docker   rmi   ·docker  images  -q·  删除所有本地镜像（符号是tab按键上面的撇）

其中查看镜像 删除镜像都是对本地仓库进行操作   搜索镜像  拉取镜像 是对远程仓库进行的操作；
在进行下拉镜像过程中可以指定版本号进行下拉镜像，docker  pull   镜像名称：版本号
如果不清楚镜像 存在哪些版本  我们可以登录  hub.docker.com(不太好访问)         网站上进行搜索查询；

### Docker容器相关命令
- 查看正在运行的容器    docker   ps
- 查看所有容器（包括没有运行的容器）  docker  ps  -a
- 创建并启动容器  docker   run  参数
```text
      参数说明
      -i  ：保持容器运行，通常与-t同时使用，加入it这两个参数后，容器创建后自动进入容器中，退出容器后，容器自动关闭；
      -t  ：为容器重新分配一个伪输入终端，通常与-i同时使用
      -d ：以守护（后台）模式运行容器。创建一个容器在后台运行，需要使用docker exec进入容器。退出后  容器不会关闭；
      -it ：创建的容器一般称为交互式容器，-id创建的容器一般称为守护式容器
     --name：为创建的容器命名

启动容器：docker  start  容器名称或者容器ID
关闭容器：docker   stop   容器名称 或者容器ID
进入某容器：docker  exec   容器名称  （docker  exec  -it   my  /bin/bash）
删除某容器（注意 删除容器的时候 容器必须是关闭状态才可以进行删除）：docker  rm  容器名称
查看容器信息：  docker   inspect  容器名称
查看所有容器的id：docker  ps  -aq   
删除所有容器   docker  rm  ·docker  ps  -aq·


实操：
创建一个名字叫做c1  包含xx镜像内容到当前容器的容器  
docker   run  -it    --name  c1    镜像名称:镜像版本    /bin/bash  
执行后发现直接进入到了新创建的这个叫做c1的容器中  这个时候 如果想要退出当前的 容器 执行  exit即可  就可以退回到 linux容器；
docker  run  -id  --name  c2  mysql:latest 
这个指令执行后是创建启动一个叫做c2的容器 这个容器后台运行并且  默认不进入该容器中；
此时想要进入该容器 执行  docker  exec  -it  c2   /bin/bash 
```
## 6.Docker 容器数据卷
### 数据卷概念  
思考：
Docker容器删除后再容器中产生的数据还在么？
Docker容器和外部机器可以直接交换文件吗？

数据卷概念：
- 数据卷是宿主机中的一个目录或者文件；
- 当容器目录和数据卷绑定后，双方的修改会立即同步；
- 一个数据卷可以被多个容器同时挂载

数据卷作用：
- 容器数据持久化（记住一点：当我们删除一个容器的时候 之前同步到  数据卷中的该容器上传的文件数据内容不会被删除）
- 外部机器和容器间接通信
- 容器之间数据交换

### 配置数据卷
```shell
创建启动容器时，使用-v参数设置数据卷：
docker   run    ...  -v  宿主机目录（文件）：容器内目录（文件）  ...

注意事项

1.目录必须是绝对路径；
2.如果目录不存在，会自动创建（指的是宿主机当中如若没有 该目录会去进行创建）；
3.一个数据卷可以被多个容器进行挂载   ；一个容器可以挂载多个数据卷；
4.当删除某容器后  在外的数据卷目录中的数据不会被删除；

一般情况下我们建议在创建容器的时候就去挂载数据卷，标准写法是：

docker   run  -it   --name  n2      -v   /nginxvol:/etc     nginx:latest   /bin/bash
```
也可以 一个 容器绑定多个数据卷（一般情况下不会这么用）

多容器之间互相通信：当两个或者两个以上容器共同挂载同一份数据卷的时候，彼此容器之间可以实现文件内容互相传输；

### 数据卷容器
为什么会出现数据卷容器一说？是因为在docker中一旦容器创建好了  之后不太容易 再去为已经创建好的容器去进行增加数据卷挂载；

多容器进行数据交换：
1.多个容器挂载同一个数据卷；
2.使用数据卷容器

![数据卷容器](https://drawingbed-686.pages.dev/myblog/202409241313200.png)

其中这个c3容器就是数据卷容器，相当于  我们先创建一个c3容器，让c3容器挂载到一个数据卷上；
然后创建c1  c2两个容器的时候分别挂载到c3 容器上，这样一来 相当于三个容器都挂载到相同数据卷上；
注意：1.即便c3容器挂掉 也不会影响c1  以及c2  使用数据卷 因为挂载已经完成，内部挂载关系已经成立了；
           2.思考：数据卷容器存在的意义是什么？貌似单独创建了一个容器什么也不做，只是一门心思去挂载一个数据卷。
我们之前多个容器自己单独挂载到相同目录实现容器之间互相共用一个数据卷 也能实现现在的效果。那么数据卷容器的存在意义是什么？
       假如有这样一种情形有100个容器都挂载到宿主机相同目录数据卷上 了，突然有一天  宿主机想要更换一下当前目录，那么按照以前的那种处理方式的话我们需要  每个容器都要进行更改，意味着要操作100次更改。但是如果是通过 数据卷容器这种方式的话我们只需要更改 数据卷容器即可，因为通过数据卷容器这种方式 进行的挂载  其他容器是挂载到当前容器的，当前容器发生更改 其他的也会进行同步更改  为我们节约时间提升效率；

实现数据卷容器案例：
```shell
创建  一个数据卷容器叫做c3  ，创建两个其他容器  c1、c2  让c1  c2  挂载到c3上  然后测试实验数据卷容器：
step1：创建启动c3数据卷容器
docker run  -it  --name c3 -v /vdata centos:7  /bin/bash

step2：创建c1  c2  容器  分别挂载到c3上：
docker   run  -it   --name  c1  --volumes-from  c3  centos:7  /bin/bash
docker   run  -it  --name   c2 --volumes-from  c3   centos:7  /bin/bash

可以通过docker  inspect  c1   
      docker  inspect  c3 
    docker  inspect  c2  命令去查看具体每个容器情况  在展示内容信息中观察 mounts部分内容 当中带有对当前容器数据卷内容描述；

可观察到 c2容器目录中多出vdata目录；
c1容器同理；
并且  c2 c1 以及c3容器他们mounts 部分  Source内容也是相同的:
二者是相同的（其实三者都是相同的）；
即便数据卷容器 关闭掉了  不会影响其他挂载到数据卷容器之间数据交换；
即便数据卷容器关闭掉了 依旧可以新建容器的时候 挂载到当前数据卷容器当中；
```
## 7.Docker应用部署
### Mysql部署
需求：在Docker容器中部署Mysql 并通过外部mysql客户端操作Mysql  Server
实现步骤：
1.搜索mysql镜像
2.拉取mysq镜像
3.创建容器
4.操作容器中的mysql
注意：容器内的网络服务和外部机器不能直接进行通信，但外部机器和宿主机可以直接通信；宿主机和容器可以直接通信：
当容器中的网络服务需要被外部机器访问时候，可以将容器中提供服务的端口映射到宿主机的端口上。外部及起访问素质及的改端口，从而间接访问容器的服务，这种操作成为端口映射；
![端口映射](https://drawingbed-686.pages.dev/myblog/202409241323412.png)
实操：
```shell
1.搜索mysql镜像：
  docker   search   mysql
2. 拉取mysql镜像
  docker   pull    mysql：5.6
3.创建容器，设置端口映射、目录映射
    在root目录下创建mysql目录用于存储mysql数据信息
    mkdir  ~/mysql
    cd  ~/mysql
    而后开始创建mysql容器：
    docker  run  -id  \
     -p  3307:3306  \
     -- name  c_mysql \
     -v  $PWD/conf:/etc/mysql/conf.d\
     -v $PWD/logs:/logs \
     -v  $PWD/data:/var/lib/mysql \
     -e  MYSQL_ROOT_PASSWORD=root  \
   mysql:5.6
   参数说明：
1.-p 3307:3306  ：将容器的3306端口映射到宿主机3307端口；
2.-v  $PWD/conf:/etc/mysql/conf.d: 将主机当前目录下的conf/my.cnf挂载到容器的 /etc/mysql/my.cnf 配置目录
3.-v $PWD/logs:/logs ：将主机当前目录下的logs目录挂载到容器的 /logs 日志目录
4.-v  $PWD/data:/var/lib/mysql  ：将主机当前目录西安的data目录 挂载到容器的  /var/lib/mysql 数据目录
5.-e  MYSQL_ROOT_PASSWORD=root  ：初始化root用户的密码

进入到当前的容器中：  docker  exec   -it   c_mysql    /bin/bash
在容器中启动进入  mysql服务以及客户端：   mysql  -uroot  -proot  回车后进入到mysql客户端；
```

### Tomcat部署
Tomcat简介：tomcat是一个应用服务器 是一个专门用来 运行web项目使用的服务器  该软件 专门用于启动 后 处理 请求与响应使用的；
> tomcat软件本身的端口号 是8080；

需求：在docker容器中部署Tomcat，并通过外部机器访问Tomcat部署的项目。
实现步骤：
1.搜索tomcat镜像
2.拉取tomca镜像
3.创建容器
4.部署项目
5.测试访问
```shell
1.搜索tomcat镜像
  docker  search  tomcat
2.拉取tomcat镜像
  docker  pull  tomcat  
3.创建容器 ，设置端口映射、目录映射

mkdir   ~/tomcat

cd  ~/tomcat

docker  run    -id  --name  c_tomcat \
-p  8080:8080 \
-v  $PWD:/usr/local/tomcat/webapps \
tomcat：7
 

参数说明：
-p  8080:8080：将容器的8080端口 映射到主机的8080端口
-v  $PWD:/usr/local/tomcat/webapps  ：将主机中当前目录挂载到容器的webapps
 
此时在我们linux服务器的  ~/tomcat 目录下 创建一个文件夹 在该文件夹中创建一个html页面文件   并编辑一些内容进去保存 而后在windows系统中直接访问该页面：访问成功！
```
### Nginx部署
需求：在Docker容器中部署Nginx，并通过外部机器访问Nginx

实现步骤：
1.搜索
2.拉取 
3.创建容器
4.部署项目
5.测试访问

```shell
1.搜索 nginx镜像
docker  search   nginx
2.拉取nginx镜像
docker  pull  nginx
3.创建容器，设置端口映射、目录映射
#在/root  目录下 创建 nginx 目录用于存储nginx数据信息
mkdir  ~/nginx
cd  ~/nginx
 
4.提前创建好nginx.conf 目录
mkdir   conf
cd  conf
vim  nginx.conf   
```

将如下内容添加到配置文件中：

```shell
#user  nobody   nginx启动的所属用户,默认为nobody;
# nginx的最大worker的最大进程数   建议设置为当前服务器的CPU核数
worker_processes  1;
 
# 错误日志的日志级别 , 错误日志的路径位置
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
 
#pid的路径位置
#pid        logs/nginx.pid;
 
 
events {
    #单个进程最大连接数
    worker_connections  1024;
}
 
#设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
    #文件扩展名与文件类型映射表
    include       mime.types;
 
    # 默认的类型
    default_type  application/octet-stream;
 
    # access.log日志的格式设置,默认为下面的格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    
    #access.og文件配置
    #access_log  logs/access.log  main;
 
 
    #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用        设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
    sendfile        on;
 
    #此选项允许或禁止使用socke的TCP_CORK的选项，此选项仅在使用sendfile的时候使用
    #tcp_nopush     on;
 
    #长连接超时时间,单位是秒
    #keepalive_timeout  0;
    keepalive_timeout  65;
 
 
    # 开启压缩输出,压缩数据使得数据传输更快
    #gzip  on;
 
 
    #虚拟主机的配置
    server {
 
        #监听的端口,默认为80
        listen       80;
 
        #域名可以有多个，用空格隔开
        server_name  localhost;
 
        #charset koi8-r;
        
 
        #定义本虚拟主机的访问日志
        #access_log  logs/host.access.log  main;
 
 
        #对"/"请求路径进行代理
        location / {
 
            #root表示根目录 , html表示根目录下的html文件夹
            root   html;
            
            #被访问的文件
            index  index.html index.htm;
        }
 
        # 错误页面   
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
 
    }
 
}
```
保存 后 开始创建   nginx容器：
```shell
docker   run  -id   --name  c_nginx  \
-p  80:80  \
-v  /root/conf/nginx.conf:/etc/nginx/nginx.conf  \
-v  /root/conf/logs:/var/log/nginx  \
-v  /root/conf/html:/etc/nginx/html/  \
nginx:latest


参数说明：
-p  80:80：将容器的80端口 映射到宿主机的80端口
-v  $PWD/conf/nginx.conf:/etc/nginx/nginx.conf ：将主机当前目录下的  /conf/nginx.conf 挂载到容器中的  etc/nginx/nginx.conf  上
然后我们进入到html目录  去创建一个html文件：

cd  html
vim index.html

<h1>heello</h1>

后保存  再次访问  ：http:/192.168.141.128  回车即可；
```
## 8.Dokcer镜像原理 （DockerFile）
### 概念
首先明确第一个概念 虚拟机 跟容器是有本质不同的，虚拟机具备 独立的 硬件 驱动  网络  等等 相当于是一台独立的pc一样
而我们的容器 相当于是站立在巨人的肩膀上 （站立在我们宿主机的基础上  单独   开辟出来 自己这一部分 必须需要的  特有的 东西  单独拎出来）

思考：

- Docker镜像本质是什么？
- Docker中一个centos镜像为什么只有200MB，而一个centos操作系统的iso文件要几个G？
- Docker中一个tomcat镜像为什么要有500MB，而一个tomcat安装包只有70多MB？

操作系统组成部分：

- 进程调度子系统
- 进程通信子系统
- 内存管理子系统
- 设备管理子系统
- 文件管理子系统
- 网络通讯子系统
- 作业控制子系统

Linux文件系统由bootfs和rootfs两部分组成

- bootfs：包含bootloader（引导加载程序）和kernel（内核）
- rootfs：root文件系统，包含的就是典型Linux系统中的/dev，/proc , /bin,/etc等标准目录和文件
- 不同的linux发行版，bootfs基本一样，而rootfs不同，如ubuntu ，centos等；

1.Docker镜像是由特殊的文件系统叠加而成；
2.最低端是bootfs，并使用宿主机的bootfs；（思考能否在linux操作系统上创建一个windows的docker？答案是不能的因为底层bootsfs不同，不能复用）
3.第二层是root文件系统rootfs，称为base  image；
4.然后再往上可以叠加其他的镜像文件
5.统一文件系统(Union  File  System) 技术能够将不同的层整合成一个文件系统，为这些层提供了一个统一的视角，这样 就隐藏了多层的存在，在用户的角度看来，只存在一个文件系统。
6.一个镜像可以放在另一个镜像的上面。位于下面的镜像称为父镜像，最底部的镜像成为基础镜像。
7.当从一个镜像启动容器时，Docker会在最顶层加载一个读写文件系统作为容器。

![新的镜像](https://drawingbed-686.pages.dev/myblog/202409241335679.png)

思考总结：
1. Docker镜像本质是什么？
  是一个分层文件系统；
2. Docker中一个centos镜像为什么只有200MB，而一个centos操作系统的iso文件要几个G？
      centos的iso镜像文件包含bootfs和rootfs，而docker的centos镜像复用操作系统的bootfs（较大较占体积），只有rootfs和其他镜像层；
3. Docker中一个tomcat镜像为什么有500MB，而一个tomcat安装包只有70多mb？
    由于docker中镜像是分层的，tomcat虽然只有70多MB，但他需要依赖于父镜像和基础镜像，所有整个对外暴露的tomcat镜像大小500多MB
### 镜像制作
Dokcer镜像如何制作？
1. 容器转为镜像
```shell
 docker  commit  容器 id       镜像名称:版本号
 docker  save   -o  压缩文件名称   镜像名称:版本号
 docker  load   -i    压缩文件名称  (解压压缩文件成为镜像文件)
```
![容器转为镜像](https://drawingbed-686.pages.dev/myblog/202409241340557.png)
通过上述这种方式(docker commit)封装成的镜像是存在一定问题的， 除去当初原始镜像数据卷上的文件还在  镜像本身内部原始容器中的文件都不存在了；例如  放置在tomcat容器webapps目录中的内容  不存在了  ；一般情况下我们不建议使用该种方法进行打包镜像；
总结用上述方法会导致容器中 通过数据卷方式添加进来的数据内容在进行打包镜像的时候会被遗弃；

2. DockerFile 去打包镜像 

DockerFile基本概念
dockerfile就是一个文本文件，其中包含了一条条的指令；
每一条指令构建一层，基于基础镜像，最终构建出一个新的镜像；
对开发人员来说：可以为开发团队提供一个完全一致的开发环境；
对于测试人员：可以直接拿开发时所构建的镜像或者通过DockerFile文件构建一个新的镜像开始工作；

dockerhub官网网址：https://hub.docker.com

dockerFile关键字介绍：
![dockerFile关键字](https://drawingbed-686.pages.dev/myblog/202409241339167.png)


**dockerFile案例1：**
 案例1需求：
自定义centos7镜像，要求：
1.默认登录路径为/usr
2.可以使用vim
案例1实现步骤：
1.定义父镜像：FROM  centos:7
2.定义作者信息：MAINTAINER    sunzheng<kuizhewudi@163.com>
3.执行安装vim命令：RUN yum   install -y  vim
4.定义默认的工作目录 ：WORKDIR /usr
5.定义容器启动执行的命令：CMD /bin/bash
 
注意：如何区分理解    RUN命令跟CMD命令
           RUN ：是当容器已经启动并且进入以后要去进行执行的
           CMD：是容器刚启动起来立即要进行的（跟容器刚刚start相关）

实操：
```shell
cd  ~
mkdir   docker-files
cd   docker-files/
vim  centos_dockerfile
#进入编辑内容部分 编辑内容为：
FROM centos:7
MAINTAINER  sunzheng <kuizhewudi@163.com>
RUN     yum  install  -y  vim
WORKDIR  /user
CMD   /bin/bash
#esc  输入  ：wq进行保存
docker  build   -f  ./centos_dockerfile  -t  sunzheng_centos:1 .
#执行当看到 succesfully 提示文案的时候代表  该镜像  创建成功
```

使用dockerFile进行打包镜像的语句：
``` shell
docker  build  -f    dockerfile文件的相对路径/绝对路径   -t   镜像名称:版本名称  .
```

**dockerFile  案例2：**
案例2需求：
定义dockerfile，发布springboot项目；
案例2实现步骤：
1.定义父镜像： FROM   java:8
2.定义作者信息：MAINTARNER   sunzheng <kuizhewudi@163.com>
3.将jar包添加到容器：add  springboot.jar   app.jar
4.定义容器启动执行的命令： CMD java  -jar   app.jar
5.通过dickerfile构建镜像：docker  build  -f  dockerfile 文件路径 -t  镜像名称：版本
实操：
首先要在自己本地创建一个springboot项目：
最好是maven的  Springmvc项目，而后通过maven打包成一个jar文件 将该jar文件上传到 linux   home目录账户目录下；

```shell
cd  ~
cd  docker-files
vim springboot_dockerfile
#进入编辑界面开始编辑
FROM   java:8
MAINTAINER  sunzheng<kuizhewudi@163.com>
ADD test.jar  /app.jar
CMD  java -jar  /app.jar
EXPOSE  8080
#而后  ESA  ：wq保存
docker  build  -f ./springboot_dockerfile  -t app:1 .
#然后创建容器
docker  run   -it  --name  myboot -p  8080:8080  app:1  /bin/bash
```

## 9.Docker服务编排工具  Docker Compose
### 服务编排概念
微服务架构的应用系统中一般包含若干个微服务，每个微服务一般都会部署多个实例，如果每个微服务都要手动启停
维护的工作量会很大。例如：
- 要从Dockerfilebuildimage或者去dockerhub拉取image
- 要创建多个container
- 要管理这些container(启动停止删除)

服务编排（Docker pose）：按照一定的业务规则批量的管理容器的过程

DockerCompose：Docker Compose是一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建启动和停止。
1. 利用 Dockerfile定义运行环境镜像
2. 使用 docker-compose.yml定义组成应用的各服务
3. 运行 docker-compose up 启动应用

### Docker  compose安装和使用（参考网站）
```shell
#下载docker-compose文件
 curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
 #将文件复制到/usr/local/bin环境变量下面
mv docker-compose /usr/local/bin
#给他一个执行权限
chmod +x /usr/local/bin/docker-compose
#查看是否安装成功
docker-compose -v
查看到版本号即表示安装成功
```

如果以上方式下载过于缓慢 可以通过自行下载上传 然后安装该工具方式进行实现：

https://blog.csdn.net/m0_63459865/article/details/136693757

下载后手动ftp上传   进行  移动文件目录  等  同上述后者操作；

如果想要卸载的话  直接执行 rm  /usr/local/bin/docker-compose即可

全称叫做yaml格式类型配置文件 。是一种配置文件的格式而已，就像XML类型配置文件的特点是标签之间包裹标签去实现层级关系一样，yaml配置文件也存有一定的配置规则：
1.同层级关系内容在进行配置的时候要求左边对齐；
2.高级的比下一级的要偏左 或者说下一级的要比上一级进行缩进书写（注意整个yml配置文件在进行实现缩进的时候不可以使用tab进行缩进，只能使用空格进行缩进关系）
3.一般我们要对一些属性进行赋值的时候  是属性 :  值（强调的是 冒号后面跟随值的时候冒号后面一定要加空格 至少一个空格）
4.我们在使用yml格式表达一些配置内容的时候  通过 - 表示数组中很多项的值,需要注意的是-符号后方跟随值得时候也要添加空格

当docker-compose安装成功之后我们来对其进行学习了解：
Docker Compose是一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建
启动和停止。

使用步骤:
1.利用 Dockerfile定义运行环境镜像
2.使用 docker-compose.yml定义组成应用的各服务
3.运行 docker-compose up 启动应用

案例借助docker-compose实现nginx反向代理springboot  app应用的案例（至少需要两个容器实现：）：
首先我们创建一个文件夹：dockercompose（这个随意）
进入当前文件夹后我们创建一个名字叫做 docker-compose.yml的文件（该文件名固定  不可以乱写）
docker-compose.yml中的内容(注意书写格式内容要遵循之前Java中yml格式要求  例如空格要求 以及缩进等):
该案例实现的是  nginx作为反向代理服务器（单独一个容器） 去访问我们的springboot项目（另外独立的一个容器）：

```shell
version: '3'
services: 
  nginx:
     image: nginx
     ports:
       - "80:80"
     links: 
       - app
     volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
  app:
   image: myboot
   expose: 
     - "8080"

解释说明参数：

version：指的是  当前docker-compose.yml配置文件的版本级别 不是docker-compose 软件的版本级别
services：指的是我们要创建的容器们（也就是服务们）
里面要开始去嵌套书写 一个一个的容器了
  image属性：当前容器要去进行创建使用使用的镜像（建议大家 镜像名称:版本号）
  ports属性：进行映射端口使用的  
     - "80:80" (注意在这里 左边的80指的是指向给宿主机的端口号  :右边的80指的是绑定到容器的端口)
  links属性：Nginx服务反向代理 的应用是哪个   
  volumes：数据卷
```

然后做好其他准备工作：
在宿主机上创建对应数据卷目录./nginx/conf.d
在该目录中创建一个文件名为 default.conf的文件，在该文件中输入如下内容：

```shell
server{
      listen  80;
      access_log  off;
      location / {
      proxy_pass  http://app:8000;
   } 
}
```
保存后   执行docker  compose的指令：
```shell
docker-compose  up -d
```
然后访问：http://192.168.178.128/test
即可访问成功证明nginx  反向代理boot项目成功；

### docker私有仓库搭建
像maven一样，一般情况下我们去引入本地不存在的资源的时候是通过远程服务资源中下载到本地仓库，下次如果还需要引入相同资源我们直接使用本地仓库内容即可；

docker也可以进行搭建私有仓库在公司内部进行使用；

Docker官方的Dockerhub(https://hub.docker.com)是一个用于管理公共镜像的仓库，我们可以从上面拉取镜像到本地，也可以把我们自己的镜像推送上去。但是，有时候我们的服务器无法访问互联网，或者你不希望将自己的镜像放到公网当中，那么我们就需要搭建自己的私有仓库来存储和管理自己的镜像。

私有仓库的搭建：
(ps:注意一般情况下我们私有服务仓库要跟我们的服务器分开  安全第一)

```shell
1.私有仓库镜像拉取
  docker  pull  registery
2.创建启动私有仓库容器
docker  run -id  --name  registry  -p 5000:5000 registry
3.打开浏览器输入地址 http://私有仓库服务器ip:5000/v2/_catalog
如果看到{"repositories":[]}表示私有仓库搭建成功
或者直接直接执行curl http://localhost:5000/v2/_catalog  展示如上内容证明私有仓库容器搭建成功
4.修改daemon.json（相当于添加信任  让当前私有仓库信任访问的服务ip）
vim  /etc/docker/daemon.json
在该文件中 添加一个key 保存退出 。此步骤用于让docker 信任私有仓库地址；
注意将私有仓库服务器ip修改为自己私有仓库服务器真实ip
{"insecure-registies":["私有仓库服务器ip:5000"]}
5.重启docker服务
systemctl  restart docker
docker  start  registry（启动私服容器）
```

==========》上传镜像：
1.先标记  
docker  tag     镜像名称：版本号   私有仓库服务器ip:5000/ 私服中镜像新名称：版本号
2.再上传push
docker push    私有仓库服务器ip:5000/私服镜像名称：版本号
========》下拉镜像：
docker  pull    私有仓局服务器ip:5000/私服务镜像名称：版本号

=======================================================================
Docker 支持的可视化客户端工具：
有很多很多，例如国内的1Panel  以及  Docker UI   等
在这里以1Panel+Centos7环境介绍使用：
概念:1Panel  :是一个开源的服务器运维管理面板；
首先去官网访问进行下载安装：
官网：https://1panel.cn/


补充：ip addr 可以查看  当前centos地址
让当前 虚拟机能够联网  设置:﻿https://blog.csdn.net/weixin_45213317/article/details/132171346

