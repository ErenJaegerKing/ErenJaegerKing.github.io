import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Java",
      icon: "java",
      prefix: "/Java/",
      link: "/Java/",
    },
    {
      text: "前端",
      icon: "qianduan",
      prefix: "/frontend/",
      link: "/frontend/",
    },
    {
      text: "算法",
      icon: "leetcode",
      prefix: "/algorithm/",
      link: "/algorithm/",
    },
    {
      text: "数据库",
      icon: "shujuku",
      prefix: "/database/",
      link: "/database/",
    },
    {
      text: "微服务",
      icon: "weifuwu",
      prefix: "/microservices/",
      link: "/microservices/",
    },
    {
      text: "运维",
      icon: "yunwei",
      prefix: "/devops/",
      link: "/devops/",
    },
    {
      text: "感悟",
      icon: "ganwuxianxing",
      prefix: "/insights/",
      link: "/insights/",
    },
    {
      text: "关于",
      icon: "guanyu",
      link: "/about",
    },
  ],
  "/Java/": "structure",
  "/frontend/": "structure",
  "/algorithm/": "structure",
  "/database/": "structure",
  "/microservices/": "structure",
  "/devops/": "structure",
  "/insights/": "structure",
});
