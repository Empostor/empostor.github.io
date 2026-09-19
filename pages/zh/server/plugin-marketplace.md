# 插件市场

从 `Admin.MarketplaceUrl` 配置的 URL（GitHub 原始 JSON 文件）获取插件列表。每个插件显示最新版本、支持的 Empostor 版本和描述。

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
