import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as i,o as e}from"./app-EOqlDXvu.js";const l={};function p(t,n){return e(),a("div",null,n[0]||(n[0]=[i(`<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docker</span></span>
<span class="line"><span>	环境预安装</span></span>
<span class="line"><span>	镜像加速服务</span></span>
<span class="line"><span>		加速地址</span></span>
<span class="line"><span>		路由转发</span></span>
<span class="line"><span>	服务启动/关闭</span></span>
<span class="line"><span>	基本管理</span></span>
<span class="line"><span>		查看版本信息</span></span>
<span class="line"><span>		容器</span></span>
<span class="line"><span>			查看容器</span></span>
<span class="line"><span>			容器创建</span></span>
<span class="line"><span>			容器启动</span></span>
<span class="line"><span>			运行容器执行指令</span></span>
<span class="line"><span>				执行结束后，容器资源释放，安全退出</span></span>
<span class="line"><span>			容器停止</span></span>
<span class="line"><span>			进入容器</span></span>
<span class="line"><span>			容器导出</span></span>
<span class="line"><span>			容器导入</span></span>
<span class="line"><span>			容器删除</span></span>
<span class="line"><span>				先停止，再删除</span></span>
<span class="line"><span>			批量删除停止状态的容器</span></span>
<span class="line"><span>		镜像</span></span>
<span class="line"><span>			查找镜像</span></span>
<span class="line"><span>			查看本地镜像</span></span>
<span class="line"><span>			下载镜像</span></span>
<span class="line"><span>			获取镜像信息</span></span>
<span class="line"><span>			添加新标签</span></span>
<span class="line"><span>			删除镜像</span></span>
<span class="line"><span>				如果添加了新标签，删除掉的时候只能用名字删除，切勿用ID</span></span>
<span class="line"><span>				对于没有新标签的镜像，即可使用名字，也可用ID</span></span>
<span class="line"><span>			镜像备份</span></span>
<span class="line"><span>			镜像还原</span></span>
<span class="line"><span>		网络</span></span>
<span class="line"><span>			bridge</span></span>
<span class="line"><span>				创建容器默认连接的模式，分配IP，创建虚拟网卡，连接到docker0虚拟网桥，通过docker0网桥以及iptables nat表配置与宿主机通信</span></span>
<span class="line"><span>			host</span></span>
<span class="line"><span>				容器不会虚拟出自己的网卡，不会配置自己的IP，而是使用宿主机IP和端口</span></span>
<span class="line"><span>			none</span></span>
<span class="line"><span>				关闭网络功能</span></span>
<span class="line"><span>			自定义网络</span></span>
<span class="line"><span>				创建网络资源</span></span>
<span class="line"><span>				使用资源给容器指定地址</span></span>
<span class="line"><span>		dockerfile制作镜像</span></span>
<span class="line"><span>			镜像制作的工具</span></span>
<span class="line"><span>			镜像实战</span></span>
<span class="line"><span>				Apache镜像</span></span>
<span class="line"><span>					创建工作目录</span></span>
<span class="line"><span>					创建Dockerfile</span></span>
<span class="line"><span>					创建服务启动脚本run.sh</span></span>
<span class="line"><span>					默认首页</span></span>
<span class="line"><span>					构建镜像</span></span>
<span class="line"><span>					启动容器</span></span>
<span class="line"><span>					查看浏览器</span></span>
<span class="line"><span>				nginx镜像</span></span>
<span class="line"><span>					同上</span></span>
<span class="line"><span>				Tomcat镜像</span></span>
<span class="line"><span>					同上</span></span>
<span class="line"><span>		镜像私有仓库</span></span>
<span class="line"><span>			registry</span></span>
<span class="line"><span>				下载registry镜像</span></span>
<span class="line"><span>				配置daemon.json文件，添加仓库位置及端口</span></span>
<span class="line"><span>				重启docker服务</span></span>
<span class="line"><span>				使用docker run 开启仓库容器，提供服务</span></span>
<span class="line"><span>			上传镜像</span></span>
<span class="line"><span>				打标签</span></span>
<span class="line"><span>				上传</span></span>
<span class="line"><span>				查看仓库镜像</span></span>
<span class="line"><span>			镜像从私有仓库中下载</span></span>
<span class="line"><span>		数据卷/数据卷容器</span></span>
<span class="line"><span>			数据卷docker run  -v /var/www:/data1 --name web1 -it centos:7 /bin/bash</span></span>
<span class="line"><span>			数据卷容器</span></span>
<span class="line"><span>				存储容器</span></span>
<span class="line"><span>				使用存储容器空间进行挂载到其他容器中使用</span></span>
<span class="line"><span>		容器互联</span></span>
<span class="line"><span>			创建容器，保持UP状态</span></span>
<span class="line"><span>			使用link关联对方容器，建立互联通信</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)]))}const v=s(l,[["render",p],["__file","Docker.html.vue"]]),r=JSON.parse('{"path":"/devops/%E5%AE%B9%E5%99%A8%E5%8C%96%E3%80%81%E7%BC%96%E6%8E%92/Docker.html","title":"Docker","lang":"zh-CN","frontmatter":{"title":"Docker","description":"Docker","icon":"","date":"2024-09-21T00:00:00.000Z","category":["运维"],"tag":["Docker"],"head":[["meta",{"property":"og:url","content":"https://ErenJaegerKing.github.io/devops/%E5%AE%B9%E5%99%A8%E5%8C%96%E3%80%81%E7%BC%96%E6%8E%92/Docker.html"}],["meta",{"property":"og:site_name","content":"ErenJaeger"}],["meta",{"property":"og:title","content":"Docker"}],["meta",{"property":"og:description","content":"Docker"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-21T06:26:03.000Z"}],["meta",{"property":"article:author","content":"ErenJaegerKing"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:published_time","content":"2024-09-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-21T06:26:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-09-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-09-21T06:26:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ErenJaegerKing\\",\\"url\\":\\"https://ErenJaegerKing.github.io\\",\\"email\\":\\"1252505184@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"Docker","slug":"docker","link":"#docker","children":[]}],"git":{"createdTime":1726501168000,"updatedTime":1726899963000,"contributors":[{"name":"LiYaoYu","email":"1252505184@qq.com","commits":2}]},"readingTime":{"minutes":1.78,"words":533},"filePathRelative":"devops/容器化、编排/Docker.md","localizedDate":"2024年9月21日","excerpt":"<h2>Docker</h2>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>docker</span></span>\\n<span class=\\"line\\"><span>\\t环境预安装</span></span>\\n<span class=\\"line\\"><span>\\t镜像加速服务</span></span>\\n<span class=\\"line\\"><span>\\t\\t加速地址</span></span>\\n<span class=\\"line\\"><span>\\t\\t路由转发</span></span>\\n<span class=\\"line\\"><span>\\t服务启动/关闭</span></span>\\n<span class=\\"line\\"><span>\\t基本管理</span></span>\\n<span class=\\"line\\"><span>\\t\\t查看版本信息</span></span>\\n<span class=\\"line\\"><span>\\t\\t容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t查看容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t容器创建</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t容器启动</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t运行容器执行指令</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t执行结束后，容器资源释放，安全退出</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t容器停止</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t进入容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t容器导出</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t容器导入</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t容器删除</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t先停止，再删除</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t批量删除停止状态的容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t查找镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t查看本地镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t下载镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t获取镜像信息</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t添加新标签</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t删除镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t如果添加了新标签，删除掉的时候只能用名字删除，切勿用ID</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t对于没有新标签的镜像，即可使用名字，也可用ID</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t镜像备份</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t镜像还原</span></span>\\n<span class=\\"line\\"><span>\\t\\t网络</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tbridge</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t创建容器默认连接的模式，分配IP，创建虚拟网卡，连接到docker0虚拟网桥，通过docker0网桥以及iptables nat表配置与宿主机通信</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\thost</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t容器不会虚拟出自己的网卡，不会配置自己的IP，而是使用宿主机IP和端口</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tnone</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t关闭网络功能</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t自定义网络</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t创建网络资源</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t使用资源给容器指定地址</span></span>\\n<span class=\\"line\\"><span>\\t\\tdockerfile制作镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t镜像制作的工具</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t镜像实战</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\tApache镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t创建工作目录</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t创建Dockerfile</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t创建服务启动脚本run.sh</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t默认首页</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t构建镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t启动容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t查看浏览器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\tnginx镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t同上</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\tTomcat镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t\\t同上</span></span>\\n<span class=\\"line\\"><span>\\t\\t镜像私有仓库</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\tregistry</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t下载registry镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t配置daemon.json文件，添加仓库位置及端口</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t重启docker服务</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t使用docker run 开启仓库容器，提供服务</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t上传镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t打标签</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t上传</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t查看仓库镜像</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t镜像从私有仓库中下载</span></span>\\n<span class=\\"line\\"><span>\\t\\t数据卷/数据卷容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t数据卷docker run  -v /var/www:/data1 --name web1 -it centos:7 /bin/bash</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t数据卷容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t存储容器</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t\\t使用存储容器空间进行挂载到其他容器中使用</span></span>\\n<span class=\\"line\\"><span>\\t\\t容器互联</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t创建容器，保持UP状态</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\t使用link关联对方容器，建立互联通信</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{v as comp,r as data};