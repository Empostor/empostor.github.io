# QQ 群验证

**插件 ID：** `cn.hayashiume.qqverify`
**配置文件：** `[QQ Verify]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`[QQ Verify]Config.json`](#配置) |
| 指令 | [`#verify`](#指令) |
| 管理面板 | [机器人密钥](#管理面板) |
| HTTP API | 见[验证 API](../reference/verification-api.md) |

::: warning 外部依赖
完成验证需要一个外部 QQ 机器人调用 `IVerifyStore.TryConfirm(friendCode, qqNumber)`。该机器人**不包含**在 Empostor 中。
:::

## 指令

| 指令 | 别名 | 用法 | 权限 |
| :--- | :--- | :--- | :--- |
| `#verify` | `#ver` | `verify <QQ号>` | 所有人 |

```
#verify 12345678
#ver 87654321
```

**验证流程**

| 步骤 | 执行方 | 动作 |
| :--- | :--- | :--- |
| 1 | 玩家 | 在聊天中发送 `#verify <QQ号>`。 |
| 2 | 服务器 | 创建待验证条目，有效期 10 分钟。 |
| 3 | 玩家 | 向 QQ 机器人发送 `/验证 <好友代码>`。 |
| 4 | QQ 机器人 | 调用 `IVerifyStore.TryConfirm(friendCode, qqNumber)`。 |

待验证条目若在 10 分钟内未被确认则自动过期。

## 配置

编辑插件 DLL 旁的 `[QQ Verify]Config.json`。

```json
{
  "botSecret": "change-bot-secret"
}
```

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `botSecret` | string | `"change-bot-secret"` | 用于校验 QQ 机器人身份的共享密钥。上线前务必修改。 |

## 管理面板

**QQ 验证**标签页：提供机器人密钥输入框，以密码形式遮蔽。保存后写回配置文件。

## 相关文档

- [验证 API](../reference/verification-api.md) —— 供 QQ 机器人调用的接口。
- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
