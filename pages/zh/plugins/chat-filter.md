# 聊天过滤

**插件 ID：** `cn.hayashiume.chatfilter`
**配置文件：** `[Empostor.Plugins.ChatFilter]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`Config.json`](#配置) |
| 指令 | 无 |
| 管理面板 | [聊天过滤标签页](#管理面板) |
| HTTP API | 无 |

屏蔽游戏内聊天的指定词汇并对刷屏限流。两条过滤规则相互独立，一条消息命中任意一条即被处理。

## 配置

编辑服务器工作目录下的 `[Empostor.Plugins.ChatFilter]Config.json`。字段为平铺结构（没有外层包装对象）。

```json
{
  "Enabled": false,
  "BlockedWords": [],
  "BlockMessage": true,
  "SpamThreshold": 5,
  "SpamWindowSeconds": 10
}
```

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `Enabled` | bool | `false` | 两条过滤规则的总开关。 |
| `BlockedWords` | string[] | `[]` | 屏蔽词。不区分大小写的**子串**匹配 —— `"bad"` 同时命中 `"badword"`。 |
| `BlockMessage` | bool | `true` | `true` 拦截消息；`false` 放行但记录警告。 |
| `SpamThreshold` | int | `5` | 时间窗口内允许的消息条数，达到即触发限流。 |
| `SpamWindowSeconds` | int | `10` | 滑动窗口时长，单位秒。 |

::: warning 子串匹配
`"ass"` 这类短词会同时命中 `"pass"` 与 `"classic"`。请使用更长、更具体的词避免误伤。
:::

## 过滤规则

| 规则 | 触发条件 | 处理方式 |
| :--- | :--- | :--- |
| 词过滤 | 消息包含任一 `BlockedWords` 词条 | 按 `BlockMessage` 处理 |
| 刷屏过滤 | `SpamWindowSeconds` 秒内发送 ≥ `SpamThreshold` 条 | 按 `BlockMessage` 处理 |

## 示例

屏蔽两个词，并限制每 5 秒最多 3 条消息：

```json
{
  "Enabled": true,
  "BlockedWords": ["badword1", "badword2"],
  "BlockMessage": true,
  "SpamThreshold": 3,
  "SpamWindowSeconds": 5
}
```

## 管理面板

**聊天过滤**标签页 —— 运行时调整，无需重启或编辑文件：

| 控件 | 作用 |
| :--- | :--- |
| 启用/禁用复选框 | 开关过滤功能 |
| 词表编辑器 | 增删屏蔽词 |
| 阈值与窗口输入框 | 调整刷屏限流参数 |
| 拦截/仅记录切换 | 对应 `BlockMessage` 行为 |

::: warning 面板修改不持久化
面板中的修改立即生效，但**不会**写回配置文件。请自行将最终配置写入 `[Empostor.Plugins.ChatFilter]Config.json`。
:::

## 相关文档

- [聊天管理](chat-manager.md) —— 消息长度限制，与本插件互补。
- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
