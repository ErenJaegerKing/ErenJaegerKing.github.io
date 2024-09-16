#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件，会再docs/.vuepress目录下面生成dist目录
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo '这里填你需要绑定的域名' > CNAME
# echo '' > CNAME

git init
git config user.name "ErenJaegerKing"
git config user.email "1252505184@qq.com"
git add -A
git commit -m 'deploy-coding'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@<USERNAME>:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 推送到托管仓库中 git@e.coding.net:g-vdfc9196/he9/he9.git
git push -f git@e.coding.net:g-vdfc9196/he9/he9.git master
cd -
