# 我的 Hexo 博客

项目目录：D:\diary

## 日常使用

在本目录打开 cmd：

```bat
npm run server
```

访问 http://localhost:4000 。按 Ctrl+C 关闭预览。

新建文章：

```bat
npx hexo new "文章标题"
```

编辑 source/_posts/ 下对应的 Markdown 文件。标题、日期、标签、分类放在文章顶部的两个 --- 之间。<!-- more --> 上方为首页摘要。

先写草稿：

```bat
npx hexo new draft "文章标题"
npx hexo server --draft
```

发布草稿到本地文章目录：

```bat
npx hexo publish "文章标题"
```

这只会把草稿转为文章，不会发布到互联网。

## 配置

- _config.yml：博客名称、作者、语言、时区、网址。
- themes/diary/_config.yml：导航和主题设置（基于 Landscape 的本地副本）。
- source/about/index.md：关于页。
- scaffolds/post.md：新文章模板。
- source/_drafts/hello-world.md：保留的 Hexo 官方示例草稿，不显示在首页。

## 生成与上线

```bat
npm run build
```

生成结果位于 public/，修改内容后应重新生成。

当前 url 是本地预览地址。上线前改成你的实际域名或 GitHub Pages 地址；如果网站放在子路径，网址也需要包含该路径。部署目标尚未设置。

## 重新安装依赖

本项目使用 pnpm 管理依赖（已保留 pnpm-lock.yaml）。在另一台电脑安装 pnpm 后，运行 pnpm install --frozen-lockfile。日常 npm run server / npm run build 仍然可用。node_modules 和 public 是可重建文件，不需要随项目备份。

官方文档：https://hexo.io/zh-tw/docs/




## GitHub Pages 原理

Markdown 文章 + 主题 → Hexo 生成 HTML/CSS/JS → GitHub Pages 托管网页 → 访客通过网址访问。

GitHub 仓库存放博客源文件与版本记录；Actions 在你上传改动后自动安装依赖、生成网页并部署。电脑关机不会影响已上线的网站。

已准备 .github/workflows/pages.yml。第一次上线需要：创建 GitHub 仓库，将 Settings → Pages → Source 设为 GitHub Actions，并将本目录上传到 main 分支。工作流会自动获取正式网址，本地预览仍使用 localhost。

## 更新网站（首次连接仓库之后）

在 D:\diary 打开 cmd：

```bat
npx hexo new "文章标题"
npm run server
```

编辑文章、刷新浏览器检查效果。确认后：

```bat
git status
git add .
git commit -m "新增文章"
git push
```

- git status：查看哪些文件有改动。
- git add：选择要记录的改动。
- git commit：把改动保存为一个本地版本。
- git push：上传已保存的版本，触发自动部署。
- GitHub 的 Actions 页面：查看部署进度，绿色对勾表示成功；失败时点击具体步骤查看原因。
- 换电脑或在网页上改过源文件后，开始本地修改前先执行 git pull --ff-only 同步。

public/ 和 node_modules/ 不上传，会自动重新生成。source/_drafts/ 也不上传，因此草稿保留在本机；将草稿发布为正式文章后，再提交更新。

## 本博客的正式地址

部署成功后的网址：https://weak555555-source.github.io/

对应仓库：https://github.com/weak555555-source/weak555555-source.github.io

尚需在 GitHub 创建上述公开仓库（不勾选 README、.gitignore 或 License），在 Settings → Pages → Source 选择 GitHub Actions，然后完成 Git 登录并运行 git push -u origin main。
