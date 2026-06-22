# U 卡对比 / Crypto Card Compare

面向中文用户的加密货币银行卡（U 卡）信息整理与对比网站。产品覆盖虚拟卡、实体卡、稳定币消费、返现、费用、KYC、地区限制和使用风险；所有关键结论均应回到官方页面与最新条款复核。

> 本站是信息整理工具，不构成金融、投资、税务或法律建议。加密资产及其支付服务存在价格波动、地区限制、账户审查、服务中止和规则变更风险。

## 已实现功能

- 卡片浏览：搜索、筛选、排序、收藏和 2–5 张横向对比
- 卡片详情：费用、返现、地区资格、KYC、限额、风险、评分拆解及官方来源
- 申请引导：每张卡均提供邀请码 `APPDO`、一键复制与申请说明弹窗
- 计算工具：消费费用/返现估算和地区匹配推荐
- 内容页面：排行榜、使用指南、评分方法和来源目录
- 主题：默认深色模式，可切换浅色模式
- 响应式布局：适配桌面和移动端

当前内置：Wirex、Crypto.com、Bybit、Nexo、Coinbase、RedotPay、Tria、Plasma One、ether.fi Cash、Bitget、SafePal × Fiat24、MetaMask、Infini 等卡片资料。

## 最新更新

### 首页 Hero 与快速入口（2026-06-22）

- 在导航栏下方、“热门 U 卡”之前新增 Hero 区块，提供站点定位与当前卡片目录数量。
- 新增三个快速入口：按地区推荐、费用计算器和完整横向对比表。
- 为费用计算器与地区匹配推荐加入锚点，首屏按钮可直接定位到对应模块。
- Hero 按钮在移动端自动纵向堆叠；桌面端保持横向排列。
- 保留原有“热门 U 卡”及所有首页内容，并将其标题层级调整为 H2，确保页面仅有一个 H1。

## 技术栈

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide 图标

## 本地运行

要求：Node.js 20.9 或更高版本、npm。

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 常用命令

```bash
# 代码检查
npm run lint

# 生产构建
npm run build

# 本地运行生产构建
npm run start
```

## 项目结构

```text
src/
├── app/              # 路由与页面
├── components/       # 可复用界面组件
└── lib/
    ├── cards.ts      # 卡片资料、费用模型、评分与官方来源
    ├── guides.ts     # 指南文章内容
    └── site.ts       # 站点级配置
public/assets/        # 本地静态资源
```

## 维护卡片资料

卡片主数据集中在 [`src/lib/cards.ts`](src/lib/cards.ts)。新增或更新时请遵循：

1. 以官网、官方帮助中心、费用页和条款为事实来源；第三方测评只能补充体验观察。
2. 对返现写明卡等级、地区、活动、消费类别和上限，不能只展示最高宣传值。
3. 对地区、证件、KYC 或费用无法确认的字段使用“需确认”，不要推断为支持。
4. 保留 `sourceLinks`、`lastUpdated` 与风险说明，确保详情页可追溯。
5. 修改后运行 `npm run lint && npm run build`。

## 部署到 Vercel

首次部署前，请完成 Vercel 登录并在项目根目录执行：

```bash
npx vercel login
npx vercel --prod
```

若项目已关联 Vercel，可直接使用 `npx vercel --prod` 创建新的生产部署。部署前请先执行本地验证：

```bash
npm run lint && npm run build
```

使用自定义域名时，请在 Vercel 的 Production 环境设置 `NEXT_PUBLIC_SITE_URL` 为完整 HTTPS 域名；它用于 canonical、Open Graph 和结构化数据链接。

## GitHub 发布建议

建议将生产分支设为 `main`，通过 Pull Request 审核后合并；Vercel 连接 GitHub 仓库后，可为分支自动创建预览部署并在 `main` 更新生产站点。

## 数据与免责声明

站内资料会随发卡方、地区、KYC 规则、费率、活动和监管政策变化而失效。申请或使用任何产品前，请务必访问对应详情页中的官方链接，确认资格、费用、限额、资金来源要求和服务条款。
