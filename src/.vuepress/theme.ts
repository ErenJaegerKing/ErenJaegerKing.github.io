import { hopeTheme } from "vuepress-theme-hope";

import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({

  hostname: "https://ErenJaegerKing.github.io",
  
  author: {
    name: "ErenJaegerKing",
    url: "https://ErenJaegerKing.github.io",
    email: "erenjaegerking@qq.com",
  },
  // license: "",
  favicon: "/favicon1.ico",
  darkmode: "toggle",
  editLink: false,
  fullscreen: true,
  navbarAutoHide: "always",

  // pure: true,

  iconAssets: "//at.alicdn.com/t/c/font_4672488_ke0mgubmz0k.css",
  logo: "/logo1.png",
  docsDir: "src",
  repo: "https://github.com/ErenJaegerKing",

  blog: {
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "mailto:info@example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/ErenJaegerKing",
      // Gitlab: "https://example.com",
      // Gmail: "mailto:info@example.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "1252505184",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
      // VuePressThemeHope: {
      //   icon: "https://theme-hope-assets.vuejs.press/logo.svg",
      //   link: "https://theme-hope.vuejs.press",
      // },
      // "163Music": "https://example.com",
    },
  },

  footer: "Powered by VuePress | Theme Hope",

  locales: {
    "/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      displayFooter: true,

      blog: {
        name: "鹤九",
        avatar: "/logo1.png",
        description: "程序员",
        intro: "/intro.html",
      },

      // page meta
      // metaLocales: {
      //   editLink: "在 GitHub 上编辑此页",
      // },
    },

    // "/en/": {
    //   navbar: enNavbar,
    //   sidebar: enSidebar,
    //   displayFooter: true,

    //   blog: {
    //     description: "A FrontEnd programmer",
    //     intro: "/en/intro.html",
    //   },

    //   metaLocales: {
    //     editLink: "Edit this page on GitHub",
    //   },
    // },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      // "/en/demo/encrypt.html": ["1234"],
    },
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    photoSwipe: {
      download:false,
      fullscreen:false,
      scrollToClose:false,
    },
  
    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    //   copyright: false,
    //   reaction: true,
    // },

    components: {
      components: [
        "Badge", 
        "VPCard"
      ],
    },

    copyright: false,

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 katex
      // katex: true,

      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
