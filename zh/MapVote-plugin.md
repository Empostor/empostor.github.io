# 地图投票插件

::: tip 插件功能
此功能由 **Empostor.Plugins.MapVote** 插件（`cn.hayashiume.mapvote`）提供。需要安装并启用该插件才能使用。
:::

## 概述

地图投票插件允许玩家在游戏期间投票选择下一张地图。启用后，玩家使用聊天命令投票，得票最多的地图会在下局游戏开始时自动选择。

## 命令

### `#votemap <地图>` / `#vm <地图>`

投出或更改你的地图投票。

**支持的地图：**

| 地图 | 别名 |
|---|---|
| Skeld | skeld |
| Mira HQ | mira, mirahq |
| Polus | polus |
| Airship | airship |
| Fungle | fungle |

玩家可以在游戏开始前随时更改投票。最新投票会替换之前的投票。

**示例：**

```
#votemap polus
#vm fungle
```

### 房主命令

| 命令 | 说明 |
|---|---|
| `#votemap start` / `#votemap public` | 开始投票（仅房主） |
| `#votemap end` / `#votemap close` | 结束投票并公布获胜地图（仅房主） |
| `#votemap enable` | 启用地图投票（仅房主） |
| `#votemap disable` | 禁用地图投票（仅房主） |
| `#votemap results` | 显示当前投票统计 |

## 工作原理

1. 当游戏开始时，如果地图投票已启用，玩家可以使用 `#votemap` 投票。
2. 投票按玩家追踪。每个玩家只能有一个有效投票。
3. 当房主开始新游戏时（`#votemap end` 或自动），得票最多的地图被应用。
4. 如果没有投票，随机选择一张地图。
5. 平票时，从平票的地图中随机选择一个。

## 配置

```json
{
  "enabled": true,
  "require_majority": false,
  "allow_host_override": true
}
```

| 设置 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `enabled` | bool | `true` | 是否全局启用地图投票 |
| `require_majority` | bool | `false` | 是否需要多数票（当前未强制执行） |
| `allow_host_override` | bool | `true` | 无投票时允许房主覆盖 |

## 多语言支持

插件支持：
- 英语（`en`）
- 简体中文（`zh_CN`）
- 繁体中文（`zh_TW`）
