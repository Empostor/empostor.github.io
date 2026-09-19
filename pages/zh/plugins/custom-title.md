# 自定义称号

**插件 ID：** `cn.Empostor.titles`
**配置文件：** `[Title System]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`[Title System]Config.json`](#配置) |
| 指令 | 无 —— 称号通过配置、面板或 API 授予 |
| 管理面板 | [称号系统标签页](#管理面板) |
| HTTP API | [`POST /api/title/add`](#api) |

按好友代码为玩家的显示名称添加称号前缀：`[Empostor] <名称>`。

::: warning 称号为一次性生效
称号应用后，其映射会同时从运行时存储和配置文件中移除。若要再次授予，需要重新添加映射。
:::

## 配置

编辑插件 DLL 旁的 `[Title System]Config.json`。

```json
{
  "titles": [
    {
      "friendCode": "aideproof#8388",
      "title": "Empostor"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `friendCode` | string | 玩家好友代码，匹配时不区分大小写。 |
| `title` | string | 显示在玩家昵称前的文字。 |

**在连接时应用** —— 插件在玩家连接时查找好友代码，缓存称号，并在玩家在大厅出生时应用。之后该映射即被消耗。

## 管理面板

**称号系统**标签页：以表格展示当前映射，并提供 JSON 编辑器直接增删修改。

## API

```
POST /api/title/add
Content-Type: application/json

{
  "friendCode": "player#1234",
  "title": "Empostor",
  "addedBy": "admin"
}
```

::: danger 无鉴权
该端点**不做任何鉴权**。任何能访问服务器端口的人都可以授予任意称号，请勿对外网开放。
:::

## 相关文档

- [欢迎消息](welcome-messages.md) —— 同样作用于玩家进入时的展示内容。
- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
