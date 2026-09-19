# 从源码构建

项目解决方案包含 Empostor 服务器及其依赖，如 Hazel 和插件 API。服务器使用 [.NET 8](https://dotnet.microsoft.com/download/dotnet/8.0) 构建。

## 克隆 Empostor

使用 git 克隆仓库：

```bash
git clone https://github.com/Empostor/Empostor.git
```

## 构建服务器

### 依赖

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Rider](https://www.jetbrains.com/rider/) 或 [Visual Studio](https://visualstudio.microsoft.com/vs/)（可选，仅用于完整 IDE 体验）

### 使用 CLI 构建

```bash
cd src/Empostor.Server/
dotnet build
# 如果需要单文件发布（将 linux-x64 改为 win-x64 用于 Windows）
dotnet publish -c Release -r linux-x64 -p:PublishSingleFile=true
```

服务器配置请查看 [运行服务器](installation.md)。
