# 叁仟书屋 / 3000 Books

安静的非营利文化计划，昵称「3000本书」。

- 站点：https://3000books.org
- 联络：admin@3000books.org
- 书目数据：https://github.com/LF2023/3000-books-data

## 技术

Next.js App Router、TypeScript、Tailwind CSS。面向 Vercel Hobby 部署，未使用静态导出。

中文优先，使用系统字体（Songti SC / Noto Serif SC / STSong / SimSun，以及无衬线回退），不加载 Google Fonts。

书单在构建与再验证时从数据仓读取 `books/index.json` 与各书 `meta.json`，不把全文或下载链接写入本仓。

## 页面

- `/` 首页：字标、短文、阅读 / 保存 / 公共文化、书单入口、联络
- `/books` 书单（按类目）
- `/books/[slug]` 书目详情（无下载）
- `/about` 关于
- `/contact` 联络

## 本地

在项目根目录安装依赖后启动开发服务器；生产环境请先构建再启动。

## 说明

本仓库只承载站点本身。书目以数据仓为准。请勿添加全文、假下载链接、统计、团队名单或内容管理系统。
