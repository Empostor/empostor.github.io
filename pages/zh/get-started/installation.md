# 运行服务器

目前 Empostor 有两种安装方法：正常安装或在 Docker 容器中安装。如果没有特别偏好，推荐使用正常安装方式。

## 两种安装方式的通用说明

本节适用于正常安装和 Docker (Compose) 安装。

要连接服务器，需要配置并安装区域文件，访问 https://empostor.github.io/

Among Us 使用两种网络服务连接服务器：(TCP) HTTP 服务将 Among Us 指向 UDP 服务，UDP 服务承载实际游戏流量。因此，Empostor 使用端口 **22023**，同时占用 **TCP 和 UDP** 协议。

要从另一台电脑连接到你的 Among Us 版本，需要设置 HTTP 反向代理以支持 HTTPS。如果只是运行测试用的 Empostor，请参阅 [HTTP 服务器文档](reverse-proxy.md)。

如果要测试 HTTP 服务器是否正常工作，在浏览器中打开 `http://localhost:22023`（使用默认设置，根据需要更改 IP 和端口）。

根据主机情况可能还需要端口转发或将 Empostor 流量通过防火墙。端口 22023 UDP 需要对所有想加入游戏的玩家开放，还需要转发 HTTP 反向代理或端口 22023 TCP（如果不使用反向代理）。端口转发因主机和路由器配置而异，本文不做介绍。

## 正常安装

1. 安装 [.NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)。推荐使用 ASP.NET Core Runtime 或 SDK。如果需要开发 Empostor 或插件，则必须安装 SDK。
2. 下载[最新版本](https://github.com/Empostor/Empostor/releases)或[最新 CI 构建](https://nightly.link/Empostor/Empostor/workflows/ci/main)。注意 Empostor 为多种 CPU 架构和操作系统构建，通常需要 x64 版本，除非在树莓派或其他 ARM 处理器的设备上运行。
3. 解压 zip 文件。
4. 根据需求修改 `config.json`。文档参见[服务器配置](configuration.md)。至少需要将 `PublicIp` 改为玩家连接服务器所使用的地址。
5. 运行 `Empostor.Server`（Linux/macOS）或 `Empostor.Server.exe`（Windows）
6. 设置反向代理以支持 HTTPS，使其他设备可以连接。参见[反向代理配置](reverse-proxy.md)
7. （可选 - Linux）配置 systemd 服务定义文件并使服务开机启动，参见 [systemd 配置](configuration.md#systemd)

## 使用 Dockerfile 和 compose.yml

将发行版中的 `Docker.Postfix.zip` 文件放入提供的预构建文件中，然后运行：

```bash
# 进入文件路径
cd /你的目录/empostor/
# 构建并运行
docker-compose up -d --build
```

之后 Docker 会成功运行。
