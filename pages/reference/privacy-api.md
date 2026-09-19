# Privacy Policy API

## Overview

Empostor includes a built-in privacy policy page and an API for updating its content. This allows server administrators to publish a custom privacy policy for their players.

## Endpoints

### `GET /privacy`

Serves the privacy policy HTML page. If no custom policy has been set, a default template is returned.

The page is styled as a clean, readable document suitable for display on any device.

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

The token is checked against (in order):
1. `EMP_HTTP_TOKEN` environment variable
2. `EMP_ADMIN_TOKEN` environment variable
3. Falls back to `"empostor"` if neither is set

**Responses:**

| Status | Body | Description |
|---|---|---|
| 200 | `{ "success": true }` | Content updated successfully |
| 401 | `{ "error": "Invalid token." }` | Wrong or missing token |
| 400 | `{ "error": "..." }` | Malformed request body |

## How Content Is Stored

The privacy policy HTML is written to `Pages/privacy.html` in the server's working directory. This file persists across server restarts.

## Default Template

If `Pages/privacy.html` doesn't exist, the server creates one with a default privacy policy template covering:

1. Data Collection — friend codes, chat messages, IP addresses, gameplay data
2. Data Usage — service provision, moderation, debugging
3. Data Sharing — no third-party sharing
4. Data Retention — 31 days for logs
5. Contact — server administrator
6. Third-Party Services — plugins disclosure

## Customization

Write any valid HTML. The page is served with `Content-Type: text/html; charset=utf-8`.

```bash
# Update via curl
curl -X POST http://localhost:22023/admin/api/privacy \
  -H "Content-Type: application/json" \
  -d '{"content": "<h1>Privacy</h1><p>We respect your privacy.</p>", "token": "empostor"}'
```

::: warning
Replace the default `"empostor"` token with a strong secret via the `EMP_HTTP_TOKEN` environment variable before exposing the admin API publicly.
:::
