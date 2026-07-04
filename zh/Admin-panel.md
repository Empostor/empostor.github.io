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

在 `config.json` 中启用后，管理面板会显示**统计**标签页，按游戏场次排名展示每位玩家的游戏数据。使用**刷新**重新加载数据，使用**全部重置**清除所有统计（需要确认）。

玩家也可以在游戏内输入 `/stat`（或 `/stats`、`/mystats`）查看自己的统计。回复以私密方式发送，并根据玩家语言进行本地化。

### 配置

```json
{
  "PlayerStats": {
    "Enabled": false,
    "PersistToFile": true
  }
}
```

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用玩家统计追踪。 |
| **PersistToFile** | `true` | 将统计数据保存到磁盘上的 `player_stats.json`。如果为 `false`，统计数据仅保存在内存中，重启后丢失。 |

### 追踪的指标

| 统计项 | 描述 |
| :--- | :--- |
| 游戏场次 | 参与的游戏总场次 |
| 胜场 | 作为船员获胜的场次 |
| 败场 | 作为船员失败的场次 |
| 内鬼胜场 | 作为内鬼获胜的场次 |
| 击杀 | 总击杀数 |
| 死亡 | 总死亡次数 |
| 完成任务 | 完成的任务总数 |
| 被投票出局 | 被投票出局的次数 |

### API 端点

| 方法 | 路径 | 描述 |
| :--- | :--- | :--- |
| `GET` | `/api/admin/player/stats` | 返回所有玩家统计数据，按游戏场次排序 |
| `GET` | `/api/admin/player/stats/{friendCode}` | 返回单个玩家的统计数据 |
| `POST` | `/api/admin/player/stats/reset` | 清除所有玩家统计数据（需要认证） |

---

## 聊天过滤

管理面板中的**聊天过滤**标签页可在运行时管理词汇过滤和垃圾消息防护，无需编辑 `config.json` 或重启。更改立即生效但仅限运行时——如需永久设置，请编辑 `config.json`。

该标签页提供：
- 启用/禁用过滤复选框
- 添加/移除屏蔽词
- 垃圾消息阈值和时间窗口控制
- 拦截/记录切换（拦截消息或仅记录警告）

### 配置

```json
{
  "ChatFilter": {
    "Enabled": false,
    "BlockedWords": [],
    "BlockMessage": true,
    "SpamThreshold": 5,
    "SpamWindowSeconds": 10
  }
}
```

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用聊天过滤。 |
| **BlockedWords** | `[]` | 要屏蔽的词汇。不区分大小写的子串匹配（例如 `"bad"` 也会屏蔽 `"badword"`）。 |
| **BlockMessage** | `true` | 为 `true` 时取消消息。为 `false` 时消息通过但记录警告。 |
| **SpamThreshold** | `5` | 在垃圾消息窗口内允许的消息数量，超过后触发频率限制。 |
| **SpamWindowSeconds** | `10` | 检测垃圾消息的滑动时间窗口（秒）。 |

### 工作原理

**词汇过滤：** 每条聊天消息都会与 `BlockedWords` 进行不区分大小写的子串匹配。如果找到匹配，根据 `BlockMessage` 处理消息。

**垃圾消息过滤：** 每个玩家有独立的滑动窗口。如果在 `SpamWindowSeconds` 秒内发送了 `SpamThreshold` 条或更多消息，根据 `BlockMessage` 处理该消息。超出窗口的旧时间戳会自动丢弃。

两个过滤器独立运行——消息可能被任意一个拦截。

::: warning 短词汇注意
子串匹配意味着 `"ass"` 这样的短词会匹配 `"pass"` 和 `"classic"`。请使用更具体、更长的词汇以避免误拦截。
:::

### 示例

屏蔽不当词汇并限制每 5 秒最多 3 条消息：

```json
{
  "ChatFilter": {
    "Enabled": true,
    "BlockedWords": ["badword1", "badword2"],
    "BlockMessage": true,
    "SpamThreshold": 3,
    "SpamWindowSeconds": 5
  }
}
```

---

以每个游戏房主的身份向所有活跃游戏发送聊天消息。消息前缀为 `[Server]`。

---

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

从 `Admin.MarketplaceUrl` 配置的 URL（GitHub 原始 JSON 文件）获取插件列表。每个插件显示最新版本、支持的 Empostor 版本和描述。

点击**安装**将 `.dll` 下载到 `plugins/` 文件夹。安装插件后必须重启服务器才能加载。

如果插件是为不同 Empostor 版本构建的，会显示警告但不阻止安装。

### plugins.json 格式

市场读取 `plugins.json` 文件（本地或远程 URL）：

```jsonc
[
  {
    // 唯一插件标识符（推荐反向域名风格）
    "id": "cn.hayashiume.welcome",

    // 市场中显示的插件名称
    "name": "欢迎消息",

    // 简短描述（作为副标题显示）
    "description": "玩家加入房间时发送本地化的欢迎消息。",

    // 作者署名
    "author": "BunchHanpiDev & HayashiUme",

    // 版本历史 — 最新版本放在数组最后
    "versions": [
      {
        // 此插件版本的语义版本号
        "version": "1.0.0",

        // 所需的最低 Empostor 版本
        "empostor_version": "2.0.0",

        // .dll 文件的直接下载 URL
        "download_url": "https://raw.githubusercontent.com/Empostor/Empostor/master/marketplace/Empostor.Plugins.Welcome.dll"
      }
    ]
  }
]
```

**版本规则：**
- `versions` 中的**最后一项**被视为最新版本，在界面中默认选中。
- **单版本**插件：一个条目有效，版本下拉菜单隐藏。
- **多版本**插件：两个或更多条目时显示 `<select>` 下拉菜单供操作员选择。
- `download_url` 必须直接指向编译好的 `.dll` 文件。
- 管理面板读取 `GET /api/admin/marketplace/plugins` — 列表更改无需重启，但安装插件后需要重启。

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
