# 快速开始

安装 Empostor、接入 Among Us 客户端，并让它具备对外服务能力。

首次使用时建议按顺序阅读——每一节都默认上一步已经完成。

## 1. 安装部署

- **[安装部署](installation.md)** —— 通过发行版或 Docker 安装 Empostor，涵盖首次启动与 systemd 服务配置。
- **[从源码构建](build-from-source.md)** —— 不使用发行版，自行编译以便定制修改或参与开发。

## 2. 接入客户端

- **[接入客户端](client-setup.md)** —— 在 Windows、Android 与 iOS 上把 Among Us 指向你的服务器，可使用 Empostor 工具或手动配置。

::: tip 区域列表里没有我的服务器
通常只有两种原因：`regionInfo.json` 放错了目录，或 `config.json` 里没有填写 `PublicIp`。详见[接入客户端](client-setup.md#区域未出现的排查)。
:::

## 3. 配置服务器

- **[服务器配置](configuration.md)** —— `config.json` 完整参考：Server、HttpServer、AntiCheat、Compatibility、Debug、Admin、DiscordWebhook、PlayerStats、ChatFilter 与 Serilog 日志，另附环境变量覆盖说明。

## 4. 对外服务

确认本地能连上之后，再让它安全地暴露到公网：

- **[防火墙与端口](firewall-and-ports.md)** —— 放行 Empostor 的动态端口范围。
- **[HTTPS 与反向代理](reverse-proxy.md)** —— 通过 Caddy、nginx 或其他反向代理提供 HTTPS。

## 需要帮助？

- **[常见问题](../operations/faq.md)** —— 高频疑问解答。
- **[故障排除](../operations/troubleshooting.md)** —— 常见故障与处理方法。

## 接下来做什么？

服务器已经跑起来了，接下来请挑选要开启的能力：

- **[插件](../plugins/)** —— 17 个可选插件，覆盖聊天、审核、地图与外部集成。
- **[服务端功能](../server/)** —— 管理面板、统计分析与插件市场。
