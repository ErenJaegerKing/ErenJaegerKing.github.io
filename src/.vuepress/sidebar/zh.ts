import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "Java",
      icon: "",
      prefix: "/java/",
      link: "/java/",
    },
    {
      text: "前端",
      icon: "",
      prefix: "/frontend/",
      children: [
        { text: "vue2", icon: "", prefix: "/vue2/", link: "/vue2/"},
        { text: "vue3", icon: "", prefix: "/vue3/", link: "/vue3/"},
      ],
    },
    {
      text: "算法",
      icon: "",
      prefix: "/algorithm/",
      link: "/algorithm/",
    },
    {
      text: "数据库",
      icon: "",
      prefix: "/database/",
      link: "/database/",
    },
    {
      text: "运维",
      icon: "",
      prefix: "/devops/",
      link: "/devops/",
    },
    {
      text: "感悟",
      icon: "",
      prefix: "/insights/",
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
  ],
  "/frontend/vue2/": "structure",
  "/frontend/vue3/": "structure",
  "/algorithm/": "structure",
  "/database/": "structure",
  "/devops": "structure",
  "/insights": "structure",
});
