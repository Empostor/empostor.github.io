import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Legacy URL -> new URL. Every path that existed before the IA rework keeps
 * working so existing links (and GitHub README) don't 404.
 */
const LEGACY = {
  '/': '/',
  '/README': '/',
  '/configure-server': '/get-started/',
  '/Running-the-server': '/get-started/installation',
  '/Server-configuration': '/get-started/configuration',
  '/Building-from-source': '/get-started/build-from-source',
  '/Http-server': '/get-started/reverse-proxy',
  '/Firewall-and-ports': '/get-started/firewall-and-ports',
  '/detailed-features': '/server/',
  '/Admin-panel': '/server/admin-panel',
  '/Hello-page': '/server/hello-page',
  '/write-plugin': '/develop/',
  '/Writing-a-plugin': '/develop/writing-a-plugin',
  '/api-reference': '/reference/',
  '/Server-monitoring': '/reference/monitor-api',
  '/Privacy-api': '/reference/privacy-api',
  '/Game-api': '/reference/game-listing-api',
  '/Hplp-server-list': '/reference/hplp',
  '/configurable-files': '/config-files/',
  '/FAQ': '/operations/faq',
  '/TROUBLESHOOTING': '/operations/troubleshooting',
  '/About': '/about',
  '/Chat-plugin': '/plugins/chat-manager',
  '/Boot-code': '/plugins/custom-game-codes',
  '/Welcome-plugin': '/plugins/welcome-messages',
  '/Titles-plugin': '/plugins/custom-title',
  '/Player-channel-plugin': '/plugins/player-channel',
  '/Message-plugin': '/plugins/leave-a-message',
  '/Discord-webhook': '/plugins/discord-webhook',
  '/Narrator-plugin': '/plugins/narrator',
  '/MapVote-plugin': '/plugins/map-vote',
  '/QqVerify-plugin': '/plugins/qq-verify',
  '/FriendCodeValidator-plugin': '/plugins/friend-code-validator',
  '/PlayerStats-plugin': '/plugins/player-stats',
  '/Monitor-plugin': '/plugins/monitor',
  '/Privacy-plugin': '/plugins/privacy-policy',
}

// anchor-only "pages" that became real pages
const LEGACY_ANCHORS = {
  '/Admin-panel#chat-filter': '/plugins/chat-filter',
  '/Admin-panel#statistics': '/server/statistics',
  '/Admin-panel#plugin-marketplace': '/server/plugin-marketplace',
  '/api-reference#verification-api': '/reference/verification-api',
  '/configurable-files#adminstrings-json': '/config-files/#adminstrings-json',
  '/configurable-files#bans-json': '/config-files/#bans-json',
  '/configurable-files#player-stats-json': '/config-files/#player-stats-json',
  '/configurable-files#marketplace-plugins-json': '/config-files/#marketplace-plugins-json',
  '/configurable-files#pages-index-html-hello-page': '/config-files/#pages-index-html-hello-page',
  '/configurable-files#messages-helloworld-txt': '/config-files/#messages-helloworld-txt',
}

/**
 * Builds clean-path -> { target, hashMap }. The `hash` half of a legacy URL is
 * never sent to the server, so anchor remapping has to happen client-side in
 * the generated shim.
 */
function buildRedirectTree(prefix) {
  const tree = {}
  for (const [from, to] of Object.entries(LEGACY)) {
    tree[prefix + from] = { target: prefix + (to === '/' ? '/' : to), hash: {} }
  }
  for (const [from, to] of Object.entries(LEGACY_ANCHORS)) {
    const [base, hash] = from.split('#')
    const key = prefix + base
    if (!tree[key]) {
      tree[key] = { target: prefix + to, hash: {} }
    }
    tree[key].hash[hash] = prefix + to
  }
  return tree
}

const REDIRECT_TREE = { ...buildRedirectTree(''), ...buildRedirectTree('/zh') }

