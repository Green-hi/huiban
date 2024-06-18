package com.greenhi.huiban.controller;

import com.greenhi.huiban.service.FollowService;
import com.greenhi.huiban.unit.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private FollowService service;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Result add(Integer uid, Integer cid) {
        return service.add(uid, cid);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Result delete(Integer uid, Integer cid) {
        return service.delete(uid, cid);
    }

    @RequestMapping(value = "/selectByUidCon", method = RequestMethod.GET)
    public Result selectByUidCon(Integer uid) {
        return service.selectByUidCon(uid);
    }

    @RequestMapping(value = "/selectByUidJor", method = RequestMethod.GET)
    public Result selectByUidJor(Integer uid) {
        return service.selectByUidJor(uid);
    }

//    @RequestMapping(value = "/selectByMid", method = RequestMethod.GET)
//    public Result selectByFid(Integer mid) {
//        return service.selectByMid(mid);
//    }

    @RequestMapping(value = "/selectOne", method = RequestMethod.GET)
    public Result selectOne(Integer uid, Integer cid) {
        return service.selectOne(uid, cid);
    }

}

