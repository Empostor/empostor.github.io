# 玩家频道

**插件 ID：** `cn.hayashiume.playerchannel`
**配置文件：** `[Player Channel]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`[Player Channel]Config.json`](#配置) |
| 指令 | [`#channel`](#指令) |
| 管理面板 | [频道标签页](#管理面板) |
| HTTP API | 无 |

## 指令

| 指令 | 别名 | 用法 | 权限 |
| :--- | :--- | :--- | :--- |
| `#channel` | — | `channel <消息>` | 所有人 |

```
#channel 有人来 Polus 开一局吗？
```

消息会转发给发送者所属频道内的所有其他在线成员。不属于任何频道的玩家会收到错误提示。

## 配置

编辑插件 DLL 旁的 `[Player Channel]Config.json`。

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

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `name` | string | 频道标识，用于日志。 |
| `friendCodes` | string[] | 属于该频道的好友代码列表。 |

同一玩家可以属于多个频道，消息会发送到其所属的所有频道。

::: warning 成员需手动维护
游戏内没有加入频道的指令 —— 成员只能在本文件或管理面板中配置。直接编辑文件后需重启服务器。
:::

## 管理面板

**频道**标签页：无需编辑 JSON 即可增删频道及成员，此处的修改即时生效。

## 相关文档

- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
- [留言系统](leave-a-message.md) —— 离线消息，区别于实时转发。
