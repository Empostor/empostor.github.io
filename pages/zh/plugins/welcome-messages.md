# 欢迎消息

**插件 ID：** `cn.hayashiume.welcome`
**配置：** 无 —— 内容全部来自 `Message/` 目录下的模板文件

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | 无 —— 仅模板文件 |
| 指令 | 无 |
| 管理面板 | 无 |
| HTTP API | 无 |

玩家在大厅出生时发送欢迎消息，内容取自 `Message/` 目录下与客户端语言对应的模板文件。

## 模板文件

首次启动时会在 `Message/` 目录生成各语言模板：

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

玩家收到与其客户端语言对应的文件内容；`EnglishHelloWord.txt` 是兜底模板。编辑后下一位玩家出生即生效，无需重启。

## 占位符

| 占位符 | 说明 | 示例 |
| :--- | :--- | :--- |
| `{Name}` | 玩家显示名 | `Alice` |
| `{FriendCode}` | 玩家好友代码 | `matchduck#1337` |
| `{GameCode}` | 房间代码 | `ABCDEF` |
| `{Room}` | 房间代码（`{GameCode}` 的别名） | `ABCDEF` |
| `{LastConnect}` | 上次离开时间（UTC） | `2026-05-24 15:30:00` |

玩家没有历史记录时，`{LastConnect}` 显示为 "First time here!"。

## 模板语法

### `<cave>` —— 远程内容

从 URL 拉取内容并插入消息：

```
<cave>https://example.com/message.txt</cave>
```

支持的载荷格式：

| 格式 | 行为 |
| :--- | :--- |
| 纯文本 | 原样插入 |
| Hitokoto JSON | 取 `hitokoto` 与 `from` 字段 |
| 通用 JSON | 取 `content` 字段 |

### `<random>` —— 随机选取

从 JSON 数组中随机选一项，标签体为兜底文本：

```
<random = ["Option A", "Option B", "Option C"]>Default text</random>
```

## 模板示例

```
Welcome back, {Name}! Room: {Room}
Last seen: {LastConnect}
<random = ["Have fun!", "Good luck!", "Enjoy the game!"]>Welcome!</random>
```

## 相关文档

- [自定义称号](custom-title.md) —— 同样作用于玩家进入时的展示内容。
- [HelloWorld.txt](../config-files/index.md#messages-helloworld-txt) —— 与本插件模板同目录的通用消息文件。
