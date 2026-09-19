# 开发插件

Empostor 插件是挂载到服务器事件的 .NET 类库。本部分涵盖编写、编译与发布插件所需的一切。

## 从这里开始

**[编写插件](writing-a-plugin.md)** 是完整的分步教程：

1. 安装 .NET SDK
2. 创建 C# 类库项目
3. 添加 `Empostor.Api` NuGet 包
4. 编写插件类（继承 `PluginBase`）
5. 添加事件监听器（实现 `IEventListener` 并标注 `[EventListener]`）
6. 在 `IPluginStartup` 中注册监听器
7. 编译后放入 `plugins/` 目录，重启服务器

**[示例插件](example-plugin.md)** 是该教程的配套参考——随源码一同发布的极简实现。建议两者对照阅读。

## 专题

| 主题 | 文档 |
| :--- | :--- |
| 依赖注入与宿主配置 | [编写插件](writing-a-plugin.md) |
| 事件监听器参考 | [编写插件](writing-a-plugin.md) · [示例插件](example-plugin.md) |
| 国际化 (i18n) | [编写插件](writing-a-plugin.md#国际化-i18n) |
| 基于文本文件的消息 | [HelloWorld.txt](../config-files/index.md#messages-helloworld-txt) |
| 提供自定义网页 | [Hello 页面](../server/hello-page.md) |

::: tip 初次接触代码库？
直接复制 `Empostor.Plugins.Example` 并改名。[插件总览](../plugins/)中的所有官方插件结构一致，都可以当作参考资料。
:::

## 分发方式

编译产物就是一个 `.dll`，可通过两种途径发布：

- 放入服务器的 `plugins/` 目录并重启。
- 发布到[插件市场](../server/plugin-marketplace.md)目录，服务器管理员即可在管理面板中一键安装。

## 下一步

翻阅[插件总览](../plugins/)，查看配置、持久化与本地化的完整实现范例。
