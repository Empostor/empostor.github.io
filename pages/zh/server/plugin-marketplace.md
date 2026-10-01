# 插件市场

从 `Admin.MarketplaceUrl` 配置的 URL（GitHub 原始 JSON 文件）获取插件列表。每个插件显示最新版本、支持的 Empostor 版本和描述。

市场同时提供**主题**分类（页面顶部的 **Themes** 按钮），清单格式见文末的[主题市场](#主题市场)。

点击**安装**将 `.dll` 下载到 `plugins/` 文件夹。安装插件后必须重启服务器才能加载。

如果插件是为不同 Empostor 版本构建的，会显示警告但不阻止安装。

### plugins.json 格式

市场读取 `plugins.json` 文件（本地或远程 URL）：

```jsonc
[
  {
    // 唯一插件标识符（推荐反向域名风格）
    "id": "cn.hayashiume.welcome",

    // 市场中显示的插件名称
    "name": "欢迎消息",

    // 简短描述（作为副标题显示）
    "description": "玩家加入房间时发送本地化的欢迎消息。",

    // 作者署名
    "author": "BunchHanpiDev & HayashiUme",

    // 版本历史 — 最新版本放在数组最后
    "versions": [
      {
        // 此插件版本的语义版本号
        "version": "1.0.0",

        // 所需的最低 Empostor 版本
        "empostor_version": "2.0.0",

        // .dll 文件的直接下载 URL
        "download_url": "https://raw.githubusercontent.com/Empostor/Empostor/master/marketplace/Empostor.Plugins.Welcome.dll"
      }
    ]
  }
]
```

**版本规则：**
- `versions` 中的**最后一项**被视为最新版本，在界面中默认选中。
- **单版本**插件：一个条目有效，版本下拉菜单隐藏。
- **多版本**插件：两个或更多条目时显示 `<select>` 下拉菜单供操作员选择。
- `download_url` 必须直接指向编译好的 `.dll` 文件。
- 管理面板读取 `GET /api/admin/marketplace/plugins` — 列表更改无需重启，但安装插件后需要重启。

## 主题市场

**Themes** 分类列出管理面板能提供的全部主题：服务器上已经可用的（内置 `default`、插件编译进来的、`Pages/themes/` 下的）会标注 **Active** / **Installed** 并直接给出 **Apply**；只出现在清单里、尚未安装的标注 **Not installed** 并给出 **Install**。每张卡片用五个色块预览该主题的背景、面板、强调色、成功色和正文色。

清单来自 `Admin.ThemeMarketplaceUrl` 指向的 `themes.json`；该地址不可达时会静默跳过远程条目，只显示本地主题。

### themes.json 格式

```jsonc
[
  {
    // 唯一主题标识符，同时是 Pages/themes/ 下的文件夹名（小写字母、数字、连字符）
    "id": "nord",

    // 市场中显示的名称
    "name": "Nord",

    // 简短描述
    "description": "冷色调北欧蓝，低对比、耐看。",

    // 作者署名
    "author": "Empostor",

    // theme.json 的直接下载 URL，必须是 HTTPS
    "downloadUrl": "https://raw.githubusercontent.com/Empostor/Empostor/main/marketplace/themes/nord.json"
  }
]
```

**规则：**
- 下载下来的内容必须是 `theme.json` 对象，且其中的 `Id` 与请求安装的 `id` 一致，否则拒绝写入。
- 安装会把文件写到 `Pages/themes/{id}/theme.json`。主题注册表随后立即重新扫描，所以**安装后无需重启**就能在顶部下拉或主题市场里切换。
- 已安装的主题只提供 **Apply**，不会重复下载；`id` 会被校验为小写字母、数字和连字符，避免写到目录之外。
- `theme.json` 的字段（`Tokens` / `DarkTokens` / `CustomCss` / `Extends` / `Layout`）见 [管理面板](admin-panel.md#市场)。
- 随 Empostor 一起发布的主题位于 `Pages/themes/`，共 9 套可选（Anthropic、Catppuccin、Dracula、Gruvbox、Midnight OLED、Nord、Rosé Pine、Solarized、Tokyo Night）。
