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
这里是常用的中间件部署
:::
## Redis

Docker-compose部署redis
```bash
services:
  redis:
    image: redis:latest
    container_name: redis_container
    restart: always
    volumes:
      - /data/redis/data:/data
      - /data/redis/conf/redis.cnf:/usr/local/etc/redis/redis.conf
    ports:
      - "6379:6379"
    command: redis-server /usr/local/etc/redis/redis.conf
```

## MySQL

```bash
docker run --name mysql_v8.4 --restart=always -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -v /data/mysql/8.4/data:/var/lib/mysql -v /data/mysql/8.4/conf:/etc/mysql/conf.d -d mysql:8.4

--restart 参数详解
Docker 提供了几种重启策略，可以通过 --restart 参数指定：

no
默认值，不会自动重启容器。

on-failure
仅在容器退出状态码非 0 时重启容器。可以指定最大重启次数，例如 on-failure:5 表示最多重启 5 次。

always
无论退出状态码是什么，都会重启容器。如果容器被手动停止（例如通过 docker stop），它也会在 Docker 守护进程启动时重启。

unless-stopped
类似于 always，但如果容器被手动停止（例如通过 docker stop），则不会在 Docker 守护进程启动时重启。

推荐使用 unless-stopped
unless-stopped 是最常用的策略，因为它既保证了容器在机器重启后自动启动，又允许你手动停止容器时不会自动重启。

如果你希望容器无论如何都要重启（即使手动停止），可以使用 always。

```
Docker-compose部署mysql
```bash
基础配置文件
[mysqld]
# MySQL 数据存储路径
datadir=/var/lib/mysql

# MySQL 错误日志路径
log-error=/var/log/mysql/error.log

# 启用远程连接
bind-address=0.0.0.0

# 设置字符集为 utf8mb4
character-set-server=utf8mb4

# 默认排序规则为 utf8mb4_0900_ai_ci，若需兼容 MySQL 5.7 可使用 utf8mb4_unicode_ci
collation-server=utf8mb4_0900_ai_ci
Docker-compose.yml使用docker-compose启动

services:
  mysql:
    image: mysql:8.4
    container_name: mysql_v8.4
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    volumes:
      - /data/mysql/8.4/data:/var/lib/mysql
      - /data/mysql/8.4/conf/my.cnf:/etc/mysql/my.cnf
      - /data/mysql/8.4/logs:/var/log/mysql
    ports:
      - "3306:3306"
```

配置MySQL远程连接权限
```bash
docker exec -it container bash
mysql -u root -p

-- 允许 root 用户从任何 IP 地址连接
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
-- 刷新权限
FLUSH PRIVILEGES;
```

备份和恢复
```bash
备份
docker exec mysql8 mysqldump -u root -p123456 --all-databases > /data/mysql/8.4/all_databases_backup.sql
恢复
docker exec -i mysql8 mysql -u root -p123456 < /data/mysql/8.4/all_databases_backup.sql
```

## Mariadb

```bash
docker run --name mariadb -p 3306:3306 -e MARIADB_ROOT_PASSWORD=123456 -v /data/mariadb/data:/var/lib/mysql -v /data/mariadb/conf:/etc/mysql/conf.d -d mariadb
```

## MongoDB

```bash
docker run -d --name mongo-server -v /data/mongodb/data:/data/db -v /data/mongodb/log:/data/log --restart=always -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo
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

## Duplicati（自用）

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

## File Browser（自用）

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

## Homepage（自用）

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