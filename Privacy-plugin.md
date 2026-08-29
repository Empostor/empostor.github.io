# Privacy Policy Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.Privacy** plugin (`gg.empostor.privacy`). It must be installed and enabled for this to work.
:::

## Overview

The Privacy plugin serves a configurable privacy policy page and provides an admin API to update it. This is useful for servers that need to comply with privacy regulations.

## Endpoints

### `GET /privacy`

Serves the privacy policy HTML page. If no custom policy has been set, a default template is returned.

The page uses a clean, readable style suitable for any device.

### `POST /admin/api/privacy`

Updates the privacy policy content. Requires admin authentication.

**Request Body:**

```json
{
  "content": "<h1>My Privacy Policy</h1><p>...</p>",
  "token": "your-admin-token"
}
```

| Field | Type | Description |
|---|---|---|
| `content` | string | Raw HTML content for the privacy page |
| `token` | string | Admin token for authentication |

**Authentication:**

The token is verified in this order:
1. `EMP_HTTP_TOKEN` environment variable
2. `EMP_ADMIN_TOKEN` environment variable
3. Falls back to `"empostor"` if neither is set

**Response:**

| Status | Body | Description |
|---|---|---|
| 200 | `{ "success": true }` | Content updated successfully |
| 401 | `{ "error": "Invalid token." }` | Token incorrect or missing |
| 400 | `{ "error": "..." }` | Malformed request body |

## Content Storage

The privacy policy HTML is written to `Pages/privacy.html` in the server's working directory. This file persists across server restarts.

## Default Template

If `Pages/privacy.html` does not exist, the server creates a default template covering:

1. Data Collection — friend codes, chat messages, IP addresses, game data
2. Data Usage — service provision, administration, debugging
3. Data Sharing — not shared with third parties
4. Data Retention — logs retained for 31 days
5. Contact Information — server administrator
6. Third-Party Services — plugin disclosures

## Customization

You can write any valid HTML. The page is served with `Content-Type: text/html; charset=utf-8`.

```bash
# Update via curl
curl -X POST http://localhost:22023/admin/api/privacy \
  -H "Content-Type: application/json" \
  -d '{"content": "<h1>Privacy Policy</h1><p>We respect your privacy.</p>", "token": "empostor"}'
```

::: warning
Before exposing the admin API publicly, replace the default `"empostor"` token with a strong password via the `EMP_HTTP_TOKEN` environment variable.
:::

## Admin Panel

The admin panel provides:
- Multiline HTML editor for the privacy policy content
