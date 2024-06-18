package com.greenhi.huiban.controller;

import com.greenhi.huiban.entity.Schedule;
import com.greenhi.huiban.service.ScheduleService;
import com.greenhi.huiban.unit.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    private ScheduleService service;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Result add(@RequestBody Schedule schedule) {
        return service.add(schedule);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Result delete(String email, String scheduleInfo) {
        return service.delete(email, scheduleInfo);
    }

    @RequestMapping(value = "/getAllPaging", method = RequestMethod.GET)
    public Result getAllPaging(Integer pageNo, Integer pageSize) {
        return service.getAllPaging(pageNo, pageSize);
    }

    @RequestMapping(value = "/selectOneById", method = RequestMethod.GET)
    public Result selectOneById(Integer id) {
        return service.selectDynamicOne(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public Result update(@RequestBody Schedule schedule) {
        return service.update(schedule);
    }

    @RequestMapping(value = "/selectByEmail", method = RequestMethod.GET)
    public Result selectByEmail(String email) {
        return service.selectByEmail(email);
    }

}
