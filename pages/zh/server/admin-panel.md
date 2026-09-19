# 管理面板

Empostor 内置基于 Web 的管理面板，可通过 `http://your-server:22023/admin` 访问。

## 身份验证

面板受 `config.json` 中设置的密码保护：

```json
"Admin": {
  "Password": "your-strong-password-here",
  "MarketplaceUrl": "https://raw.githubusercontent.com/your-org/your-repo/main/marketplace/plugins.json"
}
```

密码在内存和 Cookie 中均使用 SHA256 哈希存储 — 明文密码绝不会存储在浏览器中或直接比较。首次访问时显示登录页面。登录成功后设置有效期为 8 小时的会话 Cookie（HttpOnly、Secure、SameSite=Strict）。点击**退出登录**可立即清除。

同一 IP 连续 5 次登录失败后，该 IP 将被锁定 15 分钟。

所有 `/api/admin/` 下的 API 端点在 Cookie 缺失或错误时返回 `401 Unauthorized`。

![管理面板登录](/images/login_panel.png)

---

## 概览

主仪表板一览显示：

- 总游戏数和公开游戏数
- 活跃游戏（进行中）
- 已连接玩家数
- 总封禁数（IP + 好友代码）
- 服务器运行时间

统计卡片下方显示实时游戏列表，每 3 秒刷新一次。

![管理面板概览](/images/overview_panel.png)

---

## 游戏

列出所有活跃房间，包含：

- 房间代码
- 状态（NotStarted / Starting / Started / Ended）
- 可见性（Public / Private）
- 地图名称
- 玩家数与最大玩家数
- 房主名称和好友代码
- 房间内所有玩家（悬停查看好友代码和 IP）

---

## 客户端

列出所有已连接的客户端，包含：

- 客户端 ID
- 名称
- 好友代码
- IP 地址
- Among Us 客户端版本
- 平台
- 是否在游戏中，以及所在房间代码
- Reactor 模组数量徽章（如果客户端运行 Reactor）

点击任意客户端行的**详情**可打开侧面板，显示：

- 完整玩家身份（名称、好友代码、PUID、IP、客户端版本、语言、平台）
- 当前游戏代码
- Reactor 协议版本和完整模组列表（模组 ID、版本、是否必需标记）

---

## 玩家日志

![玩家日志](/images/player_logs.png)

浏览每个玩家的活动日志。可按玩家和事件类型筛选，并导出为 JSON 数据。适用于审计玩家行为和调查举报。

---

## 统计


玩家统计在 `config.json` 中启用，并在管理面板中展示。完整配置项、统计指标与接口请见 [统计](statistics.md)。

---

## 聊天过滤


聊天审核由 **聊天过滤** 插件提供。屏蔽词与反刷屏配置请见 [聊天过滤](../plugins/chat-filter.md)。

---


## 广播

以每个游戏房主的身份向所有活跃游戏发送聊天消息。消息前缀为 `[Server]`。
## 踢出

从服务器移除玩家但不封禁。玩家可以立即重新连接。

可通过输入客户端 ID 踢出玩家，或使用**快速踢出**表格，该表格列出所有已连接客户端并提供一键按钮。

---

## 封禁

### 按 IP 封禁

封禁 IP 地址并立即断开从该地址连接的所有客户端。原因保存到 `bans.json` 并在服务器重启后持久保留。

### 按好友代码封禁

封禁特定好友代码并立即断开当前使用该代码的任何客户端。

两种封禁类型均可随时从**封禁列表**标签页移除。

---

## 封禁列表

显示所有活跃的 IP 封禁和好友代码封禁，包含：

- 封禁值（IP 或好友代码）
- 原因
- 时间戳

每条记录都有**解封**按钮，立即生效。

---

## 消息

按游戏房间代码向特定游戏房间发送定向聊天消息。适用于与单个房间通信而不广播到整个服务器。

---

## 结束游戏

通过踢出游戏中所有玩家强制终止游戏。房间立即销毁。执行操作前显示确认对话框。

该标签页还列出所有活跃游戏，每行提供一键**结束**按钮。

---

## 隐私

在公开和私有之间切换游戏。这会影响房间是否出现在公开大厅列表中。

---

## 插件市场


可直接在管理面板中安装社区插件。`plugins.json` 格式与版本规则请见 [插件市场](plugin-marketplace.md)。

---

## 更新

查询 GitHub Releases API 获取最新 Empostor 版本并与当前运行版本比较。如果有新版本可用，显示发布页面链接。服务器不会自动更新。

默认检查的 GitHub 仓库为 `Empostor/Empostor`。如果你维护分支版本，这在 `MarketplaceController.cs` 中是硬编码的。

---

## 举报

![举报玩家](/images/report_player.jpg)

显示最近 200 条玩家在游戏中提交的举报（通过 Among Us 举报按钮）：

| 列 | 描述 |
|--------|-------------|
| 时间 | 举报的 UTC 时间戳 |
| 游戏 | 房间代码 |
| 举报者 | 举报玩家的名称和好友代码 |
| 被举报者 | 被举报玩家的名称和好友代码 |
| 原因 | `InappropriateName`、`InappropriateChat`、`Cheating_Hacking`、`Harassment_Misconduct` |
| 结果 | `NotReportedUnknown`、`NotReportedNoAccount`、`Reported` 等 |

举报记录保存在内存中，服务器重启后清除。插件可以监听 `IPlayerReportEvent` 来持久化举报或触发进一步操作。

---

## 服务器信息

显示运行时详情：

- 服务器启动时间和运行时长
- 进程 ID
- .NET 运行时版本和操作系统
- 当前封禁和认证会话数量
