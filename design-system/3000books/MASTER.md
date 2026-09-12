# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** 3000books
**Generated:** 2026-09-12 20:24:14 by ui-ux-pro-max v2.15.0（ZCode 会话）
**Category:** Bookmark & Read-Later
**Design Dials:** Variance 2/10 (Centered / Minimal) | Motion 2/10 (Subtle) | Density 2/10 (Spacious)

> [!note] 人工修订（2026-09-12，第二轮）
> **对照审查后确认：站点既有 token 体系为唯一 SOT，本文件的 skill 生成配色（amber 系）自本节起废弃。** 站点 `src/app/globals.css` 已有完整纸墨体系（`--paper/--ink/--ink-soft/--rule/--seal`），成熟度高于 skill 推荐（seal 印章红有文化语义，amber 无）。另确认站点**刻意零动效**（无 transition/transform），Motion 节标注不适用。

> [!note] 人工修订（2026-09-12，第一轮）
> skill 原始推荐有两处与项目约束冲突，已修订并记录，勿改回：
> ① **Typography**：skill 推荐 Cormorant Garamond / Crimson Pro 并要求加载 Google Fonts——README 明确「中文优先、系统字体、不加载 Google Fonts」，已替换为系统衬线栈；
> ② **Page Pattern**：skill 匹配到 B2B「Product Demo + Features」模式（含转化漏斗/视频 demo）——本项目是安静的非营利文化站，已替换为既有页面结构。
> 另：首次生成（query「public library…」）给的 compassion blue 冷色系已否决；第二轮 amber 配色在 09-12 晚对照审查后亦废弃（见上）。

---

## Global Rules

### Color Palette（SOT：`src/app/globals.css`，2026-09-12 审查定稿）

| Role | Token | Hex | 对比度实测（对 paper） |
|------|-------|-----|----------------------|
| Background | `--paper` | `#f4efe6` | — |
| Background deep | `--paper-deep` | `#ebe4d6` | — |
| Foreground（正文） | `--ink` | `#1f1b16` | **14.7:1** ✅ |
| Foreground soft（辅助文） | `--ink-soft` | `#5c554c` | **6.5:1** ✅ |
| Rule（界格线/边框） | `--rule` | `#d4cbb8` | 装饰线，不承载文本 |
| Accent / hover（印章红） | `--seal` | `#7a2e2e` | **8.2:1** ✅ |
| Selection | — | `#e6d7b8` | 选区底色 |

**Color Notes:** 纸墨 + 印章红。skill 的 amber 系（#D97706/#FFFBEB/#FCF6F0/#FAEEE1）已废弃，勿再引入；如需新色，从纸墨体系推导并先测 4.5:1。

### Typography

- **正文与标题字体（项目约束，覆盖 skill 推荐）：** 系统衬线栈 `Songti SC / Noto Serif SC / STSong / SimSun` + 无衬线回退——中文优先，**不加载 Google Fonts**（README 明文约束）。
- **skill 原始推荐（仅作气质参照，不实施）：** Cormorant Garamond / Crimson Pro，Mood: academia, library, parchment, scholarly——印证了「衬线、纸感、学术」方向与现有宋体栈一致。
- **落地要点：** 标题用衬线加重字重（700），正文衬线常规字重；英文/数字随系统 serif 回退；无衬线仅用于辅助 UI 元素（表单 label、footer meta）。

```css
/* 项目实际使用（替换 skill 的 Google Fonts @import） */
font-family: "Songti SC", "Noto Serif SC", "STSong", "SimSun", serif;
```

### Spacing Variables

*Density: 2/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths（废弃）

印刷风无投影。skill 生成的 `--shadow-sm/md/lg/xl` 阶梯废弃；如未来确需浮层（本项目暂无 modal），用纯边框 + 加深底色实现。

---

## Component Specs（SOT：`src/components/SubmissionForm.tsx` 现行样式）

### Buttons

```css
/* 提交按钮（现行）：描边墨色，hover 反白。无圆角（印刷感），勿加 border-radius */
.btn-submit {
  border: 1px solid var(--ink);
  padding: 8px 24px;
  font-family: var(--font-sans);
  letter-spacing: 0.1em;
  color: var(--ink);
}
.btn-submit:hover { background: var(--ink); color: #fff; }
.btn-submit:disabled { opacity: 0.5; }
```

