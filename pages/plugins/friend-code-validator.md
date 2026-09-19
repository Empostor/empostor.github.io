# Friend Code Validator

**Plugin ID:** `duck.Empostor.friendcodevalidator` (marketplace: `duck.hayashiume.friendcodevalidator`)
**Config file:** None — rules are compiled in

| Reference | Where |
| :--- | :--- |
| Configuration | None |
| Commands | None |
| Admin Panel | [Informational tab](#admin-panel) |
| HTTP API | None |

Rejects connections whose friend code fails validation.

## Validation Rules

A friend code is accepted only if **both** conditions hold:

| # | Rule | Detail |
| :-- | :--- | :--- |
| 1 | Format | Matches `^([a-zA-Z]+)#(\d{4})$` — letters, then `#`, then exactly 4 digits. |
| 2 | Dictionary | The word portion must exist in the built-in English dictionary (5,000+ words). |

Failing either check disconnects the client with a localised message.

::: warning Dictionary rejects non-English names
Nicknames like `xXxSlayer` are not dictionary words and will be rejected. There is no allowlist — only these two rules apply.
:::

## Admin Panel

**Friend Code Validator** tab is informational only: it shows the validation pattern and notes that no options are configurable.

## Related

- [QQ Verify](qq-verify.md) — links a game account to a QQ account.
- [Custom Title](custom-title.md) — also keyed by friend code.
