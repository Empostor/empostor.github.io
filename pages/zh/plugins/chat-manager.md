# 聊天管理

**插件 ID：** `cn.hayashiume.chat`
**配置文件：** `boot_chat.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`boot_chat.json`](#配置) |
| 指令 | 无 —— 不提供聊天指令 |
| 管理面板 | 无 —— 通过配置文件调整 |
| HTTP API | 无 |

按发送者身份限制聊天消息长度，并记录聊天流量。

## 配置

编辑 `Empostor.Server` 可执行文件旁的 `boot_chat.json`，该文件会在首次启动时生成。

```json
{
  "playerMaxMessageLength": 300,
  "hostMaxMessageLength": 1200,
  "tooLongMessage": "[SERVER] Couldn't send your message, it was too long."
}
```

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `playerMaxMessageLength` | int | `300` | 普通玩家每条消息的最大字符数。 |
| `hostMaxMessageLength` | int | `1200` | 房主每条消息的最大字符数。 |
| `tooLongMessage` | string | `"[SERVER] Couldn't send your message, it was too long."` | 超出限制时私聊回复给发送者的提示。 |

::: warning 限制不会回溯生效
修改长度限制后需要重启服务器；已发出的消息不受影响。
:::

## 相关文档

- [聊天过滤](chat-filter.md) —— 屏蔽词与刷屏限流。两个插件面向不同场景，可以同时启用。
- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
