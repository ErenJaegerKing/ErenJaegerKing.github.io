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

## 认证

SpringSecurity的原理其实就是一个过滤器链，内部包含了提供各种功能的过滤器。

![](https://drawingbed-686.pages.dev/myblog/202412091416667.png)

- **UsernamePasswordAuthenticationFilter**:负责处理我们在登陆页面填写了用户名密码后的登陆请求。
- **ExceptionTranslationFilter**:处理过滤器链中抛出的任何AccessDeniedException和
AuthenticationException 。
- **FilterSecurityInterceptor**:负责权限校验的过滤器。我们可以通过Debug查看当前系统中SpringSecurity过滤器链中有哪些过滤器及它们的顺序。

其中**UsernamePasswordAuthenticationFilter**中

- `AbstracntAuthenticationProcessingFilter`接口: 它的实现类，表示当前访问系统的用户，封装了用户相关信息。

- `AuthenticationManager`接口：定义了认证Authentication的方法

- `AbstractUserDetilsAuthenticatioProvider`接口：加载用户特定数据的核心接口。里面定义了一个根据用户名查询用户信息的方法，然后将获得这些信息封装到Authentication对象中返回给给当前访问的接口，然后存放到SecurityContextHolder的上下文中

- `UserDetailsService`接口：提供核心用户信息。通过UserDetailsService根据用户名获取处理的用户信息要封装成UserDetails对象返回。



1、自定义登录接口（认证）
调用`ProviderManager`的方法进行认证 如果认证通过生成jwt，把用户信息存入redis中

> `SpringSecurity`在默认的认证过程中如果账号密码校验成功会返回Authentication对象之后
> `UsernamePasswordAuthenticationFilter`会将用户信息`Authentication`存入
> `SecurityContextHolder`中

具体实现的步骤：在接口中我们通过AuthenticationManager的authenticate方法来进行用户认证,所以需要在SecurityConfig中配置把AuthenticationManager注入容器。

让springsecuriety对这个接口放行，让用户访问这个接口的时候不用登录也能访问。

2、自定义UserDetailsService接口（从数据库中查询用户信息包括权限封装到UserDetails实现类中）

在这个实现类中去查询数据库

校验：定义Jwt认证过滤器  获取token  解析token获取其中的userid  从redis中获取用户信息  存入SecurityContextHolder

> `SpringSecurity` 默认是在内存中查找对应的用户名密码然后封装成`UserDetai`l对象交给
>  `DaoAuthenticationProcider`校验
> 但是我们在实际运用场景中是从数据库中查找用户信息	
> 所以此时我们需要写一个`UserDetailsService`的实现类用来在数据库中查询用户信息并且封装到`UserDetai`l对象中

3、使用BCryptPasswordEncoder加密解密，注入到springsecurity的容器中去，保证账号密码的安全性。

认证需要将AuthenticationManager注入容器，认证的时候可以调用

4、认证过滤器（添加到过滤器链中）

我们需要自定义一个过滤器，这个过滤器会去获取请求头中的token，对token进行解析取出其中的userid。(主要作用于除登录外的请求)

使用userid去redis中获取对应的LoginUser对象。

然后封装Authentication对象存入SecurityContextHolder

5、退出登录

获取securitycontextholder中的认证信息，删除redis中对应的数据

6、自定义失败处理器

在SpringSecurity中，如果我们在认证或者授权的过程中出现了异常会被ExceptionTranslationFilter捕获到。在ExceptionTranslationFilter中会去判断是认证失败还是授权失败出现的异常。

如果是认证过程中出现的异常会被封装成AuthenticationException然后调用**AuthenticationEntryPoint**对象的方法去进行异常处理。

如果是授权过程中出现的异常会被封装成AccessDeniedException然后调用**AccessDeniedHandler**对象的方法去进行异常处理。

所以如果我们需要自定义异常处理，我们只需要自定义AuthenticationEntryPoint和AccessDeniedHandler然后配置SpringSecurity即可。

## 认证架构

![](https://drawingbed-686.pages.dev/myblog/202412091531833.png)

https://springdoc.cn/spring-security/servlet/authentication/architecture.html 文档中文网


## 授权 （RBAC基于角色的权限控制）

在SpringSecurity中，会使用默认的FilterSecurityInterceptor来进行权限校验。在

FilterSecurityInterceptor中会从SecurityContextHolder获取其中的Authentication，然后获取其中的权限信息。当判断当前用户是否拥有访问当前资源所需的权限。

所以我们在项目中只需要把当前登录用户的权限信息也存入Authentication。

然后设置我们的资源所需要的权限即可。

1.限制访问资源所需权限

基于注解的权限控制方案、开启相关配置

2、封装权限信息

在UserDetails的实现类中的getAuthorities这个方法进行修改：把permissions中字符串类型的权限信息转换成GrantedAuthority对象存入authorities

在UserDetailsService的实现类中查询用户信息顺带将权限信息封装到UserDetails的实现类中

过滤器记得将当前用户的权限信息存入到authentication中

## 权限校验

### 其它权限校验方法

@PreAuthorize注解（hasAnyAuthority，hasRole，hasAnyRole等）

hasAuthority方法实际是执行到了SecurityExpressionRoot的hasAuthority，其内部是调用authentication中的getAuthorities方法获取用户的权限列表

- hasRole要求有对应的角色才可以访问，但是它内部会把我们传入的参数拼接上 **ROLE_** 后再去比较。
- hasAnyAuthority方法可以传入多个权限，只有用户有其中任意一个权限都可以访问对应资源。

- hasAnyRole 有任意的角色就可以访问。它内部也会把我们传入的参数拼接上 **ROLE_** 后再去比较。

### 自定义权限校验方法

我们可以自定义自己的权限校验方法

```java
@Component("ex")
public class SGExpressionRoot {
    public boolean hasAuthority(String authority) {
        //获取当前用户的权限
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        List<String> permissions = loginUser.getPermissions();
        //判断用户权限集合中是否存在authority
        return permissions.contains(authority);
    }
}


@RequestMapping("/hello")
@PreAuthorize("@ex.hasAuthority('system:dept:list')")
public String hello(){
    return "hello";
}
```
### 基于配置的权限控制

```java
// 对于登录接口 允许匿名访问
.antMatchers("/user/login").anonymous()
.antMatchers("/testCors").hasAuthority("system:dept:123")
// 除上面外的所有请求全部需要鉴权认证
.anyRequest().authenticated();
```

### CSRF（原因是依靠Cookie） 和 跨域

CSRF是指跨站请求伪造（Cross-site request forgery），是web常见的攻击之一。

https://blog.csdn.net/freeking101/article/details/86537087

SpringSecurity去防止CSRF攻击的方式就是通过csrf_token。后端会生成一个csrf_token，前端发起请

求的时候需要携带这个csrf_token,后端会有过滤器进行校验，如果没有携带或者是伪造的就不允许访问。

我们可以发现CSRF攻击依靠的是cookie中所携带的认证信息。但是在前后端分离的项目中我们的认证信

息其实是token，而token并不是存储中cookie中，并且需要前端代码去把token设置到请求头中才可

以，所以CSRF攻击也就不用担心了。

## 原理（看图）

时序图

![](https://drawingbed-686.pages.dev/myblog/202412091712835.png)

认证流程

![](https://drawingbed-686.pages.dev/myblog/202412091733739.png)

通俗易懂

![](https://drawingbed-686.pages.dev/myblog/202412091735295.png)

过滤链

![](https://drawingbed-686.pages.dev/myblog/202412091737692.png)

通俗易懂2

![](https://drawingbed-686.pages.dev/myblog/202412091740565.png)

## 认证流程及鉴权流程（以后深入学习的时候再去了解）

https://blog.csdn.net/qq_60264381/article/details/123071739




参考资料：

1、[三更学堂（springsecurity）](https://www.bilibili.com/video/BV1mm4y1X7Hc/?spm_id_from=333.337.search-card.all.click&vd_source=834d9d69a86c55d6acbaf9e5dbe37bb2)

2、[SpringSecurity中文文档](https://springdoc.cn/spring-security/servlet/authentication/architecture.html)

3、http://niocoder.com/2018/01/02/Spring-Security源码分析一-Spring-Security认证过程/ 「龙飞」

4、通俗易懂 https://www.cnblogs.com/qiantao/p/14605154.html

5、通俗易懂2 https://www.cnblogs.com/CF1314/p/14766623.html

6、认证流程及鉴权流程 https://blog.csdn.net/qq_60264381/article/details/123071739