/*
 Navicat MySQL Data Transfer

 Source Server         : deliciously
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : localhost:3306
 Source Schema         : deliciously

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 08/03/2021 00:58:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Restaurant
-- ----------------------------
DROP TABLE IF EXISTS `Restaurant`;
CREATE TABLE `Restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `town` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `details` set('Sur le pouce','Comfort food','Carnivore','France','Tradi','Cuisine locale') DEFAULT NULL,
  `mainPicture` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Restaurant
-- ----------------------------
BEGIN;
INSERT INTO `Restaurant` VALUES (1, 'Dumbo', 'Burgers', '64 rue Jean-Baptiste Pigalle, 75009', 'Paris', 10, 'Sur le pouce,Comfort food,Carnivore', 'dumbo-001.jpeg');
INSERT INTO `Restaurant` VALUES (2, 'Bouillon 47', 'Gastro tradi', '47 rue M. de Rochechouart, 75009', 'Paris', 40, 'France,Tradi,Cuisine locale', 'bouillon47-001.jpg');
COMMIT;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of roles
-- ----------------------------
BEGIN;
INSERT INTO `roles` VALUES (1, 'user', '2021-03-06 23:31:48', '2021-03-06 23:31:48');
INSERT INTO `roles` VALUES (2, 'admin', '2021-03-06 23:31:48', '2021-03-06 23:31:48');
COMMIT;

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
BEGIN;
INSERT INTO `user_roles` VALUES ('2021-03-07 23:48:26', '2021-03-07 23:48:26', 1, 16);
INSERT INTO `user_roles` VALUES ('2021-03-07 23:48:54', '2021-03-07 23:48:54', 2, 17);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (16, 'user', '$2a$08$VisGFZPUKw9o0BxzXLQeB.yS.L77VCFV0viQ.YGXcLChmq0W2gCEq', '2021-03-07 23:48:26', '2021-03-07 23:48:26');
INSERT INTO `users` VALUES (17, 'admin', '$2a$08$Qvlbai0Z2e4tZj2C3ZLNGeSaC1cugNXZJxejQVg7pgHnli7mr23WK', '2021-03-07 23:48:54', '2021-03-07 23:48:54');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
