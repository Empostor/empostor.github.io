# QQ Verify

**Plugin ID:** `cn.hayashiume.qqverify`
**Config file:** `[QQ Verify]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`[QQ Verify]Config.json`](#configuration) |
| Commands | [`#verify`](#commands) |
| Admin Panel | [Bot secret](#admin-panel) |
| HTTP API | See [Verification API](../reference/verification-api.md) |

::: warning External dependency
Completing a verification requires an external QQ bot that calls `IVerifyStore.TryConfirm(friendCode, qqNumber)`. The bot is **not** included with Empostor.
:::

## Commands

| Command | Aliases | Usage | Permission |
| :--- | :--- | :--- | :--- |
| `#verify` | `#ver` | `verify <QQ号>` | Everyone |

```
#verify 12345678
#ver 87654321
```

**Verification flow**

| Step | Actor | Action |
| :--- | :--- | :--- |
| 1 | Player | Sends `#verify <QQ number>` in chat. |
| 2 | Server | Creates a pending entry, valid for 10 minutes. |
| 3 | Player | Sends `/验证 <friend code>` to the QQ bot. |
| 4 | QQ bot | Calls `IVerifyStore.TryConfirm(friendCode, qqNumber)`. |

Pending entries expire after 10 minutes if never confirmed.

## Configuration

Edit `[QQ Verify]Config.json` next to the plugin DLL.

```json
{
  "botSecret": "change-bot-secret"
}
```

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `botSecret` | string | `"change-bot-secret"` | Shared secret authenticating the QQ bot. Change it before going live. |

## Admin Panel

**QQ Verify** tab: text input for the bot secret, masked and shown as a password field. Saved values are written back to the config file.

## Related

- [Verification API](../reference/verification-api.md) — endpoints the QQ bot calls.
- [Commands](../reference/commands.md) — full list of in-game commands.
