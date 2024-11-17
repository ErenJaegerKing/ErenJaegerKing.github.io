#!/bin/bash

## 设置并加载变量
# shellcheck disable=SC1091
source "./.github/_shell/init.sh"

NowPath=${NowPath:?}
OutPutPath=${OutPutPath:?}
GitRemotePath=${GitRemotePackagePath:?}
ShellEndInfo=${ShellEndInfo:?}

## 请输入Commit参数
desc=$1
if [ -z "${desc}" ]; then
  echo -e "\033[31m Err:需要发布说明 \033[0m"
  exit 1
fi

## 清理工作目录
rm -rf "${OutPutPath}"
echo -e "

\033[32m Succ:清理工作目录成功 \033[0m

"
###################################################

# 使用GitHub Actions的自动化脚本进行部署
git add . &&
git commit -m "${desc}" &&
git push  &&
echo -e "

\033[32m Succ:同步远程仓库成功 \033[0m

"

###################################################

# 部署到云服务器
pnpm run build && echo -e "

\033[32m Succ:编译成功 \033[0m

" &&
ssh root@47.96.108.118 rm -rf /usr/local/nginx/html/blog/* &&
scp -r "${OutPutPath}/." root@47.96.108.118:/usr/local/nginx/html/blog &&
ssh root@47.96.108.118 chmod -R 777 /usr/local/nginx/html/blog &&
echo -e "

\033[32m Succ:部署到云服务器成功 \033[0m

"

###################################################

echo -e "

\033[32m Succ:发布完成： ${ShellEndInfo} \033[0m

"