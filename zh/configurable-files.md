# 可配置文件

Empostor 使用多个用户可编辑的文件进行配置、自定义和本地化。本页面记录每个文件的位置、格式和用途。

---

## config.json

**位置：** `Empostor.Server` 可执行文件旁边
**格式：** JSON

主服务器配置文件。完整参考请参阅[服务器配置](Server-configuration.md)。

```json
{
  "Server": {
    "PublicIp": "127.0.0.1",
    "PublicPort": 22023,
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  },
  "HttpServer": {
    "Enabled": true,
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  },
  "AntiCheat": { "Enabled": true, "BanIpFromGame": true, ... },
  "Compatibility": { "AllowFutureGameVersions": false, ... },
  "Debug": { "GameRecorderEnabled": false, "GameRecorderPath": "" },
  "Admin": { "Password": "CHANGE-ME", "MarketplaceUrl": "..." },
  "DiscordWebhook": { "MatchmakerUrl": "", "AdminUrl": "" },
  "PlayerStats": { "Enabled": false, "PersistToFile": true },
  "ChatFilter": { "Enabled": false, "BlockedWords": [], ... },
  "AuthApi": {
    "Mode": "Both",
    "NikoApiKey": "niko-request-api-key",
    "NikoApiBaseUrl": "https://au-verify.niko233.top",
    "RelayApiBaseUrl": "http://localhost:5100",
    "RelayApiKey": "empostor-relay-api-key-change-me",
    "UmeApiBaseUrl": "https://auverify.hayashiume.top",
    "UmeApiKey": "sk-empostor-globalapikey"
  }
}
```

### 通过环境变量配置

作为编辑 `config.json` 的替代方案，你可以使用模式 `EMPOSTOR_SectionName__VariableName` 设置环境变量：

```
EMPOSTOR_Server__PublicIp=127.0.0.1
EMPOSTOR_Server__PublicPort=22023
EMPOSTOR_AntiCheat__Enabled=true
EMPOSTOR_Admin__Password=mysecretpassword
```

### AuthApi — 验证配置

