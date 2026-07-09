# 服务器配置

## 配置项

### 必需的服务器配置

| 键 | 默认值 | 描述 |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **PublicIp** | `127.0.0.1` | 服务器的公网 IPv4 地址，提供给其他玩家连接。可以在[此网站](http://whatismyip.host/)上找到 IPv4 地址。除非只在本地网络私用，否则应改为公网 IP。也可以使用主机名代替 IPv4 地址，会自动解析。 |
| **PublicPort** | `22023` | 服务器的公网端口，提供给其他玩家连接。**（这是端口转发时在路由器上配置的外部端口）** 通常为 `22023`。 |
| **ListenIp** | `0.0.0.0` | 监听的网络接口。如果不确定填什么，使用 `0.0.0.0`。自 1.2.2 起也支持主机名，需解析为有效的 IPv4 地址。 |
| **ListenPort** | `22023` | 服务器的监听端口，通常为 `22023`。端口转发时注意：这是一个 UDP 端口。 |

### HttpServer

Empostor 包含一个 HTTP 服务器，供新版 Among Us 用于连接。详见 [HTTP 服务器页面](Http-server.md)。

| 键 | 默认值 | 描述 |
|----------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enabled** | `true` | 是否启用 HTTP 服务器。 |
| **ListenIp** | `0.0.0.0` | 监听的网络接口。使用反向代理或仅本地运行时用 `127.0.0.1`。直接暴露到公网时用 `0.0.0.0`。 |
| **ListenPort** | `22023` | 监听端口。注意端口转发时这是一个 TCP 端口。 |

### AntiCheat（反作弊）

Empostor 内置反作弊功能，可自动踢出作弊玩家。注意反作弊针对游戏原版调校，如果使用客户端修改版可能会触发。

| 键 | 默认值 | 说明 |
|-------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enabled** | `true` | 是否启用反作弊。 |
| **BanIpFromGame** | `true` | 启用反作弊且玩家被抓到作弊时，会被踢出服务器。如果设为 `true`，玩家将被封禁，无法重新加入该游戏。 |
| **AllowCheatingHosts** | `"Never"` | 配置是否允许房主作弊。"Never" 禁止，"Always" 允许。"IfRequested" 允许设置了 DisableServerAuthorityFlag 的房主作弊。 |
| **EnableGameFlowChecks** | `true` | 检查特定操作是否在合适的顺序或时机进行。包括游戏中更换装饰或过快杀人。 |
| **EnableInvalidObjectChecks** | `true` | 检查网络对象是否正确生成。禁用此项也会禁用 EnableRoleChecks。 |
| **EnableMustBeHostChecks** | `true` | 检查玩家是否为房主，才能执行需要房主权限的操作，包括开始游戏和生成对象。 |
| **EnableColorLimitChecks** | `true` | 检查玩家是否请求已被占用的颜色。 |
| **EnableNameLimitChecks** | `true` | 检查玩家名称长度是否在界面允许的范围内。 |
| **EnableOwnershipChecks** | `true` | 检查玩家是否有权对自己或他人执行特定操作。 |
| **EnableRoleChecks** | `true` | 检查玩家在执行特定角色能力（如钻通风管或杀人）时是否拥有正确的角色。 |
| **EnableTargetChecks** | `true` | 检查本应只发给特定玩家的数据包是否被正确发送。包括投票和网络对象。 |
| **ForbidProtocolExtensions** | `true` | 禁用则允许玩家发送超出原版游戏的网络数据包。大多数需要全员安装的模组都需要此项。 |

### Compatibility（兼容性）

Empostor 提供一些兼容性选项以增加灵活性，但可能无法正常工作。不建议启用。寻求支持时请注明启用了哪些选项。

| 键 | 默认值 | 说明 |
|-----------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **AllowFutureGameVersions** | `false` | 警告：设为 `true` 不受支持，可能在 Among Us 大版本更新时出问题，但在小补丁发布时可能有用。允许未来版本的 Among Us 加入服务器。 |
| **AllowHostAuthority** | `false` | 某些 Among Us 模组允许禁用部分服务器权威功能，这也会改变客户端中的一些代码路径。这些路径测试较少且存在 bug，无法从 Empostor 端修复。谨慎使用。 |
| **AllowVersionMixing** | `false` | 允许使用未经 Empostor 开发者标记为兼容的不同游戏版本玩家在同一房间游戏。 |

### Debug（调试）

调试配置用于启用游戏录制器，主要用于开发 Empostor。

| 键 | 默认值 | 说明 |
| ----------------------- | ------- | -------------------------------------------- |
| **GameRecorderEnabled** | `false` | 启用游戏录制器。 |
| **GameRecorderPath** | _空_ | 录制的游戏保存路径。 |

### Admin（管理员）

`Admin` 配置用于设置管理员密码和插件市场 URL。

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| Password | *(空 — 必须设置)* | 服务器的管理员密码，用于认证。请设置一个强密码。如果留空或使用已知默认值，服务器启动时会记录警告。 |
| MarketplaceUrl | `https://raw.githubusercontent.com/Empostor/Empostor/main/marketplace/plugins.json` | 指向 `plugins.json` 文件的 URL。该文件定义了插件市场中可用的插件列表。 |

### DiscordWebhook

通过 Webhook 将游戏事件发送到 Discord 频道。事件分为两个类别：对局（游戏生命周期）和管理（审核）。详见 [Discord 通知](Discord-webhook.md)。

> **支持热修改**：通过管理面板更改的设置会保存到 `Data/DiscordWebhookData.json`。以下 `config.json` 值仅在首次启动时作为初始默认值。

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **MatchmakerUrl** | `""` | 对局事件的 Discord Webhook URL（游戏创建、游戏开始、游戏结束、玩家加入）。留空禁用。 |
| **AdminUrl** | `""` | 管理事件的 Discord Webhook URL（玩家踢出、玩家举报）。留空禁用。 |

### HPLP（公共大厅列表）

为 Starlight 客户端发现提供公共游戏列表端点。详见 [HPLP](Hplp-server-list.md)。

> **支持热修改**：通过管理面板更改的设置会保存到 `Data/HplpData.json`。以下 `config.json` 值仅在首次启动时作为初始默认值。

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用 HPLP 端点（`GET /x-api/games`）。 |
| **RegionId** | `"default"` | 向 Starlight 客户端报告的区域标识符。 |
| **RegionName** | `"Empostor Server"` | 在 Starlight 中显示的人类可读区域名称。 |
| **PublicUrl** | `""` | Starlight 客户端的公开 URL。为空时自动生成。 |

### PlayerStats（玩家统计）

跟踪每名玩家的游戏统计数据，可在管理面板和 `/stat` 命令中查看。详见 [统计](Admin-panel.md#统计)。

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用玩家统计跟踪。 |
| **PersistToFile** | `true` | 是否将统计数据保存到磁盘上的 `player_stats.json`。 |

### ChatFilter（聊天过滤）

过滤游戏内聊天的屏蔽词和刷屏限速。详见 [聊天过滤](Admin-panel.md#聊天过滤)。

> **支持热修改**：通过管理面板更改的设置会保存到 `Data/ChatFilterData.json`。以下 `config.json` 值仅在首次启动时作为初始默认值。

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用聊天过滤。 |
| **BlockedWords** | `[]` | 要屏蔽的词语列表（不区分大小写，子串匹配）。 |
| **BlockMessage** | `true` | 是否真正拦截被过滤的消息。`false` 时消息放行仅记录警告。 |
| **SpamThreshold** | `5` | 检测时间窗口内允许的消息数量。 |
| **SpamWindowSeconds** | `10` | 检测刷屏的滑动时间窗口（秒）。 |

### Serilog（日志）

Empostor 的日志框架 Serilog 可在配置文件中配置。可以更改默认日志级别并添加额外的输出器。

| 键 | 默认值 | 说明 |
| ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MinimumLevel** | `Information` | 消息打印的最低日志级别。从最严重到最轻微：`Fatal`、`Error`、`Warning`、`Information`、`Debug`、`Verbose` |
| **Using** | `[]` | 要加载的额外 Serilog Sinks 程序集列表。 |
| **WriteTo** | `[]` | 额外的日志输出器。参见 Serilog 文档。 |

例如，要添加文件日志，添加以下片段到配置中：

```json
"Serilog": {
  "Using": ["Serilog.Sinks.File"],
  "WriteTo": [{
    "Name": "File",
    "Args": {
      "path": "logs/log.txt",
      "rollingInterval": "Day"
    }
  }]
}
```

还需要从 [NuGet](https://www.nuget.org/packages/Serilog.Sinks.File/) 复制 `Serilog.Sinks.File.dll`。

更多信息参见 [Serilog.Settings.Configuration](https://github.com/serilog/serilog-settings-configuration) 文档。

## 配置提供者

### 文件

`config.json` 文件包含所有可配置选项。

### 环境变量

如果无法编辑 `config.json`，可以通过环境变量配置 Empostor。变量格式为 `EMPOSTOR_配置段__变量名`。例如，禁用反作弊：`EMPOSTOR_AntiCheat__Enabled=false`。更多示例：

```
EMPOSTOR_Server__PublicIp=127.0.0.1
EMPOSTOR_Server__PublicPort=22023
EMPOSTOR_Server__ListenIp=0.0.0.0
EMPOSTOR_Server__ListenPort=22023
EMPOSTOR_AntiCheat__Enabled=true
EMPOSTOR_AntiCheat__BanIpFromGame=true
```

## systemd

Linux 用户建议创建 systemd 服务定义来管理 Empostor。好处包括：

- 进程崩溃后自动重启
- 可设置开机自启
- 可用 systemd targets 确保依赖就绪后再启动

使用文本编辑器创建服务文件：

```
sudoedit /etc/systemd/system/empostor.service
```

根据模板修改：

```
[Unit]
Description=Empostor Among Us 私服 - https://github.com/Empostor/Empostor

[Service]
WorkingDirectory=/opt/Empostor
ExecStart=/opt/Empostor/EMPOSTOR.Server
Restart=always
RestartSec=10
KillSignal=SIGTERM
SyslogIdentifier=empostor
User=empostor
Group=empostor
TimeoutStopSec=10

[Install]
After=multi-user.target
WantedBy=multi-user.target
```

重载所有 systemd 单元文件：

```
sudo systemctl daemon-reload
```

启动服务：

```
sudo systemctl start empostor.service
```

查看日志：

```
sudo journalctl -u empostor.service
```

设置开机自启：

```
sudo systemctl enable empostor.service
```
