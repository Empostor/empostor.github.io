# Empostor 文档重构方案

基于 `empostor.github.io` 站点与 `Empostor` 源码仓库的实际结构重新规划，含问题诊断、信息架构设计与完整页面清单。

---

## 一、重构前的实际状况

### 1.1 规模

| 项目 | 数值 |
| :--- | :--- |
| Markdown 页面 | 36 篇 / 语言，中英双语共 72 处文件 |
| 导航分组 | 6 个（虚拟分组，非目录） |
| 源码插件项目 | 18 个 |
| marketplace 注册插件 | 17 个 + 1 个运行时依赖 |
| 根目录平铺文件 | 36 个 `.md` 直接堆在仓库根 |

### 1.2 诊断出的问题

**P0 — 结构与组织**

1. **全部页面平铺在根目录**：中英两种语言各 36 个 `.md` 直接放在仓库根，与 `package.json`、`LICENSE`、`node_modules` 混在一起。目录树完全不表达信息层级，Finder / VS Code 里看不出任何分组关系。

2. **导航分组是虚构的**：`config.js` 里的 6 个 sidebar 分组（"Configure Server"、"Detailed Features" 等）只是对同一批平铺文件的罗列，**与文件系统布局没有任何对应关系**。维护者无法通过文件位置判断某页该出现在哪个分组，每次增删页面都必须手工同步 `config.js`，否则必然遗漏。

3. **同一文件被多个分组重复引用**：`MapVote-plugin.md`、`Narrator-plugin.md`、`PlayerStats-plugin.md`、`Welcome-plugin.md`、`Titles-plugin.md`、`QqVerify-plugin.md`、`FriendCodeValidator-plugin.md`、`Monitor-plugin.md`、`Privacy-plugin.md` 共 9 个文件同时出现在 "Detailed Features" 和 "Write Plugin" 两个分组里。用户不确定自己是否漏读，也不知道哪一处的描述才是权威的。

4. **用锚点伪装成独立页面**：`Admin-panel.md#chat-filter`、`Admin-panel.md#statistics`、`Admin-panel.md#plugin-marketplace`、`api-reference.md#verification-api` 在 sidebar 里被**当作独立导航项**渲染，但实际只是长页面里的一个章节。这种做法有三个后果：章节不能独立访问和分享、无法单独被搜索引擎收录、无法在搜索里精确定位。

5. **孤儿页面**：`Hplp-server-list.md`（HPLP 协议文档，commit `cc62eb5` 引入）从未被加入任何导航，只能通过直接输入 URL 访问。同理 `README.md` 会被渲染成一个无意义的 `/README` 页面。

**P1 — 内容覆盖与一致性**

6. **3 个已上架插件完全没有文档**：

   | 插件 | marketplace ID | 源码项目 |
   | :--- | :--- | :--- |
   | Fixed Room Code | `cn.hayashiume.fixedcode` | `Empostor.Plugins.FixedCode` |
   | Chat Filter | `cn.hayashiume.chatfilter` | `Empostor.Plugins.ChatFilter` |
   | Player Log | `gg.empostor.playerlog` | `Empostor.Plugins.PlayerLog` |

   其中 Chat Filter 只作为 Admin Panel 的锚点存在；Fixed Room Code 在旧文档里被错误地链到了 `Boot-code.md#fixedcode-plugin` 这个并不存在的锚点。

7. **示例插件无入口**：源码里的 `Empostor.Plugins.Example`（4 个事件监听器 + 完整插件类）是开发者最好的起点，但文档完全没提，只在 sidebar 里用 `Writing a Plugin` 应付。

8. **缺"接入客户端"这一环**：服务端文档齐全，但**没有任何页面讲如何把 Among Us 客户端连到服务器**。相关内容只存在于源码仓库 README 里，且 deepest 文档站无法找到。这是新手最痛的断点。

9. **`Admin-panel.md` 的 Broadcast 章节标题丢失**：第 195–199 行，"Sends a chat message to every active game..." 这段正文直接挂在 `---` 分隔符之后，**没有 `## Broadcast` 标题**，因此在章节导航和锚点里都不可达。

10. **命名风格混用**：同一仓库内存在 `Server-configuration.md`（PascalCase）、`configure-server.md`（kebab-case）、`api-reference.md`（kebab）、`TROUBLESHOOTING.md`（全大写）四种风格。

11. **极易混淆的同名文件**：`Writing-a-plugin.md`（14.8 KB 正文）与 `write-plugin.md`（4.2 KB 分组首页）并存，仅靠 `Writing` / `write` 大小写区分。

