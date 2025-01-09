---
title: "中间件部署"
description: ""
icon: ""
date: 2025-01-09
category:
  - 中间件部署
tag:
  - 中间件部署
---

:::info
这里是常用的中间件部署，当然全部都使用Docker进行部署了
:::

## MySQL

```bash
docker run --name mysql_v8.4 -p 3346:3306 -e MYSQL_ROOT_PASSWORD=admin123 -v /data/mysql/8.4/data:/var/lib/mysql -v /data/mysql/8.4/conf:/etc/mysql/conf.d -d mysql:8.4
```

## Mariadb

```bash
docker run --name mariadb -p 3306:3306 -e MARIADB_ROOT_PASSWORD=possword -v /data/mariadb/data:/var/lib/mysql -v /data/mariadb/conf:/etc/mysql/conf.d -d mariadb
```

## MongoDB

```bash
docker run -d --name mongo-server -v /data/mongodb/data:/data/db -v /data/mongodb/log:/data/log --restart=always -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

## Nacos

```bash
docker run -d --name nacos-server \
--restart=always \
-p 8848:8848 -p 9848:9848 \
-e MODE=standalone \
-e NACOS_AUTH_ENABLE=false \
-e JVM_XMS=512m -e JVM_MMS=320m \
nacos/nacos-server
```

## Minio

```bash
docker run --net=host \
--name minio -d --restart=always \
-e "MINIO_ACCESS_KEY=minio@erenjaeger" \
-e "MINIO_SECRET_KEY=minio@erenjaeger" \
-v /usr/local/minio/data:/data \
-v /usr/local/minio/config:/root/.minio \
minio/minio server /data \
--console-address ":9090" --address ":9000"

docker run -p 9000:9000 -p 9090:9090 \
--name minio -d --restart=always \
-e "MINIO_ACCESS_KEY=minio@erenjaeger" \
-e "MINIO_SECRET_KEY=minio@erenjaeger" \
-v /usr/local/minio/data:/data \
-v /usr/local/minio/config:/root/.minio \
minio/minio server /data \
--console-address ":9090" --address ":9000"
```

## Duplicati

```bash
version: '3'
services:
  duplicati:
    image: linuxserver/duplicati:latest
    container_name: duplicati
    environment:
		  # 由于某些需要备份的文件夹涉及到了 root 权限，所以这里直接以 root 运行
      - PUID=0
      - PGID=0
      - TZ=Asia/Shanghai
      # - CLI_ARGS= #optional
    volumes:
      - /usr/local/duplicati/config:/config
      - /usr/local/duplicati/backups:/backups
      - /usr/local/duplicati/source:/source
    ports:
      - 8200:8200
    restart: unless-stopped
    
docker run -d \
   --restart unless-stopped \
   --name=duplicati \
   -p 8200:8200 \
   -v /usr/local/duplicati/config:/config \
   -v /usr/local/duplicati/backups:/backups \
   -v /usr/local/duplicati/source:/source \
   -e PUID=0\
   -e PGID=0\
   -e TZ=Asia/Shanghai \
   linuxserver/duplicati:latest
```

## File Browser

```bash
docker run \
    -v /path/to/root:/srv \
    -v /path/to/filebrowser.db:/database/filebrowser.db \
    -v /path/to/settings.json:/config/settings.json \
    -e PUID=0 \
    -e PGID=0 \
    -p 8080:80 \
    filebrowser/filebrowser:s6
    
docker run -d --name filebrowser --restart always \
-v /usr/local/filebrowser/root:/srv \
-v /usr/local/filebrowser/filebrowser.db:/database/filebrowser.db \
-v /usr/local/filebrowser/settings.json:/config/settings.json \
-p 8090:80 filebrowser/filebrowser

```

## Homepage

```bash
docker run --name homepage \
  -e PUID=1000 \
  -e PGID=1000 \
  -p 3000:3000 \
  -v /path/to/config:/app/config \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --restart unless-stopped \
  ghcr.io/gethomepage/homepage:latest
  
docker run --name homepage \
  -e PUID=1000 \
  -e PGID=1000 \
  -p 3000:3000 \
  -v /usr/local/homepage/config:/app/config \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /usr/local/homepage/icons:/app/public/icons \
  -v /usr/local/homepage/images:/app/public/images \
  --restart unless-stopped \
  ghcr.io/gethomepage/homepage:latest
  
```