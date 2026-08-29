import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Empostor',
  description: 'Among Us Private Server Documentation',

  base: '/',

  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Empostor Tool', link: '/empostor/' },
          { text: 'GitHub', link: 'https://github.com/Empostor/Empostor' }
        ],

        sidebar: [
          {
            text: 'Configure Server',
            link: '/configure-server',
            items: [
              { text: 'Running the Server', link: '/Running-the-server' },
              { text: 'Server Configuration', link: '/Server-configuration' },
              { text: 'Building from Source', link: '/Building-from-source' },
              { text: 'HTTP Server (Reverse Proxy)', link: '/Http-server' },
              { text: 'Firewall & Ports', link: '/Firewall-and-ports' },
              { text: 'FAQ', link: '/FAQ' },
              { text: 'Troubleshooting', link: '/TROUBLESHOOTING' }
            ]
          },
          {
            text: 'Detailed Features',
            link: '/detailed-features',
            items: [
              { text: 'Admin Panel', link: '/Admin-panel' },
              { text: 'Chat Filter', link: '/Admin-panel#chat-filter' },
              { text: 'Discord Webhook', link: '/Discord-webhook' },
              { text: 'Statistics', link: '/Admin-panel#statistics' },
              { text: 'Plugin Marketplace', link: '/Admin-panel#plugin-marketplace' },
              { text: 'Server Monitor', link: '/Monitor-plugin' },
              { text: 'Privacy Policy', link: '/Privacy-plugin' },
              { text: 'Map Vote', link: '/MapVote-plugin' },
              { text: 'Narrator (AI)', link: '/Narrator-plugin' },
              { text: 'Title System', link: '/Titles-plugin' },
              { text: 'Welcome Messages', link: '/Welcome-plugin' },
              { text: 'QQ Verify', link: '/QqVerify-plugin' },
              { text: 'Friend Code Validator', link: '/FriendCodeValidator-plugin' },
              { text: 'Player Statistics', link: '/PlayerStats-plugin' }
            ]
          },
          {
            text: 'Write Plugin',
            link: '/write-plugin',
            items: [
              { text: 'Writing a Plugin', link: '/Writing-a-plugin' },
              { text: 'Hello Page', link: '/Hello-page' },
              { text: 'Boot.Codes', link: '/Boot-code' },
              { text: 'Message (Leave a Message)', link: '/Message-plugin' },
              { text: 'Player Channel', link: '/Player-channel-plugin' },
              { text: 'Chat Manager', link: '/Chat-plugin' },
              { text: 'Map Vote', link: '/MapVote-plugin' },
              { text: 'Narrator (AI)', link: '/Narrator-plugin' },
              { text: 'Player Statistics', link: '/PlayerStats-plugin' },
              { text: 'Welcome Messages', link: '/Welcome-plugin' },
              { text: 'Title System', link: '/Titles-plugin' },
              { text: 'QQ Verify', link: '/QqVerify-plugin' },
              { text: 'Friend Code Validator', link: '/FriendCodeValidator-plugin' },
              { text: 'Server Monitor', link: '/Monitor-plugin' },
              { text: 'Privacy Policy', link: '/Privacy-plugin' }
            ]
          },
          {
            text: 'API Reference',
            link: '/api-reference',
            items: [
              { text: 'Server Monitoring', link: '/Server-monitoring' },
              { text: 'Privacy Policy API', link: '/Privacy-api' },
              { text: 'Game Listing API', link: '/Game-api' },
              { text: 'Verification API', link: '/api-reference#verification-api' }
            ]
          },
          {
            text: 'Configurable Files',
            link: '/configurable-files',
            items: [
              { text: 'config.json', link: '/Server-configuration' },
              { text: 'AdminStrings.json', link: '/configurable-files#adminstrings-json' },
              { text: 'Pages/index.html', link: '/configurable-files#pages-index-html-hello-page' },
              { text: 'Messages/HelloWorld.txt', link: '/configurable-files#messages-helloworld-txt' },
              { text: 'marketplace/plugins.json', link: '/configurable-files#marketplace-plugins-json' },
              { text: 'bans.json', link: '/configurable-files#bans-json' },
              { text: 'player_stats.json', link: '/configurable-files#player-stats-json' }
            ]
          },
          {
            text: 'About',
            link: '/About'
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/Empostor/Empostor' }
        ],

        footer: {
          message: '<a href="https://dsc.gg/empostor" target="_blank">Discord</a> | <a href="https://qm.qq.com/q/GeX3Q0Ft0k" target="_blank">QQ 群</a> | <a href="https://github.com/Empostor/Empostor" target="_blank">GitHub</a>',
          copyright: 'Empostor ©2026'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: 'Empostor Tool', link: '/empostor/' },
          { text: 'GitHub', link: 'https://github.com/Empostor/Empostor' }
        ],

        sidebar: [
          {
            text: '配置服务器',
            link: '/zh/configure-server',
            items: [
              { text: '运行服务器', link: '/zh/Running-the-server' },
              { text: '服务器配置', link: '/zh/Server-configuration' },
              { text: '从源码构建', link: '/zh/Building-from-source' },
              { text: 'HTTP 服务器 (反向代理)', link: '/zh/Http-server' },
              { text: '防火墙与端口', link: '/zh/Firewall-and-ports' },
              { text: '常见问题', link: '/zh/FAQ' },
              { text: '故障排除', link: '/zh/TROUBLESHOOTING' }
            ]
          },
          {
            text: '详细功能',
            link: '/zh/detailed-features',
            items: [
              { text: '管理面板', link: '/zh/Admin-panel' },
              { text: '聊天过滤', link: '/zh/Admin-panel#聊天过滤' },
              { text: 'Discord 通知', link: '/zh/Discord-webhook' },
              { text: '统计', link: '/zh/Admin-panel#统计' },
              { text: '插件市场', link: '/zh/Admin-panel#插件市场' },
              { text: '服务器监控', link: '/zh/Monitor-plugin' },
              { text: '隐私政策', link: '/zh/Privacy-plugin' },
              { text: '地图投票', link: '/zh/MapVote-plugin' },
              { text: '旁白 (AI)', link: '/zh/Narrator-plugin' },
              { text: '称号系统', link: '/zh/Titles-plugin' },
              { text: '欢迎消息', link: '/zh/Welcome-plugin' },
              { text: 'QQ 验证', link: '/zh/QqVerify-plugin' },
              { text: '好友代码验证', link: '/zh/FriendCodeValidator-plugin' },
              { text: '玩家统计', link: '/zh/PlayerStats-plugin' }
            ]
          },
          {
            text: '编写插件',
            link: '/zh/write-plugin',
            items: [
              { text: '编写插件', link: '/zh/Writing-a-plugin' },
              { text: 'Hello 页面', link: '/zh/Hello-page' },
              { text: 'Boot.Codes', link: '/zh/Boot-code' },
              { text: '留言系统', link: '/zh/Message-plugin' },
              { text: '玩家频道', link: '/zh/Player-channel-plugin' },
              { text: '聊天管理', link: '/zh/Chat-plugin' },
              { text: '地图投票', link: '/zh/MapVote-plugin' },
              { text: '旁白 (AI)', link: '/zh/Narrator-plugin' },
              { text: '玩家统计', link: '/zh/PlayerStats-plugin' },
              { text: '欢迎消息', link: '/zh/Welcome-plugin' },
              { text: '称号系统', link: '/zh/Titles-plugin' },
              { text: 'QQ 验证', link: '/zh/QqVerify-plugin' },
              { text: '好友代码验证', link: '/zh/FriendCodeValidator-plugin' },
              { text: '服务器监控', link: '/zh/Monitor-plugin' },
              { text: '隐私政策', link: '/zh/Privacy-plugin' }
            ]
          },
          {
            text: '相关 API',
            link: '/zh/api-reference',
            items: [
              { text: '服务器监控', link: '/zh/Server-monitoring' },
              { text: '隐私政策 API', link: '/zh/Privacy-api' },
              { text: '游戏列表 API', link: '/zh/Game-api' },
              { text: '验证 API', link: '/zh/api-reference#验证-api' }
            ]
          },
          {
            text: '可配置文件',
            link: '/zh/configurable-files',
            items: [
              { text: 'config.json', link: '/zh/Server-configuration' },
              { text: 'AdminStrings.json', link: '/zh/configurable-files#adminstrings-json' },
              { text: 'Pages/index.html', link: '/zh/configurable-files#pages-index-html-hello-页面' },
              { text: 'Messages/HelloWorld.txt', link: '/zh/configurable-files#messages-helloworld-txt' },
              { text: 'marketplace/plugins.json', link: '/zh/configurable-files#marketplace-plugins-json' },
              { text: 'bans.json', link: '/zh/configurable-files#bans-json' },
              { text: 'player_stats.json', link: '/zh/configurable-files#player-stats-json' }
            ]
          },
          {
            text: '关于',
            link: '/zh/About'
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/Empostor/Empostor' }
        ],

        footer: {
          message: '<a href="https://dsc.gg/empostor" target="_blank">Discord</a> | <a href="https://qm.qq.com/q/GeX3Q0Ft0k" target="_blank">QQ 群</a> | <a href="https://github.com/Empostor/Empostor" target="_blank">GitHub</a>',
          copyright: 'Empostor ©2026'
        }
      }
    }
  },

  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
