# Develop Plugins

Empostor plugins are .NET class libraries that hook into server events. This section covers everything needed to write, build and publish one.

## Start Here

**[Writing a Plugin](writing-a-plugin.md)** is the complete step-by-step guide:

1. Install the .NET SDK
2. Create a C# class library project
3. Add the `Empostor.Api` NuGet package
4. Write your plugin class (extend `PluginBase`)
5. Add event listeners (`IEventListener` with `[EventListener]` attributes)
6. Register listeners in an `IPluginStartup`
7. Build, copy to `plugins/`, and restart

**[Example Plugin](example-plugin.md)** is the counterpart to that guide — a minimal reference implementation that ships with the source. Read both together.

## Topics

| Topic | Docs |
| :--- | :--- |
| Dependency injection and host config | [Writing a Plugin](writing-a-plugin.md) |
| Event listener reference | [Writing a Plugin](writing-a-plugin.md) · [Example Plugin](example-plugin.md) |
| Internationalization (i18n) | [Writing a Plugin](writing-a-plugin.md#internationalization-i18n) |
| Text file based messages | [HelloWorld.txt](../config-files/index.md#messages-helloworld-txt) |
| Serving custom web pages | [Hello Page](../server/hello-page.md) |

::: tip New to the codebase?
Copy `Empostor.Plugins.Example` and rename it. Every official plugin in [Plugins](../plugins/) follows the same structure, so they double as reference material.
:::

## Distribution

Once built, a plugin is a single `.dll`. Ship it one of two ways:

- Drop it into the server's `plugins/` folder and restart.
- Publish it to a [Plugin Marketplace](../server/plugin-marketplace.md) catalogue so operators can install it from the admin panel with one click.

## Next Step

Browse the [Plugin Catalogue](../plugins/) for working examples of configuration, persistence and localisation.
