# 故障排除

如果你在阅读本文，说明出了些问题。别担心，这是最全面的帮助指南！

## `./Empostor.Server: line 1: ELF: not found`（以及其他错误）

不知道你从哪里搞来的系统，但我们明确**不**支持。

## `cannot execute binary file: Exec format error`

请检查是否下载了正确版本的 Empostor。我们维护两种 CPU 架构（x64 和 ARM）。除非在树莓派等设备上运行，否则通常需要 x64 版本。

## `./Empostor.Server: Permission denied`

这是 Linux 文件权限相关错误。某些文件在下载过程中丢失了可执行位。可以通过 `chmod +x Empostor.Server` 解决。

## 断开连接并提示 `Your client is too new, please update your Empostor to play`

你的游戏版本太新，当前 Empostor 不支持。

如果使用 Empostor 正式版，检查是否有支持你游戏版本的新版本。如果没有，可以尝试[最新的 CI 构建](https://nightly.link/Empostor/Empostor/workflows/ci/main)。

如果最新构建也不行，可以查看 Pull Requests 是否有待合并的版本更新 PR，但注意这些可能不稳定或包含恶意代码。

## 断开连接并提示 `Please update your game to play on this server`

你使用的 Empostor 版本太新，与你的游戏版本不匹配。可以从 [GitHub 发布页面](https://github.com/Empostor/Empostor/releases) 下载旧版本。但我们不对旧版本提供新 API 和 bug 修复支持，建议更新游戏。

## 断开连接并提示 `You are using an older version of the game`

你使用的 Empostor 版本不是为你当前的游戏版本设计的。游戏不会真正检查谁过期了，会把问题归咎于用户。较新版本（v1.5.0+）会正确警告并发送正确的消息。

查看主菜单左上角的游戏版本，然后下载对应该版本的 Empostor。每个[发布版本](https://github.com/Empostor/Empostor/releases)都标明兼容的游戏版本。如果游戏版本比最新发布版还新，试试[最新 CI 构建](https://nightly.link/Empostor/Empostor/workflows/ci/main)。

## 断开连接并提示 `You disconnected from the server. Reliable Packet 1 ...`

请仔细检查是否正确遵循了[服务器配置](../get-started/configuration.md)。
**注意：你的公网 IP 不以 `10`、`127` 或 `192` 开头。**
同时检查 Empostor (ListenPort) 监听的端口是否已正确为 UDP（或 TCP/UDP）做端口转发。

## `Could not load file or assembly...`

请确保 `plugins` 文件夹中只有**可正常工作的**插件。非插件文件或有问题的插件可能导致此错误。

## 断开连接并提示 `You disconnected from the server. If this happens often, check your network strength. This may also be a server issue`

通常意味着 Among Us 无法连接到 Empostor 的 HTTP 服务器。

在浏览器中打开服务器地址，应该会显示确认 Empostor 可用的小页面。

## 我的问题没有被解答，仍然遇到困难！

很遗憾。加入 [Empostor Discord](https://dsc.gg/empostor) 提问，我们会尽力帮助。注意我们不一定随时在线，回复可能需要时间。请附上以下信息以便更快解答：

- 你使用的 Empostor 版本
- 你使用的 Among Us 版本
- 运行 Empostor 的操作系统
- 如果有控制台日志，附上也会很有帮助
