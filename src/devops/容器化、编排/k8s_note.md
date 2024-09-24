---
title: "k8s的学校课堂学习笔记"
description: ""
icon: ""
date: 2024-09-24
category:
  - 运维
tag:
  - k8s
---

:::info
这是我学校课程的课堂笔记，很详细
:::

## 应用部署方式演变过程
传统部署：
- 互联网早期，会直接将应用部署在物理机上。
- 优点：简单，不需要其他的技术参与。
- 缺点：不能为应用程序定义资源的使用边界，很难合理的分配计算机资源，而且程序之间容易产生影响。

虚拟化部署：
- 可以在一台物理机上运行多个虚拟机，每个虚拟机都是独立的一个环境。
- 优点：程序环境不会相互产生影响，提供了一定程序上的安全性。
- 缺点：增加了操作系统，浪费了部分资源。

容器化部署：
- 和虚拟化类似，但是共享了操作系统。
- 可以保证每个容器拥有自己的文件系统、CPU 、内存和进程空间等。
- 运行应用程序所需要的资源都被容器包装，并和底层基础架构解耦。
- 容器化的应用程序可以跨云服务商、跨 Linux 操作系统发行版进行部署。

> 容器化部署方式产生问题以及解决方案

容器化部署方式带来了很多的便利，但是也会带来一些问题，比如：
- 一旦容器故障停机了，怎么让另外一个容器立刻启动去替补停机的容器。
- 当并发访问量变大的时候，怎么做到横向扩展容器数量。

这些容器管理的问题统称为 容器编排问题 ，为了解决这些容器编排问题，就产生了一些容器编排的软件。
- Swarm：Docker 自己的容器编排工具。
- Mesos：Apache 的一个资源统一管控的工具，需要和 Marathon 结合。
- Kubernetes：Google 开源的容器编排工具。

总体来看 目前市面上 大家公认使用率较高的就是K8s；

## kubernetes介绍
它的logo图标就是，看上去是一个大船的方向盘 用于掌舵用的
- Kubernetes，是一个全新的基于容器技术的分布式架构领先方案，是 Google 严格保密十几年的秘密武器-- Borg 系统的一个开源版本，于 2014 年 9 月发布第一个版本，2015 年 7 月发布第一个正式版本。
- Kubernetes 的本质是一组服务器集群，它可以在集群的每个节点上运行特定的程序，来对节点中的容器进行管理。它的目的就是实现资源管理的自动化，主要提供了如下的功能：
  - 自我修复：一旦某一个容器崩溃，能够在1秒左右迅速启动新的容器。
  - 弹性伸缩：可以根据需要，自动对集群中正在运行的容器数量进行调整。
  - 服务发现：服务可以通过自动发现的形式找到它所依赖的服务。
  - 负载均衡：如果一个服务启动了多个容器，能够自动实现请求的负载均衡。
  - 版本回退：如果发现新发布的程序版本有问题，可以立即回退到原来的版本。
  - 存储编排：可以根据容器自身的需求自动创建存储卷。

## kubernetes组件
一个 kubernetes 集群主要由控制节点（master）、工作节点（node）构成，每个节点上都会安装不同的组件。
- 控制节点（master）：集群的控制平面，负责集群的决策。
  - API Server：集群操作的唯一入口，接收用户输入的命令，提供认证、授权、API注册和发现等机制。
  - Scheduler：负责集群资源调度，按照预定的调度策略将 Pod 调度到相应的 node 节点上。
  - ControllerManager：负责维护集群的状态，比如程序部署安排、故障检测、自动扩展和滚动更新等。
  - Etcd：负责存储集群中各种资源对象的信息。
- 工作节点（node）：集群的数据平面，负责为容器提供运行环境。
  - Kubelet：负责维护容器的生命周期，即通过控制 Docker ，来创建、更新、销毁容器。
  - KubeProxy：负责提供集群内部的服务发现和负载均衡。
  - Docker：负责节点上容器的各种操作。
