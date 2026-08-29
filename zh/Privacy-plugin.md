# 隐私政策插件

::: tip 插件功能
此功能由 **Empostor.Plugins.Privacy** 插件（`gg.empostor.privacy`）提供。需要安装并启用该插件才能使用。
:::

## 概述

隐私政策插件提供可配置的隐私政策页面以及更新其内容的 API。服务器管理员可以为其玩家发布自定义的隐私政策。

## 端点

### `GET /privacy`

提供隐私政策 HTML 页面。如果未设置自定义策略，则返回默认模板。

页面采用简洁可读的样式，适合在任何设备上显示。

### `POST /admin/api/privacy`

更新隐私政策内容。需要管理员认证。

**请求体：**

```json
{
  "content": "<h1>我的隐私政策</h1><p>...</p>",
  "token": "your-admin-token"
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `content` | string | 隐私页面的原始 HTML 内容 |
| `token` | string | 用于认证的管理员令牌 |

**认证方式：**

令牌按以下优先级验证：
1. `EMP_HTTP_TOKEN` 环境变量
2. `EMP_ADMIN_TOKEN` 环境变量
3. 如果两者都未设置，则默认为 `"empostor"`

**响应：**

| 状态码 | 响应体 | 说明 |
|---|---|---|
| 200 | `{ "success": true }` | 内容更新成功 |
| 401 | `{ "error": "Invalid token." }` | 令牌错误或缺失 |
| 400 | `{ "error": "..." }` | 请求体格式错误 |

## 内容存储方式

隐私政策 HTML 被写入服务器工作目录下的 `Pages/privacy.html` 文件。该文件在服务器重启后仍然保留。

## 默认模板

如果 `Pages/privacy.html` 不存在，服务器会创建一个包含默认隐私政策模板的文件，涵盖：

1. 数据收集 — 好友代码、聊天消息、IP 地址、游戏数据
2. 数据使用 — 服务提供、管理、调试
3. 数据共享 — 不与第三方共享
4. 数据保留 — 日志保留 31 天
5. 联系方式 — 服务器管理员
6. 第三方服务 — 插件披露

## 自定义

可以写入任何有效的 HTML。页面以 `Content-Type: text/html; charset=utf-8` 提供。

```bash
# 通过 curl 更新
curl -X POST http://localhost:22023/admin/api/privacy \
  -H "Content-Type: application/json" \
  -d '{"content": "<h1>隐私政策</h1><p>我们尊重你的隐私。</p>", "token": "empostor"}'
```

::: warning
在对外公开管理员 API 之前，请通过 `EMP_HTTP_TOKEN` 环境变量将默认的 `"empostor"` 令牌替换为强密码。
:::

## 管理面板

管理面板提供：
- 隐私政策内容的多行 HTML 编辑器
