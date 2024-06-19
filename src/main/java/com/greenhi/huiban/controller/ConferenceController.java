package com.greenhi.huiban.controller;

import com.greenhi.huiban.entity.Conference;
import com.greenhi.huiban.service.ConferenceService;
import com.greenhi.huiban.unit.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conference")
public class ConferenceController {
    @Autowired
    private ConferenceService service;

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public Result add(@RequestBody Conference Conference){
        return service.add(Conference);
    }

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public Result delete(String id){
        return service.delete(id);
    }

    @RequestMapping(value = "/getAllPagingCon",method = RequestMethod.GET)
    public Result getAllPagingCon(Integer pageNo, Integer pageSize){
        return service.getAllPagingCon(pageNo,pageSize) ;
    }

    @RequestMapping(value = "/getAllPagingJor",method = RequestMethod.GET)
    public Result getAllPagingJor(Integer pageNo, Integer pageSize){
        return service.getAllPagingJor(pageNo,pageSize) ;
    }

    @RequestMapping(value = "/selectById",method = RequestMethod.GET)
    public Result selectById(String id){
        return service.selectById(id);
    }

    @RequestMapping(value = "/selectByName",method = RequestMethod.GET)
    public Result selectByName(String name){
        return service.selectByName(name);
    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public Result update(@RequestBody Conference conference){
        return service.update(conference);
    }

    @RequestMapping(value = "/count",method = RequestMethod.GET)
    public Result count(){
        return service.countNum();
    }

}

