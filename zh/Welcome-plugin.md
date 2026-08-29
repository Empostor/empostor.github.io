# 欢迎消息插件

::: tip 插件功能
此功能由 **Empostor.Plugins.Welcome** 插件（`cn.hayashiume.welcome`）提供。需要安装并启用该插件才能使用。
:::

## 概述

欢迎插件在玩家加入大厅时发送本地化的欢迎消息。消息从每种语言的模板文件读取，支持占位符动态内容和远程 URL 内容获取。

## 工作原理

1. 当玩家在大厅中生成时（游戏状态 `NotStarted`），插件读取与玩家客户端语言匹配的模板文件。
2. 模板中的占位符被替换为实际值。
3. 消息作为聊天消息发送给玩家。

## 模板文件

插件创建一个 `Message/` 目录，包含每种语言的模板文件：

```
Message/
├── EnglishHelloWord.txt
├── SChineseHelloWord.txt
├── TChineseHelloWord.txt
├── KoreanHelloWord.txt
├── RussianHelloWord.txt
├── GermanHelloWord.txt
├── FrenchHelloWord.txt
├── JapaneseHelloWord.txt
├── PortugueseHelloWord.txt
├── BrazilianPortugueseHelloWord.txt
├── SpanishHelloWord.txt
├── ItalianHelloWord.txt
├── DutchHelloWord.txt
├── FilipinoHelloWord.txt
├── IrishHelloWord.txt
└── LatamSpanishHelloWord.txt
```

如果存在特定语言的文件，其优先级高于英语回退。

## 占位符

| 占位符 | 说明 | 示例 |
|---|---|---|
| `{Name}` | 玩家显示名称 | `Alice` |
| `{FriendCode}` | 玩家好友代码 | `matchduck#1337` |
| `{GameCode}` | 房间代码 | `ABCDEF` |
| `{Room}` | 房间代码（别名） | `ABCDEF` |
| `{LastConnect}` | 上次断连时间（UTC） | `2026-05-24 15:30:00` |

`{LastConnect}` 对新玩家显示"首次光临，欢迎！"。

## 高级功能

### 远程内容（`<cave>` 标签）

从 URL 获取内容并插入消息：

```
<cave>https://example.com/message.txt</cave>
```

支持：
- 纯文本
- Hitokoto API JSON：`{"hitokoto": "...", "from": "..."}`
- 通用 JSON：`{"content": "..."}`

### 随机内容（`<random>` 标签）

从 JSON 数组中随机选择一个选项：

```
<random = ["选项 A", "选项 B", "选项 C"]>默认文本</random>
```

## 示例模板

```
欢迎回来，{Name}！房间：{Room}
上次在线：{LastConnect}
<random = ["玩得开心！", "祝你好运！", "享受游戏！"]>欢迎！</random>
```

## 配置

此插件没有 JSON 配置文件。配置完全基于文件，通过 `Message/` 目录模板进行。
