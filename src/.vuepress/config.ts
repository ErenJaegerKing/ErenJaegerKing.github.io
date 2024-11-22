import theme from "./theme.js";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "ErenJaeger",
      description: "my blog",
    },
    // "/en/": {
    //   lang: "en-US",
    //   title: "Blog Demo",
    //   description: "A blog demo for vuepress-theme-hope",
    // },
  },
  base: "/",
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
