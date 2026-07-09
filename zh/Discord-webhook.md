# Discord Webhook 集成

Empostor 可以通过 [Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) 向 Discord 频道发送游戏事件。每个事件以富文本嵌入消息的形式发送，包含相关详细信息。

事件分为两个类别，每个类别拥有独立的 Webhook URL：

- **Matchmaker（对局）** — 游戏生命周期事件（游戏创建、游戏开始、游戏结束、玩家加入）
- **Admin（管理）** — 管理/审核事件（玩家踢出、玩家举报）

此功能**默认禁用**。在 `config.json` 中提供 Webhook URL 即可激活。将 URL 留空则会禁用该类别。

## 配置

将 `DiscordWebhook` 部分添加到 `config.json`：

```json
{
  "DiscordWebhook": {
    "MatchmakerUrl": "",
    "AdminUrl": ""
  }
}
```

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **MatchmakerUrl** | `""` | 对局事件的 Discord Webhook URL（游戏创建、游戏开始、游戏结束、玩家加入）。留空禁用。 |
| **AdminUrl** | `""` | 管理/审核事件的 Discord Webhook URL（玩家踢出、玩家举报）。留空禁用。 |

> **提示**：你可以将两个 URL 指向同一个 Webhook 以将所有事件发送到同一频道，也可以使用不同频道分别接收对局和管理通知。

## 事件

每条通知以带彩色侧边栏的 Discord 嵌入消息发送：

### 对局事件 (Matchmaker)

| 事件 | 嵌入颜色 | 字段 |
| :--- | :--- | :--- |
| 游戏创建 | 绿色 | 游戏代码、房主名称、房主好友代码 |
| 游戏开始 | 蓝紫色 | 游戏代码、地图、玩家数量、内鬼数量 |
| 玩家加入 | 绿色 | 玩家名称、好友代码、游戏代码、玩家数量 |
| 游戏结束 | 紫色 | 游戏代码、结果、玩家数量 |

### 管理事件 (Admin)

| 事件 | 嵌入颜色 | 字段 |
| :--- | :--- | :--- |
| 玩家踢出 | 红色 | 玩家名称、好友代码、游戏代码 |
| 玩家举报 | 黄色 | 举报者、被举报玩家、好友代码、游戏代码、原因 |

## 从 v1 迁移

如果你从使用单一 `WebhookUrl` 和逐事件布尔开关的旧版本升级：

- 旧的 `WebhookUrl` 在首次加载时会自动复制到 `MatchmakerUrl` 和 `AdminUrl`。
- 旧的 `Enabled` 和 `NotifyOn*` 标志将被忽略——只需设置你需要的 URL 即可。
- 通过管理面板首次保存后，`discord_webhook.json` 文件将使用新格式。

## 故障排除

- **Discord 中没有消息出现**：验证 URL 是否正确以及 Webhook 在 Discord 频道中是否活跃。检查服务器日志中的 `[Discord]` 警告。
- **Webhook 返回 HTTP 错误**：Discord 可能进行了频率限制或 Webhook URL 可能无效。监听器会在失败时记录 HTTP 状态码。
- **事件触发但某些字段为空**：友好名称和好友代码从客户端数据读取——如果客户端尚未完全连接，某些字段可能为空（`—`）。
