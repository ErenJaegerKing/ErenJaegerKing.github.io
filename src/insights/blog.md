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
部署博客的时候都做了哪些好玩的，看了其他人的博客
:::

---
## 安装Nginx

[安装Nginx环境](https://blog.csdn.net/weixin_65644655/article/details/142861486)

### 编译及配置Nginx

```shell
./configure --prefix=/usr/local/nginx --with-http_v2_module --with-http_ssl_module \
--pid-path=/var/run/nginx/nginx.pid \
--lock-path=/var/lock/nginx.lock --error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log --with-http_gzip_static_module \
--http-client-body-temp-path=/var/temp/nginx/client --http-proxy-temp-path=/var/temp/nginx/proxy \
--http-fastcgi-temp-path=/var/temp/nginx/fastcgi --http-uwsgi-temp-path=/var/temp/nginx/uwsgi \
--http-scgi-temp-path=/var/temp/nginx/scgi --conf-path=/usr/local/nginx/nginx.conf

# nginx.conf
worker_processes  1;

pid /var/run/nginx/nginx.pid;

error_log /var/log/nginx/error.log warn;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;

    keepalive_timeout 65;

    server {
        listen       80;
        server_name  he9.xin;
        rewrite ^/(.*)$ https://he9.xin:443/$1 permanent;
    }


    server {
        listen       443 ssl;
        http2 on;
        server_name  he9.xin;

        ssl_certificate      cert/full_chain.pem;
        ssl_certificate_key  cert/private.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;

        ssl_prefer_server_ciphers  on;

        location / {
            root   /usr/local/nginx/html/blog;
            index  index.html;
        }
    }

    upstream minioapi {
      server 127.0.0.1:9000;
    }

    upstream minioconsole {
      server 127.0.0.1:9090;
    }

    server {
        listen       9001 ssl;
        listen  [::]:9001 ssl;
        http2 on;
        server_name  he9.xin;

        ignore_invalid_headers off;
        client_max_body_size 6m;
        proxy_buffering off;
        proxy_request_buffering off;

        ssl_certificate      cert/full_chain.pem;
        ssl_certificate_key  cert/private.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;

        ssl_prefer_server_ciphers  on;

        access_log /var/log/nginx/minioapi_access.log main;

        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_connect_timeout 300;

            proxy_http_version 1.1;
            proxy_set_header Connection "";
            chunked_transfer_encoding off;

            proxy_pass http://minioapi;
        }
    }

    server {
        listen       9091 ssl;
        listen  [::]:9091 ssl;
        http2 on;
        server_name  he9.xin;

        ignore_invalid_headers off;
        client_max_body_size 0;
        proxy_buffering off;
        proxy_request_buffering off;

        ssl_certificate      cert/full_chain.pem;
        ssl_certificate_key  cert/private.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;

        ssl_prefer_server_ciphers  on;

        access_log /var/log/nginx/minioconsole_access.log main;

        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-NginX-Proxy true;

            proxy_connect_timeout 300;

            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            chunked_transfer_encoding off;

            proxy_pass http://minioconsole;
        }
    }
}

```

[安装Node.JS环境](https://help.aliyun.com/zh/ecs/use-cases/deploy-a-node-js-environment-on-a-centos-7-instance?spm=a2c4g.11186623.help-menu-)

## 编写博客推送GitHub远程仓库和远程云服务器

[编写推送脚本](https://blog.mo7.cc/)

## 备案

[备案](https://zhuanlan.zhihu.com/p/371579941)

## 域名解析、SSL加密认证（Nginx相关配置）

[域名解析、SSL证书的配置](https://www.bilibili.com/video/BV1E7411S75M/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

[Nginx安装SSL模块](https://www.cnblogs.com/ambition26/p/14077773.html)

## 安装Docker

[安装Docker](https://developer.aliyun.com/mirror/docker-ce?spm=a2c6h.13651102.0.0.57e31b11Pt8clX)

## Docker部署Minio对象存储系统

[Nginx-Minio反向代理+负载均衡](https://github.com/minio/minio/blob/master/docs/orchestration/docker-compose/nginx.conf)

[DockerCompose部署集群Minio](https://github.com/minio/minio/blob/master/docs/orchestration/docker-compose/docker-compose.yaml)

[使用Docker搭建MinIO集群服务 - 陌上荼靡 - 博客园](https://www.cnblogs.com/mstmdev/p/17212289.html)

[minio 高可用 （原理+秒懂+史上最全）_minio原理-CSDN博客](https://blog.csdn.net/crazymakercircle/article/details/120855464)

单机Minio部署的Docker指令
``` SHELL
docker run --net=host \
--name minio -d --restart=always \
-e "MINIO_ACCESS_KEY=minio@erenjaeger" \
-e "MINIO_SECRET_KEY=minio@erenjaeger" \
-v /usr/local/minio/data:/data \
-v /usr/local/minio/config:/root/.minio \
minio/minio server /data \
--console-address ":9090" --address ":9000"
```
