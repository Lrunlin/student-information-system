-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2022-01-25 16:13:07
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
  `password` varchar(100) NOT NULL COMMENT '管理员密码'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `password`) VALUES
('admin', '1');

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` varchar(30) NOT NULL COMMENT '学生ID',
  `password` varchar(100) NOT NULL COMMENT '登录密码',
  `name` varchar(50) NOT NULL COMMENT '学生姓名',
  `sex` varchar(5) NOT NULL COMMENT '性别',
  `college` varchar(30) NOT NULL COMMENT '学院',
  `major` varchar(30) NOT NULL COMMENT '所学专业',
  `class` varchar(30) NOT NULL COMMENT '学生班级',
  `time` date NOT NULL COMMENT '入学时间',
  `user_id` varchar(30) NOT NULL COMMENT '身份证号',
  `id_number` varchar(30) NOT NULL COMMENT '身份证号',
  `email` varchar(60) NOT NULL COMMENT '绑定邮箱',
  `address` varchar(600) NOT NULL COMMENT '家庭住址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE IF NOT EXISTS `teacher` (
  `id` varchar(30) NOT NULL COMMENT '指导教师ID',
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
('dingguangyu01', 'dingguangyu01', '丁光禹', '女', NULL, '2022-01-25', NULL),
('liurunlin01', 'liurunlin01', '刘润霖', '男', '电子商务1班,计算机应用技术3班', '2022-01-25', '1974109227@qq.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
