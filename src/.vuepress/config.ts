import theme from "./theme.js";
import { defineUserConfig } from "vuepress";

import { baiduAnalyticsPlugin } from "@vuepress/plugin-baidu-analytics";

export default defineUserConfig({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "春风不语即随本心",
      description: "Love",
    },
    // "/en/": {
    //   lang: "en-US",
    //   title: "Blog Demo",
    //   description: "A blog demo for vuepress-theme-hope",
    // },
  },
  // 和 PWA 一起启用
  // shouldPrefetch: false,

  base: "/",

  theme,

  plugins: [baiduAnalyticsPlugin],

  head: [
    [
      "script",
      {},
      `var _hmt = _hmt || [];
      (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?a0771b272c1b2be1941531f3029810be";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
      })();`,
    ],
  ],
});
