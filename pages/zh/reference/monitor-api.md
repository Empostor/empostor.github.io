# 服务器监控 API

## 接口

服务器暴露两个无需认证的公共监控接口。

### `GET /api/monitor/status`

返回详细的服务器状态，包括运行时间、资源使用情况和活跃游戏列表。

**响应示例：**

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
|---|---|---|
| `status` | string | 服务器正常时始终为 `"running"` |
| `timestamp` | string | ISO 8601 UTC 时间戳 |
| `uptime_seconds` | number | 服务器进程启动以来的秒数 |
| `uptime_display` | string | 人类可读的运行时间 |
| `version` | string | 服务器版本 |
| `runtime` | string | .NET 运行时描述 |
| `platform` | string | 操作系统描述 |
| `processors` | number | CPU 核心数 |
| `memory_mb` | number | 工作集内存（MB） |
| `game_count` | number | 活跃游戏总数 |
| `player_count` | number | 当前在游戏中的玩家数 |
| `active_connections` | number | 总连接数 |
| `games` | array | 活跃游戏详情列表 |

### `GET /api/monitor/health`

简单的健康检查接口，适用于负载均衡器和监控工具。

**响应示例：**

```json
{
  "status": "healthy",
  "timestamp": "2026-05-23T12:00:00.0000000Z"
}
```

服务器健康时返回 HTTP 200。

## 使用示例

### Prometheus / Uptime Kuma

将监控工具指向 `http://你的服务器:22023/api/monitor/health` 进行健康检查。

### 自定义仪表盘

使用 `/api/monitor/status` 构建自定义服务器仪表盘：

```bash
curl http://localhost:22023/api/monitor/status | jq .
```

### 状态页面

通过定期获取并缓存状态接口数据，在外部网站上嵌入服务器状态。
