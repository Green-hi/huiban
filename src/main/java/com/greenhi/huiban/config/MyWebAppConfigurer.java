package com.greenhi.huiban.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 静态资源本地映射
 */

@PropertySource({"classpath:application-dev.properties"})
@Configuration
public class MyWebAppConfigurer implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img_user_head/**").addResourceLocations("file:/data/peachland/img_user_head/");
        registry.addResourceHandler("/img_dynamic/**").addResourceLocations("file:/data/peachland/img_dynamic/");
        registry.addResourceHandler("/course_video/**").addResourceLocations("file:/data/peachland/course_video/");
        registry.addResourceHandler("/shiyan/**").addResourceLocations("file:/data/peachland/shiyan/");
    }

    //指定允许跨域的多个域
    private static final String[] ALLOWED_ORIGINS = {"*"};
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        //添加跨域的cors配置
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").   //可以被跨域的路径,/**表示无限制,
                        allowedOrigins(ALLOWED_ORIGINS). //允许跨域的域名，如果值为*,则表示允许任何域名使用
                        allowedMethods("*"). //允许任何方法，值可以为： "GET", "POST" ...
                        allowedHeaders("*"). //允许任何请求头
                        allowCredentials(true). //允许带cookie信息
                        exposedHeaders(HttpHeaders.SET_COOKIE).maxAge(3600L); //maxAge(3600):表示3600秒内，不需要再发送预检验请求，是结果可以缓存的时长
            }
        };
    }

}