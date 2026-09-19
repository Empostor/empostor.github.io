# 玩家统计

**插件 ID：** `cn.hayashiume.playerstats`
**配置文件：** `[Empostor.Plugins.PlayerStats]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`Config.json`](#配置) |
| 指令 | [`#stat`](#指令) |
| 管理面板 | [统计标签页](#管理面板) |
| HTTP API | [接口](#api) |

## 指令

| 指令 | 别名 | 用法 | 权限 |
| :--- | :--- | :--- | :--- |
| `#stat` | `#stats`、`#mystats` | `stat` | 所有人 |

以私聊形式返回查询者本人的统计数据。需要先将 `Enabled` 设为 `true`。

**统计指标**

| 字段 | 说明 |
| :--- | :--- |
| 游戏场次 | 参与的游戏总场次 |
| 胜场 | 作为船员获胜的场次 |
| 败场 | 作为船员失败的场次 |
| 内鬼胜场 | 作为内鬼获胜的场次 |
| 击杀 | 总击杀数 |
| 死亡 | 总死亡次数 |
| 完成任务 | 完成的任务总数 |
| 被投票出局 | 被投票出局的次数 |

## 配置

编辑插件 DLL 旁的 `[Empostor.Plugins.PlayerStats]Config.json`，首次启动时以默认值生成。

```json
{
  "Enabled": false,
  "PersistToFile": true
}
```

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `Enabled` | bool | `false` | 是否记录统计。为 `false` 时忽略游戏事件，不做任何记录。 |
| `PersistToFile` | bool | `true` | 将统计写入 `Data/player_stats.json`。为 `false` 时仅存于内存，重启即丢失。 |

::: warning 默认不启用统计
在把 `Enabled` 改为 `true` 之前不会记录任何数据。未启用的服务器上使用 `#stat` 会收到「服务器未启用统计」的提示。
:::

## 管理面板

**统计**标签页：

| 控件 | 作用 |
| :--- | :--- |
| 启用 / 禁用开关 | 打开或关闭统计记录 |
| 刷新 | 重新加载数据表 |
| 重置所有统计 | 清除全部玩家统计（需二次确认） |

列：好友代码、名称、场次、胜场、败场、内鬼胜场、击杀、死亡、任务、被投票出局 —— 按游戏场次排序。

## API

| 方法 | 路径 | 说明 |
| :--- | :--- | :--- |
| `GET` | `/api/admin/player/stats` | 返回所有玩家统计，按游戏场次排序 |
| `GET` | `/api/admin/player/stats/{friendCode}` | 返回单个玩家的统计 |
| `POST` | `/api/admin/player/stats/reset` | 清除所有玩家统计（需要认证） |

所有接口位于 `/api/admin/` 之下，缺少有效会话 Cookie 时返回 `401`。

## 存储

当 `PersistToFile` 为 `true` 时持久化到 `Data/player_stats.json`，按好友代码索引。

## 相关文档

- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
- [管理 API](../reference/admin-api.md) —— 鉴权方式与其他管理接口。
