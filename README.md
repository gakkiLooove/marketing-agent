# 营销 Agent 工作台

这是一个纯前端营销智能体原型，打开 `index.html` 即可使用。它会根据产品、客户、卖点、目标、渠道、预算和周期生成营销定位、受众画像、转化漏斗、广告文案、邮件文案和执行日历。

## 本地打开

直接用浏览器打开：

```text
index.html
```

## 发给别人看

本地文件链接或 `localhost` 链接只能在自己的电脑上访问。要发给别人，需要部署到公网静态托管服务。

可选方式：

- GitHub Pages：把这几个文件推到 GitHub 仓库，开启 Pages，目录选择仓库根目录。
- Vercel：导入仓库，框架选择 Other，默认静态发布即可。
- Netlify：把整个项目文件夹拖到 Netlify Deploys 页面，或导入仓库自动发布。

当前项目不依赖后端服务，也不需要安装依赖。

## GitHub Pages 快速发布

登录 GitHub CLI 后可执行：

```sh
gh repo create marketing-agent --public --source=. --remote=origin --push
```

然后在仓库 Settings -> Pages 中选择 `Deploy from a branch`，分支选择 `main`，目录选择 `/root`。发布完成后链接通常是：

```text
https://<你的 GitHub 用户名>.github.io/marketing-agent/
```