`AuthApi` 部分控制 Empostor 如何获取玩家好友代码以进行身份验证。完整流程请参阅[验证 API](api-reference.md#验证-api)。

| 字段 | 类型 | 默认值 | 描述 |
|---|---|---|---|
| `Mode` | string | `Innersloth` | 验证模式：`Innersloth`、`Niko`、`Ume`、`Relay` 或 `Both` |
| `NikoApiKey` | string | `niko-request-api-key` | Niko au-verify 服务的 API 密钥 |
| `NikoApiBaseUrl` | string | `https://au-verify.niko233.top` | Niko au-verify API 的基础 URL |
| `RelayApiBaseUrl` | string | （空） | 自定义中继验证服务器的基础 URL |
| `RelayApiKey` | string | （空） | 中继服务器的 API 密钥 |
| `UmeApiBaseUrl` | string | `https://auverify.hayashiume.top` | UmeAuthService 的基础 URL |
| `UmeApiKey` | string | `sk-empostor-globalapikey` | UmeAuthService 的内置 API 密钥 |

**模式说明：**

| 模式 | 行为 |
|---|---|
| `Innersloth` | 直接调用 Innersloth 官方 API。无需外部服务。 |
| `Niko` | 使用 Niko 的 au-verify 服务。需要有效的 `NikoApiKey`。玩家需加入验证服务器。 |
| `Ume` | 使用 UmeAuthService——轻量级 HTTP 代理。无需玩家操作。 |
| `Relay` | 使用 `RelayApiBaseUrl` 处的自定义中继服务器。 |
| `Both` | 若 `NikoApiKey` 已自定义 → 优先 Niko，其次 Ume，最后 Innersloth。否则 → 优先 Ume，其次 Niko，最后 Innersloth。 |

---

## AdminStrings.json

**位置：** `Pages/AdminStrings.json`
**格式：** JSON（扁平键值对）

管理面板 Web 界面的本地化文件。每个 UI 字符串都是一个键值对。翻译这些值以自定义管理面板的语言。

```json
{
  "login.title": "Empostor Admin",
  "login.password": "密码",
  "login.placeholder": "输入管理员密码",
  "login.signin": "登录",
  "login.error": "密码错误。",

  "nav.monitor": "监控",
  "nav.overview": "概览",
  "nav.games": "游戏",
  "nav.clients": "客户端",
  "nav.broadcast": "广播",
  "nav.kick": "踢出",
  "nav.ban": "封禁",
  ...
}
```

**键分类：**

| 前缀 | 对应部分 |
|---|---|
| `login.*` | 登录页面 |
| `header.*` | 顶部标题栏 |
| `nav.*` | 侧边栏导航标签 |
| `status.*` | 仪表盘统计卡片 |
| `table.*` | 表格列标题 |
| `broadcast.*` | 广播标签页 |
| `kick.*` | 踢出标签页 |
| `ban.*` | 封禁/封禁列表标签页 |
| `message.*` | 消息标签页 |
| `endgame.*` | 结束游戏标签页 |
| `privacy.*` | 隐私切换标签页 |
| `marketplace.*` | 插件市场标签页 |
| `updates.*` | 更新检查标签页 |
| `reports.*` | 举报标签页 |
| `serverinfo.*` | 服务器信息标签页 |
| `games.*` | 游戏列表 |
| `clients.*` | 客户端列表 |
| `alert.*` | 提示通知消息 |
| `privacy_policy.*` | 隐私政策页面 |
| `player_logs.*` | 玩家日志标签页 |
| `stats.*` | 统计标签页 |
| `chatfilter.*` | 聊天过滤标签页 |

**添加新语言的方法：**
1. 翻译 `AdminStrings.json` 中的所有值
2. 在管理面板中使用**重新加载语言**按钮应用更改，无需重启

---

## Pages/index.html（Hello 页面）

**位置：** `Pages/index.html`
**格式：** HTML

在 `http://your-server:22023/` 提供的主页。首次启动时，Empostor 会自动创建此目录并生成默认的 `index.html`。

**关键行为：**
- 每次请求从磁盘读取——编辑无需重启即可生效
- 以 `text/html; charset=utf-8` 提供
- 无模板引擎——文件按原样提供
- 如果删除，在服务器重启前返回纯文本回退响应

**默认页面内容：**
- 服务器在线状态指示器
- 管理面板链接（`/admin`）
- 区域文件生成器链接
- 服务器启动时间

**常见自定义内容：**
- 服务器规则和信息
- Discord 邀请链接
- 区域文件下载说明
- 自定义品牌标识

更多详情请参阅 [Hello 页面](Hello-page.md)。

---

## Messages/HelloWorld.txt

**位置：** `Messages/HelloWorld.txt`
**格式：** 纯文本（每行 `语言代码: 消息`）

Welcome 插件使用的欢迎消息模板。每行定义一个特定语言的问候语。插件在每次玩家加入时读取文件，因此编辑会立即生效。

### 文件命名规则

Welcome 插件使用模式 `Message/{Language}HelloWord.txt` 查找每种语言的文件：

- `Message/EnglishHelloWord.txt`
- `Message/SChineseHelloWord.txt`
- `Message/KoreanHelloWord.txt`

如果存在特定语言的文件，其优先级高于主 `HelloWorld.txt`。

### 格式

```
# 格式：   语言代码: 消息模板
# 回退：   default

default: 👋 Welcome, {Name}! Friend code: {FriendCode} | Room: {GameCode}
en:      👋 Welcome, {Name}! Friend code: {FriendCode} | Room: {GameCode}
zh:      👋 欢迎，{Name}！好友码：{FriendCode} | 房间：{GameCode}
ko:      👋 환영합니다, {Name}! 친구 코드: {FriendCode} | 방: {GameCode}
ru:      👋 Добро пожаловать, {Name}! Код друга: {FriendCode} | Комната: {GameCode}
pt:      👋 Bem-vindo, {Name}! Código de amigo: {FriendCode} | Sala: {GameCode}
de:      👋 Willkommen, {Name}! Freundescode: {FriendCode} | Raum: {GameCode}
fr:      👋 Bienvenue, {Name}! Code ami : {FriendCode} | Salle : {GameCode}
es:      👋 ¡Bienvenido, {Name}! Código amigo: {FriendCode} | Sala: {GameCode}
ja:      👋 ようこそ、{Name}！フレンドコード：{FriendCode} | ルーム：{GameCode}
```

**可用占位符（v1.1.0）：**

| 占位符 | 描述 | 示例 |
|---|---|---|
| `{Name}` | 玩家显示名称 | `Alice` |
| `{FriendCode}` | 玩家好友代码 | `matchduck#1337` |
| `{GameCode}` | 房间代码 | `ABCDEF` |
| `{Room}` | 房间代码（别名） | `ABCDEF` |
| `{LastConnect}` | 上次断连时间（UTC） | `2026-05-24 15:30:00` |

`{LastConnect}` 对新玩家显示"首次光临，欢迎！"。

**自定义：** 直接编辑 `.txt` 文件。示例 `Message/SChineseHelloWord.txt`：
```
欢迎回来，{Name}！房间：{Room}
上次在线：{LastConnect}
```

**添加语言：** 用你的语言代码和消息模板添加新行。`default` 行用作任何未明确列出语言的回退。

关于代码层面的插件多语言支持（`IPluginLanguageProvider`），请参阅[编写插件](Writing-a-plugin.md#国际化-i18n)。

---

## marketplace/plugins.json

**位置：** `marketplace/plugins.json`（或在 `Admin.MarketplaceUrl` 中配置的远程 URL）
**格式：** JSON 数组

定义管理面板插件市场中可用的插件。完整格式参考请参阅[插件市场](Admin-panel.md#插件市场)。

```json
[
  {
    "id": "cn.hayashiume.welcome",
    "name": "欢迎消息",
    "description": "玩家加入房间时发送本地化的欢迎消息。",
    "author": "BunchHanpiDev & HayashiUme",
    "versions": [
      {
        "version": "1.0.0",
        "empostor_version": "2.0.0",
        "download_url": "https://raw.githubusercontent.com/Empostor/Empostor/master/marketplace/Empostor.Plugins.Welcome.dll"
      }
    ]
  }
]
```

---

## bans.json

**位置：** `Empostor.Server` 可执行文件旁边（自动生成）
**格式：** JSON

持久存储 IP 封禁和好友代码封禁。通过管理面板管理——通常不需要手动编辑此文件。

---

## player_stats.json

**位置：** `Empostor.Server` 可执行文件旁边（当 `PlayerStats.Enabled` 为 `true` 时自动生成）
**格式：** JSON

存储每个玩家的游戏统计数据。通过管理面板管理。

---

## 文件概览

| 文件 | 创建者 | 可编辑 | 需要重启 |
|---|---|---|---|
| `config.json` | 你（从发布包中获取） | 是 | 是 |
| `Pages/AdminStrings.json` | 服务器（首次启动时） | 是 | 否（使用重新加载语言） |
| `Pages/index.html` | 服务器（首次启动时） | 是 | 否 |
| `Pages/privacy.html` | 服务器（首次使用时） | 是（通过 API） | 否 |
| `Messages/HelloWorld.txt` | Welcome 插件 | 是 | 否 |
| `marketplace/plugins.json` | 你 | 是 | 否（市场列表），是（安装后） |
| `bans.json` | 服务器（自动） | 通过管理面板 | 否 |
| `player_stats.json` | 服务器（自动） | 通过管理面板 | 否 |
