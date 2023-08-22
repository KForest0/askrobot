/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : chat

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 22/08/2023 13:18:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer`  (
  `answer_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '答案的唯一标识符（主键）',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '答案的内容',
  `create_time` bigint NULL DEFAULT NULL,
  `update_time` bigint NULL DEFAULT NULL,
  `question_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问题的标识符（外键，关联到问题表的question_id）',
  `del_flag` int(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of answer
-- ----------------------------
INSERT INTO `answer` VALUES ('0051c00b-9797-4da7-9625-0b6d6aa5e5fe', 'Hello! How may I assist you today?', 1687261194220, 1687261194220, '075b412d-c79d-4c36-bb36-dfa0c3beea14', 0000000000);
INSERT INTO `answer` VALUES ('0b9d0dc9-78c5-4313-8296-5894309909b4', '以下是使用Java编写斐波那契数列的代码示例：\n\n```java\npublic class Fibonacci {\n    public static void main(String[] args) {\n        int n = 10; // 计算斐波那契数列的前n项\n        for (int i = 0; i < n; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n    }\n\n    public static int fibonacci(int n) {\n        if (n == 0) {\n            return 0;\n        } else if (n == 1) {\n            return 1;\n        } else {\n            return fibonacci(n-1) + fibonacci(n-2);\n        }\n    }\n}\n```\n\n在上面的代码中，我们先定义了一个 `n` 变量，表示计算斐波那契数列的前 `n` 项。在 `main` 方法中，我们使用一个循环来依次计算每一项斐波那契数列并输出。\n\n在 `fibonacci` 方法中，我们使用递归来计算斐波那契数列的第 `n` 项。当 `n` 为0或1时，直接返回相应的结果；否则，我们使用递归来计算第 `n-1` 和 `n-2` 项斐波那契数列的值，并将它们相加作为第 `n` 项的值。', 1687400394920, 1687400394920, 'c517d868-1e81-4344-be3f-8b23e162a137', 0000000000);
INSERT INTO `answer` VALUES ('1a5ba901-138f-4f09-b1a8-c98d251566d0', '以下是使用Java编写的八皇后问题代码示例：\n\n```java\npublic class EightQueens {\n    private static final int BOARD_SIZE = 8;\n    private static final int UNASSIGNED = 0;\n    private int[][] board;\n\n    public EightQueens() {\n        board = new int[BOARD_SIZE][BOARD_SIZE];\n    }\n\n    public boolean solve() {\n        if (solve(0)) {\n            printBoard();\n            return true;\n        }\n        return false;\n    }\n\n    private boolean solve(int colIndex) {\n        if (colIndex == BOARD_SIZE) {\n            return true;\n        }\n        for (int i = 0; i < BOARD_SIZE; i++) {\n            if (canPlaceQueen(i, colIndex)) {\n                placeQueen(i, colIndex);\n                if (solve(colIndex+1)) {\n                    return true;\n                }\n                // backtrack\n                removeQueen(i, colIndex);\n            }\n        }\n        return false;\n    }\n\n    private boolean canPlaceQueen(int rowIndex, int colIndex) {\n        for (int i = 0; i < colIndex; i++) {\n            if (board[rowIndex][i] == 1) {\n                return false;\n            }\n        }\n        for (int i = rowIndex, j = colIndex; i >= 0 && j >= 0; i--, j--) {\n            if (board[i][j] == 1) {\n', 1687261413775, 1687261413775, 'db28293a-e1dd-4f3f-8201-2f2ba13b9b68', 0000000000);
INSERT INTO `answer` VALUES ('33571f00-7e1f-47a6-8fc3-1f4687d912d3', '0', 1687598636835, 1687598636835, 'fa1d8089-2dba-4784-a60f-ad9a4123a67b', 0000000000);
INSERT INTO `answer` VALUES ('48960021-5a24-4d52-b83f-622250e7be1a', '81', 1687611101339, 1687611101339, 'e72075e2-bda3-44fa-b712-edca4b385029', 0000000000);
INSERT INTO `answer` VALUES ('5d9e93aa-36c6-4d76-91b3-176e956a19cc', '倾国倾城美若仙，\n芳华永驻眉眼间；\n风华绝代倾世色，\n惊艳天地动心魂。', 1687261544440, 1687400164713, '189ff690-01ac-4923-aefc-cec470c55226', 0000000000);
INSERT INTO `answer` VALUES ('69d6591f-527a-440f-9d2b-69ca9371ec85', '铁壁铜墙凛严军，\n旌旗招展威风凛；\n战鼓擂动士气昂，\n铿锵步伐铁甲鸣。', 1687598602568, 1687598605691, 'ab4da6ad-d15b-4df8-b3a0-641e829ef378', 0000000000);
INSERT INTO `answer` VALUES ('787838ed-f662-43f6-9e3b-a5efc8188c9c', 'Hello there! How can I assist you today?', 1687406011139, 1687406011139, 'dba20f0a-c5f9-40cd-81a9-465db0e21434', 0000000000);
INSERT INTO `answer` VALUES ('97c2fd5c-409c-4075-9855-7e263b656677', '99-8=91.', 1687649737664, 1687649737664, 'f63aae46-cecb-4dbd-accb-56c1079123a2', 0000000000);
INSERT INTO `answer` VALUES ('b5f7de66-e7b4-4433-94e0-50a0eb02a3ca', '8+8=16.', 1687406031553, 1687406031553, '6196f959-41bd-4bba-a49e-d64f14954a6c', 0000000000);
INSERT INTO `answer` VALUES ('c7e35a0c-c29d-4e51-9cb0-0ca8589c8707', '16', 1687261201823, 1687261201823, '3b33d57d-b301-4af0-a059-2bcb97d9f0a2', 0000000000);
INSERT INTO `answer` VALUES ('c979f476-f674-4453-89d2-685fcc20cabf', '18', 1687270931692, 1687400158260, '6d8a5ae2-fb83-4904-b5a3-11b7a5c55583', 0000000000);
INSERT INTO `answer` VALUES ('ce90e6f1-8c57-4a2b-adde-f0e34c59a062', 'The result of 5+5 is 10.', 1687261318746, 1687261318746, '79f6ce26-b388-4e7c-9760-42a4cc4d5578', 0000000000);

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item`  (
  `item_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '对话的唯一标识符（主键）',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` bigint NOT NULL COMMENT '对话开始时间',
  `update_time` bigint NOT NULL COMMENT '对话结束时间',
  `user_id` bigint NULL DEFAULT NULL,
  `del_flag` int NOT NULL,
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO `item` VALUES ('20d46fb1-63cf-476d-a02c-185ba9b260b3', 'hello', 1687406009121, 1687406009121, 1, 0);
INSERT INTO `item` VALUES ('2e3a2c3f-43ec-48bd-958a-65217c7634e8', '8+8=16', 1687261200841, 1687397619098, 1, 0);
INSERT INTO `item` VALUES ('c547e29a-a049-4b52-b65c-0f0c9a61a3a5', 'hello222', 1687261192342, 1687403065427, 1, 0);
INSERT INTO `item` VALUES ('d8146a0a-3bcd-4608-a87f-d538c219f04a', '写诗', 1687261541791, 1687400508498, 1, 0);
INSERT INTO `item` VALUES ('f0850f12-b075-4b63-abe4-2b8b22f4b37a', '9-9=', 1687598635353, 1687598635353, 1, 0);

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question`  (
  `question_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '问题的唯一标识符（主键）',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '问题的内容',
  `create_time` bigint NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint NULL DEFAULT NULL COMMENT '修改时间',
  `item_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '对话的标识符（外键，关联到对话表的conversation_id）',
  `del_flag` int NULL DEFAULT NULL,
  PRIMARY KEY (`question_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('075b412d-c79d-4c36-bb36-dfa0c3beea14', 'hello', 1687261192342, 1687261192342, 'c547e29a-a049-4b52-b65c-0f0c9a61a3a5', 0);
INSERT INTO `question` VALUES ('189ff690-01ac-4923-aefc-cec470c55226', '你可以编写一句诗吗，用于描写倾国倾城的美人', 1687261541791, 1687261541791, 'd8146a0a-3bcd-4608-a87f-d538c219f04a', 0);
INSERT INTO `question` VALUES ('3b33d57d-b301-4af0-a059-2bcb97d9f0a2', '8+8=', 1687261200841, 1687261200841, '2e3a2c3f-43ec-48bd-958a-65217c7634e8', 0);
INSERT INTO `question` VALUES ('6196f959-41bd-4bba-a49e-d64f14954a6c', '8+8=\n\n\n\n\n', 1687406030416, 1687406030416, '20d46fb1-63cf-476d-a02c-185ba9b260b3', 0);
INSERT INTO `question` VALUES ('6d8a5ae2-fb83-4904-b5a3-11b7a5c55583', '9+9=', 1687270930158, 1687270930158, '2e3a2c3f-43ec-48bd-958a-65217c7634e8', 0);
INSERT INTO `question` VALUES ('79f6ce26-b388-4e7c-9760-42a4cc4d5578', '5+5=', 1687261316312, 1687261316312, 'c547e29a-a049-4b52-b65c-0f0c9a61a3a5', 0);
INSERT INTO `question` VALUES ('ab4da6ad-d15b-4df8-b3a0-641e829ef378', '那如果我要描写军队的气势呢？', 1687598599287, 1687598599287, 'd8146a0a-3bcd-4608-a87f-d538c219f04a', 0);
INSERT INTO `question` VALUES ('c517d868-1e81-4344-be3f-8b23e162a137', '那你可以再写一个斐波那契数列吗', 1687400379163, 1687400379163, 'c547e29a-a049-4b52-b65c-0f0c9a61a3a5', 0);
INSERT INTO `question` VALUES ('db28293a-e1dd-4f3f-8201-2f2ba13b9b68', '请使用Java写一段代码用于处理八皇后问题', 1687261397741, 1687261397741, 'c547e29a-a049-4b52-b65c-0f0c9a61a3a5', 0);
INSERT INTO `question` VALUES ('dba20f0a-c5f9-40cd-81a9-465db0e21434', 'hello', 1687406009121, 1687406009121, '20d46fb1-63cf-476d-a02c-185ba9b260b3', 0);
INSERT INTO `question` VALUES ('fa1d8089-2dba-4784-a60f-ad9a4123a67b', '9-9=', 1687598635353, 1687598635353, 'f0850f12-b075-4b63-abe4-2b8b22f4b37a', 0);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` bigint NOT NULL,
  `user_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_pwd` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` bigint NULL DEFAULT NULL,
  `del_flag` int NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, 'zhangsan', '1', '1', 1513135135, 0);

SET FOREIGN_KEY_CHECKS = 1;
