package com.greenhi.huiban.service;

import com.greenhi.huiban.entity.Schedule;
import com.greenhi.huiban.unit.Result;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

public interface ScheduleService extends IService<Schedule> {
    Result add(Schedule schedule);

    Result delete(String email, String scheduleInfo);

    Result getAllPaging(Integer pageNo, Integer pageSize);

    Result selectDynamicOne(Integer id);

    Result update(Schedule schedule);

    Result selectByEmail(String email);


}