**P2 — 工程性**

12. **i18n 靠手工同步**：`zh/` 是英文 Studio 的人工译文镜像，两套文件的 sidebar 在 `config.js` 里各写一遍、共 100+ 行重复配置，漏改一处就会出现中英文导航不一致。

13. **双语配置重复**：footer、socialLinks 在两个 locale 里各声明一次；themeConfig 的 search 配置与 locale 配置分离摆放。

---

## 二、重构后的信息架构

### 2.1 设计原则

| 原则 | 落地方式 |
| :--- | :--- |
| **目录即导航** | 文件系统层级 = sidebar 层级，看目录就知道页面归属 |
| **按用户旅程组织** | Get Started → Plugins → Server Features → Develop → Reference → Operations |
| **内置 vs 可选分离** | 删掉 `.dll` 仍能工作的能力放 `server/`，否则放 `plugins/` |
| **单一权威源** | 一个概念只有一篇文档；旧位置用重定向收敛 |
| **锚点提升为页面** | 被独立导航引用的章节，一律提升为真实 `.md` |
| **插件目录对齐 marketplace** | `plugins/` 的内容由 `marketplace/plugins.json` 定义的 17 个插件驱动 |

### 2.2 目录结构

```
empostor.github.io/
├── .vitepress/
│   └── config.js              # 单文件集中管理 IA + 重定向表
├── pages/                     # srcDir，所有 Markdown 迁出根目录
│   ├── index.md               # 首页
│   ├── get-started/           # 用户旅程第一段：跑起来
│   ├── plugins/               # 17 个可选插件，按用途二分分组
│   ├── server/                # 内置能力
│   ├── develop/               # 插件开发
│   ├── reference/             # HTTP API
│   ├── config-files/          # 可配置文件参考
│   ├── operations/            # FAQ / 故障排除
│   ├── about.md
│   ├── images/                # 静态资源（随 srcDir 走）
│   └── zh/                    # 简体中文，目录与英文严格镜像
└── public/
    ├── favicon.png
    └── empostor/              # Empostor Tool 静态站点
```

关键点：`srcDir: 'pages'` 后**仓库根目录只剩配置文件**，Markdown 全部集中管理；`zh/` 与英文目录逐一同构，同等路径 (~relative link) 在中英两侧通用，维护双语不再需要在两侧写不同的链接。

---

## 三、重构后的页面结构清单

### 3.1 总体视图

| 模块 | 页数 | URL 前缀 | 作用 |
| :--- | :--- | :--- | :--- |
| Get Started | 7 | `/get-started/` | 安装、接入客户端、配置、上线 |
| Plugins | 18 | `/plugins/` | 17 个插件 + 1 个总览 |
| Server Features | 5 | `/server/` | 内置能力 |
| Develop | 3 | `/develop/` | 插件开发 |
| API Reference | 7 | `/reference/` | HTTP 接口 |
| Config Files | 1 | `/config-files/` | 可配置文件 |
| Operations | 2 | `/operations/` | FAQ / 故障排除 |
| About | 1 | `/about` | 项目背景 |
| **合计** | **44** | | 每种语言 |

### 3.2 逐页清单

#### Get Started — `/get-started/`

| # | 页面 | 新路径 | 来源 |
| :-- | :--- | :--- | :--- |
| 1 | Get Started Overview | `get-started/index.md` | ← `configure-server.md`（重写，按 4 步编排） |
| 2 | Installation | `get-started/installation.md` | ← `Running-the-server.md` |
| 3 | **Connect a Client** | `get-started/client-setup.md` | **新建**（从源码 README 抽取 + 补齐三平台） |
| 4 | Server Configuration | `get-started/configuration.md` | ← `Server-configuration.md` |
| 5 | HTTPS & Reverse Proxy | `get-started/reverse-proxy.md` | ← `Http-server.md` |
| 6 | Firewall & Ports | `get-started/firewall-and-ports.md` | ← `Firewall-and-ports.md` |
| 7 | Build from Source | `get-started/build-from-source.md` | ← `Building-from-source.md` |

#### Plugins — `/plugins/`

17 个插件，与 `marketplace/plugins.json` 严格对齐，按用途分为 6 组。

**Communication（4）**

