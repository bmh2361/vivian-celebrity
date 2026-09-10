# 案例维护

## 正式内容与图片

唯一人工编辑源是 `public/case-studies/<slug>/content.json`。该目录内保存本案全部公开图片；不要在根目录或其他目录另存正文副本。Vite 在开发和构建时读取同一份 JSON，直接生成页面使用的数据，不需要运行导入脚本、不维护 index.json，也不在浏览器中额外 fetch 正文。

`public` 的文件可直接下载。这里只能保存可公开文案和媒体，禁止放入内部 notes、sources、review、权限记录、合同、联系人、压缩包和未公开翻译。校验采用公开字段白名单，但无法判断普通文本中是否误写了私人信息，编辑时仍需检查内容本身。

## 新增案例

1. 新建 `public/case-studies/<slug>/`，放入图片及 `content.json`。可参照一个现有案例；必须使用新的 `id` 和 `slug`，目录名与 slug 一致。
2. 填写 `status: "published"`、`sortOrder`、`primaryCategory`、`services`（无标签时为 `[]`）和双语内容。`year`、`date`、`location` 可省略或为 `null`。
3. `languages.zh` / `languages.en` 中，`ready: true` 需要 `title`、`summary`、`role`、非空 `deliverables` 数组。可选 `preview`、`context`、`brief`、`approach`、`narrativeSections: [{heading, text}]`、`outcomes` 数组、`credits` 数组、`publicEventOutcome`、`ourMeasuredImpact`。未提供的语言只写 `{ "ready": false }`，不要附带未公开正文。
4. `media.cover` 必填；可选 `hero`、`thumbnail`，未填时使用 cover。`gallery` 为图片数组。每张图片的 `src` 必须是 `/case-studies/<slug>/文件名`，只能引用本案目录。添加双语 `alt`，尽量填写实际 `width`、`height`；需要时设置 `focalPoint`、`caption` 或 `display`。保持原图比例与既有裁切设置，不用重复图片凑图集。
5. 图片 `display` 按 `thumbnail` / `preview` / `hero` / `gallery` 用途设置 `{ "ratio": "4 / 5", "fit": "cover", "position": "50% 15%" }`；`fit` 可为 `contain`。`sources` 仅用于图片格式／断点替代源，每项为 `{srcSet, media?, type?}`，srcSet 为本案的一条图片路径，不是内部研究来源。
6. `media.layoutFamily` 沿用 `wide`、`portrait` 或 `single`。正文、交付和成果通过数据编排，无需新增 JSX 或审核 adapter。

## 分类

每案只设一个主分类，按核心项目目的选择。显示顺序与中英文名称在 `scripts/case-studies-lib.mjs` 的 `CASE_CATEGORIES` 中统一维护；没有已发布案例的分类不会显示。

| primaryCategory | 中文 / English | 选择依据 |
|---|---|---|
| `fashion-week` | 时装周项目 / Fashion Week Projects | 时装周人物准备、场景和内容项目 |
| `product-content` | 产品内容 / Product Content | 以美妆、护肤、服饰、鞋履等产品内容为主要交付 |
| `live-performance` | 现场演出 / Live Performance | 音乐会、晚会、相声等以舞台节目为核心的制作与支持 |
| `brand-cultural-events` | 品牌与文化活动 / Brand & Cultural Events | 产品发布、展示、交流活动；核心不是舞台节目 |

例如，文化音乐会仍归现场演出，因为交付围绕演出；文化交流会归品牌与文化活动。不要按是否出现摄影、妆造或人物重复归类。

## 草稿与撤回

草稿用 `status: "draft"`，正文及未公开图片放在 `src/content/case-drafts/<slug>/`（需要时再建）。此目录不被案例加载器读取、不进入正常网站或构建产物，不需要审核流程文件。

撤回已发布案例时，将状态改为 draft，**把整个目录从 public 移至上述草稿位置**；需要重新发布时，确认公开内容后移回并改为 published。只在 public 中修改状态不能保护原始 JSON 和图片，因此校验会拒绝留在 public 的 draft。草稿与正式目录不能同时维护两份正文。已撤回的详情 URL 显示项目暂不可用。

## 预览和检查

- `npm run dev`：查看 `/pages/corporate.html`，分类→项目→详情；详情 URL 为 `/pages/project.html?slug=<slug>`。修改公开 JSON 后自动刷新。
- `npm run test:cases`：检查加载、公开字段、草稿隔离、双语、排序、图片和人物资产隔离。
- `npm run build`：先校验内容，再构建到 `dist/`。
- `npm run preview`：检查构建后的目录、直接刷新详情、图片与双语。
- 自定义域名使用 `VITE_BASE=/`；GitHub Pages 仓库路径使用 `VITE_BASE=/vivian-celebrity/`。PowerShell 示例：`$env:VITE_BASE='/vivian-celebrity/'`，运行 build 和 preview 后用 `Remove-Item Env:VITE_BASE` 恢复。现有工作流为自定义域名显式设置 `/`。

图片和导航在组件中通过 `BASE_URL` / `withBase` 加前缀。JSON 内使用站点根相对路径，不能写入 localhost、部署域名或仓库前缀。

案例列表、预览及详情正文不放联系 CTA；预览保留 View Project，详情提供返回项目。全站 Header 的联系导航与咨询入口保留。

`public/corporate-cases/` 为尚未匹配项目的历史原图，不是当前案例来源。未证明重复或被替代前保留，勿自动导入为真实案例。其他原始素材、编辑器历史和非案例项目资料也不属于自动清理范围。
