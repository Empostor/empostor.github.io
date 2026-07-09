# HPLP（HTTP 公共大厅列表协议）

Empostor 可以提供与 [Starlight](https://github.com/All-Of-Us-Mods/starlight-releases) Android 启动器兼容的公共游戏列表端点。这使得 Starlight 客户端可以通过 Starlight 的"大厅"界面发现并加入你的 Empostor 服务器上托管的游戏。

此功能**默认禁用**。通过**管理面板**（HPLP 选项卡）启用，或在 `config.json` 中设置初始默认值。

> **注意**：通过管理面板更改的设置会持久化到 `Data/HplpData.json`，重启后仍然有效。`config.json` 中的值仅在首次启动时作为回退默认值使用。

## 配置

将 `HPLP` 部分添加到 `config.json`：

```json
{
  "HPLP": {
    "Enabled": false,
    "RegionId": "default",
    "RegionName": "Empostor Server",
    "PublicUrl": ""
  }
}
```

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用 HPLP 端点（`GET /x-api/games`）。 |
| **RegionId** | `"default"` | 向 Starlight 客户端报告的区域标识符。使用简短的唯一 ID，如 `"meu"` 或 `"usw"`。 |
| **RegionName** | `"Empostor Server"` | 在 Starlight UI 中显示的人类可读区域名称。 |
| **PublicUrl** | `""` | Starlight 客户端用于连接此服务器的公开 URL。为空时自动生成为 `http://{PublicIp}:{HttpPort}`。如果在带 TLS 的反向代理后运行，请设置为 `https://your-domain.com`。 |

## 端点

```
GET /x-api/games
```

返回活跃游戏和区域元数据的 JSON 数组：

```json
{
  "games": [
    {
      "code": "QWERTY",
      "host_name": "玩家名称",
      "status": "Lobby",
      "player_count": 4,
      "max_players": 15,
      "chat_lang": 256,
      "map_id": 0,
      "region_id": "default",
      "mods": []
    }
  ],
  "regions": [
    {
      "id": "default",
      "name": "Empostor Server",
      "url": "http://你的服务器IP:22023"
    }
  ]
}
```

### 状态值

| Empostor 状态 | HPLP 状态 |
| :--- | :--- |
| `NotStarted`、`Starting` | `"Lobby"` |
| `Started` | `"Started"` |
| `Ended`、`Destroyed` | `"Ended"` |

### 模组 (Mods)

`mods` 数组在可用时从主机客户端的 Reactor 握手模组列表填充。每个条目包含：

| 字段 | 类型 | 描述 |
| :--- | :--- | :--- |
| **id** | `string` | 模组标识符（例如 `"mira.api"`） |
| **version** | `string` | 模组版本（例如 `"0.3.6"`） |
| **flags** | `int` | `1` 表示该模组要求所有客户端安装，`0` 表示不强制 |

## 管理面板

HPLP 设置也可以通过管理面板的 **HPLP** 选项卡进行管理。更改立即生效并持久化到 `hplp.json`。

## 故障排除

- **Starlight 客户端看不到服务器**：验证 `Enabled` 为 `true` 且 `PublicUrl`（或自动生成的 URL）可从客户端设备访问。
- **端点返回 503**：HPLP 未启用。在配置中设置 `"Enabled": true` 或通过管理面板启用。
- **游戏不出现**：仅列出活跃游戏（未销毁的）。请先创建一个游戏大厅。
- **Mods 数组为空**：如果主机未使用 Reactor 模组，或 Starlight 使用了不同的模组协议，这是预期行为。
