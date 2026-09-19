# Custom Game Codes

**Plugin ID:** `cn.hayashiume.code`
**Config:** None — word lists come from `Boot.Codes/`

| Reference | Where |
| :--- | :--- |
| Configuration | None — folder of `.txt` word lists |
| Commands | None |
| Admin Panel | None |
| HTTP API | None |

Assigns readable room codes like `SUNSET` or `ROCKET` instead of random six-letter codes.

## Word Lists

Place `.txt` files in a `Boot.Codes/` folder in the server working directory:

```
Empostor/
├── Boot.Codes/
│   ├── words.txt
│   ├── animals.txt
│   └── colors.txt
├── config/
├── plugins/
└── ...
```

Every `.txt` file is a word list. Each line is one candidate; `--` lines are comments, blank lines are skipped:

```
-- Common words
SUNSET
ROCKET
DRAGON
TEMPLE

-- Animals
PANDA
WHALE
```

**Rules**

| Rule | Detail |
| :--- | :--- |
| Length | Codes must be **4 or 6** characters |
| Charset | Uppercase `A`–`Z` only |
| Invalid lines | Silently skipped |
| Order | Shuffled randomly on startup |
| Reuse | Codes return to the pool when a game ends |

::: tip Duplicate words across files
A word appearing in several files still counts as one code. The pool is the union of all files.
:::

## Fallback

If `Boot.Codes/` is missing, empty, or exhausted, the server falls back to its default random 6-letter generator. No restart is needed after adding words — changes are picked up on next use.

## Related

- [Fixed Room Code](fixed-room-code.md) — deterministic per-player codes instead of random ones.
- [Commands](../reference/commands.md) — full list of in-game commands.
