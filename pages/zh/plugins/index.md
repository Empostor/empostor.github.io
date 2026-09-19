# 插件

Empostor 官方提供 17 个插件，均可通过内置的[插件市场](../server/plugin-marketplace.md)分发。在[管理面板](../server/admin-panel.md)中点击安装即可下载 `.dll`，安装后需重启服务器才能加载。

::: tip 想自己写一个？
参见[编写插件](../develop/writing-a-plugin.md)与[示例插件](../develop/example-plugin.md)。
:::

这些插件面向玩家的聊天指令收录在[指令参考](../reference/commands.md)中。

## 安装步骤

1. 打开管理面板 `http://你的服务器:22023/admin`。
2. 进入「插件市场」标签页。
3. 在目标插件上点击「安装」。
4. 重启服务器。

插件市场的目录来源于 `Admin.MarketplaceUrl` 配置的 URL。搭建自己的目录请见[插件市场](../server/plugin-marketplace.md)。

## 插件清单

以下插件均与 `marketplace/plugins.json` 中的条目一一对应。

### 聊天沟通

| 插件 | ID | 说明 |
| :--- | :--- | :--- |
| [聊天管理](chat-manager.md) | `cn.hayashiume.chat` | 记录聊天消息并限制消息长度。 |
| [聊天过滤](chat-filter.md) | `cn.hayashiume.chatfilter` | 屏蔽指定词汇并对刷屏限流。 |
| [欢迎消息](welcome-messages.md) | `cn.hayashiume.welcome` | 玩家进入房间时发送本地化欢迎语。 |
| [自定义称号](custom-title.md) | `cn.hayashiume.titles` | 在玩家昵称前显示称号前缀。 |

### 房间与玩法

| 插件 | ID | 说明 |
| :--- | :--- | :--- |
| [自定义房间代码](custom-game-codes.md) | `cn.hayashiume.code` | 从 `Boot.Codes/` 目录下的词表抽取房间代码。 |
| [固定房间代码](fixed-room-code.md) | `cn.hayashiume.fixedcode` | 为指定好友代码固定分配房间代码。 |
| [地图投票](map-vote.md) | `cn.hayashiume.mapvote` | 通过聊天指令投票选择下一张地图。 |

### 社交互动

| 插件 | ID | 说明 |
| :--- | :--- | :--- |
| [玩家频道](player-channel.md) | `cn.hayashiume.playerchannel` | 基于好友代码的跨房间聊天频道。 |
| [留言系统](leave-a-message.md) | `cn.hayashiume.message` | 离线留言，收件人上线后投递。 |
| [旁白 AI](narrator.md) | `cn.hayashiume.narrator` | 会议阶段提供 AI 策略顾问。 |

### 身份校验

| 插件 | ID | 说明 |
| :--- | :--- | :--- |
| [好友代码验证](friend-code-validator.md) | `duck.hayashiume.friendcodevalidator` | 踢出好友代码格式非法的客户端。 |
| [QQ 群验证](qq-verify.md) | `cn.hayashiume.qqverify` | 将游戏账号与 QQ 号关联，便于社群管理。 |

### 运维与数据

| 插件 | ID | 说明 |
| :--- | :--- | :--- |
| [服务器监控](monitor.md) | `gg.empostor.monitor` | 提供健康检查与状态看板 HTTP 接口。 |
| [玩家日志](player-log.md) | `gg.empostor.playerlog` | 记录玩家行为并在管理面板中查阅。 |
| [玩家统计](player-stats.md) | `cn.hayashiume.playerstats` | 按玩家统计胜场、击杀、任务等数据。 |
| [隐私政策](privacy-policy.md) | `gg.empostor.privacy` | 提供可配置的隐私政策页面与管理接口。 |

### 外部集成

| 插件 | ID | 说明 |
| :--- | :--- | :--- |
| [Discord 通知](discord-webhook.md) | `cn.hayashiume.discordwebhook` | 将游戏事件推送到 Discord 频道。 |
