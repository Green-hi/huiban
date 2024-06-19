package com.greenhi.huiban.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.ShearCaptcha;
import com.greenhi.huiban.entity.User;
import com.greenhi.huiban.service.UserService;
import com.greenhi.huiban.unit.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public Result add(@RequestBody User user){
        return service.add(user);
    }

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public Result delete(String uid){
        return service.delete(uid);
    }

    @RequestMapping(value = "/getAllPaging",method = RequestMethod.GET)
    public Result getAllPaging(Integer pageNo, Integer pageSize){
        return service.getAllPaging(pageNo,pageSize) ;
    }

    @RequestMapping(value = "/selectOneByUid",method = RequestMethod.GET)
    public Result selectOneByUid(String uid){
        return service.selectOneByUid(uid) ;
    }

    @RequestMapping(value = "/selectOneByEmail",method = RequestMethod.GET)
    public Result selectOneByEmail(String email){
        return service.selectOneByEmail(email) ;
    }

    @RequestMapping(value = "/selectOneById",method = RequestMethod.GET)
    public Result selectOneById(String id){
        return service.selectOneById(id) ;
    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public Result update(@RequestBody User user){
        return service.update(user);
    }

    @GetMapping("/verify")
    public void verify(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("image/jpeg");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        //定义图形验证码的长、宽、验证码字符数、干扰线宽度
        ShearCaptcha shearCaptcha = CaptchaUtil.createShearCaptcha(120, 40, 4, 4);
        //图形验证码写出，可以写出到文件，也可以写出到流
        shearCaptcha.write(response.getOutputStream());
        //获取验证码中的文字内容
        request.getSession().setAttribute("verifyCode", shearCaptcha.getCode());
    }

    @RequestMapping(value = "/count",method = RequestMethod.GET)
    public Result count(){
        return service.countNum();
    }

}

