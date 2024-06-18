package com.greenhi.huiban.mapper;

import com.greenhi.huiban.entity.Conference;
import com.greenhi.huiban.entity.Follow;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FollowMapper extends BaseMapper<Follow> {
    void deleteByUidAndCid(Integer uid, Integer cid);
    List<Conference> selectByUidCon(Integer uid);
    List<Conference> selectByUidJor(Integer uid);
//    List<User> selectByMid(Integer mid);

}