| 页面 | 新路径 | 来源 | 插件 ID |
| :--- | :--- | :--- | :--- |
| Overview | `plugins/index.md` | **新建**（按 marketplace 生成清单） | — |
| Chat Manager | `plugins/chat-manager.md` | ← `Chat-plugin.md` | `cn.hayashiume.chat` |
| Chat Filter | `plugins/chat-filter.md` | **提升**（← `Admin-panel#chat-filter`） | `cn.hayashiume.chatfilter` |
| Welcome Messages | `plugins/welcome-messages.md` | ← `Welcome-plugin.md` | `cn.hayashiume.welcome` |
| Custom Title | `plugins/custom-title.md` | ← `Titles-plugin.md` | `cn.hayashiume.titles` |

**Rooms & Gameplay（3）**

| 页面 | 新路径 | 来源 | 插件 ID |
| :--- | :--- | :--- | :--- |
| Custom Game Codes | `plugins/custom-game-codes.md` | ← `Boot-code.md` | `cn.hayashiume.code` |
| **Fixed Room Code** | `plugins/fixed-room-code.md` | **新建**（依 `FixedCodeConfig.cs`） | `cn.hayashiume.fixedcode` |
| Map Vote | `plugins/map-vote.md` | ← `MapVote-plugin.md` | `cn.hayashiume.mapvote` |

**Social（3）**

| 页面 | 新路径 | 来源 | 插件 ID |
| :--- | :--- | :--- | :--- |
| Player Channel | `plugins/player-channel.md` | ← `Player-channel-plugin.md` | `cn.hayashiume.playerchannel` |
| Leave a Message | `plugins/leave-a-message.md` | ← `Message-plugin.md` | `cn.hayashiume.message` |
| Narrator (AI) | `plugins/narrator.md` | ← `Narrator-plugin.md` | `cn.hayashiume.narrator` |

**Identity & Verification（2）**

| 页面 | 新路径 | 来源 | 插件 ID |
| :--- | :--- | :--- | :--- |
| Friend Code Validator | `plugins/friend-code-validator.md` | ← `FriendCodeValidator-plugin.md` | `duck.hayashiume.friendcodevalidator` |
| QQ Verify | `plugins/qq-verify.md` | ← `QqVerify-plugin.md` | `cn.hayashiume.qqverify` |

**Ops & Data（4）**

| 页面 | 新路径 | 来源 | 插件 ID |
| :--- | :--- | :--- | :--- |
| Monitor | `plugins/monitor.md` | ← `Monitor-plugin.md` | `gg.empostor.monitor` |
| **Player Log** | `plugins/player-log.md` | **新建**（依 `PlayerLogStore.cs`） | `gg.empostor.playerlog` |
| Player Stats | `plugins/player-stats.md` | ← `PlayerStats-plugin.md` | `cn.hayashiume.playerstats` |
| Privacy Policy | `plugins/privacy-policy.md` | ← `Privacy-plugin.md` | `gg.empostor.privacy` |

**Integrations（1）**

| 页面 | 新路径 | 来源 | 插件 ID |
| :--- | :--- | :--- | :--- |
| Discord Webhook | `plugins/discord-webhook.md` | ← `Discord-webhook.md` | `cn.hayashiume.discordwebhook` |

#### Server Features — `/server/`

| # | 页面 | 新路径 | 来源 |
| :-- | :--- | :--- | :--- |
| 1 | Server Features Overview | `server/index.md` | ← `detailed-features.md`（重写，剥离插件内容） |
| 2 | Admin Panel | `server/admin-panel.md` | ← `Admin-panel.md`（拆出 3 章 + 修复丢失的 Broadcast 标题） |
| 3 | Statistics | `server/statistics.md` | **提升**（← `Admin-panel#statistics`） |
| 4 | Plugin Marketplace | `server/plugin-marketplace.md` | **提升**（← `Admin-panel#plugin-marketplace`） |
| 5 | Hello Page | `server/hello-page.md` | ← `Hello-page.md` |

#### Develop — `/develop/`

| # | 页面 | 新路径 | 来源 |
| :-- | :--- | :--- | :--- |
| 1 | Develop Plugins Overview | `develop/index.md` | ← `write-plugin.md` |
| 2 | Writing a Plugin | `develop/writing-a-plugin.md` | ← `Writing-a-plugin.md` |
| 3 | **Example Plugin** | `develop/example-plugin.md` | **新建**（依 `Empostor.Plugins.Example`） |

#### API Reference — `/reference/`

