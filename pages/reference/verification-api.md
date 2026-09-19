# Verification API

Empostor verifies player identities by fetching their FriendCode from external verification services. This happens automatically during player login — no player action required.

### How It Works

1. Player logs into their Among Us account (EOS authentication)
2. Empostor receives the player's EOS Token (JWT, signed by Epic Online Services)
3. Empostor calls the configured verification API with the EOS Token
4. The API returns the player's FriendCode (`PlayerName#1234`)
5. Empostor assigns the FriendCode and the player joins the game

### AuthApi Modes

Configure the verification mode in `config.json` under `AuthApi`:

| Mode | Description |
|---|---|
| `Innersloth` | Calls Innersloth's official API directly. Simple, no external service needed. |
| `Niko` | Uses Niko's au-verify service. Requires a NikoApiKey and a running verification server. |
| `Ume` | Uses UmeAuthService — a lightweight HTTP proxy. No player action required. |
| `Relay` | Custom relay server. Compatible with any verification backend. |
| `Both` | Tries Niko first (if custom ApiKey is set), then Ume, then falls back to Innersloth. |

```json
{
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

### UmeAuthService

[UmeAuthService](https://auverify.hayashiume.top) is a lightweight relay API that proxies the EOS Token to Innersloth and returns a paired **PUID + FriendCode** in one response. Unlike Niko's au-verify, players do not need to join a verification server.

Empostor includes a built-in ApiKey (`sk-empostor-globalapikey`) — just set `Mode` to `Ume` or `Both`.

For standalone API keys, contact HayashiUme:
- QQ: **2558527272**
- Discord: [@hayashiume](https://discord.com/users/1329656960211091579)

#### Verification Endpoint

`POST https://auverify.hayashiume.top/api/verify`

```json
// Request
{ "ApiKey": "sk-empostor-globalapikey", "EosToken": "eyJ..." }

// Success (200)
{ "VerifyStatus": "Verified", "ProductUserId": "0002a1b2...", "FriendCode": "Name#1234" }
```

### PUID Cross-Validation

All verification modes (`Niko`, `Ume`, `Relay`) include **PUID cross-validation**: the ProductUserId returned by the external API is compared against the PUID extracted from the player's own EOS JWT. If they don't match, the FriendCode is rejected. This prevents any possibility of cross-player FriendCode assignment.
