# Design System Master File — v2「白厅朱印」

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** 3000books
**Version:** v2 · 2026-09-12（全站重设计，经用户指令实施）
**Engine:** ui-ux-pro-max v2.15.0（zen minimal 方向生成 → 人工融合定稿）
**Design Dials:** Variance 3/10 | Motion 1/10 | Density 2/10
**Stack:** Next.js 16 App Router + Tailwind v4（`@theme inline` 映射于 `src/app/globals.css`）

> [!note] 演进记录
> v1（2026-09-12 早）为 ui-ux-pro-max 生成的暖纸+琥珀系，经两轮审查否决了 Google Fonts、B2B pattern、amber 配色，并以站点既有纸墨体系为 SOT。
> v2（同日晚）经用户指令全站重设计：zen 黑白骨架 + 朱砂强调 + mono 档案层，定名「白厅朱印」。v1 的纸墨体系与琥珀系全部废弃。

---

## 设计概念

**白厅**：把站点当作一间美术馆——纯白墙面、近黑宋体大字、极细灰界线，让中文排印本身成为展品。
**朱印**：朱砂红是唯一色彩，只出现在「动作发生处」——hover、focus、选中态、选区、编号，像白墙上一枚印章。
**档案**：编号、计数、eyebrow、面包屑用 mono 等宽字体，做出目录索引感。

## Global Rules

### Color Palette（SOT：`src/app/globals.css`）

| Role | Token | Hex | 用途 | 对白底对比度 |
|------|-------|-----|------|------------|
| Gallery（页面底） | `--gallery` | `#ffffff` | 全站底色 | — |
| Gallery deep（次级底） | `--gallery-deep` | `#fafafa` | 表单面板 | — |
| Ink（主字） | `--ink` | `#18181b` | 标题/正文 | **17.4:1** ✅ |
| Ink soft（辅助文） | `--ink-soft` | `#52525b` | 说明文字 | **7.0:1** ✅ |
| Ink faint（装饰） | `--ink-faint` | `#a1a1aa` | **仅**大号装饰字符（如 404），不承载信息 | 2.3:1 ⚠️ |
| Rule（细线） | `--rule` | `#e4e4e7` | 分隔线 | 装饰 |
| Rule strong（界线） | `--rule-strong` | `#d4d4d8` | 分隔符字符、组标题底线、tag 描边 | — |
| Seal（朱砂） | `--seal` | `#b3342b` | hover / focus / 选中 / 选区 / 编号 | **6.1:1** ✅ |

**Selection**：`::selection` 为朱砂底白字——全站唯一的反色瞬间，是「盖章」的隐喻。
**禁用**：v1 的 `--paper/--paper-deep`（米黄系）、amber 系（#D97706/#FFFBEB）、compassion blue、editorial 粉（#EC4899）一律不得回归。新增颜色必须先过 4.5:1 并记录在此。

### Typography

- **主字**：系统衬线栈 `"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif`——标题与正文。**不加载 Google Fonts**（README 硬约束）。
- **辅助**：`--font-sans`（系统黑体栈）——导航、表单控件、tag、footer meta。
- **档案层（v2 新增）**：`--font-mono`（系统 mono 栈）——eyebrow、编号、计数、面包屑、rights 行、footer 小字。中文 fallback 落到系统字体，英文/数字呈现等宽。

### 版式规则

- 版心：`max-w-3xl`（48rem），不改。
- 标题：`text-5xl`（首页 hero `text-6xl/7xl`）+ 字距 `tracking-[0.14em]` 上下。
- eyebrow：`font-mono text-xs tracking-[0.3em] text-ink-soft`，全大写英文或中文。
- 分隔：一律细线（`border-rule`），组级用 `border-rule-strong`；**无投影、无圆角、无 transform 动画**。
- 编号：列表/组用 `String(i+1).padStart(2,"0")` mono，装饰性编号必须 `aria-hidden="true"`。

## Component Specs（SOT：现行代码）

### Header
顶部 2px 朱砂线（`border-t-2 border-seal`）是全站唯一的彩色结构件——品牌印记。导航 hover 转 seal。

### Form（SubmissionForm + 面板）
- 表单置于 `bg-gallery-deep border border-rule p-6 sm:p-8` 面板（三栏目页统一）。
- 控件：透明底 + `border-rule`，focus 时 `border-ink` + `focus:ring-2 focus:ring-seal/40`（保留 v1 修复）。
- placeholder `text-ink-soft/70`；radio 用 fieldset/legend；状态区 `aria-live="polite"`。均不可回退。

### Buttons
描边墨色按钮，hover 反白（`bg-ink text-white`）。无圆角、无渐变。

### 列表（书单）
组标题带底线（`border-b border-rule-strong`）+ 右侧 mono 计数；行内左侧 mono 序号（仅 sm+ 显示）；行 hover 书名转 seal。

### 书目详情（展签式）
大标题 → mono 作者/年代行（底部界线）→ 一句话 → tag 方章（`border-rule-strong`）→ mono rights 行（语言/版权/不提供全文）。

## Motion（不适用）

全站刻意零动效：无 transition/transform/GSAP，hover 为瞬时颜色变化。天然满足 `prefers-reduced-motion`。**不要添加任何动画。**

## Anti-Patterns (Do NOT Use)

- ❌ 投影、圆角（>2px）、渐变、emoji 图标
- ❌ transform 动画 / 滚动特效
- ❌ 大面积彩色（朱砂只做点睛）
- ❌ 无语义的彩色文本（seal 只用于交互态与编号）
- ❌ `--ink-faint` 承载可读信息（仅装饰）
- ❌ 低对比文本（正文 4.5:1 底线）、invisible focus states
- ❌ 从 v1 回流：米黄纸色、amber、Google Fonts、B2B 转化模式

## Pre-Delivery Checklist

- [ ] 无 emoji 图标；`cursor-pointer`（TW4 preflight 已覆盖 button）
- [ ] 文本对比 4.5:1；focus 可见（seal ring）；`prefers-reduced-motion` 天然满足
- [ ] 响应式 375/768/1024/1440；无横向滚动；内容无固定导航遮挡
- [ ] 编号装饰均 `aria-hidden`；表单 a11y 三件套（ring/aria-live/fieldset）在位
- [ ] 本地构建命令：`NODE_USE_ENV_PROXY=1 npm run build`（数据仓 fetch 需走代理）

## Page Pattern（保持既有信息架构）

1. `/` 首页：mono eyebrow → 大字标 → **数据带**（现存/目标/0 下载，mono）→ 引言 → **编号清单**（三件事）→ 两栏收尾（书单/联络）
2. `/books`：eyebrow → mono 类目索引条（选中项朱砂下划线）→ mono 计数 → 编号列表
3. `/books/[slug]`：mono 面包屑 → 展签式详情
4. `/3000-books` `/3000-houses` `/3000-stories`：eyebrow 带 01/02/03 序号 → 引言 → 表单面板
5. `/about` `/contact`、404：同构；404 用大号 mono「404」装饰字
