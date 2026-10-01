---
title: 博客开始了
date: 2026-10-01 23:00:00
tags:
  - Hexo
categories:
  - 博客搭建
---

欢迎来到我的博客。这里会慢慢积累学习笔记与生活记录。

<!-- more -->

## 写下第一篇文章

在博客目录打开命令行，运行：

```bash
npx hexo new "我的第一篇文章"
```

然后打开 `source/_posts/我的第一篇文章.md`，用 Markdown 写正文。文章顶部的 `tags` 和 `categories` 分别填写标签与分类。

## 本地预览

```bash
npm run server
```

打开 <http://localhost:4000> 即可查看。保存文章后，刷新网页就能看到修改。

## 生成网页

```bash
npm run build
```

生成的网页保存在 `public` 文件夹中。正式上线前，需要在 `_config.yml` 里将 `url` 改成真实网址。