function redirectHtml(entry) {
  const url = entry.target.replace(/"/g, '&quot;')
  const map = JSON.stringify(entry.hash).replace(/</g, '\\u003c')
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta http-equiv="refresh" content="0; url=${url}">
<link rel="canonical" href="${url}">
<script>
(function () {
  var map = ${map};
  var target = "${url}";
  try {
    var h = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (h && map[h]) target = map[h];
  } catch (e) {}
  location.replace(target);
})();
</script>
</head>
<body>
<p>Redirecting to <a href="${url}">${url}</a></p>
</body>
</html>
`
}

/** Writes static HTML shims for removed URLs at the end of the build. */
function legacyRedirects() {
  let outDir
  return {
    name: 'empostor-legacy-redirects',
    apply: 'build',
    enforce: 'post',
    configResolved(cfg) {
      outDir = cfg.build.outDir && path.isAbsolute(cfg.build.outDir)
        ? cfg.build.outDir
        : path.resolve(cfg.root, cfg.build.outDir)
    },
    writeBundle() {
      if (!outDir) return
      for (const [clean, entry] of Object.entries(REDIRECT_TREE)) {
        const dir = path.join(outDir, clean)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), redirectHtml(entry), 'utf8')
      }
    },
  }
}

const footer = {
  message:
    '<a href="https://dsc.gg/empostor" target="_blank">Discord</a> | ' +
    '<a href="https://qm.qq.com/q/GeX3Q0Ft0k" target="_blank">QQ 群</a> | ' +
    '<a href="https://github.com/Empostor/Empostor" target="_blank">GitHub</a>',
  copyright: 'Empostor ©2026',
}

export default defineConfig({
  title: 'Empostor',
  description: 'Among Us Private Server Documentation',

  base: '/',
  srcDir: 'pages',
  cleanUrls: true,

  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  themeConfig: {
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Empostor/Empostor' }],
  },

  vite: { plugins: [legacyRedirects()], build: { emptyOutDir: false } },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Get Started', link: '/get-started/' },
          { text: 'Plugins', link: '/plugins/' },
          { text: 'API', link: '/reference/' },
          { text: 'Empostor Tool', link: '/empostor/' },
          { text: 'GitHub', link: 'https://github.com/Empostor/Empostor' },
        ],

        sidebar: [
          {
            text: 'Get Started',
            link: '/get-started/',
            collapsed: false,
            items: [
              { text: 'Installation', link: '/get-started/installation' },
              { text: 'Connect a Client', link: '/get-started/client-setup' },
              { text: 'Server Configuration', link: '/get-started/configuration' },
              { text: 'HTTPS & Reverse Proxy', link: '/get-started/reverse-proxy' },
              { text: 'Firewall & Ports', link: '/get-started/firewall-and-ports' },
              { text: 'Build from Source', link: '/get-started/build-from-source' },
            ],
          },
          {
            text: 'Plugins',
            link: '/plugins/',
            collapsed: false,
            items: [
              {
                text: 'Communication',
                collapsed: true,
                items: [
                  { text: 'Chat Manager', link: '/plugins/chat-manager' },
                  { text: 'Chat Filter', link: '/plugins/chat-filter' },
                  { text: 'Welcome Messages', link: '/plugins/welcome-messages' },
                  { text: 'Custom Title', link: '/plugins/custom-title' },
                ],
              },
              {
                text: 'Rooms & Gameplay',
                collapsed: true,
                items: [
                  { text: 'Custom Game Codes', link: '/plugins/custom-game-codes' },
                  { text: 'Fixed Room Code', link: '/plugins/fixed-room-code' },
                  { text: 'Map Vote', link: '/plugins/map-vote' },
                ],
              },
              {
                text: 'Social',
                collapsed: true,
                items: [
                  { text: 'Player Channel', link: '/plugins/player-channel' },
                  { text: 'Leave a Message', link: '/plugins/leave-a-message' },
                  { text: 'Narrator (AI)', link: '/plugins/narrator' },
                ],
              },
              {
                text: 'Identity & Verification',
                collapsed: true,
                items: [
                  { text: 'Friend Code Validator', link: '/plugins/friend-code-validator' },
                  { text: 'QQ Verify', link: '/plugins/qq-verify' },
                ],
              },
              {
                text: 'Ops & Data',
                collapsed: true,
                items: [
                  { text: 'Monitor', link: '/plugins/monitor' },
                  { text: 'Player Log', link: '/plugins/player-log' },
                  { text: 'Player Stats', link: '/plugins/player-stats' },
                  { text: 'Privacy Policy', link: '/plugins/privacy-policy' },
                ],
              },
              {
                text: 'Integrations',
                collapsed: true,
                items: [{ text: 'Discord Webhook', link: '/plugins/discord-webhook' }],
              },
            ],
          },
          {
            text: 'Server Features',
            link: '/server/',
            collapsed: true,
            items: [
              { text: 'Admin Panel', link: '/server/admin-panel' },
              { text: 'Statistics', link: '/server/statistics' },
              { text: 'Plugin Marketplace', link: '/server/plugin-marketplace' },
              { text: 'Hello Page', link: '/server/hello-page' },
            ],
          },
          {
            text: 'Develop Plugins',
            link: '/develop/',
            collapsed: true,
            items: [
              { text: 'Writing a Plugin', link: '/develop/writing-a-plugin' },
              { text: 'Example Plugin', link: '/develop/example-plugin' },
            ],
          },
          {
            text: 'API Reference',
            link: '/reference/',
            collapsed: true,
            items: [
              { text: 'Monitor API', link: '/reference/monitor-api' },
              { text: 'Commands', link: '/reference/commands' },
              { text: 'Privacy Policy API', link: '/reference/privacy-api' },
              { text: 'Game Listing API', link: '/reference/game-listing-api' },
              { text: 'Verification API', link: '/reference/verification-api' },
              { text: 'Admin API', link: '/reference/admin-api' },
              { text: 'HPLP Server List', link: '/reference/hplp' },
            ],
          },
          {
            text: 'Reference',
            collapsed: true,
            items: [
              { text: 'Configurable Files', link: '/config-files/' },
              { text: 'FAQ', link: '/operations/faq' },
              { text: 'Troubleshooting', link: '/operations/troubleshooting' },
              { text: 'About', link: '/about' },
            ],
          },
        ],

        footer,
      },
    },

    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '快速开始', link: '/zh/get-started/' },
          { text: '插件', link: '/zh/plugins/' },
          { text: 'API', link: '/zh/reference/' },
          { text: 'Empostor 工具', link: '/empostor/' },
          { text: 'GitHub', link: 'https://github.com/Empostor/Empostor' },
        ],

        sidebar: [
          {
            text: '快速开始',
            link: '/zh/get-started/',
            collapsed: false,
            items: [
              { text: '安装部署', link: '/zh/get-started/installation' },
              { text: '接入客户端', link: '/zh/get-started/client-setup' },
              { text: '服务器配置', link: '/zh/get-started/configuration' },
              { text: 'HTTPS 与反向代理', link: '/zh/get-started/reverse-proxy' },
              { text: '防火墙与端口', link: '/zh/get-started/firewall-and-ports' },
              { text: '从源码构建', link: '/zh/get-started/build-from-source' },
            ],
          },
          {
            text: '插件',
            link: '/zh/plugins/',
            collapsed: false,
            items: [
              {
                text: '聊天沟通',
                collapsed: true,
                items: [
                  { text: '聊天管理', link: '/zh/plugins/chat-manager' },
                  { text: '聊天过滤', link: '/zh/plugins/chat-filter' },
                  { text: '欢迎消息', link: '/zh/plugins/welcome-messages' },
                  { text: '自定义称号', link: '/zh/plugins/custom-title' },
                ],
              },
              {
                text: '房间与玩法',
                collapsed: true,
                items: [
                  { text: '自定义房间代码', link: '/zh/plugins/custom-game-codes' },
                  { text: '固定房间代码', link: '/zh/plugins/fixed-room-code' },
                  { text: '地图投票', link: '/zh/plugins/map-vote' },
                ],
              },
              {
                text: '社交互动',
                collapsed: true,
                items: [
                  { text: '玩家频道', link: '/zh/plugins/player-channel' },
                  { text: '留言系统', link: '/zh/plugins/leave-a-message' },
                  { text: '旁白 AI', link: '/zh/plugins/narrator' },
                ],
              },
              {
                text: '身份校验',
                collapsed: true,
                items: [
                  { text: '好友代码验证', link: '/zh/plugins/friend-code-validator' },
                  { text: 'QQ 群验证', link: '/zh/plugins/qq-verify' },
                ],
              },
              {
                text: '运维与数据',
                collapsed: true,
                items: [
                  { text: '服务器监控', link: '/zh/plugins/monitor' },
                  { text: '玩家日志', link: '/zh/plugins/player-log' },
                  { text: '玩家统计', link: '/zh/plugins/player-stats' },
                  { text: '隐私政策', link: '/zh/plugins/privacy-policy' },
                ],
              },
              {
                text: '外部集成',
                collapsed: true,
                items: [{ text: 'Discord 通知', link: '/zh/plugins/discord-webhook' }],
              },
            ],
          },
          {
            text: '服务端功能',
            link: '/zh/server/',
            collapsed: true,
            items: [
              { text: '管理面板', link: '/zh/server/admin-panel' },
              { text: '统计分析', link: '/zh/server/statistics' },
              { text: '插件市场', link: '/zh/server/plugin-marketplace' },
              { text: 'Hello 页面', link: '/zh/server/hello-page' },
            ],
          },
          {
            text: '开发插件',
            link: '/zh/develop/',
            collapsed: true,
            items: [
              { text: '编写插件', link: '/zh/develop/writing-a-plugin' },
              { text: '示例插件', link: '/zh/develop/example-plugin' },
            ],
          },
          {
            text: 'API 参考',
            link: '/zh/reference/',
            collapsed: true,
            items: [
              { text: '监控 API', link: '/zh/reference/monitor-api' },
              { text: '指令参考', link: '/zh/reference/commands' },
              { text: '隐私政策 API', link: '/zh/reference/privacy-api' },
              { text: '游戏列表 API', link: '/zh/reference/game-listing-api' },
              { text: '验证 API', link: '/zh/reference/verification-api' },
              { text: '管理 API', link: '/zh/reference/admin-api' },
              { text: 'HPLP 服务器列表', link: '/zh/reference/hplp' },
            ],
          },
          {
            text: '参考资料',
            collapsed: true,
            items: [
              { text: '可配置文件', link: '/zh/config-files/' },
              { text: '常见问题', link: '/zh/operations/faq' },
              { text: '故障排除', link: '/zh/operations/troubleshooting' },
              { text: '关于', link: '/zh/about' },
            ],
          },
        ],

        footer,
      },
    },
  },
})
