# 欢迎页面（主页）

Empostor 在 `http://your-server:22023/` 提供一个可自定义的主页。

## 工作原理

启动时，服务器检查可执行文件旁边的 `Pages/` 目录。如果不存在则自动创建，并在其中写入默认的 `index.html`。

```
Empostor.Server（二进制文件）
Pages/
  index.html   ← 通过 GET / 提供服务
```

每次对 `/` 的请求都会实时从磁盘读取文件，因此编辑后无需重启服务器即可生效。

## 自定义页面

编辑 `Pages/index.html`，加入任何你想要的 HTML 内容。常见用途：

- 服务器规则和信息
- Discord 邀请链接
- 区域文件下载说明
- 管理面板链接

如果文件被删除，在服务器重启并重新生成默认文件之前，会返回纯文本的后备响应。

## 默认页面

生成的默认页面包含：

- 显示服务器在线的状态指示器
- 管理面板链接（`/admin`）
- [区域文件生成器](https://empostor.github.io/Empostor) 链接
- 服务器启动时间

## 注意事项

- 页面以 `text/html; charset=utf-8` 形式提供。
- 没有模板引擎。文件按原样提供。
- 如需 HTTPS 访问，请配置反向代理。参见 [Http-server.md](../get-started/reverse-proxy.md)。
