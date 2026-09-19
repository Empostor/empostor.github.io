# Example Plugin

The fastest way to learn the plugin API is to read a complete one. `Empostor.Plugins.Example` ships with the source and is deliberately minimal.

::: tip Read this first
[Writing a Plugin](writing-a-plugin.md) explains the environment setup. This page explains what the finished result looks like.
:::

## What It Demonstrates

| Concept | Where |
| :--- | :--- |
| Declaring a plugin | `ExamplePlugin.cs` |
| Registering event handlers | `ExamplePluginStartup.cs` |
| Creating a game programmatically | `EnableAsync` in `ExamplePlugin.cs` |
| Handling client / player / meeting / game events | `Handlers/` |

## The Plugin Class

A plugin is a class deriving from `PluginBase` and annotated with `EmpostorPlugin`:

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

Two hooks matter: `EnableAsync` runs when the server loads your plugin, `DisableAsync` runs on unload. Everything else arrives through dependency injection.

::: warning Work in EnableAsync
Do expensive setup in `EnableAsync`, not the constructor. Construction happens during service registration, where dependencies may not be resolved yet.
:::

## Registering Event Handlers

Event handlers live separately and are wired up in an `IPluginStartup`:

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

Each handler is registered as a singleton `IEventListener`. The server discovers them automatically — you do not need a manifest listing handlers.

The example registers four groups, one per event category:

| Handler | Covers |
| :--- | :--- |
| `GameEventListener` | Game creation, start, end |
| `ClientEventListener` | Client connect / disconnect |
| `PlayerEventListener` | Player join, leave, chat |
| `MeetingEventListener` | Meeting start / end, voting |

## Building It

```bash
dotnet build -c Release
```

Drop the resulting `.dll` into the server's `plugins/` folder and restart.

## Where To Go Next

Copy `Empostor.Plugins.Example` into your own solution and rename it — that is the intended starting point. Then browse [Plugins](../plugins/) to see how the official ones handle configuration files and persistence.
