# 服务端功能

以下内容均为 Empostor 内置能力，无需安装任何插件，服务器启动后即可使用。

::: tip 想找可选功能？
可选能力都收录在[插件](../plugins/)中。凡是能通过删除 `.dll` 来关闭的功能，都属于插件。
:::

## 管理面板

**[管理面板](admin-panel.md)** 是位于 `http://你的服务器:22023/admin` 的内置 Web 界面，也是日常运维的主要工具：

| 能力 | 文档 |
| :--- | :--- |
| 看板、房间、客户端、踢出与封禁 | [管理面板](admin-panel.md) |
| 玩家战绩统计 | [统计分析](statistics.md) |
| 浏览并安装社区插件 | [插件市场](plugin-marketplace.md) |
| 游戏内举报记录 | [举报](admin-panel.md#举报) |
| 与 GitHub 发行版比对版本 | [更新](admin-panel.md#更新) |

![管理面板](/images/overview_panel.png)

## 玩家与服务器数据

| 功能 | 说明 | 文档 |
| :--- | :--- | :--- |
| 统计分析 | 按玩家统计胜场、击杀、任务与出局，游戏内可用 `#stat` 查询。 | [统计分析](statistics.md) |
| 举报记录 | 最近 200 条游戏内举报，含原因与处理结果。 | [举报](admin-panel.md#举报) |
| 行为日志 | 可持久化的可搜索玩家事件历史。 | [玩家日志](../plugins/player-log.md) |
| 健康检查 | 用于可用性监控的 HTTP 接口。 | [服务器监控](../plugins/monitor.md) |

## Web 内容

服务器还会在 22023 端口提供普通 HTTP 内容：

- **[Hello 页面](hello-page.md)** —— 位于 `http://你的服务器:22023/`，首次启动时生成可自由编辑的 `Pages/index.html`。
- **隐私政策** —— 可配置的政策页面，由[隐私政策](../plugins/privacy-policy.md)插件提供。

## 服务器管理

- **封禁** —— 支持按 IP 或好友代码封禁，持久化写入 `bans.json`，详见[封禁](admin-panel.md#封禁)。
- **身份验证** —— 管理会话密码保护，配合 HttpOnly Cookie 与频率限制，详见[身份验证](admin-panel.md#身份验证)。
- **版本更新** —— 与 GitHub 最新发行版比对版本，详见[更新](admin-panel.md#更新)。

## 进一步扩展

除内置功能外，插件按以下类别划分：

| 类别 | 示例 |
| :--- | :--- |
| 聊天与展示 | [聊天管理](../plugins/chat-manager.md)、[聊天过滤](../plugins/chat-filter.md)、[自定义称号](../plugins/custom-title.md)、[欢迎消息](../plugins/welcome-messages.md) |
| 房间与玩法 | [自定义房间代码](../plugins/custom-game-codes.md)、[固定房间代码](../plugins/fixed-room-code.md)、[地图投票](../plugins/map-vote.md) |
| 社交互动 | [玩家频道](../plugins/player-channel.md)、[留言系统](../plugins/leave-a-message.md)、[旁白 AI](../plugins/narrator.md) |
| 身份校验 | [好友代码验证](../plugins/friend-code-validator.md)、[QQ 群验证](../plugins/qq-verify.md) |
| 运维与数据 | [服务器监控](../plugins/monitor.md)、[玩家日志](../plugins/player-log.md)、[玩家统计](../plugins/player-stats.md)、[隐私政策](../plugins/privacy-policy.md) |
| 外部集成 | [Discord 通知](../plugins/discord-webhook.md) |

完整清单请见[插件总览](../plugins/)。
