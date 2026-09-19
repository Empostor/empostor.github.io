# HTTP 服务器

自 Empostor 1.9.0 起包含 HTTP 匹配服务，客户端连接 Empostor 服务器必需此服务。

从 Among Us 16.0.5 开始，需要设置 HTTPS 才能让玩家连接到你的服务器。Empostor 不处理 SSL 证书，因此需要设置反向代理。

## 使用反向代理

反向代理可以将 HTTP 请求从用户转发到多个服务。如果已有反向代理，配置它加入 Empostor。

如果从未设置过反向代理，推荐使用 [Caddy](https://caddyserver.com/)。它配置简单且内置 SSL 证书申请支持。

为防止用户直接连接 Empostor，建议将 HttpServer 中的 "ListenIp" 改为 "127.0.0.1"，确保只能通过反向代理访问。但 Server 中的 "ListenIp" 保持 "0.0.0.0"，因为不支持通过代理传输普通游戏流量。

### Caddy

按照[官方安装指南](https://caddyserver.com/docs/install)安装 Caddy，然后使用以下内容作为 `Caddyfile` 配置文件：

```
example.com # 替换为你的域名

reverse_proxy :22023
```

在 Caddyfile 所在目录运行 `caddy run`，它会自动申请免费 SSL 证书并设置服务器。如果正常工作，可以设置 [Caddy 后台运行](https://caddyserver.com/docs/running)。

### Nginx

Nginx 是替代 Caddy 的选择，配置稍复杂。如果已使用 Nginx，可以参考以下配置：

<details><summary>Nginx 配置</summary>

```nginx
server {
    listen 443 ssl http2;
    server_name example.com; # 替换为你的域名

    # 假设使用 Certbot，将 example.com 替换为你的域名
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/fullchain.pem;

    location / {
        proxy_pass http://localhost:22023; # 修改端口为 HttpServer 的 ListenPort
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 将所有 HTTP 流量重定向到 HTTPS
server {
    listen 80 default_server;
    location / {
        return 307 https://$host$request_uri;
    }
}
```

</details>

## 防止直接暴露 HTTP 服务器

建议将 HTTP 服务器的 ListenIp 设为 127.0.0.1，仅允许反向代理接入：

```json
{
  "HttpServer": {
    "ListenIp": "127.0.0.1"
  }
}
```

或使用环境变量：

```sh
IMPOSTOR_HttpServer__ListenIp=127.0.0.1
```

更多服务器配置信息参见[服务器配置](configuration.md)。
