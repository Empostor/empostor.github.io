# Connect a Client

A running server does nothing until a game client can find it. This page walks through pointing an Among Us client at your server.

::: tip Prerequisites
Finish [Installation](installation.md) first, and make sure the `PublicIp` field in `config.json` is your real public address — not `127.0.0.1`. See [Server Configuration](configuration.md).
:::

## The Short Way

1. Open the [Empostor Tool](https://empostor.github.io/empostor/).
2. Enter your server's IP or domain, its port, and a display name.
3. Press **Download server file**.

The tool generates a `regionInfo.json` pointing at your server. Installing files varies by platform:

- **Windows** — press <kbd>Win</kbd> + <kbd>R</kbd>, paste `"%userprofile%\AppData\LocalLow\Innersloth\Among Us"`, drop the downloaded `regionInfo.json` in and overwrite the existing one.
- **Android / iOS** — launch Among Us once and reach the main menu, then close it. In the tool, scroll to **Instructions** and tap the Android or Apple logo, then choose **Open in Among Us**.

Either way, your server should now appear in the region list.

## Windows (manual)

1. Press <kbd>Win</kbd> + <kbd>R</kbd> and enter (keep the quotation marks):
   ```cmd
   "%userprofile%\AppData\LocalLow\Innersloth\Among Us"
   ```
2. Put the downloaded `regionInfo.json` into that folder, overwriting the existing file.
3. Launch Among Us and pick your region from the list.

## Android / iOS (manual)

1. Launch Among Us. Stop once you reach the main menu, then close the app completely.
2. Generate the region file with the **Empostor Tool**, then scroll to **Instructions** and press the Android or Apple logo.
3. Choose **Open in Among Us** when prompted.
4. Your server appears in the region list.

::: warning iOS restrictions
Re-launching Among Us normally may reset the region file on iOS. If your region disappears, repeat the steps above.
:::

## If Your Region Does Not Appear

| Symptom | Likely cause |
| :--- | :--- |
| Region missing from the list entirely | `regionInfo.json` was not written to the right folder, or was overwritten by a game update. |
| Listed but connection times out | Wrong `PublicIp`, or the port is not reachable. Check [Firewall & Ports](firewall-and-ports.md). |
| Connects then instantly disconnects | Server version mismatch — update both sides. See [Troubleshooting](../operations/troubleshooting.md). |

## Next Steps

- [Server Configuration](configuration.md) — tune the rest of `config.json`.
- [HTTPS & Reverse Proxy](reverse-proxy.md) — put the server behind a domain with TLS.
- [Firewall & Ports](firewall-and-ports.md) — understand Empostor's dynamic port range.
