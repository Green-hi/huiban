/*
 Navicat Premium Data Transfer

 Source Server         : mysql_cloud
 Source Server Type    : MySQL
 Source Server Version : 50744
 Source Host           : 47.100.138.113:3306
 Source Schema         : huiban

 Target Server Type    : MySQL
 Target Server Version : 50744
 File Encoding         : 65001

 Date: 17/06/2024 21:09:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`uid`, `cid`) USING BTREE,
  INDEX `FK_focus_cid`(`cid`) USING BTREE,
  CONSTRAINT `FK_focus_cid` FOREIGN KEY (`cid`) REFERENCES `conference` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_focus_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES (4, 18888, '2024-06-17 21:06:23', '2024-06-17 21:06:25');
INSERT INTO `follow` VALUES (5, 18696, '2024-06-17 21:06:08', '2024-06-17 21:06:06');

SET FOREIGN_KEY_CHECKS = 1;
