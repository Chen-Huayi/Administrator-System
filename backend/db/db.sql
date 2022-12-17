/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : my_db

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 19/10/2022 04:48:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `comment_count` int(0) NOT NULL DEFAULT 0,
  `cover_images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NULL DEFAULT NULL,
  `like_count` int(0) NOT NULL DEFAULT 0,
  `pubdate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `read_count` int(0) NOT NULL DEFAULT 0,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `status` int(0) NOT NULL DEFAULT 2,
  `available` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0: fail to access\n1: OK',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `articles_id_uindex`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, 0, 'http://geek.itheima.net/resources/images/15.jpg', 0, '2022/10/18 02:08:06', 0, '10086', 2, 1, '<p>0</p>');
INSERT INTO `articles` VALUES (2, 0, 'http://geek.itheima.net/resources/images/15.jpg', 0, '2022-10-17 01:44:53.682', 0, 'test 666', 2, 0, '<p>3123</p>');
INSERT INTO `articles` VALUES (3, 0, 'http://geek.itheima.net/resources/images/15.jpg', 0, '2022/10/18 01:47:44', 0, 'test title 38', 2, 1, '<p>gbhv</p>');
INSERT INTO `articles` VALUES (4, 0, 'http://geek.itheima.net/resources/images/15.jpg', 0, '2022-10-17 01:44:33', 0, 'lzx6', 2, 0, '<p>EFSFE</p>');
INSERT INTO `articles` VALUES (5, 0, 'http://geek.itheima.net/resources/images/15.jpg', 0, '2022-10-03 08:24:00', 0, 'lzx 23', 2, 1, '23岁');
INSERT INTO `articles` VALUES (7, 0, 'http://geek.itheima.net/resources/images/15.jpg', 0, '2022-10-07 03:50:18.819', 0, 'wyy6666', 2, 0, '<p>5555</p>');
INSERT INTO `articles` VALUES (14, 0, '', 0, '2022-10-03 23:46:35.602', 0, 'fgxccvgh', 2, 0, '<p>This is content</p>');
INSERT INTO `articles` VALUES (15, 0, '', 0, '2022-10-04 00:23:20.650', 0, '6412561', 2, 0, '<p>This is content</p>');
INSERT INTO `articles` VALUES (17, 0, '', 0, '2022-10-04 03:41:25.039', 0, '45151', 2, 0, '<p>This is content</p>');
INSERT INTO `articles` VALUES (18, 0, '', 0, '2022-10-04 03:42:37.868', 0, '4891514', 2, 0, '<p>This is content</p>');
INSERT INTO `articles` VALUES (19, 0, '', 0, '2022-10-07 03:01:44.252', 0, '撒女内', 2, 0, '<p>sa nv nei</p>');
INSERT INTO `articles` VALUES (20, 0, '', 0, '2022-10-17 00:01:44.147', 0, '6546', 2, 0, '<p>hhh</p>');
INSERT INTO `articles` VALUES (21, 0, '', 0, '2022-10-17 00:03:53.299', 0, 'szw', 2, 0, '<p>666</p>');
INSERT INTO `articles` VALUES (22, 0, '', 0, '2022-10-17 01:46:32.371', 0, 'szw', 2, 0, '<p>wsz</p>');
INSERT INTO `articles` VALUES (23, 0, '', 0, '2022-10-17 01:50:24.308', 0, 'swz', 2, 0, '<p>dfAf</p>');
INSERT INTO `articles` VALUES (24, 0, '', 0, '2022-10-17 02:00:09.931', 0, 'gasdrgasr', 2, 0, '<p>argghd</p>');
INSERT INTO `articles` VALUES (25, 0, '', 0, '2022-9-1 2:3:15', 0, 'hahaha', 2, 0, '<p>888</p>');
INSERT INTO `articles` VALUES (26, 0, '', 0, '2022/10/17', 0, 'fharth', 2, 0, '<p>rGREGRe</p>');
INSERT INTO `articles` VALUES (27, 0, '', 0, '2022/10/17 02:10:41', 0, 'rghdhzhzrd', 2, 0, '<p>xfbz</p>');
INSERT INTO `articles` VALUES (28, 0, '', 0, '2022/10/17 02:29:09', 0, '林子焮', 2, 0, '<p>4856<strong>41</strong>56</p>');

-- ----------------------------
-- Table structure for login_history
-- ----------------------------
DROP TABLE IF EXISTS `login_history`;
CREATE TABLE `login_history`  (
  `id` int(0) NOT NULL DEFAULT 1,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  PRIMARY KEY (`username`) USING BTREE,
  UNIQUE INDEX `login_history_id_uindex`(`id`) USING BTREE,
  UNIQUE INDEX `login_history_username_uindex`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login_history
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_id_uindex`(`id`) USING BTREE,
  UNIQUE INDEX `users_username_uindex`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (15, 'szw', '$2a$07$2cvKZSPA0XYPdBOHvkJ07u4LnPBUltPGgKAMcJtrQ5jlLemd.xmlu', '919602906@qq.com', '+86 18846063519', 'male');
INSERT INTO `users` VALUES (16, 'llw', '$2a$07$FAZHhrGeSCpcK7vTmgusqObNNtojZcnzVX.0EnQzUo4zKIsaPSKIu', '1294368100@qq.com', '+86 13559196198', 'female');
INSERT INTO `users` VALUES (17, 'cqh', '$2a$07$hav4ouH2DhiSJmLxcMWFvejE0UNUS1BdHOtJ1DnOK1th6mJyDIcKS', '1577878867@qq.com', '+86 17720795991', 'male');
INSERT INTO `users` VALUES (18, 'wyy', '$2a$07$CbfK7RPxfN3RCHPoDQcn1.MuKYbCK/Z1jCxQQRJe.J5qtHU1MMr4G', '970197246@qq.com', '+86 18650336668', 'female');

SET FOREIGN_KEY_CHECKS = 1;
