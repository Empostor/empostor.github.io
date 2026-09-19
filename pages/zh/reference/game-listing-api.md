# 游戏列表 API

## 概述

这些接口处理 Among Us 游戏列表和匹配。它们遵循 Innersloth 的客户端-服务器通信协议。

## 接口

### `GET /api/games`

旧版游戏列表接口，适用于低于 v16.0.0 的 Among Us 客户端。

**查询参数：**

| 参数 | 类型 | 说明 |
|---|---|---|
| `mapId` | int | 按地图类型筛选 |
| `lang` | int | 按语言筛选（GameKeywords 枚举） |
| `numImpostors` | int | 按内鬼数量筛选 |

**请求头：**

| 头部 | 说明 |
|---|---|
| `Authorization: Bearer <base64-token>` | 客户端认证令牌 |

### `POST /api/games`

旧版：获取托管特定游戏的服务器的地址。

**请求体：** `gameId`（int）

返回托管该游戏的服务器 IP 和端口，或返回 `GameNotFound` 错误。

### `PUT /api/games`

旧版：获取托管新游戏所需的服务器地址。返回当前服务器的公网 IP 和端口。

### `GET /api/games/{gameId}`

通过整数代码获取特定游戏的详细信息。

### `GET /api/games/filtered`

新版游戏大厅列表接口（Among Us 16.0.0+）。返回所有公开游戏。

**响应示例：**

```json
{
  "games": [
    {
      "IP": 123456789,
      "Port": 22023,
      "GameId": 1234567890,
      "PlayerCount": 8,
      "HostName": "HostPlayer",
      "TrueHostName": "HostPlayer",
      "HostPlatformName": "Steam",
      "Platform": 1,
      "QuickChat": 0,
      "Age": 0,
      "MaxPlayers": 15,
      "NumImpostors": 2,
      "MapId": 0,
      "Language": 0,
      "Options": "..."
    }
  ],
  "metadata": {
    "allGamesCount": 5,
    "matchingGamesCount": 3
  }
}
```

### `GET /api/games/publicgames`

所有活跃游戏的 JSON 摘要，专为管理面板和外部工具设计。

**响应示例：**

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

## 游戏代码格式

API 中的游戏代码使用两种格式：
- **字符串格式**（如 `ABCDEF`）：6 个大写字母，用于管理面板
- **整数格式**（如 `1234567890`）：内部整数表示，用于客户端协议

`GameCode` 类型在这两种格式之间透明转换。
