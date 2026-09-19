# Plugin Marketplace

Fetches the plugin list from the URL configured in `Admin.MarketplaceUrl` (a raw GitHub JSON file). For each plugin, the latest version, supported Empostor version, and description are shown.

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