| # | 页面 | 新路径 | 来源 |
| :-- | :--- | :--- | :--- |
| 1 | API Overview | `reference/index.md` | ← `api-reference.md`（拆出 2 章） |
| 2 | Monitor API | `reference/monitor-api.md` | ← `Server-monitoring.md` |
| 3 | Privacy Policy API | `reference/privacy-api.md` | ← `Privacy-api.md` |
| 4 | Game Listing API | `reference/game-listing-api.md` | ← `Game-api.md` |
| 5 | **Verification API** | `reference/verification-api.md` | **提升**（← `api-reference#verification-api`） |
| 6 | **Admin API** | `reference/admin-api.md` | **提升**（← `api-reference` Admin API 章节） |
| 7 | HPLP Server List | `reference/hplp.md` | ← `Hplp-server-list.md`（孤儿页面收编） |

#### Config Files / Operations / About

| 页面 | 新路径 | 来源 |
| :--- | :--- | :--- |
| Configurable Files | `config-files/index.md` | ← `configurable-files.md` |
| FAQ | `operations/faq.md` | ← `FAQ.md` |
| Troubleshooting | `operations/troubleshooting.md` | ← `TROUBLESHOOTING.md` |
| About | `about.md` | ← `About.md` |

**删除**：`README.md`（仓库说明混入文档源，会渲染成 `/README` 页面）

### 3.3 文件命名规范

统一为 **kebab-case 全小写**，落到实处：

| 类型 | 风格 | 示例 |
| :--- | :--- | :--- |
| 卷首页 | `index.md` | `get-started/index.md` |
| 常规页面 | kebab-case | `reverse-proxy.md`、`friend-code-validator.md` |
| 插件页 | 去技术后缀 | `Titles-plugin.md` → `custom-title.md` |

旧命名里的 `-plugin` 后缀、PascalCase、全大写一律淘汰。

---

## 四、迁移与兼容性

### 4.1 文件操作

全部使用 `git mv` / Python `shutil.move`，**保留 Git 历史**，`git status` 可识别为 rename。

### 4.2 链接修复

| 项目 | 数量 | 处理方式 |
| :--- | :--- | :--- |
| 正文内 `.md` 链接 | 139 处 | 按文件新位置重写为相对路径 |
| 指向被拆走章节的锚点链接 | 12 处 | 重定向到新建的独立页面 |
| 失效锚点（`#fixedcode-plugin`） | 2 处 | 改为指向 `fixed-room-code.md` |

因中英目录严格同构，**相对路径在双语两侧通用**，无需为每个 locale 分别维护链接。

### 4.3 旧 URL 兼容（重要）

这是一个公开部署、已被引用的站点（源码 README 里就有 `https://empostor.github.io/Http-server#use-a-reverse-proxy`），因此**旧的 36 个 URL 全部保留**。

在 `config.js` 中实现了一个构建期插件 `empostor-legacy-redirects`，在 `writeBundle` 阶段为每个旧路径生成 HTML 跳转页：

- **路径重定向**（35 条 `/` + 35 条 `/zh`）：meta refresh + canonical + JS 跳转三重保障
- **锚点重定向**（9 条）：由于 fragment 不会发往服务器，改为在跳转页内注入 hash 映射表，由 JS 解析 `location.hash` 后跳转到新的目标页

已验证的跳转效果：

```
/Admin-panel                        → /server/admin-panel
/Admin-panel#chat-filter            → /plugins/chat-filter
/Admin-panel#statistics             → /server/statistics
/Admin-panel#plugin-marketplace     → /server/plugin-marketplace
/api-reference#verification-api     → /reference/verification-api
/Chat-plugin                        → /plugins/chat-manager
/Http-server                        → /get-started/reverse-proxy
/Hplp-server-list                   → /reference/hplp
```

---

## 五、备注与跟进建议

1. **`Empostor.Plugins.FixedCode` 的插件 ID 不一致**：源码特性标注为 `cn.Empostor.fixedcode`，而 `marketplace/plugins.json` 里注册为 `cn.hayashiume.fixedcode`。文档以 marketplace 为准，建议修正源码保持统一。

2. **`package-lock.json` 与 `pnpm-lock.yaml` 并存**：`package.json` 声明 `packageManager: pnpm@9.15.0`，建议删除 `package-lock.json`，统一包管理器。

3. **双语镜像仍靠人工**：本次重构后 `zh/` 与英文目录严格同构，已大幅降低同步成本；若要彻底解决，可考虑引入 i18n 检查脚本，在 CI 里校验两侧页面的存在性与标题一致性。

4. **搜图资源位置**：`images/` 必须位于 `srcDir` 之内（VitePress 按 `srcDir` 解析 Markdown 内的 `/images/*` 引用），已迁移至 `pages/images/`。
