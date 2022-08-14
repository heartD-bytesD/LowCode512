# Low Code 512

低代码平台早期预览版本，目前实现了编辑器的部分功能，

## 如何使用

### 1. 安装依赖

如果您未安装pnpm，请先安装pnpm（windows为例）：

```
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

进入根目录安装工具依赖

```
cd LowCode512
pnpm i
```

### 2. 编译共享模块

```
cd packages/shared
pnpm run build
```

### 3. 启动编辑器

```
cd apps/editor
pnpm i
pnpm run dev
```

服务启动后进入[http://127.0.0.1:5173/editor]()以查看编辑器

* 注意，需保存后才能预览