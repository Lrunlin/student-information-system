-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2022-05-19 13:39:17
-- 服务器版本： 5.7.26
-- PHP 版本： 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `student`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` varchar(100) NOT NULL COMMENT '管理员账号',
  `password` varchar(100) NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `password`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- 表的结构 `archives`
--

DROP TABLE IF EXISTS `archives`;
CREATE TABLE IF NOT EXISTS `archives` (
  `id` varchar(80) NOT NULL COMMENT '档案ID',
  `student` varchar(80) NOT NULL COMMENT '对应的学生ID',
  `teacher` varchar(80) NOT NULL COMMENT '对应的教师ID',
  `title` text NOT NULL COMMENT '档案标题',
  `content` text NOT NULL COMMENT '档案信息内容',
  `time` datetime NOT NULL COMMENT '档案时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `archives`
--

INSERT INTO `archives` (`id`, `student`, `teacher`, `title`, `content`, `time`) VALUES
('d1a044b2ef2a20e6d6d7857bc42b78a1', '32423401', 'teacher_yanshishipin02', '档案1', '11', '2022-04-29 01:35:02'),
('dc2953d78b6f88b3a05a58165f15e15f', '12301', 'teacher_yanshishipin02', '演示', '文档', '2022-05-15 01:06:52');

-- --------------------------------------------------------

--
-- 表的结构 `notice`
--

DROP TABLE IF EXISTS `notice`;
CREATE TABLE IF NOT EXISTS `notice` (
  `id` varchar(80) NOT NULL COMMENT 'ID',
  `title` text NOT NULL COMMENT '邮件标题',
  `content` text NOT NULL COMMENT '邮件HTML内容',
  `target` varchar(20) NOT NULL COMMENT '邮件接收目标（teacher，student）',
  `time` datetime NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `notice`
--

INSERT INTO `notice` (`id`, `title`, `content`, `target`, `time`) VALUES
('23941b1316d392928164bd7d87322f6b', '论文录制发送视频', '<h1 id=\"我是标题\">我是标题</h1>\n<p><em>我是发送内容</em>\n<strong>w我是重点内容</strong></p>\n', 'teacher', '2022-04-29 22:39:30'),
('95d70f38cf17f35753f6dcf045510c75', '测试邮件群发', '<blockquote>\n<p>以下是主体内容</p>\n</blockquote>\n<p>演示公告群发功能</p>\n', 'teacher', '2022-03-23 17:58:35'),
('130963671023837aedc73ede5ab4ce6f', '公告群发', '<blockquote>\n<p>对全体教师进行邮箱群发</p>\n</blockquote>\n<p><em>论文提供截图</em></p>\n', 'teacher', '2022-03-23 18:22:22');

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` varchar(300) NOT NULL COMMENT '学生ID',
  `password` varchar(100) NOT NULL COMMENT '登录密码',
  `name` varchar(50) NOT NULL COMMENT '学生姓名',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `college` varchar(30) NOT NULL COMMENT '学院',
  `major` varchar(30) NOT NULL COMMENT '所学专业',
  `class` varchar(30) NOT NULL COMMENT '学生班级',
  `time` date NOT NULL COMMENT '入学时间',
  `id_number` varchar(30) NOT NULL COMMENT '身份证号',
  `email` varchar(60) DEFAULT NULL COMMENT '绑定邮箱',
  `address` text NOT NULL COMMENT '家庭住址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`id`, `password`, `name`, `sex`, `college`, `major`, `class`, `time`, `id_number`, `email`, `address`) VALUES
('12301', 'student', '123', '男', '高等职业技术学院', '电子商务', '电子商务1班', '2022-01-27', '123123', NULL, '123213');

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE IF NOT EXISTS `teacher` (
  `id` varchar(80) NOT NULL COMMENT '指导教师ID',
  `password` varchar(100) NOT NULL COMMENT '登录密码',
  `name` varchar(50) NOT NULL COMMENT '指导教师姓名',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `class` text COMMENT '指导教师带班ID',
  `time` date NOT NULL COMMENT '入职时间',
  `email` varchar(60) DEFAULT NULL COMMENT '绑定邮箱',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`id`, `password`, `name`, `sex`, `class`, `time`, `email`) VALUES
('teacher_yanshishipin02', 'teacher_yanshishipin02', '演示视频', '女', '电子商务1班,电子商务2班,电子商务3班,电子商务4班', '2022-01-20', '1974109227@qq.com'),
('teacher_zhanglaoshi01', 'teacher_zhanglaoshi01', '张老师', '男', '电子商务4班', '2022-01-26', NULL),
('teacher_zhanshi01', 'teacher_zhanshi01', '展示1', '女', NULL, '2022-03-18', NULL),
('teacher_tianjiajiaoshi01', 'teacher_tianjiajiaoshi01', '添加教师', '男', '计算机应用技术1班', '2022-04-29', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `vacation`
--

DROP TABLE IF EXISTS `vacation`;
CREATE TABLE IF NOT EXISTS `vacation` (
  `id` varchar(80) NOT NULL COMMENT '请假的ID',
  `student` varchar(80) NOT NULL COMMENT '学生的ID',
  `time` datetime NOT NULL COMMENT '起始时间',
  `state` int(11) NOT NULL COMMENT '状态(1解决0待解决)',
  `reason` text NOT NULL COMMENT '问题内容',
  `notes` text COMMENT '导员批注',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `vacation`
--

INSERT INTO `vacation` (`id`, `student`, `time`, `state`, `reason`, `notes`) VALUES
('273972cd5c2544b476f5f5b819d6d8c2', '12301', '2022-05-18 12:39:32', 1, '演示视频测试1', '回复内容'),
('bf62ea30b0c187ae3667ce816c5bcd9b', '12301', '2022-05-18 09:55:15', 1, '阿里快速搭建卢卡斯建档立卡据了解安利实际地理卡是 阿里快速搭建卢卡斯建档立卡据了解安利实际地理卡是 阿里快速搭建卢卡斯建档立卡据了解安利实际地理卡是 阿里快速搭建卢卡斯建档立卡据了解安利实际地理卡是 阿里快速搭建卢卡斯建档立卡据了解安利实际地理卡是 阿里快速搭建卢卡斯建档立卡据了解安利实际地理卡是 ', '回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复');

-- --------------------------------------------------------

--
-- 表的结构 `weekly`
--

DROP TABLE IF EXISTS `weekly`;
CREATE TABLE IF NOT EXISTS `weekly` (
  `id` varchar(100) NOT NULL,
  `student_id` varchar(100) NOT NULL,
  `content` text NOT NULL COMMENT '内容',
  `unit` text NOT NULL COMMENT '实习单位',
  `week_time` int(11) NOT NULL COMMENT '哪周的',
  `reply` text COMMENT '教师批复',
  `time` datetime NOT NULL COMMENT '申请时间',
  `modifiable` tinyint(1) NOT NULL COMMENT '是否可修改',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='实习周报';

--
-- 转存表中的数据 `weekly`
--

INSERT INTO `weekly` (`id`, `student_id`, `content`, `unit`, `week_time`, `reply`, `time`, `modifiable`) VALUES
('4fb605dc-d0e1-4896-a4e8-dfce63c2d39a', '12301', '阿萨德', '阿萨德', 1, '还行1111', '2022-05-18 14:53:01', 1),
('489bb469-634a-42b5-94e8-4865c8e5a249', '12301', 's 1', 'update', 2, NULL, '2022-05-18 15:51:08', 1),
('e0249ab7-ce11-4173-a857-41d428b27b33', '12301', '萨达是', 'xiugai', 3, NULL, '2022-05-18 21:55:54', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
