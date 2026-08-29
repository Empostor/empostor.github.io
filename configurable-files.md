# Configurable Files

Empostor uses several user-editable files for configuration, customization, and localization. This page documents each file's location, format, and purpose.

---

## config.json

**Location:** Next to `Empostor.Server` executable
**Format:** JSON

The main server configuration file. See [Server Configuration](Server-configuration.md) for the complete reference.

```json
{
  "Server": {
    "PublicIp": "127.0.0.1",
    "PublicPort": 22023,
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  },
  "HttpServer": {
    "Enabled": true,
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  },
  "AntiCheat": { "Enabled": true, "BanIpFromGame": true, ... },
  "Compatibility": { "AllowFutureGameVersions": false, ... },
  "Debug": { "GameRecorderEnabled": false, "GameRecorderPath": "" },
  "Admin": { "Password": "CHANGE-ME", "MarketplaceUrl": "..." },
  "DiscordWebhook": { "MatchmakerUrl": "", "AdminUrl": "" },
  "PlayerStats": { "Enabled": false, "PersistToFile": true },
  "ChatFilter": { "Enabled": false, "BlockedWords": [], ... },
  "AuthApi": {
    "Mode": "Both",
    "NikoApiKey": "niko-request-api-key",
    "NikoApiBaseUrl": "https://au-verify.niko233.top",
    "RelayApiBaseUrl": "http://localhost:5100",
    "RelayApiKey": "empostor-relay-api-key-change-me",
    "UmeApiBaseUrl": "https://auverify.hayashiume.top",
    "UmeApiKey": "sk-empostor-globalapikey"
  }
}
```

### Configuration via Environment Variables

As an alternative to editing `config.json`, you can set environment variables using the pattern `EMPOSTOR_SectionName__VariableName`:

```
EMPOSTOR_Server__PublicIp=127.0.0.1
EMPOSTOR_Server__PublicPort=22023
EMPOSTOR_AntiCheat__Enabled=true
EMPOSTOR_Admin__Password=mysecretpassword
```

### AuthApi — Verification Configuration

