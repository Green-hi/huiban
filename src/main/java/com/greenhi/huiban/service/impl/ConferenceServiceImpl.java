package com.greenhi.huiban.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.greenhi.huiban.entity.Conference;
import com.greenhi.huiban.mapper.ConferenceMapper;
import com.greenhi.huiban.service.ConferenceService;
import com.greenhi.huiban.unit.Result;
import com.greenhi.huiban.unit.ResultEnum;
import com.greenhi.huiban.unit.ResultUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConferenceServiceImpl extends ServiceImpl<ConferenceMapper, Conference> implements ConferenceService {
    @Override
    public Result add(Conference conference) {
        if (getOne(new QueryWrapper<Conference>()
                .eq("id", conference.getId())
        ) == null) {
            save(conference);
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("msg","会议数据添加成功");
            resultMap.put("id", conference.getId());
            return ResultUtil.success(resultMap);
        } else {
            return ResultUtil.error(ResultEnum.DATA_IS_EXISTS.getCode(), ResultEnum.DATA_IS_EXISTS.getMsg());
        }
    }

    @Override
    public Result delete(String id) {
        if (getOne(new QueryWrapper<Conference>()
                .eq("id", id)
        ) != null) {
            baseMapper.delete(new QueryWrapper<Conference>().eq("id",id));
            return ResultUtil.success("会议数据已经删除");
        } else {
            return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
        }
    }

    @Override
    public Result getAllPagingCon(Integer pageNo, Integer pageSize) {
        IPage<Conference> mPage = new Page<>(pageNo, pageSize);
        QueryWrapper<Conference> wrapper = new QueryWrapper<Conference>().eq("type",0);
//        wrapper.orderByAsc("id");
        IPage<Conference> PoetryIPage = page(mPage, wrapper);
        if(PoetryIPage != null){
            return ResultUtil.success(PoetryIPage);
        }
        return ResultUtil.error(ResultEnum.UNKNOWN_ERROR.getCode(), ResultEnum.UNKNOWN_ERROR.getMsg());
    }

    @Override
    public Result getAllPagingJor(Integer pageNo, Integer pageSize) {
        IPage<Conference> mPage = new Page<>(pageNo, pageSize);
        QueryWrapper<Conference> wrapper = new QueryWrapper<Conference>().eq("type",1);
//        wrapper.orderByAsc("id");
        IPage<Conference> PoetryIPage = page(mPage, wrapper);
        if(PoetryIPage != null){
            return ResultUtil.success(PoetryIPage);
        }
        return ResultUtil.error(ResultEnum.UNKNOWN_ERROR.getCode(), ResultEnum.UNKNOWN_ERROR.getMsg());
    }

    @Override
    public Result selectById(String id) {
        Conference conferenceBase = getOne(new QueryWrapper<Conference>()
                .eq("id", id));
        if (conferenceBase == null) {
            return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
        } else {
            return ResultUtil.success(conferenceBase);
        }
    }

    @Override
    public Result selectByName(String name) {
        List<Conference> conferenceBase = baseMapper.selectByName(name);
        if (conferenceBase == null) {
            return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
        } else {
            return ResultUtil.success(conferenceBase);
        }
    }

    @Override
    public Result update(Conference Conference) {
        if (getOne(new QueryWrapper<Conference>()
                .eq("id", Conference.getId())
        ) != null) {
            baseMapper.update(Conference, new QueryWrapper<Conference>()
                    .eq("id", Conference.getId()));
            return ResultUtil.success("会议数据更新成功");
        }
        return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
    }

}
