# 验证 API

Empostor 通过外部验证服务获取玩家的好友代码来验证玩家身份。此过程在玩家登录时自动完成——无需玩家执行任何操作。

### 工作原理

1. 玩家登录其 Among Us 账户（EOS 认证）
2. Empostor 收到玩家的 EOS Token（JWT，由 Epic Online Services 签名）
3. Empostor 使用 EOS Token 调用配置的验证 API
4. API 返回玩家的好友代码（`PlayerName#1234`）
5. Empostor 分配好友代码，玩家加入游戏

### AuthApi 模式

在 `config.json` 的 `AuthApi` 下配置验证模式：

| 模式 | 描述 |
|---|---|
| `Innersloth` | 直接调用 Innersloth 官方 API。简单，无需外部服务。 |
| `Ume` | 使用 UmeAuthService——轻量级 HTTP 代理。无需玩家操作。 |
| `Both` | 优先 Ume，最后回退到 Innersloth。 |

```json
{
  "AuthApi": {
    "Mode": "Ume",
    "UmeApiBaseUrl": "https://auverify.hayashiume.top",
    "UmeApiKey": "sk-empostor-globalapikey"
  }
}
```

### UmeAuthService

[UmeAuthService](https://auverify.hayashiume.top) 是一个轻量级中继 API，将 EOS Token 代理到 Innersloth，并在一次响应中返回配对的 **PUID + 好友代码**。玩家无需加入验证服务器。

Empostor 内置了 ApiKey（`sk-empostor-globalapikey`）——只需将 `Mode` 设置为 `Ume` 即可使用。

如需独立的 ApiKey，请联系 HayashiUme：
- QQ: **2558527272**
- Discord: [@hayashiume](https://discord.com/users/1329656960211091579)

#### 验证端点

`POST https://auverify.hayashiume.top/api/verify`

```json
// 请求
{ "ApiKey": "sk-empostor-globalapikey", "EosToken": "eyJ..." }

// 成功 (200)
{ "VerifyStatus": "Verified", "ProductUserId": "0002a1b2...", "FriendCode": "Name#1234" }
```

### PUID 交叉验证

`Ume` 模式包含 **PUID 交叉验证**：外部 API 返回的 ProductUserId 会与从玩家 EOS JWT 中提取的 PUID 进行比对。如果不匹配，则拒绝该好友代码。这杜绝了任何跨玩家好友代码分配的可能性。
