# 接入客户端

服务器跑起来只是第一步，还需要把 Among Us 客户端指向它。

::: tip 前置条件
请先完成[安装部署](installation.md)，并确认 `config.json` 中的 `PublicIp` 已填真实公网地址而非 `127.0.0.1`，详见[服务器配置](configuration.md)。
:::

## 快捷方式

1. 打开 [Empostor 工具](https://empostor.github.io/empostor/)。
2. 输入服务器的 IP 或域名、端口与显示名称。
3. 点击「Download server file」。

工具会生成指向你服务器的 `regionInfo.json`。不同平台的安装步骤：

- **Windows** —— 按 <kbd>Win</kbd> + <kbd>R</kbd>，粘贴 `"%userprofile%\AppData\LocalLow\Innersloth\Among Us"`，把下载的 `regionInfo.json` 放入并覆盖。
- **Android / iOS** —— 先启动 Among Us 进入主菜单后关闭，再在工具页滚动到 **Instructions**，点击 Android 或 Apple 图标，选择「Open in Among Us」。

完成后服务器即会出现在区域列表中。

## Windows（手动）

1. 按 <kbd>Win</kbd> + <kbd>R</kbd>，输入（保留引号）：
   ```cmd
   "%userprofile%\AppData\LocalLow\Innersloth\Among Us"
   ```
2. 将下载的 `regionInfo.json` 放入该目录，覆盖已有文件。
3. 启动 Among Us，在区域列表中选择你的服务器。

## Android / iOS（手动）

1. 启动 Among Us，进入主菜单后彻底关闭应用。
2. 用 **Empostor 工具**生成区域文件，滚动到 **Instructions**，点击 Android 或 Apple 图标。
3. 出现提示时选择「Open in Among Us」。
4. 服务器即会出现在区域列表中。

::: warning iOS 限制
在 iOS 上正常重启 Among Us 可能会重置区域文件。若区域消失，重新执行上述步骤即可。
:::

## 区域未出现的排查

| 现象 | 可能原因 |
| :--- | :--- |
| 列表中没有该区域 | `regionInfo.json` 未放入正确目录，或被游戏更新覆盖。 |
| 有该区域但连接超时 | `PublicIp` 填错或端口不通，请检查[防火墙与端口](firewall-and-ports.md)。 |
| 连上后立即断开 | 服务端与客户端版本不匹配，请同时升级。详见[故障排除](../operations/troubleshooting.md)。 |

## 下一步

- [服务器配置](configuration.md) —— 调整 `config.json` 的其余配置。
- [HTTPS 与反向代理](reverse-proxy.md) —— 为服务器配置域名与 TLS。
- [防火墙与端口](firewall-and-ports.md) —— 了解 Empostor 的动态端口范围。
