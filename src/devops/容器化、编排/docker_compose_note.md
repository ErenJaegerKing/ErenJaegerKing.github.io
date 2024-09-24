---
title: "Docker实现SpringBoot项目集群"
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


> 要求描述：启动三个项目 做 一个 Nginx 作为反向代理工具；启动一个 mysql 容器为三个服务提供数据支撑服务；

准备基础镜像：

```shell
docker pull  openjdk:8
docker pull  mysql:5.6
docker pull  nginx
```
在SpringBoot项目根目录下创建 Dockerfile文件，内容为：
```shell
# 使用官方Java运行时作为父镜像  
FROM openjdk:8
# 将Spring Boot应用的jar文件添加到容器中  
ADD target/blog-1.0-SNAPSHOT.jar  /blog.jar  
# 暴露容器的8080端口（根据你的Spring Boot应用配置调整）  
EXPOSE 8000
# 设置容器启动时执行的命令  
ENTRYPOINT ["java","-jar","/blog.jar"]
```
在构建项目镜像之前请首先注意配置文件部分有关数据库部分相关配置

在包含Dockerfile的目录中打开终端或命令行界面，运行以下命令来构建Docker镜像：
```cmd
docker build -t blog-0.0.1 .
```
此时检查镜像：
```shell
docker images
```
就可以查看到我们刚打包的镜像；

接下来 下载docker  compose  我们要借助 该工具来帮助我们实现docker  compose功能;
```shell
curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
```
创建docker-compose.yaml文件（建议在root目录下创建）
```shell
cd ~
vim  docker-compose.yaml
```
```shell
version: '3'  
services:  
  #Nginx Server  part
  nginx:
    image: nginx:latest  
    ports:  
      - "80:80"
    depends_on:
      - app1
      - app2
      - app3
    volumes:  
      - /root/docker-compose/nginx/nginx.conf:/etc/nginx/nginx.conf  
  #Springboot  server  part
  app1:
     image: blog-0.0.1:latest
     ports:  
      - "8001:8000"
     depends_on:  
      - db
      - redis
     environment:  
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/jiance 
      spring.redis.host: redis
      REDIS_HOST: redis
      REDIS_PORT: 6379
  app2:
     image: blog-0.0.1:latest
     ports:  
      - "8002:8000"
     depends_on: 
      - db
      - redis
     environment:  
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/jiance
      REDIS_HOST: redis
      REDIS_PORT: 6379
  app3:
     image: blog-0.0.1:latest
     ports:  
      - "8003:8000"
     depends_on: 
      - db
      - redis
     environment:  
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/jiance
      spring.redis.host: redis
      REDIS_HOST: redis
      REDIS_PORT: 6379
  #Mysql Server  part    
  db:  
    image: mysql:5.6
    ports:  
      - "3306:3306"
    environment:  
      MYSQL_ROOT_PASSWORD: root  
      MYSQL_DATABASE: jiance  
    volumes:  
      - /root/docker-compose/mysqldb:/var/lib/mysql
      - /root/docker-compose/mysql/my.cnf:/etc/mysql/my.cnf
   #redis  Server part
  redis:
    image: redis:alpine3.17
    ports:
     - "6379:6379"
    environment:
     - TZ=Asia/Shanghai
    volumes:
     - /root/redisvol/data:/data
```

接下来在宿主机的/root/docker-compose/mysql目录下 创建我们的my.cnf配置文件 直接在该配置文件中  书写以下内容进行保存退出：
```shell
[client]
default-character-set=utf8mb4
[mysql]
default-character-set=utf8mb4
[mysqld]
character-set-client-handshake=FALSE
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
```
接下来在宿主机的root/docker-compose/nginx目录下创建我们的nignx.conf配置文件,配置文件内容为：
```shell
user  nginx;  
worker_processes  1;  
error_log  /var/log/nginx/error.log warn;  
pid        /var/run/nginx.pid;  
  
events {  
    worker_connections  1024;  
}  
http {  
    include       /etc/nginx/mime.types;  
    default_type  application/octet-stream;  
  
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '  
                      '$status $body_bytes_sent "$http_referer" '  
                      '"$http_user_agent" "$http_x_forwarded_for"';  
  
    access_log  /var/log/nginx/access.log  main;  
  
    sendfile        on;  
    #tcp_nopush     on;  
  
    keepalive_timeout  65;  
  
    upstream blog {  
        server app1:8000;  
        server app2:8000;
        server app3:8000;
        ip_hash;
    }  
    server {  
        listen       80;  
        server_name  localhost;  
        location / {  
            proxy_pass http://blog;  
            proxy_set_header Host $host;  
            proxy_set_header X-Real-IP $remote_addr;  
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
            proxy_set_header X-Forwarded-Proto $scheme;
        }  
        error_page   500 502 503 504  /50x.html;  
        location = /50x.html {  
            root   /usr/share/nginx/html;  
        }  
    } 
}
```
保存后 ，切换到docker-compose.yml配置文件所在目录  借助 docker-compose启动 ，执行命令：
```shell
docker-compose up  -d
```
然后访问：http://宿主机ip/login.html 访问即可；

然后我们通过navicat链接我们容器中mysql  运行我们的数据脚本 后即可进行登录；

以上操作建议关闭掉防火墙并重启docker服务后进行以免防火墙对我们访问带来一定阻挠；

```shell
接下来我们进入到mysql容器中对数据库进行脚本操作：
docker  ps  查看 mysql容器id；
进入到mysql容器中：
docker exec -it mysqlid内容 bash
进入容器后  进入到mysql客户端执行命令：
mysql -uroot -p
```

或者使用Navicat链接当前数据库都行;

运行数据库脚本后 插入数据进行登录测试，测试成功；

截止目前  集群完成；