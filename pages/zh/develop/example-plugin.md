# 示例插件

学习插件 API 最快的方式是读一个完整的插件。`Empostor.Plugins.Example` 随源码一同发布，刻意保持了极简结构。

::: tip 先读这里
[编写插件](writing-a-plugin.md)介绍环境搭建，本文档说明最终成品的形态。
:::

## 它演示了什么

| 概念 | 所在位置 |
| :--- | :--- |
| 声明一个插件 | `ExamplePlugin.cs` |
| 注册事件监听器 | `ExamplePluginStartup.cs` |
| 以编程方式创建房间 | `ExamplePlugin.cs` 的 `EnableAsync` |
| 处理客户端 / 玩家 / 会议 / 游戏事件 | `Handlers/` |

## 插件类

插件是继承 `PluginBase` 并标注 `EmpostorPlugin` 特性的类：

```csharp
[EmpostorPlugin("gg.empostor.example")]
public class ExamplePlugin : PluginBase
{
    private readonly ILogger<ExamplePlugin> _logger;
    private readonly IGameManager _gameManager;

    public ExamplePlugin(ILogger<ExamplePlugin> logger, IGameManager gameManager)
    {
        _logger = logger;
        _gameManager = gameManager;
    }

    public override async ValueTask EnableAsync()
    {
        _logger.LogInformation("Example is being enabled.");

        var game = await _gameManager.CreateAsync(
            new NormalGameOptions(), GameFilterOptions.CreateDefault());

        if (game == null)
        {
            _logger.LogWarning("Example game creation was cancelled");
        }
        else
        {
            game.DisplayName = "Example game";
            await game.SetPrivacyAsync(true);
            _logger.LogInformation("Created game {0}.", game.Code.Code);
        }
    }

    public override ValueTask DisableAsync()
    {
        _logger.LogInformation("Example is being disabled.");
        return default;
    }
}
```

关键只有两个钩子：服务器加载插件时执行 `EnableAsync`，卸载时执行 `DisableAsync`，其余依赖均通过依赖注入获取。

::: warning 把工作放进 EnableAsync
耗时的初始化请放在 `EnableAsync`，不要写在构造函数里。构造函数在服务注册阶段执行，此时依赖可能尚未就绪。
:::

## 注册事件监听器

监听器单独成文件，通过 `IPluginStartup` 统一注册：

```csharp
public class ExamplePluginStartup : IPluginStartup
{
    public void ConfigureHost(IHostBuilder host) { }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IEventListener, GameEventListener>();
        services.AddSingleton<IEventListener, ClientEventListener>();
        services.AddSingleton<IEventListener, PlayerEventListener>();
        services.AddSingleton<IEventListener, MeetingEventListener>();
    }
}
```

每个监听器都以单例形式注册为 `IEventListener`，服务端会自动发现，无需额外清单列出它们。

示例按事件类别注册了四组：

| 监听器 | 覆盖范围 |
| :--- | :--- |
| `GameEventListener` | 房间创建、开始、结束 |
| `ClientEventListener` | 客户端连接与断开 |
| `PlayerEventListener` | 玩家加入、离开、聊天 |
| `MeetingEventListener` | 会议开始与结束、投票 |

## 编译

```bash
dotnet build -c Release
```

把生成的 `.dll` 放入服务端的 `plugins/` 目录后重启服务器。

## 下一步

把 `Empostor.Plugins.Example` 复制到自己的解决方案中并改名 —— 这就是官方推荐的起点。之后可以翻阅[插件列表](../plugins/)，了解官方插件如何处理配置文件与数据持久化。
