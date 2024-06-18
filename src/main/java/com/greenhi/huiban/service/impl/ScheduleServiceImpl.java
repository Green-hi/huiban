package com.greenhi.huiban.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.greenhi.huiban.entity.Schedule;
import com.greenhi.huiban.service.ScheduleService;
import com.greenhi.huiban.unit.Result;
import com.greenhi.huiban.unit.ResultEnum;
import com.greenhi.huiban.unit.ResultUtil;
import com.greenhi.huiban.mapper.ScheduleMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScheduleServiceImpl extends ServiceImpl<ScheduleMapper, Schedule> implements ScheduleService {

    @Override
    public Result add(Schedule schedule) {
        if (getOne(new QueryWrapper<Schedule>()
                .eq("id", schedule.getId())
        ) == null) {
            save(schedule);
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("msg","计划数据添加成功");
            resultMap.put("id", schedule.getId());
            return ResultUtil.success(resultMap);
        } else {
            return ResultUtil.error(ResultEnum.DATA_IS_EXISTS.getCode(), ResultEnum.DATA_IS_EXISTS.getMsg());
        }
    }

    @Override
    public Result delete(String email, String scheduleInfo) {
        if (getOne(new QueryWrapper<Schedule>()
                .eq("email", email)
                .eq("schedule_info", scheduleInfo)
        ) != null) {
            baseMapper.delete(new QueryWrapper<Schedule>()
                    .eq("email", email)
                    .eq("schedule_info", scheduleInfo));
            return ResultUtil.success("计划数据已经删除");
        } else {
            return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
        }
    }

    @Override
    public Result getAllPaging(Integer pageNo, Integer pageSize) {
        IPage<Schedule> mPage = new Page<>(pageNo, pageSize);
        QueryWrapper<Schedule> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("id");
        IPage<Schedule> DynamicIPage = page(mPage, wrapper);
        if (DynamicIPage != null) {
            return ResultUtil.success(DynamicIPage);
        }
        return ResultUtil.error(ResultEnum.UNKNOWN_ERROR.getCode(), ResultEnum.UNKNOWN_ERROR.getMsg());
    }

    @Override
    public Result selectDynamicOne(Integer id) {
        Schedule scheduleBase = getOne(new QueryWrapper<Schedule>()
                .eq("id", id));
        if (scheduleBase == null) {
            return ResultUtil.error(ResultEnum.DATA_IS_EXISTS.getCode(), ResultEnum.DATA_IS_EXISTS.getMsg());
        } else {
            return ResultUtil.success(scheduleBase);
        }
    }

    @Override
    public Result update(Schedule schedule) {
        if (getOne(new QueryWrapper<Schedule>()
                .eq("email", schedule.getEmail())
                .eq("schedule_info", schedule.getScheduleInfo())
        ) != null) {
            baseMapper.update(schedule, new QueryWrapper<Schedule>()
                    .eq("email", schedule.getEmail())
                    .eq("schedule_info", schedule.getScheduleInfo()));
            return ResultUtil.success("计划数据更新成功");
        }
        return ResultUtil.error(ResultEnum.DATA_NOT_EXISTS.getCode(), ResultEnum.DATA_NOT_EXISTS.getMsg());
    }

    @Override
    public Result selectByEmail(String email) {
        List<Schedule> schedules = null;
        try {
            schedules = baseMapper.selectList(new QueryWrapper<Schedule>()
                    .eq("email",email));
        } catch (Exception e) {
            e.printStackTrace();
            return ResultUtil.error(ResultEnum.SQL_EXCEPTION.getCode(), ResultEnum.SQL_EXCEPTION.getMsg());
        }
        return ResultUtil.success(schedules);
    }

}
