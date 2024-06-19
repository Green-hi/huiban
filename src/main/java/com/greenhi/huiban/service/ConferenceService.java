package com.greenhi.huiban.service;

import com.greenhi.huiban.entity.Conference;
import com.greenhi.huiban.unit.Result;
import com.baomidou.mybatisplus.extension.service.IService;

public interface ConferenceService extends IService<Conference> {

    Result add(Conference conference);

    Result delete(String id);

    Result getAllPagingCon(Integer pageNo, Integer pageSize);

    Result getAllPagingJor(Integer pageNo, Integer pageSize);

    Result selectById(String id);

    Result selectByName(String name);

    Result update(Conference conference);

    Result countNum();

}
