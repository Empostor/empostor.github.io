# 旁白插件

::: tip 插件功能
此功能由 **Empostor.Plugin.Narrator** 插件（`cn.hayashiume.narrator`）提供。需要安装并启用该插件才能使用。
:::

## 概述

旁白插件在会议期间提供 AI 驱动的战略顾问。玩家可以使用聊天命令向旁白寻求建议。AI 会考虑玩家的角色（内鬼或船员）、已完成的任务、死亡玩家、聊天记录、投票和游戏设置，提供上下文相关的战略建议。

## 命令

### `#narrator`（别名：`#nar`、`#n`）

在会议期间向旁白寻求战略建议。

**示例：**

```
#narrator
#n
#nar 我该怎么做？
```

AI 回复以私聊消息发送给请求的玩家。

### 房主控制

| 命令 | 说明 |
|---|---|
| `#narrator enable` | 为当前游戏启用旁白 |
| `#narrator disable` | 为当前游戏禁用旁白 |
| `#narrator status` | 显示当前旁白状态 |
| `#narrator limit <N>` | 设置每局使用限制 |

## 工作原理

1. 会议开始时，插件捕获完整的游戏上下文：玩家角色、已完成的任务、死亡玩家、聊天消息和投票。
2. 当玩家使用 `#narrator` 时，插件将上下文发送到 DeepSeek AI API。
3. AI 作为战略顾问：
   - 对船员：帮助证明清白和识别内鬼
   - 对内鬼：帮助编造可信的掩护故事
4. 回复以私聊消息发送给请求的玩家。
5. 每局和每次会议的使用限制防止刷屏。

## 配置

配置存储在 `[Narrator]Config.json` 中：

```json
{
  "apiKey": "",
  "model": "deepseek-v4-flash",
  "apiEndpoint": "https://api.deepseek.com/",
  "maxUsesPerGame": 3,
  "maxUsesPerMeeting": 1
}
```

| 设置 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `apiKey` | string | `""` | DeepSeek API 密钥 |
| `model` | string | `"deepseek-v4-flash"` | 使用的 AI 模型 |
| `apiEndpoint` | string | `"https://api.deepseek.com/"` | API 端点 URL |
| `maxUsesPerGame` | int | `3` | 每个玩家每局最大使用次数 |
| `maxUsesPerMeeting` | int | `1` | 每个玩家每次会议最大使用次数 |

## 管理面板

旁白设置可在管理面板中访问：

- **API 密钥**（密码输入）
- **模型名称**（文本输入）
- **API 端点**（文本输入）
- **每局最大使用次数**（数字输入）
- **每次会议最大使用次数**（数字输入）

## 多语言支持

插件支持：
- 英语（`en`）
- 简体中文（`zh_CN`）
- 繁体中文（`zh_TW`）
