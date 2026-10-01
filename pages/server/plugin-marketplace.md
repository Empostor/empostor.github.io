# Plugin Marketplace

Fetches the plugin list from the URL configured in `Admin.MarketplaceUrl` (a raw GitHub JSON file). For each plugin, the latest version, supported Empostor version, and description are shown.

The marketplace also has a **Themes** category (the **Themes** button at the top of the page); its catalogue format is described under [Theme marketplace](#theme-marketplace) below.

Clicking **Install** downloads the `.dll` to the `plugins/` folder. The server must be restarted to load the new plugin.

If the plugin was built for a different Empostor version, a warning is displayed but installation is not blocked.

### plugins.json Format

The marketplace reads a `plugins.json` file (local or remote URL):

```jsonc
[
  {
    // Unique plugin identifier (reverse-domain style recommended)
    "id": "cn.hayashiume.welcome",

    // Display name shown in the marketplace
    "name": "Welcome Messages",

    // Short description (shown as subtitle)
    "description": "Sends a localised welcome message when players join a room.",

    // Author attribution
    "author": "BunchHanpiDev & HayashiUme",

    // Version history — latest version LAST in the array
    "versions": [
      {
        // Semantic version of this plugin release
        "version": "1.0.0",

        // Minimum Empostor version required
        "empostor_version": "2.0.0",

        // Direct download URL for the .dll file
        "download_url": "https://raw.githubusercontent.com/Empostor/Empostor/master/marketplace/Empostor.Plugins.Welcome.dll"
      }
    ]
  }
]
```

**Versioning rules:**
- The **last entry** in `versions` is treated as the latest and is selected by default in the UI.
- **Single-version** plugins: one entry is valid; the version dropdown is hidden.
- **Multi-version** plugins: two or more entries show a `<select>` dropdown for the operator.
- `download_url` must point directly to a compiled `.dll` file.
- The admin panel reads `GET /api/admin/marketplace/plugins` — no restart needed for list changes, but a restart is required after installing a plugin.

## Theme marketplace

The **Themes** category lists every theme the panel can offer: those already available on the server (built-in `default`, themes compiled in by a plugin, folders under `Pages/themes/`) are marked **Active** / **Installed** and get an **Apply** button; catalogue entries that are not installed yet are marked **Not installed** and get **Install**. Each card previews the theme with five swatches: background, surface, accent, success and text.

The catalogue comes from the `themes.json` pointed at by `Admin.ThemeMarketplaceUrl`. When that URL is unreachable the remote entries are skipped silently and only local themes are shown.

### themes.json Format

```jsonc
[
  {
    // Unique theme id; also the folder name under Pages/themes/ (lowercase letters, digits, dashes)
    "id": "nord",

    // Display name shown in the marketplace
    "name": "Nord",

    // Short description
    "description": "Cool polar blues with muted arctic greys.",

    // Author attribution
    "author": "Empostor",

    // Direct download URL for the theme.json file; HTTPS only
    "downloadUrl": "https://raw.githubusercontent.com/Empostor/Empostor/main/marketplace/themes/nord.json"
  }
]
```

**Rules:**
- The downloaded payload must be a `theme.json` object whose `Id` matches the `id` being installed, otherwise nothing is written.
- Installation writes `Pages/themes/{id}/theme.json`. The theme registry is rescanned immediately, so the theme is switchable from the header dropdown or the marketplace **without a restart**.
- Themes that are already installed only offer **Apply** and are never downloaded twice; `id` is validated as lowercase letters, digits and dashes so it cannot escape the themes folder.
- The `theme.json` fields (`Tokens` / `DarkTokens` / `CustomCss` / `Extends` / `Layout`) are described under [Marketplace](admin-panel.md#marketplace).
- Nine themes ship with Empostor under `Pages/themes/`: Anthropic, Catppuccin, Dracula, Gruvbox, Midnight OLED, Nord, Rosé Pine, Solarized and Tokyo Night.
