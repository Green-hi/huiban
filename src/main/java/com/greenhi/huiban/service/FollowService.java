package com.greenhi.huiban.service;

import com.greenhi.huiban.entity.Follow;
import com.baomidou.mybatisplus.extension.service.IService;
import com.greenhi.huiban.unit.Result;

public interface FollowService extends IService<Follow> {

    Result add(Integer uid,Integer mid);

    Result delete(Integer uid,Integer cid);

    Result selectByUidCon(Integer uid);
    Result selectByUidJor(Integer uid);

//    Result selectByMid(Integer mid);

    Result selectOne(Integer uid, Integer mid);

}
