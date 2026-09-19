# 隐私政策

**插件 ID：** `gg.empostor.privacy`
**配置文件：** 无 —— 内容以 HTML 形式存储，见[存储](#存储)

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | 无 |
| 指令 | 无 |
| 管理面板 | [隐私标签页](#管理面板) |
| HTTP API | [接口](#api) |

在 `/privacy` 提供隐私政策页面，并暴露替换页面内容的接口。

## API

### `GET /privacy`

返回政策页面。未设置自定义内容前返回内置默认模板。

### `POST /admin/api/privacy`

替换政策内容。需要鉴权。

```json
{
  "content": "<h1>我的隐私政策</h1><p>...</p>",
  "token": "your-admin-token"
}
```

| 请求字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `content` | string | 隐私页面的原始 HTML |
| `token` | string | 管理令牌 |

**令牌解析顺序**

1. 环境变量 `EMP_HTTP_TOKEN`
2. 环境变量 `EMP_ADMIN_TOKEN`
3. 两者都未设置时回退为 `"empostor"`

::: danger 务必修改默认令牌
回退令牌是 `"empostor"`。在对外暴露该接口之前，请先通过 `EMP_HTTP_TOKEN` 设置强密钥。
:::

**响应**

| 状态码 | 响应体 | 含义 |
| :--- | :--- | :--- |
| `200` | `{ "success": true }` | 内容已更新 |
| `401` | `{ "error": "Invalid token." }` | 令牌缺失或不正确 |
| `400` | `{ "error": "..." }` | 请求体格式错误 |

## 管理面板

**隐私**标签页 —— 用于编辑政策内容的多行 HTML 编辑器。

## 存储

内容写入服务器工作目录下的 `Pages/privacy.html`，重启后保留。响应头为 `Content-Type: text/html; charset=utf-8`，接受任意合法 HTML。

```bash
curl -X POST http://localhost:22023/admin/api/privacy \
  -H "Content-Type: application/json" \
  -d '{"content": "<h1>隐私政策</h1><p>我们尊重你的隐私。</p>", "token": "empostor"}'
```

## 默认模板

`Pages/privacy.html` 不存在时使用内置默认模板，涵盖：

| 章节 | 内容 |
| :--- | :--- |
| 数据收集 | 好友代码、聊天消息、IP 地址、游戏数据 |
| 数据用途 | 提供服务、服务器管理、问题排查 |
| 数据共享 | 不与第三方共享 |
| 数据留存 | 日志保留 31 天 |
| 联系方式 | 服务器管理员 |
| 第三方服务 | 插件披露信息 |
