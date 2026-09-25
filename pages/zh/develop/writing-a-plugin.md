# 编写插件

Empostor 支持插件。本文档将帮助你搭建插件开发环境。

- [1. 安装 .NET SDK](#1-安装-net-sdk)
- [2. 创建 C# 项目](#2-创建-c-项目)
- [3. 添加 Empostor.Api 库](#3-添加-empostorapi-库)
  - [快速安装](#快速安装)
  - [Visual Studio](#visual-studio)
- [4. 插件类](#4-插件类)
- [5. 添加事件监听器](#5-添加事件监听器)
- [6. 注册事件监听器](#6-注册事件监听器)
- [7. 构建和运行插件](#7-构建和运行插件)
- [8. 额外内容](#8-额外内容)
  - [事件监听器](#事件监听器)
  - [依赖注入](#依赖注入)
  - [服务器配置](#服务器配置)
  - [使用其他库](#使用其他库)
  - [Empostor 版本](#empostor-版本)
- [9. 缺少/无效数据或需要更多功能？](#9-缺少无效数据或需要更多功能)

## 1. 安装 .NET SDK

下载并安装最新的 .NET SDK。

https://dotnet.microsoft.com/download

## 2. 创建 C# 项目

第一步是创建一个新的 C# 项目，必须是**类库（.NET Standard）**。目标框架可以是任何与 .NET 8 兼容的版本，但我们建议使用 **.NET 8.0**。

关于兼容性的更多信息，参见 https://docs.microsoft.com/zh-cn/dotnet/standard/net-standard。

创建项目后，你应该有 `Class.cs` 和 `Project.csproj` 文件。你的 `Project.csproj` 应该类似这样：

```xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <TargetFramework>net8.0</TargetFramework>
    </PropertyGroup>
</Project>
```

## 3. 添加 Empostor.Api 库

只需按以下方法之一操作即可。

### 快速安装

安装 [`Empostor.Api`](https://www.nuget.org/packages/Empostor.Api) NuGet 包。

```bash
dotnet add package Empostor.Api --prerelease
```

当前版本均为预发布版（`2.0.0-ci.*`），跟随服务器的 nightly 构建——在正式版 `2.0.0` 发布之前，请保留 `--prerelease` 参数。

### Visual Studio

1. 右键点击你的项目。
2. 点击"管理 NuGet 包"。
3. 点击"浏览"。
4. 搜索 `Empostor.Api`。
5. 点击 `Empostor.Api` 结果，在右侧按安装。

### Dotnet CLI

1. 在命令提示符/bash 中打开项目文件夹。
2. 运行 `dotnet add package Empostor.Api --prerelease`。

## 4. 插件类

安装 `Empostor.Api` 后，需要为插件创建一个类。一个插件**必须**包含且仅包含一个插件类。参考以下示例代码：

```csharp
using System.Threading.Tasks;
using Empostor.Api.Events.Managers;
using Empostor.Api.Plugins;
using Microsoft.Extensions.Logging;

namespace Empostor.Plugins.Example
{
    /// <summary>
    ///     插件的元数据信息，此为必填项。
    /// </summary>
    [EmpostorPlugin(
        package: "gg.empostor.example",
        name: "Example",
        author: "AeonLucid",
        version: "1.0.0")]
    public class ExamplePlugin : PluginBase // 这也是必填的 ": PluginBase"
    {
        /// <summary>
        ///     与服务器无缝协作的日志记录器。
        /// </summary>
        private readonly ILogger<ExamplePlugin> _logger;

        /// <summary>
        ///     插件的构造函数。你可以在此处添加一些参数，
        ///     它们将由服务器自动注入，此处使用了两个示例。
        ///
        ///     这些参数不是必需的，但强烈推荐使用。
        /// </summary>
        /// <param name="logger">
        ///     用于在控制台写入消息的日志记录器。
        /// </param>
        /// <param name="eventManager">
        ///     用于注册事件监听器的事件管理器。
        ///     如果你希望插件与游戏交互，这会很有用。
        /// </param>
        public ExamplePlugin(ILogger<ExamplePlugin> logger, IEventManager eventManager)
        {
            _logger = logger;
        }

        /// <summary>
        ///     当插件被服务器启用时调用。
        /// </summary>
        /// <returns></returns>
        public override ValueTask EnableAsync()
        {
            _logger.LogInformation("Example is being enabled.");
            return default;
        }

        /// <summary>
        ///     当插件被服务器禁用时调用。
        ///     通常是因为服务器正在关闭，这是清理托管资源的地方。
        /// </summary>
        /// <returns></returns>
        public override ValueTask DisableAsync()
        {
            _logger.LogInformation("Example is being disabled.");
            return default;
        }
    }
}
```

## 5. 添加事件监听器

目前你应该有一个能加载但什么都不做的插件。要获得实际功能，需要添加事件监听器。

创建一个名为 `GameEventListener` 的新类。示例代码：

```csharp
using Empostor.Api.Events;
using Empostor.Api.Events.Player;
using Microsoft.Extensions.Logging;

namespace Empostor.Plugins.Example.Handlers
{
    /// <summary>
    ///     一个监听两个事件的类。
    ///     可以监听更多，但这只是一个示例。
    ///
    ///     确保你的类实现 <see cref="IEventListener"/>。
    /// </summary>
    public class GameEventListener : IEventListener
    {
        private readonly ILogger<ExamplePlugin> _logger;

        public GameEventListener(ILogger<ExamplePlugin> logger)
        {
            _logger = logger;
        }

        /// <summary>
        ///     示例事件监听器。
        /// </summary>
        /// <param name="e">
        ///     你要监听的事件。
        /// </param>
        [EventListener]
        public void OnGameStarted(IGameStartedEvent e)
        {
            _logger.LogInformation($"游戏正在开始。");

            // 打印所有玩家是内鬼还是船员。
            foreach (var player in e.Game.Players)
            {
                var info = player.Character.PlayerInfo;
                var isEmpostor = info.IsEmpostor;
                if (isEmpostor)
                {
                    _logger.LogInformation($"- {info.PlayerName} 是内鬼。");
                }
                else
                {
                    _logger.LogInformation($"- {info.PlayerName} 是船员。");
                }
            }
        }

        [EventListener]
        public void OnGameEnded(IGameEndedEvent e)
        {
            _logger.LogInformation($"游戏已结束。");
        }

        [EventListener]
        public void OnPlayerChat(IPlayerChatEvent e)
        {
            _logger.LogInformation($"{e.PlayerControl.PlayerInfo.PlayerName} 说 {e.Message}");
        }
    }
}
```

## 6. 注册事件监听器

让插件工作的最后一步是注册事件监听器，以便服务器知道它的存在。回到你的插件类，按如下方式修改：

```csharp
using System;
using System.Threading.Tasks;
using Empostor.Api.Events.Managers;
using Empostor.Api.Plugins;
using Empostor.Plugins.Example.Handlers;
using Microsoft.Extensions.Logging;

namespace Empostor.Plugins.Example
{
    [EmpostorPlugin(
        package: "gg.empostor.example",
        name: "Example",
        author: "AeonLucid",
        version: "1.0.0")]
    public class ExamplePlugin : PluginBase
    {
        private readonly ILogger<ExamplePlugin> _logger;
        // 添加下面这行！
        private readonly IEventManager _eventManager;
        // 添加下面这行！
        private IDisposable _unregister;

        public ExamplePlugin(ILogger<ExamplePlugin> logger, IEventManager eventManager)
        {
            _logger = logger;
            // 添加下面这行！
            _eventManager = eventManager;
        }

        public override ValueTask EnableAsync()
        {
            _logger.LogInformation("Example is being enabled.");
            // 添加下面这行！
            _unregister = _eventManager.RegisterListener(new GameEventListener(_logger));
            return default;
        }

        public override ValueTask DisableAsync()
        {
            _logger.LogInformation("Example is being disabled.");
            // 添加下面这行！
            _unregister.Dispose();
            return default;
        }
    }
}
```

## 7. 构建和运行插件

现在你的插件已准备好进行测试。

1. 右键点击你的项目，按"生成"。
2. 右键点击你的项目，按"在文件资源管理器中打开文件夹"。
3. 进入 `bin/Debug/net8.0/`。
4. 在此目录中，你应该能找到名为 `Project.dll` 的插件。
5. 将 `Project.dll` 复制到 Empstor 服务器目录中的 `plugins` 目录。
6. 启动/重启你的 Empstor 服务器。
7. 打开 Among Us，创建一个游戏并发送一条聊天消息。在控制台中你应该能看到插件加载和示例中的消息。

## 8. 额外内容

一些对插件开发者可能有用的额外信息。

### 事件监听器

- 同一事件可以有多个事件监听器。
- 事件监听器可以设置优先级 `[EventListener(EventPriority.Normal)]`，按顺序调用。
- 不建议在 `EventListener` 内部长时间阻塞，因为事件是从数据包处理器内部调用的。阻塞太久会导致客户端超时。对于耗时较长的操作，应该创建新的 `Task`。

### 依赖注入

- 主插件类由服务器的 `IServiceProvider` 构造，可以注入服务器使用的所有内容。一些例子：
  - `ILogger<T>`
  - `IEventManager`
  - `IClientManager`
  - `IOptions<ServerConfig>`
- 你可以通过创建新类并实现 `IPluginStartup`，将自己的类和 `EventListener` 实现添加到 `IServiceProvider` 中。确保将其注册为单例 `services.AddSingleton<IEventListener, GameEventListener>();`。

### 服务器配置

不断将插件 dll 复制到服务器目录可能相当烦人。幸运的是我们有解决方案。在 Empstor 服务器中打开 `config.json`，按以下示例添加 `PluginLoader`，将路径替换为插件的构建输出目录：

```json
{
  "Server": {
    "PublicIp": "127.0.0.1",
    "PublicPort": 22023,
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  },
  "PluginLoader": {
    "Paths": [
      "D:\\Projects\\Empostor\\src\\Empostor.Plugins.Example\\bin\\Debug\\net8.0"
    ],
    "LibraryPaths": []
  }
}
```

### 使用其他库

有时你需要使用原版 Empstor 服务器不提供的库。这些库的 dll 文件必须放在服务器可执行文件旁边的 `libraries` 文件夹中。你也可以通过修改 `config.json` 中的 `PluginLoader.LibraryPaths` 选项来提供它们，类似于 `PluginLoader.Paths` 选项。

### Empstor 版本

在使用 `Empostor.Api` 预发布版本和 `Empostor` 开发构建时，使用正确的版本非常重要，以减少程序集不匹配的可能性。

**示例**

预发布版 `Empostor.Api` 包 `2.0.0-ci.586` 对应服务器 nightly 构建 `86`。后缀中的 `N` 是 GitHub Actions 运行编号加 500——与 [nightly 发布](https://github.com/Empostor/Empostor/releases/tag/nightly) 使用同一套编号。请让包版本中的 `N` 与你运行的 nightly 构建对应。

### 国际化 (i18n)

Empostor 支持通过 `IPluginLanguageProvider` 接口将插件字符串翻译为多种语言。在插件类上实现它，为命令、通知和其他用户可见文本提供翻译。

```csharp
[EmpostorPlugin("com.example.myplugin")]
public sealed class MyPlugin : PluginBase, IPluginLanguageProvider
{
    public IReadOnlyDictionary<string, IReadOnlyDictionary<string, string>> GetTranslations()
    {
        return new Dictionary<string, IReadOnlyDictionary<string, string>>
        {
            ["en"] = new Dictionary<string, string>
            {
                ["myplugin.hello"] = "Hello, {0}!",
                ["myplugin.goodbye"] = "Goodbye!",
            },
            ["zh_CN"] = new Dictionary<string, string>
            {
                ["myplugin.hello"] = "你好，{0}！",
                ["myplugin.goodbye"] = "再见！",
            },
        };
    }
}
```

**支持的语言代码：**

| 代码 | 语言 |
|---|---|
| `en` | 英语 |
| `zh_CN` | 简体中文 |
| `zh_TW` | 繁体中文 |
| `ko` | 韩语 |
| `ru` | 俄语 |
| `de` | 德语 |
| `fr` | 法语 |
| `ja` | 日语 |
| `pt` | 葡萄牙语 |
| `pt_BR` | 巴西葡萄牙语 |
| `es` | 西班牙语 |
| `it` | 意大利语 |
| `nl` | 荷兰语 |
| `fil` | 菲律宾语 |
| `ga` | 爱尔兰语 |

**在命令中使用翻译：**

```csharp
public async ValueTask<bool> ExecuteAsync(CommandContext ctx)
{
    string msg = ctx.Lang.Get("myplugin.hello", ctx.SenderLanguage)
        .Replace("{0}", ctx.Sender.Client.Name);

    await ctx.PlayerControl.SendChatToPlayerAsync(msg, ctx.PlayerControl);
}
```

**LanguageString API：**

```csharp
var str = ctx.Lang.Get("key", lang);

str.Replace("{Name}", value)              // 替换单个占位符
str.ReplaceAll(("{0}", a), ("{1}", b))    // 替换多个占位符
str.Format(args)                          // string.Format 风格
str.Get()                                 // 获取原始字符串
```

**最佳实践：**
- 始终提供英语 (`en`) 作为回退 — 当玩家的语言未找到时使用。
- 使用命名空间化的翻译键：`插件名.键名`。
- 使用 `{0}`、`{1}` 作为位置占位符。
- 在插件类上注册 `IPluginLanguageProvider` — 翻译将在启动时自动加载。

关于基于文本文件的消息（如 Welcome 插件的 `HelloWorld.txt`），请参阅[可配置文件](../config-files/index.md#messages-helloworld-txt)。

## 9. 缺少/无效数据或需要更多功能？

`Empostor.Api` 目前处于测试阶段。还有很多功能尚未完善，我们希望能听到你在开发插件时需要的功能。

创建 Issue：

- [建议新功能](https://github.com/Empostor/Empostor/issues/new?template=3--api-suggestion.md)
- [数据无效](https://github.com/Empostor/Empostor/issues/new?template=4--api-invalid.md)
- [数据不可用](https://github.com/Empostor/Empostor/issues/new?template=5--api-missing.md)
- [其他](https://github.com/Empostor/Empostor/issues/new?template=6--api-other.md)