The `AuthApi` section controls how Empostor fetches player FriendCodes for identity verification. See [Verification API](api-reference.md#verification-api) for the full flow.

| Field | Type | Default | Description |
|---|---|---|---|
| `Mode` | string | `Innersloth` | Verification mode: `Innersloth`, `Niko`, `Ume`, `Relay`, or `Both` |
| `NikoApiKey` | string | `niko-request-api-key` | API key for Niko's au-verify service |
| `NikoApiBaseUrl` | string | `https://au-verify.niko233.top` | Base URL for Niko's au-verify API |
| `RelayApiBaseUrl` | string | (empty) | Base URL for a custom relay verification server |
| `RelayApiKey` | string | (empty) | API key for the relay server |
| `UmeApiBaseUrl` | string | `https://auverify.hayashiume.top` | Base URL for UmeAuthService |
| `UmeApiKey` | string | `sk-empostor-globalapikey` | Built-in API key for UmeAuthService |

**Modes:**

| Mode | Behavior |
|---|---|
| `Innersloth` | Calls Innersloth's official API directly. No external service needed. |
| `Niko` | Uses Niko's au-verify service. Requires a valid `NikoApiKey`. Player must join a verification server. |
| `Ume` | Uses UmeAuthService — a lightweight HTTP proxy. No player action required. |
| `Relay` | Uses a custom relay server at `RelayApiBaseUrl`. |
| `Both` | If `NikoApiKey` is customized → tries Niko first, then Ume, then Innersloth. Otherwise → Ume first, then Niko, then Innersloth. |

---

## AdminStrings.json

**Location:** `Pages/AdminStrings.json`
**Format:** JSON (flat key-value pairs)

Localization file for the admin panel web interface. Every UI string is a key-value pair. Translate the values to customize the admin panel for your language.

```json
{
  "login.title": "Empostor Admin",
  "login.password": "Password",
  "login.placeholder": "Enter admin password",
  "login.signin": "Sign in",
  "login.error": "Incorrect password.",

  "nav.monitor": "Monitor",
  "nav.overview": "Overview",
  "nav.games": "Games",
  "nav.clients": "Clients",
  "nav.broadcast": "Broadcast",
  "nav.kick": "Kick",
  "nav.ban": "Ban",
  ...
}
```

**Key categories:**

| Prefix | Section |
|---|---|
| `login.*` | Login page |
| `header.*` | Top header bar |
| `nav.*` | Sidebar navigation tabs |
| `status.*` | Dashboard stat cards |
| `table.*` | Table column headers |
| `broadcast.*` | Broadcast tab |
| `kick.*` | Kick tab |
| `ban.*` | Ban / Ban List tabs |
| `message.*` | Message tab |
| `endgame.*` | End Game tab |
| `privacy.*` | Privacy toggle tab |
| `marketplace.*` | Plugin Marketplace tab |
| `updates.*` | Update Check tab |
| `reports.*` | Reports tab |
| `serverinfo.*` | Server Info tab |
| `games.*` | Games list |
| `clients.*` | Clients list |
| `alert.*` | Toast notification messages |
| `privacy_policy.*` | Privacy policy page |
| `player_logs.*` | Player Logs tab |
| `stats.*` | Statistics tab |
| `chatfilter.*` | Chat Filter tab |

**To add a new language:**
1. Translate all values in `AdminStrings.json`
2. Use the **Reload Lang** button in the admin panel to apply changes without restarting

---

## Pages/index.html (Hello Page)

**Location:** `Pages/index.html`
**Format:** HTML

The home page served at `http://your-server:22023/`. On first startup, Empostor automatically creates this directory with a default `index.html`.

**Key behaviors:**
- Read from disk on every request — edits take effect without restart
- Served as `text/html; charset=utf-8`
- No template engine — the file is served as-is
- If deleted, a plain fallback response is returned until server restart

**Default page contents:**
- Server online status indicator
- Link to admin panel (`/admin`)
- Link to region file generator
- Server start time

**Common customizations:**
- Server rules and information
- Discord invite link
- Region file download instructions
- Custom branding

See [Hello Page](Hello-page.md) for more details.

---

## Messages/HelloWorld.txt

**Location:** `Messages/HelloWorld.txt`
**Format:** Plain text (one `lang: message` per line)

Welcome message template used by the Welcome plugin. Each line defines a language-specific greeting. The plugin reads the file on every player join, so edits take effect immediately.

### File naming convention

The Welcome plugin looks for per-language files using the pattern `Message/{Language}HelloWord.txt`:

- `Message/EnglishHelloWord.txt`
- `Message/SChineseHelloWord.txt`
- `Message/KoreanHelloWord.txt`

If a language-specific file exists, it takes priority over the main `HelloWorld.txt`.

### Format

```
# Format:   lang: message template
# Fallback: default

default: 👋 Welcome, {Name}! Friend code: {FriendCode} | Room: {GameCode}
en:      👋 Welcome, {Name}! Friend code: {FriendCode} | Room: {GameCode}
zh:      👋 欢迎，{Name}！好友码：{FriendCode} | 房间：{GameCode}
ko:      👋 환영합니다, {Name}! 친구 코드: {FriendCode} | 방: {GameCode}
ru:      👋 Добро пожаловать, {Name}! Код друга: {FriendCode} | Комната: {GameCode}
pt:      👋 Bem-vindo, {Name}! Código de amigo: {FriendCode} | Sala: {GameCode}
de:      👋 Willkommen, {Name}! Freundescode: {FriendCode} | Raum: {GameCode}
fr:      👋 Bienvenue, {Name}! Code ami : {FriendCode} | Salle : {GameCode}
es:      👋 ¡Bienvenido, {Name}! Código amigo: {FriendCode} | Sala: {GameCode}
ja:      👋 ようこそ、{Name}！フレンドコード：{FriendCode} | ルーム：{GameCode}
```

**Available placeholders (v1.1.0):**

| Placeholder | Description | Example |
|---|---|---|
| `{Name}` | Player display name | `Alice` |
| `{FriendCode}` | Player friend code | `matchduck#1337` |
| `{GameCode}` | Room code | `ABCDEF` |
| `{Room}` | Room code (alias) | `ABCDEF` |
| `{LastConnect}` | Last disconnect time (UTC) | `2026-05-24 15:30:00` |

`{LastConnect}` shows "First time here!" for new players.

**Customizing:** Edit the `.txt` files directly. Example `Message/EnglishHelloWord.txt`:
```
Welcome back, {Name}! Room: {Room}
Last seen: {LastConnect}
```

**Adding a language:** Add a new line with your language code and message template. The `default` line is used as fallback for any language not explicitly listed.

See [Writing a Plugin](Writing-a-plugin.md#internationalization-i18n) for code-level plugin i18n with `IPluginLanguageProvider`.

---

## marketplace/plugins.json

**Location:** `marketplace/plugins.json` (or a remote URL configured in `Admin.MarketplaceUrl`)
**Format:** JSON array

Defines the plugins available in the admin panel's Plugin Marketplace. See [Plugin Marketplace](Admin-panel.md#plugin-marketplace) for the complete format reference.

```json
[
  {
    "id": "cn.hayashiume.welcome",
    "name": "Welcome Messages",
    "description": "Sends a localised welcome message when players join a room.",
    "author": "BunchHanpiDev & HayashiUme",
    "versions": [
      {
        "version": "1.0.0",
        "empostor_version": "2.0.0",
        "download_url": "https://raw.githubusercontent.com/Empostor/Empostor/master/marketplace/Empostor.Plugins.Welcome.dll"
      }
    ]
  }
]
```

---

## bans.json

**Location:** Next to `Empostor.Server` executable (auto-generated)
**Format:** JSON

Stores IP bans and friend code bans persistently. Managed through the admin panel — you typically don't edit this file by hand.

---

## player_stats.json

**Location:** Next to `Empostor.Server` executable (auto-generated when `PlayerStats.Enabled` is `true`)
**Format:** JSON

Stores per-player game statistics. Managed through the admin panel.

---

## File Overview

| File | Created By | Editable | Restart Required |
|---|---|---|---|
| `config.json` | You (from release archive) | Yes | Yes |
| `Pages/AdminStrings.json` | Server (on first start) | Yes | No (use Reload Lang) |
| `Pages/index.html` | Server (on first start) | Yes | No |
| `Pages/privacy.html` | Server (on first use) | Yes (via API) | No |
| `Messages/HelloWorld.txt` | Welcome plugin | Yes | No |
| `marketplace/plugins.json` | You | Yes | No (marketplace list), Yes (after install) |
| `bans.json` | Server (auto) | Via admin panel | No |
| `player_stats.json` | Server (auto) | Via admin panel | No |