![k8s组件](https://drawingbed-686.pages.dev/myblog/202409241134740.png)
实例说明 各组件实际功能运行关系
以部署一个 Nginx 服务来说明 Kubernetes 系统各个组件调用关系：
- 首先需要明确，一旦 Kubernetes 环境启动之后，master 和 node 都会将自身的信息存储到etcd数据库中。
- 一个Nginx服务的安装请求首先会被发送到 master 节点上的 API Server 组件。
- API Server 组件会调用 Scheduler 组件来决定到底应该把这个服务安装到那个 node 节点上。此时，它会从 etcd 中读取各个 node 节点的信息，然后按照一定的算法进行选择，并将结果告知 API Server 。
- API Server 调用 Controller-Manager 去调用 Node 节点安装 Nginx 服务。
- Kubelet 接收到指令后，会通知 Docker ，然后由 Docker 来启动一个 Nginx 的 Pod 。Pod 是 Kubernetes 的最小操作单元，容器必须跑在 Pod 中。
- 一个 Nginx 服务就运行了，如果需要访问 Nginx ，就需要通过 kube-proxy 来对 Pod 产生访问的代理，这样，外界用户就可以访问集群中的 Nginx 服务了。

## kubernetes概念
在Kubernetes当中 存在一些概念描述，例如Pod  节点等  我们来了解一下这些概念性质的东西：
- Master：集群控制节点，每个集群要求至少有一个 Master 节点来负责集群的管控。
- Node：工作负载节点，由 Master 分配容器到这些 Node 工作节点上，然后 Node 节点上的 Docker 负责容器的运行。（可以简单粗暴的理解为  单独的一个服务器）
- Pod：Kubernetes 的最小控制单元，容器都是运行在 Pod 中的，一个 Pod 中可以有一个或多个容器。
- Controller：控制器，通过它来实现对 Pod 的管理，比如启动 Pod 、停止 Pod 、伸缩 Pod 的数量等等。（在k8s中拥有多种控制器，在具体不同的应用场景下会使用的到不同的控制器）
- Service：Pod 对外服务的统一入口，其下面可以维护同一类的多个 Pod 。将运行在一组Pods上的应用程序公开为网络服务的抽象方法。
- Label：标签，用于对 Pod 进行分类，同一类 Pod 会拥有相同的标签。
- NameSpace：命名空间，用来隔离 Pod 的运行环境。（有些类似于网络中的v-lan机制 在同一个v-lan下的才可以互相访问 ）
## 集群环境搭建-环境规划
1. 集群类型
   - Kubernets集群上大致分为两类：一主多从和多主多从；
     -   一主多从：一台Master节点和多台Node节点，搭建简单，但是有单机故障风险，适合用于测试环境；
     -   多主多从 : 多台Master节点和多台Node节点，搭建麻烦，安全性高，适合用于生产环境；
2. 安装方式
kubernetes有多种部署方式，目前主流的方式有kubeadm、minikube、二进制包
- minikube:一个用于快速搭建单节点kubernetes的工具
- kuteadm:一个用于快速搭建kubernetes集群的工具
- 二进制包:从官网下载每个组件的二进制包，依次去安装，此方式对于理解kubernetes组件更加有效
3. 主机规划

| 名称 | ip地址 | 操作系统 | 配置要求 |
| :---: | :---: | :---: | :---: |
| Master | 192.168.178.100 | Centos7.9基础设施服务器 | 双核cpu  2G内存 50G硬盘 |
| Node1 | 192.168.178.101 | Centos7.9基础设施服务器 | 双核cpu  2G内存 50G硬盘 |
| Node2 | 192.168.178.102 | Centos7.9基础设施服务器 | 双核cpu  2G内存 50G硬盘 |

## 集群环境搭建-环境初始化
1.检查centos版本（不得低于7.5 否则k8s会有问题，比如Node节点加入不到集群中来）
```shell
cat  /etc/redhat-release
```
2.为了方便后面集群节点之间互相直接调用，配置主机名解析，企业中推荐使用内部DNS解析器（更安全）：
编辑三台机器的  /etc/hosts 文件  添加如下内容：
```shell
vim /etc/hosts

192.168.172.100   master
192.168.172.101   node1
192.168.172.102   node2
```
检测 ping彼此主机能ping通
3.时间同步设置（Kubernetes要求集群节点中的时间必须精确一致，在这里使用chronyd服务从网络同步时间）
企业中建议配置内部的时间同步服务器；三台服务均要操作；
```shell
systemctl  start  chronyd
systemctl  enable  chronyd
#稍等几秒钟之后就可以通过执行date命令查看时间
```
4.禁用iptables和firewalld服务
kubernetes和docker 在运行的中会产生大量的iptables规则，为了不让系统规则跟它们混淆，直接关闭系统的规则
```shell
#关闭firewalld服务
systemctl stop firewalld
systemctl  disable  firewalld
#关闭iptables服务
systemctl stop  iptables
systemctl  disable  iptables
```
5.禁用selinux
selinux是linux系统下的一个安全服务，如果不关闭它，在安装集群中会产生各种各样的奇葩问题
```shell
setenforece  0  ：该命令可以关闭 但是只是临时关闭  为了从根上解决直接修改配置文件：
# 编辑 /etc/selinux/config 文件，修改SELINUX的值为disable
# 注意修改完毕之后需要重启linux服务
SELINUX=disabled
```
6.禁用swap分区
swap分区指的是虚拟内存分区，它的作用是物理内存使用完，之后将磁盘空间虚拟成内存来使用，启用swap会对系统的性能产生非常负面的影响，因此kubernetes要求每个节点都要禁用swap设备，但是如果因为某些原因确实不能关闭swap分区，就需要在集群安装过程中通过明确的参数进行配置说明；
```shell
# 编辑分区配置文件/etc/fstab，注释掉swap分区一行
# 注意修改完毕之后需要重启linux服务
vim /etc/fstab
注释掉 /dev/mapper/centos-swap swap
# /dev/mapper/centos-swap swap
```
7.修改linux内核参数
```shell
# 修改linux的内核参数，添加网桥过滤和地址转发功能
# 编辑/etc/sysctl.d/kubernetes.conf文件，添加如下配置：
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
# 重新加载配置
[root@master ~]# sysctl -p
# 加载网桥过滤模块
[root@master ~]# modprobe br_netfilter
# 查看网桥过滤模块是否加载成功
[root@master ~]# lsmod | grep br_netfilter
```
8.配置ipvs功能
在Kubernetes中Service有两种代理模型，一种是基于iptables的，一种是基于ipvs的两者比较的话，ipvs的性能明显要高一些，但是如果要使用它，需要手动载入ipvs模块：
```shell
# 1.安装ipset和ipvsadm
[root@master ~]#yum install ipset ipvsadm -y
# 2.添加需要加载的模块写入脚本文件
[root@master ~]# cat <<EOF> /etc/sysconfig/modules/ipvs.modules
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF
# 3.为脚本添加执行权限
[root@master ~]# chmod +x /etc/sysconfig/modules/ipvs.modules
# 4.执行脚本文件
[root@master ~]# /bin/bash /etc/sysconfig/modules/ipvs.modules
# 5.查看对应的模块是否加载成功
[root@master ~]# lsmod | grep -e ip_vs -e nf_conntrack_ipv4
```
全部安装成功即可：
9.以上一些配置需要重启服务后才能生效，所以接下来重启服务器：
在这里建议在VMware中 分别操作  重启  ；
```shell
reboot
```

补充：更改yum下载镜像地址命令：
```shell
执行yum安装的时候如果本身当前服务器已经联网 但是yum执行命令就是无法下载应该是镜像打的问题这个时候需要更换有效的
国内镜像：
step1：备份
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
step2：下载阿里镜像
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
step3：
yum  clean
step4：创建缓存
yum makecache
```
或者干脆直接执行：
```shell
yum-config-manager --add-repo   http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repoyum-config-manager --add-repo   
```
## 集群环境搭建-主机安装
利用vmware创建三个虚拟机，一个master，两个Node虚拟机
## 集群环境搭建-集群所需组件安装
本次环境搭建需要安装三台Centos服务器(一主二从)，然后在每台服务器中分别安装docker(18.06.3)kubeadm(1.17.4)、kubelet(1.17.4)、kubectl(1.17.4)程序。

1.安装Docker（多台服务器均要执行安装）
```shell
#首先切换阿里云的镜像源
 wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
 #查看当前镜像源中支持的Docker版本
 yum  list  docker-ce   --showduplicates
 #安装特定版本的docker-ce
 #必须指定--setopt=obsoletes=0，否则yum会自动安装更高版本
 #在这里推荐使用安装18.06.3的原因是这个版本较为稳定并且已经把一些初始化参数都给配置好了 如果选用其他版本需要去查询是否需要额外配置参数
 yum install --setopt=obsoletes=0 docker-ce-18.06.3.ce-3.el7 -y
 #添加一个配置文件
 #Docker 在默认情况下使用Vgroup Driver为cgroupfs，而Kubernetes推荐使用systemd来替代cgroupfs
 mkdir /etc/docker
 cat <<EOF> /etc/docker/daemon.json
 {
    "exec-opts":["native.cgroupdriver=systemd"],
    "registry-mirrors":["https://hub.atomgit.com"]
}
EOF
#接下来启动docker
systemctl  restart  docker
#设置docker为开机自启动
systemctl  enable  docker
```
2.安装kubernetes组件
```shell
# 1、由于kubernetes的镜像在国外，速度比较慢，这里切换成国内的镜像源
# 2、编辑/etc/yum.repos.d/kubernetes.repo,添加下面的配置
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgchech=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg

# 3、安装kubeadm、kubelet和kubectl
[root@master ~]# yum install --setopt=obsoletes=0 kubeadm-1.17.4-0 kubelet-1.17.4-0 kubectl-1.17.4-0 -y

# 4、配置kubelet的cgroup
#编辑/etc/sysconfig/kubelet, 添加下面的配置（之间虽然安装过ipvs在这里还是要手动配置不然的话 还是会自动降级使用iptables）
KUBELET_CGROUP_ARGS="--cgroup-driver=systemd"
KUBE_PROXY_MODE="ipvs"
# 5、设置kubelet开机自启（在这里无需去手动启动kubelet因为当我们启动集群的时候会自动去启动这些组件）
[root@master ~]# systemctl enable kubelet
```
## 集群环境搭建-集群安装
1. 准备集群镜像
```shell
#在安装kubernetes集群之前首必须要准备好集群安装所需要的镜像，所需镜像可以通过下面命令查看
kubeadm  config  images list


#下载镜像
#此镜像在kubernetes的仓库中,由于网络原因,无法连接，下面提供了一种替代方案
images=(
kube-apiserver:v1.17.4
kube-controller-manager:v1.17.4
kube-scheduler:v1.17.4
kube-proxy:v1.17.4
pause:3.1
etcd:3.4.3-0
coredns:1.6.5
)


for  imageName  in ${images[@]} ; do
   docker  pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
   docker  tag registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName k8s.gcr.io/$imageName
   docker  rmi registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
done
```
2. 集群初始化
> 以下命令仅在master节点中执行
```shell
kubeadm  init \
--kubernetes-version=v1.17.4 \
--pod-network-cidr=18.244.8.8/16 \
--service-cidr=10.96.0.0/12 \
--apiserver-advertise-address=192.168.200.100
```
注意这里最后一个 address的值 要设置成master节点的ip地址；
接下来：
在master节点上运行：
```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
以上这段 是在master节点上创建用来创建一个以后要去进行执行脚本的文件；
接下来在node1 跟node2 中运行：
```shell
kubeadm join 192.168.200.100:6443 --token om0i6m.rxpj28441rvulblw \
    --discovery-token-ca-cert-hash sha256:87b261bed0842188686664f4c3a1a33009635a0d011a786e29d115e8e5cfcf67
```
以上命令是将两个节点添加到master当中去进行管理：
在执行以上命令之前在master上运行kubectl   get  nodes的时候：
发现只有master；当在node1 2 节点中运行如上命令后 再去查看master：