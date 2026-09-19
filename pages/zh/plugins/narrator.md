# 旁白 AI

**插件 ID：** `cn.hayashiume.narrator`
**配置文件：** `[Empostor.Plugin.Narrator]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`Config.json`](#配置) |
| 指令 | [`#narrator`](#指令) |
| 管理面板 | [旁白标签页](#管理面板) |
| HTTP API | 无 |

::: warning 第三方接口
回复由 DeepSeek AI 接口生成。你需要自备 API Key，并自行承担其用量与费用。插件会把游戏上下文（身份、任务、死亡情况、聊天记录、投票）发送到该接口。
:::

## 指令

| 指令 | 别名 | 用法 | 权限 |
| :--- | :--- | :--- | :--- |
| `#narrator <问题>` | `#nar`、`#n` | 寻求策略建议 | 所有人 |
| `#narrator enable` | — | 为本局启用旁白 | 房主 |
| `#narrator disable` | — | 为本局禁用旁白 | 房主 |
| `#narrator status` | — | 显示当前旁白状态 | 房主 |
| `#narrator limit <N>` | — | 设置每局使用上限 | 房主 |

```
#narrator
#nar 我该怎么办？
```

回复以私聊形式发送给发起查询的玩家。

## 配置

编辑插件 DLL 旁的 `[Empostor.Plugin.Narrator]Config.json`。

```json
{
  "apiKey": "",
  "model": "deepseek-v4-flash",
  "apiEndpoint": "https://api.deepseek.com/",
  "maxUsesPerGame": 3,
  "maxUsesPerMeeting": 1
}
```

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `apiKey` | string | `""` | DeepSeek API Key。必填，缺失时旁白静默失效。 |
| `model` | string | `"deepseek-v4-flash"` | 提交给接口的模型 ID。 |
| `apiEndpoint` | string | `"https://api.deepseek.com/"` | 接口基础地址。可改为兼容的其他服务商。 |
| `maxUsesPerGame` | int | `3` | 每名玩家每局最多调用次数。 |
| `maxUsesPerMeeting` | int | `1` | 每名玩家每场会议最多调用次数。 |

::: tip 首次使用前
请先填写 `apiKey` 再使用 `#narrator`，其余字段均有可用默认值。
:::

## 管理面板

**旁白**标签页：API Key（遮蔽显示）、模型名称、接口地址、每局上限、每场会议上限。修改将写回配置文件。

## 相关文档

- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
