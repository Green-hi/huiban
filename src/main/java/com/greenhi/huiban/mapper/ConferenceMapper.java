package com.greenhi.huiban.mapper;

import com.greenhi.huiban.entity.Conference;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

public interface ConferenceMapper extends BaseMapper<Conference> {
    List<Conference> selectByName(String name);
    Integer countView();
}
