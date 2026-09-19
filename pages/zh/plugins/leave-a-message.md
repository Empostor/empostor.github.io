# 留言系统

**插件 ID：** `cn.hayashiume.message`
**配置文件：** `[Empostor.Plugins.Message]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`Config.json`](#配置) |
| 指令 | [`#msg`](#指令) |
| 管理面板 | 无 |
| HTTP API | 无 |

## 指令

| 指令 | 别名 | 用法 | 权限 |
| :--- | :--- | :--- | :--- |
| `#msg` | `#message`、`#leave` | `msg <好友代码> <消息>` | 所有人 |

```
#msg Name#1234 明天再一起玩！
#msg Friend#5678 打得不错，这局很开心
```

**限制条件**

| 限制项 | 上限 |
| :--- | :--- |
| 好友代码长度 | 至少 4 个字符 |
| 消息长度 | 最多 `message_max_length` 个字符 |
| 每个收件人的待投递消息 | 最多 `max_messages_per_target` 条 |
| 给自己留言 | 拒绝 |

## 配置

编辑插件 DLL 旁的 `[Empostor.Plugins.Message]Config.json`，首次启动时该文件会以默认值生成。

```json
{
  "max_messages_per_target": 10,
  "message_max_length": 500
}
```

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `max_messages_per_target` | int | `10` | 每个收件人最多排队等待投递的消息数。 |
| `message_max_length` | int | `500` | 单条消息的最大字符数。 |

::: tip 文件在哪里？
插件配置文件位于插件 DLL 同目录，命名为 `[<插件名>]Config.json`。完整约定见[可配置文件](../config-files/)。
:::

## 存储

待投递消息以 JSON 持久化保存，投递成功后即从存储中移除。

```json
{
  "Name#1234": [
    {
      "id": "abc123...",
      "sender_name": "PlayerA",
      "sender_fc": "PlayerA#5678",
      "target_fc": "Name#1234",
      "content": "Hello!",
      "timestamp": "2026-05-23T06:30:00Z"
    }
  ]
}
```

收件人在任意房间出生时触发投递，排队消息以私聊形式送达，最新的排最后：

```
--- You have 2 pending message(s) ---
[05-23 14:30] <SenderName> Hello!
[05-22 09:15] <OtherPlayer> Good game yesterday!
```

## 相关文档

- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
