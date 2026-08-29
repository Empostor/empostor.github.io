# QQ Verify Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.QqVerify** plugin (`cn.hayashiume.qqverify`). It must be installed and enabled for this to work.
:::

## Overview

The QQ Verify plugin provides a QQ number verification system for linking in-game accounts to QQ (Chinese messaging platform) accounts. This is useful for servers that use QQ groups for community management.

## Commands

### `#verify <QQ number>` (alias: `#ver`)

Initiate QQ verification for your account.

**Examples:**

```
#verify 12345678
#ver 87654321
```

**How it works:**

1. Player sends `#verify <QQ number>` in chat
2. A pending verification entry is created with a 10-minute expiry
3. The player is told to send `/验证 <friend code>` to a QQ bot to complete verification
4. The QQ bot calls the `IVerifyStore.TryConfirm(friendCode, qqNumber)` method to finalize

## Configuration

Configuration is stored in `[QQ Verify]Config.json`:

```json
{
  "botSecret": "change-bot-secret"
}
```

| Setting | Type | Default | Description |
|---|---|---|---|
| `botSecret` | string | `"change-bot-secret"` | Shared secret for QQ bot authentication |

## Admin Panel

The admin panel provides:
- Text input for the bot secret (shown as password)

## Multi-Language Support

The plugin supports:
- English (`en`)
- Simplified Chinese (`zh_CN`)
- Traditional Chinese (`zh_TW`)

::: warning
This plugin requires an external QQ bot that calls the `IVerifyStore` to confirm verifications. The bot is not included with Empostor.
:::
