# Welcome Messages

**Plugin ID:** `cn.hayashiume.welcome`
**Config:** None — content comes from template files in `Message/`

| Reference | Where |
| :--- | :--- |
| Configuration | None — template files only |
| Commands | None |
| Admin Panel | None |
| HTTP API | None |

Sends a welcome chat message to each player spawning in a lobby, picked from per-language template files in `Message/`.

## Template Files

Per-language files are created in `Message/` on first start:

```
Message/
├── EnglishHelloWord.txt
├── SChineseHelloWord.txt
├── TChineseHelloWord.txt
├── KoreanHelloWord.txt
├── RussianHelloWord.txt
├── GermanHelloWord.txt
├── FrenchHelloWord.txt
├── JapaneseHelloWord.txt
├── PortugueseHelloWord.txt
├── BrazilianPortugueseHelloWord.txt
├── SpanishHelloWord.txt
├── ItalianHelloWord.txt
├── DutchHelloWord.txt
├── FilipinoHelloWord.txt
├── IrishHelloWord.txt
└── LatamSpanishHelloWord.txt
```

A player receives the file matching their client language; `EnglishHelloWord.txt` is the fallback. Edit the files and the next spawn picks up the change — no restart required.

## Placeholders

| Placeholder | Description | Example |
| :--- | :--- | :--- |
| `{Name}` | Player display name | `Alice` |
| `{FriendCode}` | Player friend code | `matchduck#1337` |
| `{GameCode}` | Room code | `ABCDEF` |
| `{Room}` | Room code (alias of `{GameCode}`) | `ABCDEF` |
| `{LastConnect}` | Last disconnect time (UTC) | `2026-05-24 15:30:00` |

`{LastConnect}` renders as "First time here!" for players with no previous session.

## Template Syntax

### `<cave>` — remote content

Fetches content from a URL and inlines it:

```
<cave>https://example.com/message.txt</cave>
```

Supported payloads:

| Format | Behaviour |
| :--- | :--- |
| Plain text | Inserted as-is |
| Hitokoto JSON | Uses `hitokoto` and `from` fields |
| Generic JSON | Uses the `content` field |

### `<random>` — random pick

Picks one option from a JSON array; the tag body is the fallback:

```
<random = ["Option A", "Option B", "Option C"]>Default text</random>
```

## Example Template

```
Welcome back, {Name}! Room: {Room}
Last seen: {LastConnect}
<random = ["Have fun!", "Good luck!", "Enjoy the game!"]>Welcome!</random>
```

## Related

- [Custom Title](custom-title.md) — also changes what players see on join.
- [HelloWorld.txt](../config-files/index.md#messages-helloworld-txt) — the file this plugin's templates live next to.
