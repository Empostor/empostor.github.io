# 玩家统计插件

::: tip 插件功能
此功能由 **Empostor.Plugins.PlayerStats** 插件（`cn.hayashiume.playerstats`）提供。需要安装并启用该插件才能使用。
:::

## 概述

玩家统计插件跨会话跟踪每个玩家的持久游戏统计数据。统计按好友代码索引，启用文件持久化后在服务器重启后仍然保留。

## 游戏内命令

### `#stat`（别名：`#stats`、`#mystats`）

查看你的个人统计。回复以私聊消息发送。

**追踪的指标：**

| 统计项 | 说明 |
|---|---|
| 游戏场次 | 参与的游戏总场次 |
| 胜场 | 作为船员获胜的场次 |
| 败场 | 作为船员失败的场次 |
| 内鬼胜场 | 作为内鬼获胜的场次 |
| 击杀 | 总击杀数 |
| 死亡 | 总死亡次数 |
| 完成任务 | 完成的任务总数 |
| 被投票出局 | 被投票出局的次数 |

## 配置

配置存储在 `[Empostor.Plugins.PlayerStats]Config.json` 中：

```json
{
  "Enabled": false,
  "PersistToFile": true
}
```

| 设置 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `Enabled` | bool | `false` | 是否启用统计记录 |
| `PersistToFile` | bool | `true` | 是否将统计持久化到磁盘 |

禁用时，事件被忽略且不记录统计。

## 管理面板

管理面板中的统计标签页提供：

- **启用/禁用**统计记录的开关
- **重置所有统计**按钮（危险操作，需要确认）
- **数据表**按游戏场次排序显示每个玩家的统计

列：好友代码、名称、场次、胜场、败场、内鬼胜场、击杀、死亡、任务、被投票出局

## API 端点

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/api/admin/player/stats` | 返回所有玩家统计，按游戏场次排序 |
| `GET` | `/api/admin/player/stats/{friendCode}` | 返回单个玩家的统计 |
| `POST` | `/api/admin/player/stats/reset` | 清除所有玩家统计（需要认证） |

## 存储

当 `PersistToFile` 为 `true` 时，统计持久化到 `Data/player_stats.json`。
