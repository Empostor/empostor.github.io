# 称号系统插件

::: tip 插件功能
此功能由 **Empostor.Plugins.Titles** 插件（`cn.Empostor.titles`）提供。需要安装并启用该插件才能使用。
:::

## 概述

称号系统插件通过好友代码为特定玩家分配显示称号前缀（例如 `[Empostor]`）。当拥有映射好友代码的玩家加入时，他们的游戏内名称会被更改为 `[称号] 名称`。

称号是**一次性使用**的：应用后，映射会从运行时存储和配置文件中移除。

## 如何添加称号

称号可以通过三种方式添加：

### 1. 配置文件

编辑 `[Title System]Config.json`：

```json
{
  "titles": [
    {
      "friendCode": "player#1234",
      "title": "Empostor"
    },
    {
      "friendCode": "helper#5678",
      "title": "Helper"
    }
  ]
}
```

### 2. 管理面板

使用管理面板称号系统标签页中的 JSON 编辑器添加或编辑称号映射。

### 3. HTTP API

```
POST /api/title/add
Content-Type: application/json

{
  "friendCode": "player#1234",
  "title": "Empostor",
  "addedBy": "admin"
}
```

此端点无需认证。

## 工作原理

1. 玩家连接时，插件在其好友代码中查找称号映射。
2. 如果找到，称号会在玩家生成时应用。
3. 当玩家在大厅中生成时，显示名称更改为 `[称号] 名称`。
4. 映射从配置和存储中移除（一次性使用）。

## 配置

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
|---|---|---|
| `friendCode` | string | 玩家的好友代码 |
| `title` | string | 显示在名称前的称号 |

## 管理面板

管理面板提供：
- 当前称号映射的表格视图
- 编辑称号配置的 JSON 编辑器

## 多语言支持

插件支持：
- 英语（`en`）
- 简体中文（`zh_CN`）
- 繁体中文（`zh_TW`）
