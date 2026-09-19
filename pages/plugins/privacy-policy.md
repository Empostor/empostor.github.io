# Privacy Policy

**Plugin ID:** `gg.empostor.privacy`
**Config file:** None — content is stored as HTML, see [Storage](#storage)

| Reference | Where |
| :--- | :--- |
| Configuration | None |
| Commands | None |
| Admin Panel | [Privacy tab](#admin-panel) |
| HTTP API | [Endpoints](#api) |

Serves a privacy policy page at `/privacy` and exposes an endpoint to replace its content.

## API

### `GET /privacy`

Serves the policy page. Returns the built-in default template until custom content is set.

### `POST /admin/api/privacy`

Replaces the policy content. Requires authentication.

```json
{
  "content": "<h1>My Privacy Policy</h1><p>...</p>",
  "token": "your-admin-token"
}
```

| Body field | Type | Description |
| :--- | :--- | :--- |
| `content` | string | Raw HTML for the privacy page |
| `token` | string | Admin token |

**Token resolution order**

1. `EMP_HTTP_TOKEN` environment variable
2. `EMP_ADMIN_TOKEN` environment variable
3. Falls back to `"empostor"` if neither is set

::: danger Change the default token
The fallback token is `"empostor"`. Set `EMP_HTTP_TOKEN` to a strong value before exposing this endpoint.
:::

**Responses**

| Status | Body | Meaning |
| :--- | :--- | :--- |
| `200` | `{ "success": true }` | Content updated |
| `401` | `{ "error": "Invalid token." }` | Token missing or incorrect |
| `400` | `{ "error": "..." }` | Malformed request body |

## Admin Panel

**Privacy** tab — multiline HTML editor for the policy content.

## Storage

Content is written to `Pages/privacy.html` in the server working directory and persists across restarts. Served as `Content-Type: text/html; charset=utf-8`; any valid HTML is accepted.

```bash
curl -X POST http://localhost:22023/admin/api/privacy \
  -H "Content-Type: application/json" \
  -d '{"content": "<h1>Privacy Policy</h1><p>We respect your privacy.</p>", "token": "empostor"}'
```

## Default Template

Used when `Pages/privacy.html` does not exist. Covers:

| Section | Content |
| :--- | :--- |
| Data Collection | Friend codes, chat messages, IP addresses, game data |
| Data Usage | Service provision, administration, debugging |
| Data Sharing | Not shared with third parties |
| Data Retention | Logs retained for 31 days |
| Contact Information | Server administrator |
| Third-Party Services | Plugin disclosures |
