# Boot.Codes — Custom Game Codes

::: tip Plugin
This feature is provided by the **Empostor.Plugin.Code** plugin (`cn.hayashiume.code`). It must be installed and enabled for this to work.
:::

## Overview

Boot.Codes replaces the default randomly-generated game codes with human-readable words. Instead of joining `ABCDEF`, players join games like `SUNSET` or `ROCKET`.

## How It Works

The plugin reads word lists from a `Boot.Codes/` folder in the server's working directory. Each `.txt` file in this folder is treated as a word list. When a new game is created, the plugin picks a random unused word as the room code.

## Folder Structure

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

## Word List Format

Each line in a `.txt` file is one code candidate. Lines starting with `--` are treated as comments and ignored. Blank lines are skipped.

```
-- Common words
SUNSET
ROCKET
DRAGON
TEMPLE
JUNGLE

-- Animals
TIGGER
EAGGLE
PANDA
WHALE
```

## Rules

- Codes must be **4 or 6 characters** long
- Only uppercase letters `A`–`Z` are allowed (the same characters used in standard Among Us codes)
- Invalid lines are silently skipped
- Codes are **shuffled** randomly on startup
- When a game ends, the code is **returned** to the pool for reuse

## Fallback

If the `Boot.Codes/` folder doesn't exist, is empty, or runs out of codes, the server falls back to the default random 6-letter code generator.

## Configuration

This plugin requires no configuration file. Just create the `Boot.Codes/` folder with your word lists and restart the server.

## FixedCode Plugin

There is also a companion plugin **Empostor.Plugins.FixedCode** (`cn.Empostor.fixedcode`) that assigns fixed/predictable room codes to specific players based on their friend code. When a player with a configured friend code creates a game, they receive the assigned room code.

Room codes must be **4 or 6 uppercase letters** (A–Z only).

Configuration is stored in `[Fixed Room Code]Config.json`:

```json
{
  "mappings": [
    {
      "friendCode": "kami#1337",
      "roomCode": "DUCK"
    },
    {
      "friendCode": "player#5678",
      "roomCode": "HELLO"
    }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `friendCode` | string | The player's friend code |
| `roomCode` | string | The fixed room code (4 or 6 uppercase letters) |

Multiple mappings are supported. If a player's friend code is not in the mapping, they receive a normal random code.
