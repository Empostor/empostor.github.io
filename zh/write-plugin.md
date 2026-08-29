# 编写插件

Empostor 拥有强大的插件系统。本部分涵盖开发、发布和使用插件所需的一切内容。

---

## 插件开发

### 入门指南

**[编写插件](Writing-a-plugin.md)** 是完整的分步指南：

1. 安装 .NET SDK
2. 创建 C# 类库项目
3. 添加 `Empostor.Api` NuGet 包
4. 编写插件类（继承 `PluginBase`）
5. 添加事件监听器（`IEventListener` 配合 `[EventListener]` 特性）
6. 在 `EnableAsync()` 中注册监听器
7. 构建、复制到 `plugins/` 并运行

涵盖主题：依赖注入、插件路径的服务器配置、使用外部库和版本兼容性。

### 国际化 (i18n)

**[国际化 (i18n)](Writing-a-plugin.md#国际化-i18n)** — 使用 `IPluginLanguageProvider` 接口将插件翻译为 15 种语言。包括用于占位符替换和格式化的 `LanguageString` API。关于基于文本文件的消息，请参阅 [HelloWorld.txt](configurable-files.md#messages-helloworld-txt)。

### Hello 页面

**[Hello 页面](Hello-page.md)** 记录了 Empostor 如何在 `http://your-server:22023/` 提供可自定义的主页。启动时，服务器会创建一个 `Pages/index.html` 文件，你可以自由编辑——更改无需重启即可生效。

---

## 内置插件

Empostor 附带多个演示插件 API 的插件：

| 插件 | 描述 | 文档 |
|---|---|---|
| **Boot.Codes** | 用可读单词替代随机游戏代码，如 SUNSET、ROCKET。使用自定义单词列表。 | [Boot.Codes](Boot-code.md) |
| **留言系统** | 通过好友代码给玩家离线留言。收件人加入时自动投递。 | [留言插件](Message-plugin.md) |
| **玩家频道** | 基于好友代码的跨游戏聊天频道。可在不同房间中与好友沟通。 | [玩家频道](Player-channel-plugin.md) |
| **聊天管理** | 记录所有游戏内聊天，并对玩家和房主强制执行可配置的消息长度限制。 | [聊天管理](Chat-plugin.md) |
| **地图投票** | 玩家使用聊天命令投票选择下一张地图。最受欢迎的地图自动被选中。 | [地图投票](MapVote-plugin.md) |
| **旁白** | 会议期间的 AI 驱动战略顾问。使用 DeepSeek AI 提供上下文建议。 | [旁白](Narrator-plugin.md) |
| **玩家统计** | 跟踪每个玩家的持久游戏统计：胜场、击杀、任务等。 | [玩家统计](PlayerStats-plugin.md) |
| **欢迎消息** | 支持占位符、远程内容和随机选择的本地化欢迎消息。 | [欢迎消息](Welcome-plugin.md) |
| **称号系统** | 通过好友代码为玩家分配显示称号前缀。支持配置或 API 的一次性称号。 | [称号系统](Titles-plugin.md) |
| **QQ 验证** | QQ 号码验证，用于将游戏账户关联到 QQ 账户。 | [QQ 验证](QqVerify-plugin.md) |
| **好友代码验证** | 根据格式模式和内置词典验证好友代码。 | [好友代码验证](FriendCodeValidator-plugin.md) |
| **服务器监控** | 用于健康检查和状态监控的 HTTP API 端点。 | [服务器监控](Monitor-plugin.md) |
| **隐私政策** | 通过管理 API 服务和管理可配置的隐私政策页面。 | [隐私政策](Privacy-plugin.md) |
| **Discord 通知** | 通过 Webhook 将游戏事件发送到 Discord 频道。 | [Discord 通知](Discord-webhook.md) |
| **聊天过滤** | 过滤游戏聊天中的屏蔽词和刷屏限速。 | [聊天过滤](Admin-panel.md#聊天过滤) |
| **固定房间代码** | 通过好友代码为特定玩家分配固定的房间代码。 | [Boot.Codes](Boot-code.md#fixedcode-插件) |
| **示例** | 展示完整 Empostor 插件 API 的演示插件。 | [编写插件](Writing-a-plugin.md) |

---

## 插件市场

**[插件市场](Admin-panel.md#插件市场)** 允许管理员从管理面板浏览和安装插件。了解 `plugins.json` 格式以发布你自己的插件：

- 插件元数据（id、name、description、author）
- 带下载 URL 的版本历史
- 最低 Empostor 版本要求
- 管理界面中带版本选择器的多版本支持
