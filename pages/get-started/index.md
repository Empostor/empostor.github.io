# Get Started

Install Empostor, connect an Among Us client to it, and get it production-ready.

Follow the pages in order the first time — each one assumes the previous step is done.

## 1. Install

- **[Installation](installation.md)** — install Empostor via a release build or Docker. Covers first launch and systemd setup.
- **[Build from Source](build-from-source.md)** — instead of a release, compile it yourself for custom modifications or development.

## 2. Connect a Client

- **[Connect a Client](client-setup.md)** — point Among Us at your server on Windows, Android and iOS, either with the Empostor Tool or manually.

::: tip Nothing shows up in my region list
This is almost always either a `regionInfo.json` that landed in the wrong folder, or `PublicIp` not being set in `config.json`. See [Connect a Client](client-setup.md#if-your-region-does-not-appear).
:::

## 3. Configure

- **[Server Configuration](configuration.md)** — the complete `config.json` reference: `Server`, `HttpServer`, `AntiCheat`, `Compatibility`, `Debug`, `Admin`, `DiscordWebhook`, `PlayerStats`, `ChatFilter` and Serilog logging, plus environment variable overrides.

## 4. Go Public

Once players can connect locally, make it safe to expose to the internet:

- **[Firewall & Ports](firewall-and-ports.md)** — open Empostor's dynamic port range.
- **[HTTPS & Reverse Proxy](reverse-proxy.md)** — serve HTTPS behind Caddy, nginx or another reverse proxy.

## Need Help?

- **[FAQ](../operations/faq.md)** — answers to frequently asked questions.
- **[Troubleshooting](../operations/troubleshooting.md)** — common issues and how to resolve them.

## What's Next?

Your server is running. Now decide what to turn on:

- **[Plugins](../plugins/)** — 17 optional plugins for chat, moderation, maps and integrations.
- **[Server Features](../server/)** — the admin panel, statistics and the plugin marketplace.
