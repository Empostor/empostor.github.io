# 固定房间代码

为指定玩家分配永久房间代码，使其每次开房时房间代码始终不变。

**插件 ID：** `cn.hayashiume.fixedcode` · **配置文件：** `[Fixed Room Code]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`Config.json`](#配置) |
| 指令 | 无 |
| 管理面板 | 无 |
| HTTP API | 无 |

## 工作原理

插件监听 `IGameCreationEvent`。创建房间时，它会查询房主的好友代码：

- 命中映射表 → 覆盖为配置的房间代码。
- 未命中 → 按服务器默认规则分配。

查询**不区分大小写**，`KAMI#1337` 与 `kami#1337` 视为同一玩家。

## 配置

编辑服务端可执行文件旁的 `[Fixed Room Code]Config.json`：

```json
{
  "mappings": [
    {
      "friendCode": "kami#1337",
      "roomCode": "DUCK"
    },
    {
      "friendCode": "rose#0123",
      "roomCode": "GARDEN"
    }
  ]
}
```

顶层键为 `mappings`，是一个对象数组，字段如下：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `friendCode` | string | 需要固定房间代码的房主好友代码。 |
| `roomCode` | string | 要分配的房间代码，必须为 4 或 6 个字母。 |

## 校验规则

映射必须同时满足以下所有条件才会生效。未通过验证的条目会被**跳过并在服务端日志输出警告**，其余映射仍然正常工作。

| 检查项 | 要求 |
| :--- | :--- |
| 非空 | `friendCode` 与 `roomCode` 均不可为空。 |
| 长度 | 房间代码必须恰好 **4 或 6** 个字符。 |
| 仅字母 | 含非字母字符将被拒绝。 |
| 代码合法 | 必须能转换为合法的 `GameCode`。 |

因此 `ROSE`、`GARDEN` 有效，而 `AB`（过短）、`ABCDE`（长度不符）、`C0DE`（含数字）都会被忽略。

::: tip 留意启动日志
插件启用时会输出 `[FixedCode] Plugin enabled. N mapping(s) loaded.`，请与你配置的条目数比对。被静默跳过的条目也会在上方输出 `[FixedCode]` 警告。
:::

## 验证方法

1. 用自己的好友代码添加一条映射。
2. 重启服务器。
3. 开一个房间，管理面板中显示的房间代码应与配置一致。

## 相关文档

- [自定义房间代码](custom-game-codes.md) —— 从词表随机抽取房间代码，而非固定。
- [好友代码验证](friend-code-validator.md) —— 拒绝格式非法的客户端，这类客户端也无法命中映射。
