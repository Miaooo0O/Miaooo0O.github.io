# Miaooo0O 的手记

访问地址：https://Miaooo0O.github.io/

博客使用 Hexo + NexT Gemini 主题，GitHub Actions 自动发布。

## 添加文章

在 D:\diary 打开 cmd：

```bat
npx hexo new "文章标题"
```

编辑 source/_posts/ 下的新 Markdown 文件。顶部的 title 为标题，date 为时间，tags 为标签，categories 为分类。<!-- more --> 上方是首页摘要。

根目录的「写作模板.md」提供日记与学习笔记示例，可复制到新文章中。

## 本地预览

```bat
npm run server
```

打开 http://localhost:4000 。保存文章后刷新浏览器。修改主题或站点配置后，按 Ctrl+C 关闭服务，再重新运行。

## 发布更新

```bat
git status
git add .
git commit -m "更新博客"
git push
```

git add 选择改动，git commit 保存本地版本，git push 上传并自动触发发布。在 GitHub Actions 中查看 Publish blog，绿色对勾表示部署成功。

从网页或另一台电脑改过文件后，本机开始修改前先执行 git pull --ff-only。

## 当前外观设置

- _config.yml：博客名称、作者、网址，theme: next 为当前主题。
- _config.next.yml：主题布局、导航、目录、阅读进度。
- source/_data/styles.styl：浅米色背景、深青色标题区、卡片与正文样式。
- source/_data/variables.styl：字体大小、正文宽度和颜色。
- source/about/index.md：关于页。
- scaffolds/post.md：新建文章的模板。

更换整页背景：替换 source/images/background.jpg。图片单独虚化，正文保持清晰。模糊程度可在 source/_data/styles.styl 的 body::before 中修改 blur(6px)，数值越大越模糊；rgba 最后的 .18 控制浅色遮罩，数字越大背景越淡。
改标题区颜色：修改 .site-brand-container 中的 background 色值。

旧 Landscape 主题保留在 themes/diary，可将 _config.yml 中 theme 改为 diary 切回；不同主题使用各自的配置和样式文件。

## 草稿与备份

```bat
npx hexo new draft "文章标题"
npx hexo server --draft
npx hexo publish "文章标题"
```

最后一条只把本地草稿转为正式文章；仍需 git 提交上传才会上线。source/_drafts/ 不上传到 GitHub，请自行备份本地草稿。

## 依赖与生成

项目使用 pnpm。换电脑后运行 pnpm install --frozen-lockfile 安装依赖。

```bat
npm run build
```

public/ 是生成的网页，node_modules/ 是依赖，两者都可以重新生成，不上传仓库。


