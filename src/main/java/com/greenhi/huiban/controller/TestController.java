package com.greenhi.huiban.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class TestController {

    @ResponseBody
    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String hello(){
        return "<h1 align=\"center\"style=\"color:red;font-size:50px\"><i>Hello! PeachGarden</i></h1>";
    }

    @RequestMapping(value = {"/","/huiban","mainpage.html"})
    public String index(){
        return "mainpage";
    }
    @RequestMapping(value = {"/detail_hy","/detail_hy.html"})
    public String detail_hy(){
        return "detail_hy";
    }
    @RequestMapping(value = {"/detail_qk.html","/detail_qk"})
    public String detail_qk(){
        return "detail_qk";
    }
    @RequestMapping(value = {"/detail_search.html","/detail_search"})
    public String detail_search(){
        return "detail_search";
    }
    @RequestMapping(value = {"/login.html","/login"})
    public String login(){
        return "login";
    }
    @RequestMapping(value = {"/more_hy.html","/more_hy"})
    public String more_hy(){
        return "more_hy";
    }
    @RequestMapping(value = {"/more_qk.html","/more_qk"})
    public String more_qk(){
        return "more_qk";
    }
    @RequestMapping(value = {"/person.html","/person"})
    public String person(){
        return "person";
    }
    @RequestMapping(value = {"/register.html","/register"})
    public String register(){
        return "register";
    }
}
