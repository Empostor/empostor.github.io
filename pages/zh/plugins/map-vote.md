# 地图投票

**插件 ID：** `cn.hayashiume.mapvote`
**配置文件：** `[Empostor.Plugins.MapVote]Config.json`

| 参考内容 | 位置 |
| :--- | :--- |
| 配置 | [`Config.json`](#配置) |
| 指令 | [`#votemap`](#指令) |
| 管理面板 | 无 |
| HTTP API | 无 |

## 指令

| 指令 | 别名 | 用法 | 权限 |
| :--- | :--- | :--- | :--- |
| `#votemap <地图>` | `#vm` | 投出或更改投票 | 所有人 |
| `#votemap start` | `#votemap public` | 开启投票 | 房主 |
| `#votemap end` | `#votemap close` | 结束投票并应用结果 | 房主 |
| `#votemap enable` | — | 启用地图投票 | 房主 |
| `#votemap disable` | — | 禁用地图投票 | 房主 |
| `#votemap results` | — | 显示当前票数统计 | 房主 |

```
#votemap polus
#vm fungle
```

**可接受的地图名**

| 地图 | 别名 |
| :--- | :--- |
| Skeld | `skeld` |
| Mira HQ | `mira`、`mirahq` |
| Polus | `polus` |
| Airship | `airship` |
| Fungle | `fungle` |

## 投票规则

- 每名玩家仅保留一票 —— 后投的票会覆盖先前的票。
- 投票结束前可随时更改。
- 得票最多的地图在下局游戏开始时应用。
- 无人投票时随机选择地图。
- 平票时在平票地图中随机选择。

## 配置

编辑插件 DLL 旁的 `[Empostor.Plugins.MapVote]Config.json`。

```json
{
  "enabled": true,
  "require_majority": false,
  "allow_host_override": true
}
```

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | bool | `true` | 是否全局启用地图投票。 |
| `require_majority` | bool | `false` | 保留字段，当前未强制执行。 |
| `allow_host_override` | bool | `true` | 无人投票时允许房主指定地图。 |

## 相关文档

- [指令参考](../reference/commands.md) —— 游戏内可用指令总表。
