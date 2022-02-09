-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2022-02-09 10:25:21
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
('admin', '123');

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
('e424d8deb24d6d1ecdfac2f669639595', '32423401', 'teacher_yanshishipin02', '森岛帆高', '森岛帆高', '2022-02-09 05:08:36'),
('5f5742ec4688efa2bb65cabe4742d0b1', '32423401', 'teacher_yanshishipin02', '版本', '版本', '2022-02-01 05:24:19'),
('f89e5495388087a052bb1178d1aef803', '32423401', 'teacher_yanshishipin02', '对方过后', '对方过后的规范化', '2022-02-09 05:41:35');

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
('fde32d64b29f69eba9d0d42e4ea47dd2', '演示视频测试', '<h1 id=\"演示视频测试内容\">演示视频测试内容</h1>\n', 'student', '2022-01-30 14:56:22');

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` varchar(308) NOT NULL COMMENT '学生ID',
  `password` varchar(100) NOT NULL COMMENT '登录密码',
  `name` varchar(50) NOT NULL COMMENT '学生姓名',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `college` varchar(30) NOT NULL COMMENT '学院',
  `major` varchar(30) NOT NULL COMMENT '所学专业',
  `class` varchar(30) NOT NULL COMMENT '学生班级',
  `time` date NOT NULL COMMENT '入学时间',
  `id_number` varchar(30) NOT NULL COMMENT '身份证号',
  `email` varchar(60) DEFAULT NULL COMMENT '绑定邮箱',
  `address` varchar(600) NOT NULL COMMENT '家庭住址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`id`, `password`, `name`, `sex`, `college`, `major`, `class`, `time`, `id_number`, `email`, `address`) VALUES
('32423401', '2', '32423412', '女', '高等职业技术学院', '软件技术', '电子商务4班', '2022-01-27', '234234', '1974109227@qq.com', '234324'),
('12301', '12301', '123', '男', '高等职业技术学院', '计算机应用技术', '计算机应用技术3班', '2022-01-27', '123123', NULL, '123213');

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
('teacher_yanshishipin01', 'teacher_yanshishipin01', '演示视频', '男', '机器人工程1班', '2022-01-30', NULL),
('teacher_yanshishipin02', 'teacher_yanshishipin02', '演示视频', '女', '电子商务1班,电子商务2班,电子商务3班,电子商务4班', '2022-01-20', '1974109227@qq.com'),
('teacher_zhanglaoshi01', 'teacher_zhanglaoshi01', '张老师', '男', '电子商务4班', '2022-01-26', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `vacation`
--

DROP TABLE IF EXISTS `vacation`;
CREATE TABLE IF NOT EXISTS `vacation` (
  `id` varchar(80) NOT NULL COMMENT '请假的ID',
  `student` varchar(80) NOT NULL COMMENT '学生的ID',
  `start_time` datetime NOT NULL COMMENT '起始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `state` int(11) NOT NULL COMMENT '状态(1通过0没过2待批注)',
  `reason` text NOT NULL COMMENT '请假原因',
  `notes` text COMMENT '导员批注',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `vacation`
--

INSERT INTO `vacation` (`id`, `student`, `start_time`, `end_time`, `state`, `reason`, `notes`) VALUES
('42872e7671e7acbf1409332575096d88', '32423401', '2022-01-31 00:00:00', '2022-01-31 00:00:00', 1, '啊实打实大师的', '早点回来'),
('4ed2893915d333ce402b1b1d6c0f45ff', '32423401', '2022-01-31 00:00:00', '2022-02-01 00:00:00', 1, '测试演示视频', '12312312'),
('20954b662911558b232f13f1c34212f0', '32423401', '2022-01-29 00:00:00', '2022-01-29 00:00:00', 2, 'sad', NULL),
('e793fe321c615357fe366aad6a81ecf8', '32423401', '2022-01-30 00:00:00', '2022-02-01 00:00:00', 2, '萨达萨达', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
