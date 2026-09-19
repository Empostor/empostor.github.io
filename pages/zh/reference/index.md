# 相关 API

Empostor 提供多个 HTTP API，用于监控、集成和客户端匹配。游戏内聊天指令单独收录在[指令参考](commands.md)中。

---

## 服务器监控 API

**[服务器监控](monitor-api.md)** 提供两个用于健康检查和状态仪表盘的公共端点：

### `GET /api/monitor/status`

返回详细的服务器状态，包括运行时间、资源使用情况和活跃游戏。

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

### `GET /api/monitor/health`

用于负载均衡器和监控工具（Prometheus、Uptime Kuma）的简单健康检查。

```json
{ "status": "healthy", "timestamp": "2026-05-23T12:00:00.0000000Z" }
```

服务器健康时返回 HTTP 200。

---

## 隐私政策 API

**[隐私政策 API](privacy-api.md)** 允许服务器管理员发布自定义隐私政策：

| 端点 | 方法 | 认证 | 描述 |
|---|---|---|---|
| `/privacy` | GET | 无 | 提供隐私政策 HTML 页面 |
| `/admin/api/privacy` | POST | 管理员令牌 | 更新隐私政策内容 |

隐私政策 HTML 存储在 `Pages/privacy.html` 中，重启后仍然保留。如果文件不存在，会创建一个默认模板，涵盖数据收集、使用、共享、保留和联系信息。

认证使用 `EMP_HTTP_TOKEN` 或 `EMP_ADMIN_TOKEN` 环境变量，如果两者都未设置，则回退到 `"empostor"`。

---

## 游戏列表 API

**[游戏列表 API](game-listing-api.md)** 处理 Among Us 客户端匹配，遵循 Innersloth 协议：

| 端点 | 方法 | 描述 |
|---|---|---|
| `/api/games` | GET | 旧版游戏列表（v16.0.0 之前的客户端），可按地图、语言、内鬼数筛选 |
| `/api/games` | POST | 旧版：获取特定游戏的服务器地址 |
| `/api/games` | PUT | 旧版：获取托管新游戏的服务器地址 |
| `/api/games/{gameId}` | GET | 通过整数代码获取特定游戏详情 |
| `/api/games/filtered` | GET | 现代大厅列表（v16.0.0+），返回所有公开游戏及元数据 |
| `/api/games/publicgames` | GET | 所有活跃游戏的 JSON 摘要，用于管理仪表盘和外部工具 |

游戏代码使用两种格式：6 字母字符串（`ABCDEF`）和内部整数表示。`GameCode` 类型可在两者之间透明转换。

### 公开游戏响应

`/api/games/publicgames` 端点返回清晰的 JSON 摘要：

```json
{
  "totalGames": 3,
  "totalPlayers": 22,
  "games": [
    {
      "code": "ABCDEF",
      "codeInt": 1234567890,
      "state": "Started",
      "isPublic": true,
      "playerCount": 10,
      "maxPlayers": 15,
      "map": "Skeld",
      "impostors": 2,
      "host": "HostName",
      "hostFriendCode": "Name#1234",
      "players": [
        {
          "name": "PlayerOne",
          "friendCode": "Name#5678",
          "isHost": false,
          "platform": "Steam"
        }
      ]
    }
  ]
}
```

---

---

## 验证 API


供 QQ 验证等验证类插件调用的接口。详见 [验证 API](verification-api.md)。

---

## 管理 API


管理面板所使用的内部接口（需会话鉴权）。详见 [管理 API](admin-api.md)。

---
