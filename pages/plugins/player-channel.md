# Player Channel

**Plugin ID:** `cn.hayashiume.playerchannel`
**Config file:** `[Player Channel]Config.json`

| Reference | Where |
| :--- | :--- |
| Configuration | [`[Player Channel]Config.json`](#configuration) |
| Commands | [`#channel`](#commands) |
| Admin Panel | [Channels tab](#admin-panel) |
| HTTP API | None |

## Commands

| Command | Aliases | Usage | Permission |
| :--- | :--- | :--- | :--- |
| `#channel` | — | `channel <message>` | Everyone |

```
#channel Anyone up for a game on Polus?
```

Relayed to every other online member of the sender's channel. Senders who belong to no channel receive an error.

## Configuration

Edit `[Player Channel]Config.json` next to the plugin DLL.

```json
{
  "channels": [
    {
      "name": "friends",
      "friendCodes": ["FriendA#1234", "FriendB#5678", "FriendC#9012"]
    },
    {
      "name": "clan",
      "friendCodes": ["Leader#0001", "Member1#0002", "Member2#0003"]
    }
  ]
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | string | Channel identifier, used in logs. |
| `friendCodes` | string[] | Friend codes belonging to this channel. |

A player may appear in multiple channels; the message goes to every channel they belong to.

::: warning Membership is manual
There is no in-game way to join a channel — membership is edited in this file or via the admin panel. Restart the server after editing the file directly.
:::

## Admin Panel

**Channels** tab: add and remove channels and their members without editing JSON. Changes made here take effect immediately.

## Related

- [Commands](../reference/commands.md) — full list of in-game commands.
- [Leave a Message](leave-a-message.md) — offline messages instead of live relay.
