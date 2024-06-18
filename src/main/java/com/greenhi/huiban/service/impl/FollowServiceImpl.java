package com.greenhi.huiban.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.greenhi.huiban.entity.Conference;
import com.greenhi.huiban.entity.Follow;
import com.greenhi.huiban.mapper.FollowMapper;
import com.greenhi.huiban.service.FollowService;
import com.greenhi.huiban.service.UserService;
import com.greenhi.huiban.unit.Result;
import com.greenhi.huiban.unit.ResultEnum;
import com.greenhi.huiban.unit.ResultUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowServiceImpl extends ServiceImpl<FollowMapper, Follow> implements FollowService {

    @Autowired
    private UserService service;

    @Override
    public Result add(Integer uid, Integer cid) {
        if (getOne(new QueryWrapper<Follow>()
                .eq("uid", uid)
                .eq("cid",cid)
        ) == null) {
            Follow follow = new Follow();
            follow.setUid(uid);
            follow.setCid(cid);
            save(follow);
            return ResultUtil.success("关注数据添加成功");
        } else {
            return ResultUtil.error(ResultEnum.DATA_IS_EXISTS.getCode(), ResultEnum.DATA_IS_EXISTS.getMsg());
        }
    }

    @Override
    public Result delete(Integer uid, Integer cid) {
        if (getOne(new QueryWrapper<Follow>()
                .eq("uid", uid)
                .eq("cid", cid)
        ) == null){
            return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
        }
        baseMapper.deleteByUidAndCid(uid,cid);
        return ResultUtil.success("关注数据已经删除");
    }

    @Override
    public Result selectByUidCon(Integer uid) {
        List<Conference> conferences = baseMapper.selectByUidCon(uid);
        return ResultUtil.success(conferences);
    }

    @Override
    public Result selectByUidJor(Integer uid) {
        List<Conference> conferences = baseMapper.selectByUidJor(uid);
        return ResultUtil.success(conferences);
    }

//    @Override
//    public Result selectByMid(Integer mid) {
//        List<User> users = baseMapper.selectByMid(mid);
//        return ResultUtil.success(users);
//    }

    @Override
    public Result selectOne(Integer uid, Integer cid) {
        Follow follow = getOne(new QueryWrapper<Follow>()
                .eq("uid", uid)
                .eq("cid", cid));
        if (follow == null){
            return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
        }
        return ResultUtil.success(follow);
    }
}
