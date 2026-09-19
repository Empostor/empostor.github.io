# 服务器监控

**插件 ID：** `gg.empostor.monitor`
**配置文件：** 无 —— 无需配置

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | 无 |
| 指令 | 无 |
| 管理面板 | 无 |
| HTTP API | [接口](#api) |

## API

### `GET /api/monitor/status`

用于看板的详细服务器状态。

```json
{
  "status": "running",
  "timestamp": "2026-05-23T12:00:00.0000000Z",
  "uptime_seconds": 86400,
  "uptime_display": "1d 0h 0m",
  "version": "1.0.0",
  "runtime": ".NET 8.0.0",
  "platform": "Linux 5.15.0",
  "processors": 4,
  "memory_mb": 256,
  "game_count": 3,
  "player_count": 22,
  "active_connections": 30,
  "games": [
    {
      "code": "ABCDEF",
      "state": "Started",
      "map": "Skeld",
      "player_count": 10,
      "host": "PlayerName"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `status` | string | 端点正常响应时恒为 `"running"` |
| `timestamp` | string | ISO 8601 UTC 时间戳 |
| `uptime_seconds` | number | 服务器进程启动至今的秒数 |
| `uptime_display` | string | 可读格式的运行时长 |
| `version` | string | 服务器版本 |
| `runtime` | string | .NET 运行时描述 |
| `platform` | string | 操作系统描述 |
| `processors` | number | CPU 核心数 |
| `memory_mb` | number | 工作集内存，单位 MB |
| `game_count` | number | 当前活跃的房间总数 |
| `player_count` | number | 正在游戏中的玩家数 |
| `active_connections` | number | 活跃连接总数 |
| `games` | array | 各房间明细对象（见上） |

### `GET /api/monitor/health`

供负载均衡器与可用性探针使用的轻量接口，健康时返回 HTTP `200`。

```json
{
  "status": "healthy",
  "timestamp": "2026-05-23T12:00:00.0000000Z"
}
```

::: tip 用 health 做探活
`health` 只返回两个字段，开销远低于 `status`。高频轮询请用 `health`，`status` 留给看板展示。
:::

## 相关文档

- [玩家日志](player-log.md) —— 持久化的玩家历史，区别于实时快照。
- [管理面板](../server/admin-panel.md) —— 展示同类数据的内置看板。
