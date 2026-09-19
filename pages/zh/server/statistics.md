# 统计

[玩家统计](../plugins/player-stats.md)插件启用后，管理面板会显示**统计**标签页，按游戏场次排名展示每位玩家的游戏数据。使用**刷新**重新加载数据，使用**全部重置**清除所有统计（需要确认）。

玩家也可以在游戏内输入 `#stat`（别名：`#stats`、`#mystats`）查看自己的统计。回复以私聊形式发送，并按玩家语言本地化。

## 配置

统计功能配置在插件自身的配置文件 `[Empostor.Plugins.PlayerStats]Config.json` 中，**不在** `config.json`。字段说明见[玩家统计 —— 配置](../plugins/player-stats.md#配置)。

```json
{
  "Enabled": false,
  "PersistToFile": true
}
```

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用玩家统计追踪。 |
| **PersistToFile** | `true` | 将统计数据保存到 `Data/player_stats.json`。如果为 `false`，统计数据仅保存在内存中，重启后丢失。 |

## 追踪的指标

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

## API 端点

| 方法 | 路径 | 描述 |
| :--- | :--- | :--- |
| `GET` | `/api/admin/player/stats` | 返回所有玩家统计数据，按游戏场次排序 |
| `GET` | `/api/admin/player/stats/{friendCode}` | 返回单个玩家的统计数据 |
| `POST` | `/api/admin/player/stats/reset` | 清除所有玩家统计数据（需要认证） |
