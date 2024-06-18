/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : huiban

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 13/06/2024 17:42:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for follow_meeting
-- ----------------------------
DROP TABLE IF EXISTS `follow_meeting`;
CREATE TABLE `follow_meeting`  (
  `uid` int NOT NULL,
  `mid` int NOT NULL,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`uid`, `mid`) USING BTREE,
  INDEX `FK_follow_meeting_mid`(`mid`) USING BTREE,
  CONSTRAINT `FK_follow_meeting_mid` FOREIGN KEY (`mid`) REFERENCES `conference` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_follow_meeting_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for conference
-- ----------------------------
DROP TABLE IF EXISTS `conference`;
CREATE TABLE `conference`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `short_name` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `due_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `info_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `meeting_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `location` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `theme` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `CCF_level` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `CORE_level` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `QUALIS_level` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `brief_introduction` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `start_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_date` datetime NULL DEFAULT '0000-00-00 00:00:00',
  `schedule_info` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '无',
  `color` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0f000000',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_schedule_uid`(`uid`) USING BTREE,
  CONSTRAINT `FK_schedule_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `occupation` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未知',
  `brief_introduction` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
