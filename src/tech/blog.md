---
title: "部署博客"
description: ""
icon: ""
date: 2024-11-24
category:
  - 部署博客
tag:
  - 部署
  - 博客

---

:::info
部署博客的教程
:::

---
## 找博客模板

VuePress Theme Hope

## 买云服务器

阿里云 2核2G alibaba系统

## 安装Docker

[安装Docker](https://developer.aliyun.com/mirror/docker-ce?spm=a2c6h.13651102.0.0.57e31b11Pt8clX)

## 安装Nginx
### 使用Docker安装

[使用Docker安装Nginx](https://blog.csdn.net/BThinker/article/details/123507820)

```shell
docker run \
-p 80:80 \
--name nginx \
-v /usr/local/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /usr/local/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /usr/local/nginx/log:/var/log/nginx \
-v /usr/local/nginx/html:/usr/share/nginx/html \
-d nginx:latest
```

### 编译及配置Nginx

[安装Nginx环境](https://blog.csdn.net/weixin_65644655/article/details/142861486)

我的配置文件

```shell 
./configure --prefix=/usr/local/nginx --with-http_v2_module --with-http_ssl_module \
--pid-path=/var/run/nginx/nginx.pid \
--lock-path=/var/lock/nginx.lock --error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log --with-http_gzip_static_module \
--http-client-body-temp-path=/var/temp/nginx/client --http-proxy-temp-path=/var/temp/nginx/proxy \
--http-fastcgi-temp-path=/var/temp/nginx/fastcgi --http-uwsgi-temp-path=/var/temp/nginx/uwsgi \
--http-scgi-temp-path=/var/temp/nginx/scgi --conf-path=/usr/local/nginx/nginx.conf
```

[安装Node.JS环境](https://help.aliyun.com/zh/ecs/use-cases/deploy-a-node-js-environment-on-a-centos-7-instance?spm=a2c4g.11186623.help-menu-)

## 编写推送远程仓库和远程云服务器的脚本

[编写推送脚本](https://blog.mo7.cc/)

## 备案

[备案](https://zhuanlan.zhihu.com/p/371579941)

## 域名解析、SSL加密认证（Nginx相关配置）

[域名解析、SSL证书的配置](https://www.bilibili.com/video/BV1E7411S75M/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

[Nginx安装SSL模块](https://www.cnblogs.com/ambition26/p/14077773.html)

## Docker部署Minio对象存储系统用来存储图床

[Nginx-Minio反向代理+负载均衡](https://github.com/minio/minio/blob/master/docs/orchestration/docker-compose/nginx.conf)

[DockerCompose部署集群Minio](https://github.com/minio/minio/blob/master/docs/orchestration/docker-compose/docker-compose.yaml)

[使用Docker搭建MinIO集群服务 - 陌上荼靡 - 博客园](https://www.cnblogs.com/mstmdev/p/17212289.html)

[minio 高可用 （原理+秒懂+史上最全）_minio原理-CSDN博客](https://blog.csdn.net/crazymakercircle/article/details/120855464)

单机Minio部署的Docker指令
``` SHELL
docker run --net=host \
--name minio -d --restart=always \
-e "MINIO_ACCESS_KEY=minio@admin" \
-e "MINIO_SECRET_KEY=minio@admin" \
-v /usr/local/minio/data:/data \
-v /usr/local/minio/config:/root/.minio \
minio/minio server /data \
--console-address ":9090" --address ":9000"
```
