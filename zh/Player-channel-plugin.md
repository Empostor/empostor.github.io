# 玩家频道插件

::: tip 插件功能
此功能由 **Empostor.Plugins.PlayerChannel** 插件（`cn.hayashiume.playerchannel`）提供。它不是核心服务器的组成部分。
:::

## 概述

玩家频道插件允许同一配置频道内的玩家跨游戏进行通信。它就像一个基于好友代码的跨游戏聊天系统。

## 命令

### `#channel <消息>`

向频道内所有其他在线玩家发送消息。

**示例：**

```
#channel 有人想在 Polus 上玩吗？
```

**工作原理：**

1. 服务器检查发送者属于哪个频道（基于好友代码）
2. 消息被转发给同一频道内所有其他在线玩家
3. 如果发送者不在任何配置的频道中，会收到错误提示

## 配置

频道在插件配置中定义：

```json
{
  "channels": [
    {
      "name": "friends",
      "friendCodes": ["FriendA#1234", "FriendB#5678", "FriendC#9012"]
    },
    {
      "name": "clan",
      "friendCodes": ["Leader#0001", "Member1#0002", "Member2#0003"]
    }
  ]
}
```

| 字段 | 说明 |
|---|---|
| `name` | 频道名称（用于日志） |
| `friendCodes` | 属于该频道的好友代码列表 |

## 多语言支持

插件包含以下语言翻译：
- 英语（`en`）
- 简体中文（`zh_CN`）
- 繁体中文（`zh_TW`）
