import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "导航", icon: "daohang", link: "/demo/"
  },
  {
    text: "总览",
    icon: "zonglan01",
    children: [
      { text: "全部", icon: "quanbu", link: "/article/" },
      { text: "分类", icon: "fenlei", link: "/category/" },
      { text: "标签", icon: "biaoqian", link: "/tag/" },
      { text: "时间轴", icon: "timeAxis", link: "/timeline/" },
    ],
  },
  // {
  //   text: "Java",
  //   icon: "java",
  //   link: "/Java/",
  // },
  // {
  //   text: "前端",
  //   icon: "qianduan",
  //   link: "/frontend/",
  // },
  // {
  //   text: "算法",
  //   icon: "leetcode",
  //   link: "/algorithm/",
  // },
  // {
  //   text: "数据库",
  //   icon: "shujuku",
  //   link: "/database/",
  // },
  // {
  //   text: "数据库",
  //   icon: "weifuwu",
  //   link: "/microservices/",
  // },
  // {
  //   text: "运维",
  //   icon: "yunwei",
  //   link: "/devops/",
  // },
  {
    text: "笔记",
    icon: "bijijilu",
    link: "/notes/",
  },
  {
    text: "技术",
    icon: "kexuejishu",
    link: "/tech/",
  },
  // {
  //   text: "感悟",
  //   icon: "ganwuxianxing",
  //   link: "/insights/",
  // },
  {
    text: "关于",
    icon: "guanyu",
    link: "/intro",
  },
]);
