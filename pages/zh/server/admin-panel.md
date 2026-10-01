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

## 市场


市场分为两个分类，用页面顶部的 **Plugins** / **Themes** 按钮切换：

- **Plugins** —— 安装社区插件，`.dll` 会下载到 `plugins/`，安装后需要重启服务器。
- **Themes** —— 浏览并应用管理面板主题。已经可用的主题（内置、插件提供、`Pages/themes/` 下的）直接显示 **Apply**；只在清单里、尚未安装的主题显示 **Install**，安装会把 `theme.json` 写入 `Pages/themes/{Id}/`，**无需重启**即可切换。

清单格式与版本规则请见 [插件市场](plugin-marketplace.md)。

---

## 更新

**更新**页面用于把服务器版本与 GitHub 上的发布做比较，并把适配本机的安装包取回服务器。Empostor 不会自动替换正在运行的安装。

### 版本通道

页面顶部可选择要查询的通道：

| 通道 | 来源 | 版本号取自 |
|------|------|-----------|
| Stable release | GitHub Release 的 `latest`（正式发布） | 发布标签去掉前缀 `v`，例如 `2.0.0` |
| Nightly build | 标签为 `nightly` 的预发布，每次推送到 `main` 由 CI 覆盖更新 | 发布标题括号内的值，例如 `Nightly build (2.0.0-ci.599)` → `2.0.0-ci.599` |
| Specific version | 下拉列出最近的若干发布，可任选一个标签 | 与 Stable 相同：标签去掉 `v` |

切换通道会立即重新查询，**Check for Updates** 按钮可随时手动刷新。结果会列出当前版本、最新版本、标签、发布时间，以及该发布为**当前平台**提供的安装包。版本一致时会标记为 *Up to date*。

### 下载安装包

**Download package** 会把所选版本的压缩包取回并保存到服务器本机，不会自动解压或替换任何文件。

- **触发方式** —— 仅手动：只有管理员在更新页面点击 **Download package** 才会执行，服务器不会在后台自动下载。
- **平台判定** —— 服务器按自身运行平台（`win-x64`、`linux-x64`、`linux-arm`、`linux-arm64`、`osx-x64`）在发布附件中匹配。Windows 提供 `.zip`，其它平台只有 `.tar.gz`；若该发布没有本平台的包，按钮会被隐藏。
- **版本号来源** —— 见上表：正式版取发布标签，nightly 取标题括号内的版本。
- **文件名来源** —— 直接沿用 GitHub 发布附件的原始文件名，例如正式版的 `Empostor-Server_2.0.0_win-x64.zip`，或 nightly 的 `Empostor-Server-latest-win-x64.zip`。
- **保存路径拼装规则** —— `Update/{Version}/xxx.zip`，相对于**服务器进程的工作目录**：
  - `Update` —— 固定的一级目录
  - `{Version}` —— 上面的版本号，其中除字母、数字、`.`、`-`、`_`、`+` 以外的字符一律替换为 `_`
  - `xxx.zip` —— 原样保留的附件名

  因此在 Windows 上下载 nightly 会落到 `Update/2.0.0-ci.599/Empostor-Server-latest-win-x64.zip`。
- 已存在且大小相同的文件不会重复下载，面板会提示 *Already downloaded*。
- 停服、解压、替换、重启 —— 升级本身仍然是手动步骤。

默认检查的 GitHub 仓库为 `Empostor/Empostor`。如果你维护分支版本，这在 `UpdateController.cs` 中是硬编码的。

### GitHub API 限额

发布信息来自 GitHub API。**未认证请求每小时每 IP 只有 60 次**，共享出口 IP 的服务器很容易撞到，报 `403 (rate limit exceeded)`。这种情况下面板会用琥珀色显示原因和限额重置时间，而不是一句原始的 HTTP 异常。

同一版本的重复查询在 60 秒内直接返回缓存结果，不会再打 GitHub；因此连点 **Check for Updates** 不会消耗额外额度。

要彻底解决，在 `config.json` 里给一个 token（公开仓库只读发布元数据，不需要任何 scope）：

```json
"Admin": {
  "Password": "...",
  "GitHubToken": "ghp_xxxxxxxxxxxxxxxx"
}
```

带上 token 后限额提升到 5000 次/小时。改完需要重启服务器。

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