### Inputs

```css
/* 表单控件（现行）：透明底 + 界格线边框 */
.input {
  border: 1px solid var(--rule);
  background: transparent;
  padding: 8px 12px;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--ink);
}
/* 已知弱项（2026-09-12 审查）：focus 仅 1px 边框变墨色 + outline:none，
   建议补 focus ring，见「审查遗留」节 */
```

### Cards / 列表

书单列表即卡片语义：`divide-y divide-rule/80 border-y border-rule/80` 界格线分隔，行 hover 文字转 `--seal`。不使用圆角、投影（`--shadow-*` 全系不适用——印刷风无投影，skill 生成的 shadow 阶梯废弃）。

---

## Motion（不适用）

**2026-09-12 审查确认：站点刻意零动效**——全局无 transition/transform/GSAP，hover 为瞬时颜色变化（墨→印章红），天然满足 `prefers-reduced-motion`。这是「安静」定位的一部分，**不要**给站点加滚动动画；skill 生成的 Scroll Reveal 节废弃。

### 风格取舍备注

瞬时 hover 变色是当前 deliberate choice。若未来想要更柔和的过渡，唯一允许的形式是 `transition: color 150ms ease`（仅颜色，不加 transform/阴影）。

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** Quiet Cultural Archive（人工修订——skill 原匹配 B2B「Product Demo + Features」已否决）

- **定位：** 安静的非营利文化计划，无转化漏斗、无营销 CTA 堆叠、无视频 demo。
- **Section Order（既有页面结构，保持）：**
  1. `/` 首页：字标 → 短文 → 阅读 / 保存 / 公共文化三段 → 书单入口 → 联络
  2. `/books` 书单（按类目分组列表，构建时从数据仓拉取）
  3. `/books/[slug]` 书目详情（只展示元数据，无下载）
  4. `/3000-books` `/3000-houses` `/3000-stories` 三栏目页（各带征集表单，提交走 `/api/submit`）
  5. `/about` `/contact`
- **CTA 原则：** 每页至多一个主动作（如「浏览书单」「参与征集」），文案克制；表单失败回退 mailto。

---

## Anti-Patterns (Do NOT Use)

- ❌ Excessive decoration
- ❌ Complex shadows
- ❌ 3D effects

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile

---

## 审查遗留（2026-09-12 对照审查产出 → **同日已全部修复并构建验证**）

审查范围：layout/page/books/SiteHeader/SiteFooter/SubmissionForm/globals.css。已达标项：正文对比度 14.7:1、辅助文 6.5:1、seal 8.2:1（全部超 4.5:1）；语义化标签（aria-label/labelledby）齐全；无 emoji 图标；375px 无横向滚动风险；reduced-motion 天然满足。

| 优先级 | 项 | 修复（2026-09-12） |
|-------|----|------|
| 中 | input focus 指示弱 | ✅ inputClass 补 `focus:ring-2 focus:ring-seal/40`（印章红 ring，与 hover 色呼应） |
| 中 | 提交状态无 aria-live | ✅ 状态区包 `<div aria-live="polite">`（容器常驻，live region 稳定） |
| 中低 | radio 组缺 fieldset/legend | ✅ radio 分支重构为 `<fieldset><legend>`，与 label 分支拆分 |
| 低 | placeholder 2.6:1 | ✅ `placeholder:text-ink-soft/70`（合成后约 3.1:1，过非文本线） |
| 低 | hover 瞬时变色 | 保留（deliberate choice，见 Motion 节） |

**验证**：`NODE_USE_ENV_PROXY=1 npm run build` 完整通过——本机直连 raw.githubusercontent.com 会超时，Node 24 加 `NODE_USE_ENV_PROXY=1` 让构建期 fetch 走 HTTP_PROXY（10808），100 个书目页全部预渲染成功。**本地构建须带此变量。**

**已核实无问题**：Tailwind v4 preflight 自带 `button { cursor: pointer }`，submit 按钮无需手动加；honeypot 的 `hidden + aria-hidden + tabIndex=-1` 写法规范；书单行链接 hover 转 seal 已符合 accent 规范。
