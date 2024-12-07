---
icon: ""
description: ""
title: "SpringSecurity"
date: 2024-12-05
category:
  - Java
tag:
  - SpringSecurity
order: 2
---

## 简介

- Spring Security 是 Spring 家族中的一个安全管理框架，Web应用的需要进行认证和授权。

- 认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户

- 授权：经过认证后判断当前用户是否有权限进行某个操作

- 核心功能：认证与授权

## 入门

登录校验流程？

SpringSecurity完整流程？

SpringSecurity的原理其实就是一个过滤器链，内部包含了提供各种功能的过滤器。

- **UsernamePasswordAuthenticationFilter**:负责处理我们在登陆页面填写了用户名密码后的登陆请求。
- **ExceptionTranslationFilter**:处理过滤器链中抛出的任何AccessDeniedException和
AuthenticationException 。
- **FilterSecurityInterceptor**:负责权限校验的过滤器。我们可以通过Debug查看当前系统中SpringSecurity过滤器链中有哪些过滤器及它们的顺序。





参考资料：[三更学堂（springsecurity）](https://www.bilibili.com/video/BV1mm4y1X7Hc/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)