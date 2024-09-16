import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "导航", icon: "", link: "/demo/"
  },
  {
    text: "分类",
    icon: "",
    children: [
      { text: "全部", icon: "", link: "/article/" },
      { text: "分类", icon: "", link: "/category/" },
      { text: "标签", icon: "", link: "/tag/" },
      { text: "时间轴", icon: "", link: "/timeline/" },
    ],
  },
  {
    text: "Java",
    icon: "",
    link: "/java/",
  },
  {
    text: "前端",
    icon: "",
    link: "/frontend/",
  },
  {
    text: "算法",
    icon: "",
    link: "/algorithm/",
  },
  {
    text: "数据库",
    icon: "",
    link: "/database/",
  },
  {
    text: "运维",
    icon: "",
    link: "/devops/",
  },
  {
    text: "感悟",
    icon: "",
    link: "/insights/",
  },
  {
    text: "关于",
    icon: "",
    children:[
      { text: "关于我", icon: "", link: "/intro" },
      { text: "关于本站", icon: "", link: "/about" },
    ]
  },
]);
