package com.greenhi.huiban.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Conference implements Serializable {

    private static final long serialVersionUID=1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("name")
    private String name;

    @TableField("short_name")
    private String shortName;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @TableField(value = "due_date")
    private Date dueDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @TableField(value = "info_date")
    private Date infoDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @TableField(value = "meeting_date")
    private Date meetingDate;

    @TableField("delay")
    private String delay;

    @TableField("location")
    private String location;

    @TableField("session")
    private Integer session;

    @TableField("views")
    private Integer views;

    @TableField("follows")
    private Integer follows;

    @TableField("joins")
    private Integer joins;

    @TableField("theme")
    private String theme;

    @TableField("CCF_level")
    private String CCFLevel;

    @TableField("CORE_level")
    private String CORELevel;

    @TableField("QUALIS_level")
    private String QUALISLevel;

    @TableField("introduction")
    private String introduction;

    @TableField("impact_factor")
    private String impactFactor;

    @TableField("publisher")
    private String publisher;

    @TableField("issn")
    private String issn;

    @TableField("link")
    private String link;

    @TableField("type")
    private String type;

}
