package com.greenhi.huiban.service;

import com.greenhi.huiban.entity.User;
import com.greenhi.huiban.unit.Result;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

public interface UserService extends IService<User> {
    Result add(User userBase);

    Result delete(String uid);

    Result getAllPaging(Integer pageNo, Integer pageSize);

    Result selectOneByUid(String uid);

    Result selectOneByEmail(String email);

    Result selectOneById(String id);

    Result update(User userBase);

    Result countNum();
}
