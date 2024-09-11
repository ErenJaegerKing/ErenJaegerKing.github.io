import theme from "./theme.js";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "ErenJaeger",
      description: "my blog",
    },
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
  },

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
