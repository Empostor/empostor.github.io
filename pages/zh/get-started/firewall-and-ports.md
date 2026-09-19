# 防火墙与动态端口

## 概述

Empostor 使用**动态增量端口**进行认证。当玩家连接时，服务器为该玩家的认证握手分配一个临时 UDP 端口。认证成功后，玩家被切换到主游戏端口。

## 动态增量端口

增量端口机制的工作原理如下：

1. 客户端通过 HTTP 向 `POST /api/user` 发送令牌请求
2. 服务器从配置的端口池中分配一个随机 UDP 端口
3. 服务器在该端口上启动临时 UDP 监听器
4. 客户端连接到增量端口以完成 UDP 握手
5. 服务器通过端口号将连接与令牌匹配
6. 认证成功后，增量监听器停止，端口归还到池中

### 配置

```json
{
  "PortPool": {
    "Start": 22024,
    "End": 22124
  }
}
```

这将端口 22024-22124 保留用于增量认证。池大小决定了同时可以认证的连接数。

## 防火墙配置

### Linux (ufw)

如果服务器运行在 Linux 上，Empostor 可以自动管理防火墙规则：

```json
{
  "ServerConfig": {
    "UseUfw": true
  }
}
```

启用后，Empostor 为每个增量端口运行 `ufw allow <port>/udp`，端口归还时运行 `ufw delete allow <port>/udp`。

**要求：**
- 必须安装 `ufw`，且 Empostor 进程必须有 `sudo` 权限来运行 `ufw` 命令
- 如果在 Docker 中运行，请确保容器具有 `NET_ADMIN` 能力

### Linux (firewalld)

```json
{
  "ServerConfig": {
    "UseFirewalld": true
  }
}
```

类似于 ufw，但使用 `firewall-cmd --add-port=<port>/udp` 和 `--remove-port`。

### Windows / 无防火墙的 Docker

在 Windows 上或在没有网络管理员权限的 Docker 中运行时，将两者都设为 `false`：

```json
{
  "ServerConfig": {
    "UseUfw": false,
    "UseFirewalld": false
  }
}
```

在这种情况下，你必须手动确保端口范围已打开（或在测试时禁用主机防火墙）。Empostor 会记录警告但继续运行。

### 主游戏端口

主游戏端口单独配置：

```json
{
  "Server": {
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  }
}
```

这是认证后所有游戏流量使用的端口。只有此端口 + HTTP 服务器端口需要永久打开。

## IP 地理定位

当玩家连接时，Empostor 查询 [ip-api.com](http://ip-api.com) 将玩家的 IP 解析为人类可读的位置（国家、地区、城市）。这会显示在：

- 玩家加入时的服务器日志中
- 管理面板客户端详情模态框中

结果缓存 24 小时。私有/保留 IP（127.x、10.x、192.168.x、172.16-31.x）会被跳过且永不查询。

无需 API 密钥。免费层允许每分钟 45 次请求。
