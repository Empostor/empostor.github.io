# QQ 验证插件

::: tip 插件功能
此功能由 **Empostor.Plugins.QqVerify** 插件（`cn.hayashiume.qqverify`）提供。需要安装并启用该插件才能使用。
:::

## 概述

QQ 验证插件提供 QQ 号码验证系统，用于将游戏内账户关联到 QQ（中国即时通讯平台）账户。这对于使用 QQ 群进行社区管理的服务器很有用。

## 命令

### `#verify <QQ 号码>`（别名：`#ver`）

为你的账户发起 QQ 验证。

**示例：**

```
#verify 12345678
#ver 87654321
```

**工作原理：**

1. 玩家在聊天中发送 `#verify <QQ 号码>`
2. 创建一个待处理的验证条目，有效期 10 分钟
3. 玩家被告知向 QQ 机器人发送 `/验证 <好友代码>` 以完成验证
4. QQ 机器人调用 `IVerifyStore.TryConfirm(friendCode, qqNumber)` 方法来最终确认

## 配置

配置存储在 `[QQ Verify]Config.json` 中：

```json
{
  "botSecret": "change-bot-secret"
}
```

| 设置 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `botSecret` | string | `"change-bot-secret"` | QQ 机器人认证的共享密钥 |

## 管理面板

管理面板提供：
- 机器人密钥的文本输入（显示为密码）

## 多语言支持

插件支持：
- 英语（`en`）
- 简体中文（`zh_CN`）
- 繁体中文（`zh_TW`）

::: warning
此插件需要一个外部 QQ 机器人来调用 `IVerifyStore` 以确认验证。机器人不包含在 Empostor 中。
:::
