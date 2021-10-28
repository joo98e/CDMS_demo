-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 21-10-28 08:59
-- 서버 버전: 10.3.29-MariaDB
-- PHP 버전: 7.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `CDMS`
--

DELIMITER $$
--
-- 함수
--
CREATE DEFINER=`myboard`@`%` FUNCTION `FN_NOW_TO_CHAR` () RETURNS VARCHAR(100) CHARSET utf8 BEGIN
    DECLARE tmpVar VARCHAR(100);
    SELECT
        DATE_FORMAT(NOW(), '%Y%m%d%H%i%s') INTO tmpVar
    FROM
        dual;
    RETURN tmpVar;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy`
--

CREATE TABLE `tb_agcy` (
  `id` int(11) NOT NULL COMMENT '고유 키',
  `biz_area` int(11) NOT NULL COMMENT '사업 구분',
  `writer_seq` int(11) NOT NULL COMMENT '작성자 시퀀스',
  `name` varchar(48) DEFAULT NULL COMMENT '에이전시명',
  `desc` mediumtext DEFAULT NULL COMMENT '프로젝트에 대한 설명, HTML로 될 지도 모름',
  `add_info` mediumtext DEFAULT NULL COMMENT '추가 정보 / 제이슨 형식 / 불러온 뒤, 파싱해서 사용해야 함',
  `status` varchar(24) DEFAULT 'STATUS::OPEN' COMMENT '기관 공개 여부, STATUS::OPEN, CLOSE',
  `start_date` datetime DEFAULT current_timestamp(),
  `end_date` datetime DEFAULT current_timestamp(),
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '생성 일자',
  `upd_date` datetime DEFAULT current_timestamp() COMMENT '업데이트 일자',
  `reg_ip` varchar(16) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(16) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='기관 리스트';

--
-- 테이블의 덤프 데이터 `tb_agcy`
--

INSERT INTO `tb_agcy` (`id`, `biz_area`, `writer_seq`, `name`, `desc`, `add_info`, `status`, `start_date`, `end_date`, `reg_date`, `upd_date`, `reg_ip`, `upd_ip`, `delete_yn`) VALUES
(19, 1, 1, '우정공무원교육원', '서릊한누리', '[{\"key\":\"이러닝\",\"value\":\"4개 과정\"},{\"key\":\"마이크로 러닝\",\"value\":\"8개 과정\"},{\"key\":\"외부 인력\",\"value\":\"사용 안함\"},{\"key\":\"내부 인력\",\"value\":\"사용 안함\"},{\"key\":\"킥오프\",\"value\":\"2021-10-25\"},{\"key\":\"개발 시작일\",\"value\":\"2021-10-26\"},{\"key\":\"중간 보고\",\"value\":\"2021-10-28\"},{\"key\":\"부담당자\",\"value\":\"없음\"},{\"key\":\"추가 정보\",\"value\":\"구성\"},{\"key\":\"길이\",\"value\":\"테스트\"}]', 'STATUS::OPEN', '2021-07-15 00:00:00', '2021-11-27 23:59:59', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy_biz_area`
--

CREATE TABLE `tb_agcy_biz_area` (
  `id` int(11) NOT NULL,
  `name` varchar(48) DEFAULT NULL,
  `delete_yn` varchar(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='기관별 프로젝트 카테고리';

--
-- 테이블의 덤프 데이터 `tb_agcy_biz_area`
--

INSERT INTO `tb_agcy_biz_area` (`id`, `name`, `delete_yn`) VALUES
(1, '공공', 'N'),
(2, '개발', 'Y'),
(3, '설계', 'N'),
(4, '영상', 'Y'),
(5, '속기', 'Y'),
(6, '기타', 'Y'),
(7, '대학', 'Y');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy_colleague`
--

CREATE TABLE `tb_agcy_colleague` (
  `id` int(11) NOT NULL COMMENT '기관 담당자 시퀀스, 일반적으로 auth 타입 B를 가지고 있는 시퀀스여야 함',
  `ref_agcy_id` int(11) NOT NULL COMMENT '어떤 기관에 속해 있는가(참조키)',
  `ref_agcy_colleague_seq` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL COMMENT '이름',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '생성 일자',
  `upd_date` datetime DEFAULT current_timestamp() COMMENT '수정 일자',
  `reg_ip` varchar(32) DEFAULT NULL,
  `upd_ip` varchar(32) DEFAULT NULL,
  `delete_yn` varchar(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `tb_agcy_colleague`
--

INSERT INTO `tb_agcy_colleague` (`id`, `ref_agcy_id`, `ref_agcy_colleague_seq`, `name`, `reg_date`, `upd_date`, `reg_ip`, `upd_ip`, `delete_yn`) VALUES
(2, 2, 1, '관리자', '2021-09-28 09:36:05', '2021-09-28 09:36:05', '115.178.65.100', '115.178.65.100', 'N'),
(3, 2, 2, '정태복', '2021-09-28 09:36:05', '2021-09-28 09:36:05', '115.178.65.100', '115.178.65.100', 'N'),
(4, 3, 2, '정태복', '2021-09-28 10:48:04', '2021-09-28 10:48:04', '115.178.65.100', '115.178.65.100', 'N'),
(5, 4, 1, '관리자', '2021-09-28 10:50:53', '2021-09-28 10:50:53', '115.178.65.100', '115.178.65.100', 'N'),
(6, 5, 1, '관리자', '2021-09-28 10:54:59', '2021-09-28 10:54:59', '115.178.65.100', '115.178.65.100', 'N'),
(7, 5, 2, '정태복', '2021-09-28 10:54:59', '2021-09-28 10:54:59', '115.178.65.100', '115.178.65.100', 'N'),
(8, 6, 2, '정태복', '2021-09-28 15:44:26', '2021-09-28 15:44:26', '115.178.65.100', '115.178.65.100', 'N'),
(9, 7, 1, '관리자', '2021-10-03 15:57:58', '2021-10-03 15:57:58', '175.223.14.208', '175.223.14.208', 'N'),
(10, 7, 2, '정태복', '2021-10-03 15:57:58', '2021-10-03 15:57:58', '175.223.14.208', '175.223.14.208', 'N'),
(11, 8, 2, '정태복', '2021-10-04 19:42:45', '2021-10-04 19:42:45', '122.45.101.20', '122.45.101.20', 'N'),
(12, 8, 1, '관리자', '2021-10-04 19:42:45', '2021-10-04 19:42:45', '122.45.101.20', '122.45.101.20', 'N'),
(13, 9, 4, '송우진', '2021-10-04 19:45:04', '2021-10-04 19:45:04', '59.7.120.184', '59.7.120.184', 'N'),
(14, 9, 5, '윤민호', '2021-10-04 19:45:04', '2021-10-04 19:45:04', '59.7.120.184', '59.7.120.184', 'N'),
(15, 9, 6, '최현중', '2021-10-04 19:45:04', '2021-10-04 19:45:04', '59.7.120.184', '59.7.120.184', 'N'),
(16, 9, 3, '아웃소싱', '2021-10-04 19:45:04', '2021-10-04 19:45:04', '59.7.120.184', '59.7.120.184', 'N'),
(18, 15, 9, '황미라', '2021-10-05 22:08:17', '2021-10-05 22:08:17', '115.178.65.100', '115.178.65.100', 'N'),
(19, 15, 8, '정태영', '2021-10-05 22:08:17', '2021-10-05 22:08:17', '115.178.65.100', '115.178.65.100', 'N'),
(20, 15, 7, '정지현', '2021-10-05 22:08:17', '2021-10-05 22:08:17', '115.178.65.100', '115.178.65.100', 'N'),
(21, 15, 6, '최현중', '2021-10-05 22:08:17', '2021-10-05 22:08:17', '115.178.65.100', '115.178.65.100', 'N'),
(22, 15, 5, '윤민호', '2021-10-05 22:08:17', '2021-10-05 22:08:17', '115.178.65.100', '115.178.65.100', 'N'),
(23, 15, 4, '송우진', '2021-10-05 22:08:17', '2021-10-05 22:08:17', '115.178.65.100', '115.178.65.100', 'N'),
(24, 15, 2, '정태복', '2021-10-08 13:12:11', '2021-10-08 13:12:11', '115.178.65.100', '115.178.65.100', 'N'),
(25, 16, 3, '아웃소싱', '2021-10-08 22:51:55', '2021-10-08 22:51:55', '59.7.120.184', '59.7.120.184', 'N'),
(26, 16, 4, '송우진', '2021-10-08 22:51:55', '2021-10-08 22:51:55', '59.7.120.184', '59.7.120.184', 'N'),
(27, 16, 2, '정태복', '2021-10-08 22:51:55', '2021-10-08 22:51:55', '59.7.120.184', '59.7.120.184', 'N'),
(28, 17, 8, '정태영', '2021-10-19 14:12:19', '2021-10-19 14:12:19', '115.178.65.100', '115.178.65.100', 'N'),
(29, 18, 1, '관리자', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(30, 18, 2, '정태복', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(31, 18, 6, '최현중', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(32, 18, 8, '정태영', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(33, 18, 9, '황미라', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(34, 18, 7, '정지현', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(35, 18, 5, '윤민호', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(36, 18, 4, '송우진', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(37, 18, 3, '아웃소싱', '2021-10-23 22:14:21', '2021-10-23 22:14:21', '59.7.120.184', '59.7.120.184', 'N'),
(38, 19, 1, '관리자', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N'),
(39, 19, 2, '정태복', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N'),
(40, 19, 9, '황미라', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N'),
(41, 19, 7, '정지현', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N'),
(42, 19, 5, '윤민호', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N'),
(43, 19, 8, '정태영', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N'),
(44, 19, 6, '최현중', '2021-10-27 11:16:50', '2021-10-27 11:16:50', '106.248.61.60', '106.248.61.60', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy_favorite`
--

CREATE TABLE `tb_agcy_favorite` (
  `id` int(11) NOT NULL,
  `ref_agcy_id` int(11) NOT NULL,
  `reg_date` datetime DEFAULT current_timestamp(),
  `upd_date` datetime DEFAULT current_timestamp(),
  `delete_yn` varchar(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `tb_agcy_favorite`
--

INSERT INTO `tb_agcy_favorite` (`id`, `ref_agcy_id`, `reg_date`, `upd_date`, `delete_yn`) VALUES
(1, 1, '2021-09-24 07:54:06', '2021-09-24 07:54:06', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy_proj`
--

CREATE TABLE `tb_agcy_proj` (
  `id` int(11) NOT NULL,
  `writer_seq` int(11) NOT NULL,
  `ref_agcy_id` int(11) NOT NULL,
  `ref_biz_area` int(11) NOT NULL COMMENT '사업 영역(공공, 대학, ...)',
  `name` varchar(96) DEFAULT '무명',
  `desc` mediumtext DEFAULT NULL,
  `add_info` mediumtext DEFAULT NULL,
  `thumbnail_file_name` varchar(256) DEFAULT '8.jpg',
  `thumbnail_file_path` varchar(1024) DEFAULT '\\static\\common\\thumbnail\\project\\defaultProject.png',
  `reg_date` datetime DEFAULT current_timestamp(),
  `upd_date` datetime DEFAULT current_timestamp(),
  `start_date` datetime DEFAULT current_timestamp(),
  `end_date` datetime DEFAULT current_timestamp(),
  `reg_ip` varchar(24) DEFAULT NULL,
  `upd_ip` varchar(24) DEFAULT NULL,
  `delete_yn` varchar(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='기관별 프로젝트 목록';

--
-- 테이블의 덤프 데이터 `tb_agcy_proj`
--

INSERT INTO `tb_agcy_proj` (`id`, `writer_seq`, `ref_agcy_id`, `ref_biz_area`, `name`, `desc`, `add_info`, `thumbnail_file_name`, `thumbnail_file_path`, `reg_date`, `upd_date`, `start_date`, `end_date`, `reg_ip`, `upd_ip`, `delete_yn`) VALUES
(1, 1, 15, 2, 'CDMS', '어느새 10월이 왔어요 왔어', NULL, 'defaultProject.png', '\\static\\common\\thumbnail\\project\\1.jpg', '2021-10-08 08:54:12', '2021-10-08 08:54:12', '2021-10-08 00:00:00', '2021-10-19 23:59:59', '192.168.0.104', '192.168.0.104', 'Y'),
(4, 1, 15, 2, 'CDMS 준비', 'CDMS 준비 시작', '[{\"key\":\"예상 프로젝트 기간\",\"value\":\"2022.02\"},{\"key\":\"예상 소요 시간\",\"value\":\"10000시간\"},{\"key\":\"예상 비용\",\"value\":\"1000원\"}]', 'defaultProject.png', '\\static\\common\\thumbnail\\project\\2.jpg', '2021-10-08 11:11:34', '2021-10-08 11:11:34', '2021-06-01 00:00:00', '2022-02-17 23:59:59', '115.178.65.100', '115.178.65.100', 'Y'),
(5, 1, 15, 2, '22시 06분', '아닙니다. 11시 14분입니다.', '[{\"key\":\"프로젝트 소요 시간\",\"value\":\"11시 14분\"},{\"key\":\"11시간 14분\",\"value\":\"674분\"}]', 'defaultProject.png', '\\static\\common\\thumbnail\\project\\3.jpg', '2021-10-08 11:15:01', '2021-10-08 11:15:01', '2021-09-01 00:00:00', '2021-12-17 23:59:59', '115.178.65.100', '115.178.65.100', 'Y'),
(6, 1, 15, 2, '레이아웃 테스트 #1', '레이아웃 테스트입니다.', '[{\"key\":\"레이아웃\",\"value\":\"테스트\"},{\"key\":\"맥북 PRO\",\"value\":\"M1X칩\"},{\"key\":\"크리스마스\",\"value\":\"이전 출시\"},{\"key\":\"블랙프라이데이\",\"value\":\"이전 출시\"}]', 'defaultProject.png', '\\static\\common\\thumbnail\\project\\4.jpg', '2021-10-08 22:18:34', '2021-10-08 22:18:34', '2021-10-01 00:00:00', '2021-10-22 23:59:59', '59.7.120.184', '59.7.120.184', 'N'),
(7, 1, 16, 1, '타기관테스트용', '타기관테스트', '[{\"key\":\"타기관\",\"value\":\"테스트용도\"}]', 'defaultProject.png', '\\static\\common\\thumbnail\\project\\5.jpg', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '2021-05-08 00:00:00', '2021-10-20 23:59:59', '59.7.120.184', '59.7.120.184', 'N'),
(8, 1, 17, 3, '테스트해볼까요?', '테스트를 해봅시다! 열심히요! 아주요!!! 화이팅! 2시  12분', '[{\"key\":\"프로젝트\",\"value\":\"추가 정보\"},{\"key\":\"보드 개발\",\"value\":\"외주 인력 사용\"},{\"key\":\"촬영 장비\",\"value\":\"옵스봇 4대\"},{\"key\":\"날씨\",\"value\":\"선선함\"}]', 'defaultProject.png', '\\static\\common\\thumbnail\\project\\6.jpg', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '2021-10-10 00:00:00', '2021-10-25 23:59:59', '115.178.65.100', '115.178.65.100', 'N'),
(12, 1, 15, 2, '인권위원회 10월 22일 4차시 포팅', '4차시를 포팅했습니다.', '[]', 'defaultProject.png', '\\static\\common\\thumbnail\\project\\7.jpg', '2021-10-22 18:52:45', '2021-10-22 18:52:45', '2021-10-23 00:00:00', '2021-10-23 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(13, 1, 18, 2, 'Lorem ipsum', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.', '[{\"key\":\"author\",\"value\":\"BeOK\"},{\"key\":\"Agency\",\"value\":\"MirimMediaLab\"},{\"key\":\"Goods\",\"value\":\"Lorem\"},{\"key\":\"OS\",\"value\":\"IOS\"},{\"key\":\"laptop\",\"value\":\"2021 mac, M1 PRO\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\8.jpg', '2021-10-23 22:18:05', '2021-10-23 22:18:05', '2021-10-14 00:00:00', '2021-10-21 23:59:59', '59.7.120.184', '59.7.120.184', 'N'),
(14, 1, 18, 2, 'What follows is H. Rackham\'s translation ', 'When used as placeholder text, Li Europan lingues is usually one or two paragraphs and reads as follows: \n\nLi Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores.\nAt solmen va esser necessi far uniform grammatica, pronunciation e plu commun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.', '[{\"key\":\"Help\",\"value\":\"Learn to edit\"},{\"key\":\"Community portal\",\"value\":\"Recent changes\"},{\"key\":\"Upload file\",\"value\":\"What links here\"},{\"key\":\"Related changes\",\"value\":\"Special pages\"}]', '7.jpg', '\\static\\common\\thumbnail\\project\\7.jpg', '2021-10-23 22:55:11', '2021-10-23 22:55:11', '2021-10-19 00:00:00', '2021-10-30 23:59:59', '59.7.120.184', '59.7.120.184', 'N'),
(15, 1, 16, 1, '1024_Test', '1024_Test', '[]', '8.jpg', '\\static\\common\\thumbnail\\project\\4.jpg', '2021-10-24 02:12:18', '2021-10-24 02:12:18', '2021-10-01 00:00:00', '2021-10-30 23:59:59', '59.7.120.184', '59.7.120.184', 'N'),
(16, 1, 16, 1, 'currently testing the API', 'testing the API', '[{\"key\":\"API\",\"value\":\"axios\"},{\"key\":\"KEY\",\"value\":\"Value\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\8.jpg', '2021-10-24 20:20:31', '2021-10-24 20:20:31', '2021-10-23 00:00:00', '2021-10-24 23:59:59', '59.7.120.184', '59.7.120.184', 'N'),
(17, 1, 18, 2, '10월26일 CDMS 발표일', '프로젝트 설명입니다.', '[{\"key\":\"키\",\"value\":\"밸류\"},{\"key\":\"키\",\"value\":\"밸류\"},{\"key\":\"키\",\"value\":\"밸류\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\8.jpg', '2021-10-26 17:02:19', '2021-10-26 17:02:19', '2021-10-25 00:00:00', '2021-10-26 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(18, 1, 18, 2, '우정공무원 교육원 이러닝 4개 과정 콘텐츠 개발', '우정공무원의 신규 4개 과정을 개발하는 프로젝트', '[{\"key\":\"우정공무원\",\"value\":\"충북 천안\"},{\"key\":\"포팅일\",\"value\":\"2021.10.26\"},{\"key\":\"포팅 인원\",\"value\":\"2명\"},{\"key\":\"포팅자[메인]\",\"value\":\"송우진\"},{\"key\":\"포팅자[서브]\",\"value\":\"정태복\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\8.jpg', '2021-10-26 17:08:24', '2021-10-26 17:08:24', '2021-10-26 00:00:00', '2021-10-28 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(19, 1, 19, 1, '이러닝_고객자산관리', '모듈 5개', '[{\"key\":\"1차 포팅 일자\",\"value\":\"2021-07-20\"},{\"key\":\"2차 포팅 일자\",\"value\":\"2021-08-21\"},{\"key\":\"1차 포팅 인원\",\"value\":\"정태복, 최현중\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\defaultProject.png', '2021-10-27 11:19:30', '2021-10-27 11:19:30', '2021-08-18 00:00:00', '2021-11-30 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(20, 1, 19, 1, '이러닝_제휴사업 역량 강화', '제휴사업 역량 강화 / 이러닝 과정', '[{\"key\":\"차시 수\",\"value\":\"7차시\"},{\"key\":\"모듈\",\"value\":\"없음\"},{\"key\":\"프로토 개발 예정 일자\",\"value\":\"2021-09-14\"},{\"key\":\"양산 개발 예정 일자\",\"value\":\"2021-10-01\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\defaultProject.png', '2021-10-27 11:21:55', '2021-10-27 11:21:55', '2021-10-13 00:00:00', '2021-11-30 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(21, 1, 19, 1, '이러닝_우체국 외국환 업무 완전정복', '5개 차시 이러닝', '[{\"key\":\"모듈\",\"value\":\"없음\"},{\"key\":\"프로토 개발 일자\",\"value\":\"2021-09-19\"},{\"key\":\"양산 개발 일자\",\"value\":\"2021-10-18\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\defaultProject.png', '2021-10-27 11:23:01', '2021-10-27 11:23:01', '2021-10-01 00:00:00', '2021-10-30 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(22, 1, 19, 1, '마이크로러닝_갑질예방교육', '마이크로 러닝 갑질 예방교육입니다.\r \\n  4개 차시로 구성되어 있습니다. \r  일정이 촉박하여 빠른 작업이 필요합니다.', '[{\"key\":\"차시 수\",\"value\":\"4차시\"},{\"key\":\"갑질예방교육\",\"value\":\"버전 4개\"},{\"key\":\"URL\",\"value\":\"http://mirimlab.myds.me:9999/kpoti/02/\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\defaultProject.png', '2021-10-27 11:25:50', '2021-10-27 11:25:50', '2021-10-01 00:00:00', '2021-10-29 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(23, 1, 19, 1, '마이크로러닝_공직자의 이해 충돌 방지법', '마이크로러닝_공직자의 이해 충돌 방지법', '[{\"key\":\"마이크로러닝\",\"value\":\"1개 차시\"},{\"key\":\"완료 예정 일자\",\"value\":\"2021-10-19\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\defaultProject.png', '2021-10-27 11:26:53', '2021-10-27 11:26:53', '2021-10-01 00:00:00', '2021-10-20 23:59:59', '106.248.61.60', '106.248.61.60', 'N'),
(24, 1, 19, 1, '마이크로러닝_우체국 금융 창구 매뉴얼(장애인편)', 'http://mirimlab.myds.me:9999/kpoti/micro/index.html', '[{\"key\":\"마이크로러닝\",\"value\":\"1개 차시\"},{\"key\":\"개발팀\",\"value\":\"7명\"},{\"key\":\"HTML5 여부\",\"value\":\"X\"},{\"key\":\"MP4 여부\",\"value\":\"O\"}]', '8.jpg', '\\static\\common\\thumbnail\\project\\defaultProject.png', '2021-10-27 11:28:19', '2021-10-27 11:28:19', '2021-10-01 00:00:00', '2021-10-15 23:59:59', '106.248.61.60', '106.248.61.60', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy_proj_colleague`
--

CREATE TABLE `tb_agcy_proj_colleague` (
  `id` int(11) NOT NULL COMMENT '기관 담당자 시퀀스, 일반적으로 auth 타입 B를 가지고 있는 시퀀스여야 함',
  `ref_proj_id` int(11) NOT NULL COMMENT '어떤 기관에 속해 있는가(참조키)',
  `ref_agcy_colleague_seq` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL COMMENT '이름',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '생성 일자',
  `upd_date` datetime DEFAULT current_timestamp() COMMENT '수정 일자',
  `reg_ip` varchar(32) DEFAULT NULL,
  `upd_ip` varchar(32) DEFAULT NULL,
  `delete_yn` varchar(1) NOT NULL DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `tb_agcy_proj_colleague`
--

INSERT INTO `tb_agcy_proj_colleague` (`id`, `ref_proj_id`, `ref_agcy_colleague_seq`, `name`, `reg_date`, `upd_date`, `reg_ip`, `upd_ip`, `delete_yn`) VALUES
(9, 6, 6, '최현중', '2021-10-08 11:15:01', '2021-10-08 11:15:01', '115.178.65.100', '115.178.65.100', 'N'),
(11, 6, 8, '정태영', '2021-10-08 11:15:01', '2021-10-08 11:15:01', '115.178.65.100', '115.178.65.100', 'N'),
(13, 6, 2, '정태복', '2021-10-08 22:18:34', '2021-10-08 22:18:34', '59.7.120.184', '59.7.120.184', 'N'),
(14, 6, 3, '아웃소싱', '2021-10-08 22:18:34', '2021-10-08 22:18:34', '59.7.120.184', '59.7.120.184', 'N'),
(15, 6, 4, '송우진', '2021-10-08 22:18:34', '2021-10-08 22:18:34', '59.7.120.184', '59.7.120.184', 'N'),
(16, 6, 5, '윤민호', '2021-10-08 22:18:34', '2021-10-08 22:18:34', '59.7.120.184', '59.7.120.184', 'N'),
(18, 6, 7, '정지현', '2021-10-08 22:18:34', '2021-10-08 22:18:34', '59.7.120.184', '59.7.120.184', 'N'),
(19, 6, 9, '황미라', '2021-10-08 22:18:34', '2021-10-08 22:18:34', '59.7.120.184', '59.7.120.184', 'N'),
(20, 7, 2, '정태복', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(21, 7, 3, '아웃소싱', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(22, 7, 4, '송우진', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(23, 7, 5, '윤민호', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(24, 7, 6, '최현중', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(25, 7, 7, '정지현', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(26, 7, 8, '정태영', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(27, 7, 9, '황미라', '2021-10-10 01:51:06', '2021-10-10 01:51:06', '59.7.120.184', '59.7.120.184', 'N'),
(28, 8, 3, '아웃소싱', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '115.178.65.100', '115.178.65.100', 'N'),
(29, 8, 4, '송우진', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '115.178.65.100', '115.178.65.100', 'N'),
(30, 8, 5, '윤민호', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '115.178.65.100', '115.178.65.100', 'N'),
(31, 8, 1, '관리자', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '115.178.65.100', '115.178.65.100', 'N'),
(32, 8, 8, '정태영', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '115.178.65.100', '115.178.65.100', 'N'),
(33, 8, 9, '황미라', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '115.178.65.100', '115.178.65.100', 'N'),
(34, 8, 7, '정지현', '2021-10-19 14:14:01', '2021-10-19 14:14:01', '115.178.65.100', '115.178.65.100', 'N'),
(35, 9, 4, '송우진', '2021-10-20 15:40:33', '2021-10-20 15:40:33', '106.248.61.60', '106.248.61.60', 'N'),
(36, 10, 5, '윤민호', '2021-10-20 15:41:59', '2021-10-20 15:41:59', '106.248.61.60', '106.248.61.60', 'N'),
(39, 12, 7, '정지현', '2021-10-22 18:52:45', '2021-10-22 18:52:45', '106.248.61.60', '106.248.61.60', 'N'),
(40, 12, 6, '최현중', '2021-10-22 18:52:45', '2021-10-22 18:52:45', '106.248.61.60', '106.248.61.60', 'N'),
(41, 12, 5, '윤민호', '2021-10-22 18:52:45', '2021-10-22 18:52:45', '106.248.61.60', '106.248.61.60', 'N'),
(42, 12, 4, '송우진', '2021-10-22 18:52:45', '2021-10-22 18:52:45', '106.248.61.60', '106.248.61.60', 'N'),
(43, 12, 8, '정태영', '2021-10-22 18:52:45', '2021-10-22 18:52:45', '106.248.61.60', '106.248.61.60', 'N'),
(44, 13, 2, '정태복', '2021-10-23 22:18:05', '2021-10-23 22:18:05', '59.7.120.184', '59.7.120.184', 'N'),
(45, 13, 6, '최현중', '2021-10-23 22:18:05', '2021-10-23 22:18:05', '59.7.120.184', '59.7.120.184', 'N'),
(46, 13, 3, '아웃소싱', '2021-10-23 22:18:05', '2021-10-23 22:18:05', '59.7.120.184', '59.7.120.184', 'N'),
(47, 14, 2, '정태복', '2021-10-23 22:55:11', '2021-10-23 22:55:11', '59.7.120.184', '59.7.120.184', 'N'),
(48, 14, 3, '아웃소싱', '2021-10-23 22:55:11', '2021-10-23 22:55:11', '59.7.120.184', '59.7.120.184', 'N'),
(49, 14, 9, '황미라', '2021-10-23 22:55:11', '2021-10-23 22:55:11', '59.7.120.184', '59.7.120.184', 'N'),
(50, 14, 8, '정태영', '2021-10-23 22:55:11', '2021-10-23 22:55:11', '59.7.120.184', '59.7.120.184', 'N'),
(51, 14, 7, '정지현', '2021-10-23 22:55:11', '2021-10-23 22:55:11', '59.7.120.184', '59.7.120.184', 'N'),
(52, 14, 6, '최현중', '2021-10-23 22:55:11', '2021-10-23 22:55:11', '59.7.120.184', '59.7.120.184', 'N'),
(53, 15, 3, '아웃소싱', '2021-10-24 02:12:18', '2021-10-24 02:12:18', '59.7.120.184', '59.7.120.184', 'N'),
(54, 15, 4, '송우진', '2021-10-24 02:12:18', '2021-10-24 02:12:18', '59.7.120.184', '59.7.120.184', 'N'),
(55, 15, 2, '정태복', '2021-10-24 02:12:18', '2021-10-24 02:12:18', '59.7.120.184', '59.7.120.184', 'N'),
(56, 16, 4, '송우진', '2021-10-24 20:20:32', '2021-10-24 20:20:32', '59.7.120.184', '59.7.120.184', 'N'),
(57, 17, 9, '황미라', '2021-10-26 17:02:20', '2021-10-26 17:02:20', '106.248.61.60', '106.248.61.60', 'N'),
(58, 17, 7, '정지현', '2021-10-26 17:02:20', '2021-10-26 17:02:20', '106.248.61.60', '106.248.61.60', 'N'),
(59, 17, 5, '윤민호', '2021-10-26 17:02:20', '2021-10-26 17:02:20', '106.248.61.60', '106.248.61.60', 'N'),
(60, 17, 4, '송우진', '2021-10-26 17:02:20', '2021-10-26 17:02:20', '106.248.61.60', '106.248.61.60', 'N'),
(61, 17, 6, '최현중', '2021-10-26 17:02:20', '2021-10-26 17:02:20', '106.248.61.60', '106.248.61.60', 'N'),
(62, 17, 2, '정태복', '2021-10-26 17:02:20', '2021-10-26 17:02:20', '106.248.61.60', '106.248.61.60', 'N'),
(63, 18, 9, '황미라', '2021-10-26 17:08:24', '2021-10-26 17:08:24', '106.248.61.60', '106.248.61.60', 'N'),
(64, 18, 2, '정태복', '2021-10-26 17:08:24', '2021-10-26 17:08:24', '106.248.61.60', '106.248.61.60', 'N'),
(65, 18, 4, '송우진', '2021-10-26 17:08:24', '2021-10-26 17:08:24', '106.248.61.60', '106.248.61.60', 'N'),
(66, 18, 5, '윤민호', '2021-10-26 17:08:24', '2021-10-26 17:08:24', '106.248.61.60', '106.248.61.60', 'N'),
(67, 18, 7, '정지현', '2021-10-26 17:08:24', '2021-10-26 17:08:24', '106.248.61.60', '106.248.61.60', 'N'),
(68, 18, 6, '최현중', '2021-10-26 17:08:24', '2021-10-26 17:08:24', '106.248.61.60', '106.248.61.60', 'N'),
(69, 19, 5, '윤민호', '2021-10-27 11:19:30', '2021-10-27 11:19:30', '106.248.61.60', '106.248.61.60', 'N'),
(70, 19, 6, '최현중', '2021-10-27 11:19:30', '2021-10-27 11:19:30', '106.248.61.60', '106.248.61.60', 'N'),
(71, 19, 2, '정태복', '2021-10-27 11:19:30', '2021-10-27 11:19:30', '106.248.61.60', '106.248.61.60', 'N'),
(72, 20, 6, '최현중', '2021-10-27 11:21:55', '2021-10-27 11:21:55', '106.248.61.60', '106.248.61.60', 'N'),
(73, 20, 5, '윤민호', '2021-10-27 11:21:55', '2021-10-27 11:21:55', '106.248.61.60', '106.248.61.60', 'N'),
(74, 20, 7, '정지현', '2021-10-27 11:21:55', '2021-10-27 11:21:55', '106.248.61.60', '106.248.61.60', 'N'),
(75, 21, 9, '황미라', '2021-10-27 11:23:01', '2021-10-27 11:23:01', '106.248.61.60', '106.248.61.60', 'N'),
(76, 21, 2, '정태복', '2021-10-27 11:23:01', '2021-10-27 11:23:01', '106.248.61.60', '106.248.61.60', 'N'),
(77, 21, 1, '관리자', '2021-10-27 11:23:01', '2021-10-27 11:23:01', '106.248.61.60', '106.248.61.60', 'N'),
(78, 22, 7, '정지현', '2021-10-27 11:25:50', '2021-10-27 11:25:50', '106.248.61.60', '106.248.61.60', 'N'),
(79, 22, 8, '정태영', '2021-10-27 11:25:50', '2021-10-27 11:25:50', '106.248.61.60', '106.248.61.60', 'N'),
(80, 22, 5, '윤민호', '2021-10-27 11:25:50', '2021-10-27 11:25:50', '106.248.61.60', '106.248.61.60', 'N'),
(81, 22, 6, '최현중', '2021-10-27 11:25:50', '2021-10-27 11:25:50', '106.248.61.60', '106.248.61.60', 'N'),
(82, 23, 8, '정태영', '2021-10-27 11:26:53', '2021-10-27 11:26:53', '106.248.61.60', '106.248.61.60', 'N'),
(83, 24, 7, '정지현', '2021-10-27 11:28:19', '2021-10-27 11:28:19', '106.248.61.60', '106.248.61.60', 'N'),
(84, 24, 5, '윤민호', '2021-10-27 11:28:19', '2021-10-27 11:28:19', '106.248.61.60', '106.248.61.60', 'N'),
(85, 24, 8, '정태영', '2021-10-27 11:28:19', '2021-10-27 11:28:19', '106.248.61.60', '106.248.61.60', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy_proj_proc`
--

CREATE TABLE `tb_agcy_proj_proc` (
  `id` int(11) NOT NULL COMMENT '프로세스 고유 키',
  `writer_seq` int(11) NOT NULL COMMENT '작성자',
  `ref_proj_id` int(11) NOT NULL COMMENT '어떤 프로젝트에 속해 있는지가 나타난다.',
  `name` mediumtext DEFAULT NULL COMMENT '프로세스명',
  `desc` mediumtext DEFAULT NULL COMMENT '프로세스 설명',
  `rating` double DEFAULT 0 COMMENT '프로세스의 중요도에 대한 수치이며 0.5 단위로 총 0 ~ 5 범위를 소유',
  `cur_task` int(11) DEFAULT 0 COMMENT '현재 진행된 과업 수',
  `total_task` int(11) DEFAULT NULL COMMENT '총 진행되어야 할 과업 수',
  `add_info` mediumtext DEFAULT NULL,
  `process_type` varchar(48) DEFAULT 'TYPE::NORMAL' COMMENT '프로세스 타입',
  `status` varchar(48) DEFAULT 'STATUS::TODO' COMMENT '칸반 보드에 사용될 상태, STATUS::TODO, DOING, DONE',
  `start_date` datetime DEFAULT NULL COMMENT '프로세스 시작일',
  `end_date` datetime DEFAULT NULL COMMENT '프로세스 마감일',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '생성 일자',
  `upd_date` datetime DEFAULT current_timestamp() COMMENT '업데이트 일자',
  `reg_ip` varchar(16) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(16) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='기관별 프로젝트 - 프로세스';

--
-- 테이블의 덤프 데이터 `tb_agcy_proj_proc`
--

INSERT INTO `tb_agcy_proj_proc` (`id`, `writer_seq`, `ref_proj_id`, `name`, `desc`, `rating`, `cur_task`, `total_task`, `add_info`, `process_type`, `status`, `start_date`, `end_date`, `reg_date`, `upd_date`, `reg_ip`, `upd_ip`, `delete_yn`) VALUES
(1, 1, 6, '기획', '기획 단계 프로세스', 0, 1, 2, NULL, 'TYPE::NORMAL', 'STATUS::DONE', '2021-10-10 00:00:00', '2021-10-11 23:59:59', '2021-10-10 01:04:09', '2021-10-10 01:04:09', '115.178.65.100', '115.178.65.100', 'N'),
(2, 1, 6, '제안', '제안 프로세스', 0, 0, 1, NULL, 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-09 00:00:00', '2021-10-11 23:59:59', '2021-10-10 01:04:56', '2021-10-10 01:04:56', '115.178.65.100', '115.178.65.100', 'N'),
(3, 1, 6, '보드 설계', '보드를 설계하는 프로세스', 0, 0, 8, NULL, 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-08 00:00:00', '2021-10-20 23:59:59', '2021-10-08 15:55:30', '2021-10-08 15:55:30', '115.178.65.100', '115.178.65.100', 'N'),
(4, 1, 6, '영상 개발', '영상 개발', 0, 0, 12, NULL, 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-25 00:00:00', '2021-11-04 23:59:59', '2021-10-10 01:05:38', '2021-10-10 01:05:38', '115.178.65.100', '115.178.65.100', 'N'),
(9, 2, 7, '테스트', '타기관 테스트', 0, 0, 20, NULL, 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-10 00:00:00', '2021-11-04 23:59:59', '2021-10-10 01:52:15', '2021-10-10 01:52:15', '115.178.65.100', '115.178.65.100', 'N'),
(15, 1, 11, '10월 22일 포팅일', '10월 22일 포팅일', 4, 3, 10, '[{\"key\":\"ㄴㅇㄹ\",\"value\":\"ㄴㅇㄹㄴㅇㄹ\"}]', 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-22 00:00:00', '2021-10-22 23:59:59', '2021-10-22 18:19:15', '2021-10-22 18:19:15', '116.120.31.158', '116.120.31.158', 'N'),
(16, 1, 12, '국가인권위원회_인권 공부 첫 걸음(4차시)', '인권위 을지로 포팅 / 나라배움터 포팅', 4, 4, 8, '[]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-15 00:00:00', '2021-10-28 23:59:59', '2021-10-22 18:54:12', '2021-10-22 18:54:12', '106.248.61.60', '106.248.61.60', 'N'),
(17, 1, 12, '국가인권위원회 연습 테스트', '연습 테스트입니다.', 3.5, 0, 10, '[]', 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-22 00:00:00', '2021-10-22 23:59:59', '2021-10-22 18:59:16', '2021-10-22 18:59:16', '106.248.61.60', '106.248.61.60', 'N'),
(18, 1, 12, '인권 걸음 첫 걸음', '을지로 LMS 4차시 포팅', 5, 1, 1, '[{\"key\":\"포팅 인원\",\"value\":\"3명\"},{\"key\":\"작업자\",\"value\":\"정태복, 김다솜\"}]', 'TYPE::NORMAL', 'STATUS::DONE', '2021-10-22 00:00:00', '2021-10-22 23:59:59', '2021-10-23 16:33:01', '2021-10-23 16:33:01', '59.7.120.184', '59.7.120.184', 'N'),
(19, 1, 14, 'Occidental', 'The original text of Li Europan lingues comes from an article written in 1933 for the journal Cosmoglotta entitled Occidental es inevitabil[1] (Occidental is inevitable), in which S.W. Beer from the universities of London and Cambridge wrote a letter explaining that he supported the language for practical reasons because he believed it would inevitably become Europe\'s lingua franca.', 3.5, 0, 15, '[{\"key\":\"mentioning \",\"value\":\"appearance \"},{\"key\":\"CSS Cookbook\",\"value\":\" O\'Reilly by Christopher Schmitt\"}]', 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-22 00:00:00', '2021-11-17 23:59:59', '2021-10-23 22:59:52', '2021-10-23 22:59:52', '59.7.120.184', '59.7.120.184', 'N'),
(20, 1, 14, 'Unanimity', 'Unanimity is agreement by all people in a given situation. Groups may consider unanimous decisions as a sign of e.g. social, political or procedural agreement, solidarity, and unity. Unanimity may be assumed explicitly after a unanimous vote or implicitly by a lack of objections. It does not necessarily mean uniformity and can sometimes be the opposite of majority in terms of outcomes.', 5, 2, 10, '[]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-15 00:00:00', '2021-12-29 23:59:59', '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(22, 1, 14, 'Voting', 'Practice varies as to whether a vote can be considered unanimous if some voter abstains. In Robert\'s Rules of Order, a \"unanimous vote\" is not specifically defined, although an abstention is not counted as a vote regardless of the voting threshold.[1] Also in this book, action could be taken by \"unanimous consent\", or \"general consent\", if there are no objections raised.[2] However, unanimous consent may not necessarily be the same as a unanimous vote (see Not the same as unanimous vote).[2] In either case, it does not take into account the members who were not present.', 1.5, 2, 3, '[{\"key\":\"Main page\",\"value\":\"Contents\"},{\"key\":\"Current events\",\"value\":\"Random article\"},{\"key\":\"Contact us\",\"value\":\"Contribute\"}]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-16 00:00:00', '2021-10-30 23:59:59', '2021-10-23 23:12:36', '2021-10-23 23:12:36', '59.7.120.184', '59.7.120.184', 'N'),
(23, 1, 14, 'Help:Contents', 'The Readers\' FAQ and our about page contain the most commonly sought information about Wikipedia.\n\nFor simple searches, there is a search box at the top of every page. Type what you are looking for in the box. Partial matches will appear in a dropdown list. Select any page in the list to go to that page. Or, select the magnifying glass \"Go\" button, or press ↵ Enter, to go to a full search result. For advanced searches, see Help:Searching.\n\nThere are other ways to browse and explore Wikipedia articles; many can be found at Wikipedia:Contents. Also see our disclaimer for cautions about Wikipedia\'s limitations.\n\nFor mobile access, press the mobile view link at the very bottom of every desktop view page.', 4.5, 15, 15, '[{\"key\":\"Edit an article\",\"value\":\"Report a problem with an article\"},{\"key\":\"Create a new article or upload media\",\"value\":\"Stuck\"},{\"key\":\"Factual questions\",\"value\":\"1840\"}]', 'TYPE::NORMAL', 'STATUS::DONE', '2021-10-15 00:00:00', '2021-10-30 23:59:59', '2021-10-23 23:20:20', '2021-10-23 23:20:20', '59.7.120.184', '59.7.120.184', 'N'),
(24, 1, 15, '1024_Test', '1024_Test', 3, 0, 9, '[]', 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-20 00:00:00', '2021-10-24 23:59:59', '2021-10-24 02:13:18', '2021-10-24 02:13:18', '59.7.120.184', '59.7.120.184', 'N'),
(25, 1, 15, 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...', 5, 0, 14, '[{\"key\":\"paragraphs\",\"value\":\"words\"},{\"key\":\"bytes\",\"value\":\"lists\"},{\"key\":\"Start with \'Lorem\",\"value\":\"ipsum dolor sit ame\"}]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-23 00:00:00', '2021-10-31 23:59:59', '2021-10-24 15:30:31', '2021-10-24 15:30:31', '59.7.120.184', '59.7.120.184', 'N'),
(26, 1, 15, 'Translations Can you help translate this site into a foreign', 'There is a set of mock banners available here in three', 4, 0, 9, '[{\"key\":\"goods\",\"value\":\"goods\"}]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-16 00:00:00', '2021-10-30 23:59:59', '2021-10-24 15:43:03', '2021-10-24 15:43:03', '59.7.120.184', '59.7.120.184', 'N'),
(27, 1, 15, 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.. ', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.. ', 4.5, 0, 7, '[]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-12 00:00:00', '2021-10-25 23:59:59', '2021-10-24 16:08:04', '2021-10-24 16:08:04', '59.7.120.184', '59.7.120.184', 'N'),
(28, 1, 15, 'Translations Can you help translate this site into a foreign', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... ', 5, 0, 12, '[]', 'TYPE::NORMAL', 'STATUS::DONE', '2021-10-23 00:00:00', '2021-10-30 23:59:59', '2021-10-24 16:18:11', '2021-10-24 16:18:11', '59.7.120.184', '59.7.120.184', 'N'),
(29, 1, 14, '우정공무원 교육원 이러닝 4개 과정 콘텐츠 개발', '4개 과정 콘텐츠 개발입니다.', 3, 7, 10, '[{\"key\":\"우정공무원\",\"value\":\"우정공무원\"}]', 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-25 00:00:00', '2021-10-30 23:59:59', '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(30, 1, 18, '보드 개발', '보드 개발', 3.5, 13, 13, '[{\"key\":\"보드 차시\",\"value\":\"14\"}]', 'TYPE::NORMAL', 'STATUS::DONE', '2021-10-24 00:00:00', '2021-10-29 23:59:59', '2021-10-26 17:34:45', '2021-10-26 17:34:45', '106.248.61.60', '106.248.61.60', 'N'),
(31, 1, 22, '보드 개발', '우정공무원 이러닝 과정 보드 개발', 4, 10, 10, '[{\"key\":\"외주\",\"value\":\"X\"},{\"key\":\"HTML5 여부\",\"value\":\"O\"},{\"key\":\"프로토 개발 일자\",\"value\":\"2021-09-15\"}]', 'TYPE::NORMAL', 'STATUS::DONE', '2021-10-08 00:00:00', '2021-10-28 23:59:59', '2021-10-27 11:29:58', '2021-10-27 11:29:58', '106.248.61.60', '106.248.61.60', 'N'),
(32, 1, 22, '디자인 컨펌', '디자인 개발은 끝났으나, 컨펌 대기중', 2.5, 3, 3, '[{\"key\":\"담당자\",\"value\":\"정태영\"},{\"key\":\"외주 개발 \",\"value\":\"O\"},{\"key\":\"기한\",\"value\":\"3일 이내\"}]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-13 00:00:00', '2021-10-19 23:59:59', '2021-10-27 11:30:58', '2021-10-27 11:30:58', '106.248.61.60', '106.248.61.60', 'N'),
(33, 1, 22, '양산 개발', '디자인 컨펌 후 프로토 개발 이 후 진행', 4.5, 1, 10, '[{\"key\":\"양산 개발\",\"value\":\"포팅 일자가 가까워 빠른 양산 필요\"}]', 'TYPE::NORMAL', 'STATUS::TODO', '2021-10-01 00:00:00', '2021-10-28 23:59:59', '2021-10-27 11:32:02', '2021-10-27 11:32:02', '106.248.61.60', '106.248.61.60', 'N'),
(34, 1, 22, '프로토 차시 개발', '프로토 차시 개발입니다. ', 5, 0, 1, '[{\"key\":\"HTML5 개발 여부\",\"value\":\"X\"},{\"key\":\"MP4 개발 여부\",\"value\":\"O\"},{\"key\":\"차시 수\",\"value\":\"1개 차시\"}]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-05 00:00:00', '2021-10-26 23:59:59', '2021-10-27 11:33:10', '2021-10-27 11:33:10', '106.248.61.60', '106.248.61.60', 'N'),
(35, 1, 22, '프로토 차시 개발', '프로토는 4차시로 진행됩니다.', 3.5, 5, 6, '[{\"key\":\"차시\",\"value\":\"4차시\"},{\"key\":\"HTML5\",\"value\":\"완료\"},{\"key\":\"드래그 퀴즈\",\"value\":\"O\"},{\"key\":\"선잇기 퀴즈\",\"value\":\"O\"}]', 'TYPE::NORMAL', 'STATUS::IN PROGRESS', '2021-10-13 00:00:00', '2021-10-27 23:59:59', '2021-10-27 11:37:33', '2021-10-27 11:37:33', '106.248.61.60', '106.248.61.60', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_agcy_proj_proc_colleague`
--

CREATE TABLE `tb_agcy_proj_proc_colleague` (
  `id` int(11) NOT NULL COMMENT '참여자 리스트 ID',
  `ref_proc_id` int(11) NOT NULL COMMENT '어떤 프로세스인지 (참조 키)',
  `ref_colleague_seq` int(11) NOT NULL COMMENT '참여자 멤버 시퀀스(참조 키)',
  `type` varchar(24) NOT NULL DEFAULT 'TYPE::SUB' COMMENT '참여하는 프로세스의 담당 수준(메인, 서브)',
  `submit_count` int(11) DEFAULT 0 COMMENT '프로세스 제출 회수',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '생성 일자',
  `upd_date` datetime DEFAULT current_timestamp() COMMENT '업데이트 일자',
  `reg_ip` varchar(24) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(24) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='기관별 프로젝트 참여자 리스트(or 프로세스 담당자들)';

--
-- 테이블의 덤프 데이터 `tb_agcy_proj_proc_colleague`
--

INSERT INTO `tb_agcy_proj_proc_colleague` (`id`, `ref_proc_id`, `ref_colleague_seq`, `type`, `submit_count`, `reg_date`, `upd_date`, `reg_ip`, `upd_ip`, `delete_yn`) VALUES
(9, 1, 2, 'TYPE::MAIN', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(10, 2, 3, 'TYPE::MAIN', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(11, 3, 4, 'TYPE::MAIN', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(12, 4, 5, 'TYPE::MAIN', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(13, 1, 6, 'TYPE::SUB', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(14, 2, 7, 'TYPE::SUB', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(15, 3, 8, 'TYPE::SUB', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(16, 4, 9, 'TYPE::SUB', 0, '2021-10-10 01:28:32', '2021-10-10 01:28:32', '115.178.65.100', '115.178.65.100', 'N'),
(17, 9, 2, 'TYPE::MAIN', 0, '2021-10-10 01:52:57', '2021-10-10 01:52:57', '115.178.65.100', '115.178.65.100', 'N'),
(20, 15, 4, 'TYPE::SUB', 0, '2021-10-22 18:19:15', '2021-10-22 18:19:15', '116.120.31.158', '116.120.31.158', 'N'),
(21, 15, 2, 'TYPE::MAIN', 0, '2021-10-22 18:19:15', '2021-10-22 18:19:15', '116.120.31.158', '116.120.31.158', 'N'),
(22, 16, 4, 'TYPE::SUB', 0, '2021-10-22 18:54:12', '2021-10-22 18:54:12', '106.248.61.60', '106.248.61.60', 'N'),
(23, 16, 5, 'TYPE::SUB', 0, '2021-10-22 18:54:12', '2021-10-22 18:54:12', '106.248.61.60', '106.248.61.60', 'N'),
(24, 16, 7, 'TYPE::MAIN', 0, '2021-10-22 18:54:12', '2021-10-22 18:54:12', '106.248.61.60', '106.248.61.60', 'N'),
(25, 17, 6, 'TYPE::SUB', 0, '2021-10-22 18:59:16', '2021-10-22 18:59:16', '106.248.61.60', '106.248.61.60', 'N'),
(26, 17, 5, 'TYPE::SUB', 0, '2021-10-22 18:59:16', '2021-10-22 18:59:16', '106.248.61.60', '106.248.61.60', 'N'),
(27, 17, 4, 'TYPE::SUB', 0, '2021-10-22 18:59:16', '2021-10-22 18:59:16', '106.248.61.60', '106.248.61.60', 'N'),
(28, 17, 8, 'TYPE::MAIN', 0, '2021-10-22 18:59:16', '2021-10-22 18:59:16', '106.248.61.60', '106.248.61.60', 'N'),
(29, 18, 4, 'TYPE::SUB', 0, '2021-10-23 16:33:01', '2021-10-23 16:33:01', '59.7.120.184', '59.7.120.184', 'N'),
(30, 18, 4, 'TYPE::MAIN', 0, '2021-10-23 16:33:01', '2021-10-23 16:33:01', '59.7.120.184', '59.7.120.184', 'N'),
(31, 19, 3, 'TYPE::SUB', 0, '2021-10-23 22:59:52', '2021-10-23 22:59:52', '59.7.120.184', '59.7.120.184', 'N'),
(32, 19, 2, 'TYPE::MAIN', 0, '2021-10-23 22:59:52', '2021-10-23 22:59:52', '59.7.120.184', '59.7.120.184', 'N'),
(33, 20, 2, 'TYPE::SUB', 0, '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(34, 20, 3, 'TYPE::SUB', 0, '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(35, 20, 9, 'TYPE::SUB', 0, '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(36, 20, 8, 'TYPE::SUB', 0, '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(37, 20, 7, 'TYPE::SUB', 0, '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(38, 20, 6, 'TYPE::SUB', 0, '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(39, 20, 6, 'TYPE::MAIN', 0, '2021-10-23 23:03:40', '2021-10-23 23:03:40', '59.7.120.184', '59.7.120.184', 'N'),
(40, 22, 3, 'TYPE::SUB', 0, '2021-10-23 23:12:36', '2021-10-23 23:12:36', '59.7.120.184', '59.7.120.184', 'N'),
(41, 22, 2, 'TYPE::SUB', 0, '2021-10-23 23:12:36', '2021-10-23 23:12:36', '59.7.120.184', '59.7.120.184', 'N'),
(42, 22, 9, 'TYPE::SUB', 0, '2021-10-23 23:12:36', '2021-10-23 23:12:36', '59.7.120.184', '59.7.120.184', 'N'),
(43, 22, 6, 'TYPE::MAIN', 0, '2021-10-23 23:12:36', '2021-10-23 23:12:36', '59.7.120.184', '59.7.120.184', 'N'),
(44, 23, 7, 'TYPE::SUB', 0, '2021-10-23 23:20:20', '2021-10-23 23:20:20', '59.7.120.184', '59.7.120.184', 'N'),
(45, 23, 6, 'TYPE::SUB', 0, '2021-10-23 23:20:20', '2021-10-23 23:20:20', '59.7.120.184', '59.7.120.184', 'N'),
(46, 23, 9, 'TYPE::SUB', 0, '2021-10-23 23:20:20', '2021-10-23 23:20:20', '59.7.120.184', '59.7.120.184', 'N'),
(47, 23, 7, 'TYPE::MAIN', 0, '2021-10-23 23:20:20', '2021-10-23 23:20:20', '59.7.120.184', '59.7.120.184', 'N'),
(48, 24, 3, 'TYPE::SUB', 0, '2021-10-24 02:13:18', '2021-10-24 02:13:18', '59.7.120.184', '59.7.120.184', 'N'),
(49, 24, 4, 'TYPE::SUB', 0, '2021-10-24 02:13:18', '2021-10-24 02:13:18', '59.7.120.184', '59.7.120.184', 'N'),
(50, 24, 2, 'TYPE::MAIN', 0, '2021-10-24 02:13:18', '2021-10-24 02:13:18', '59.7.120.184', '59.7.120.184', 'N'),
(51, 25, 4, 'TYPE::SUB', 0, '2021-10-24 15:30:31', '2021-10-24 15:30:31', '59.7.120.184', '59.7.120.184', 'N'),
(52, 25, 2, 'TYPE::MAIN', 0, '2021-10-24 15:30:31', '2021-10-24 15:30:31', '59.7.120.184', '59.7.120.184', 'N'),
(53, 26, 4, 'TYPE::SUB', 0, '2021-10-24 15:43:03', '2021-10-24 15:43:03', '59.7.120.184', '59.7.120.184', 'N'),
(54, 26, 2, 'TYPE::SUB', 0, '2021-10-24 15:43:03', '2021-10-24 15:43:03', '59.7.120.184', '59.7.120.184', 'N'),
(55, 26, 4, 'TYPE::MAIN', 0, '2021-10-24 15:43:03', '2021-10-24 15:43:03', '59.7.120.184', '59.7.120.184', 'N'),
(56, 27, 3, 'TYPE::SUB', 0, '2021-10-24 16:08:04', '2021-10-24 16:08:04', '59.7.120.184', '59.7.120.184', 'N'),
(57, 27, 4, 'TYPE::SUB', 0, '2021-10-24 16:08:04', '2021-10-24 16:08:04', '59.7.120.184', '59.7.120.184', 'N'),
(58, 27, 2, 'TYPE::MAIN', 0, '2021-10-24 16:08:04', '2021-10-24 16:08:04', '59.7.120.184', '59.7.120.184', 'N'),
(59, 28, 2, 'TYPE::SUB', 0, '2021-10-24 16:18:11', '2021-10-24 16:18:11', '59.7.120.184', '59.7.120.184', 'N'),
(60, 28, 4, 'TYPE::SUB', 0, '2021-10-24 16:18:11', '2021-10-24 16:18:11', '59.7.120.184', '59.7.120.184', 'N'),
(61, 28, 4, 'TYPE::MAIN', 0, '2021-10-24 16:18:11', '2021-10-24 16:18:11', '59.7.120.184', '59.7.120.184', 'N'),
(62, 29, 2, 'TYPE::SUB', 0, '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(63, 29, 9, 'TYPE::SUB', 0, '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(64, 29, 8, 'TYPE::SUB', 0, '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(65, 29, 7, 'TYPE::SUB', 0, '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(66, 29, 6, 'TYPE::SUB', 0, '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(67, 29, 3, 'TYPE::SUB', 0, '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(68, 29, 6, 'TYPE::MAIN', 0, '2021-10-26 17:30:14', '2021-10-26 17:30:14', '106.248.61.60', '106.248.61.60', 'N'),
(69, 30, 7, 'TYPE::SUB', 0, '2021-10-26 17:34:45', '2021-10-26 17:34:45', '106.248.61.60', '106.248.61.60', 'N'),
(70, 30, 6, 'TYPE::MAIN', 0, '2021-10-26 17:34:45', '2021-10-26 17:34:45', '106.248.61.60', '106.248.61.60', 'N'),
(71, 31, 7, 'TYPE::SUB', 0, '2021-10-27 11:29:58', '2021-10-27 11:29:58', '106.248.61.60', '106.248.61.60', 'N'),
(72, 31, 8, 'TYPE::SUB', 0, '2021-10-27 11:29:58', '2021-10-27 11:29:58', '106.248.61.60', '106.248.61.60', 'N'),
(73, 31, 6, 'TYPE::MAIN', 0, '2021-10-27 11:29:58', '2021-10-27 11:29:58', '106.248.61.60', '106.248.61.60', 'N'),
(74, 32, 7, 'TYPE::SUB', 0, '2021-10-27 11:30:59', '2021-10-27 11:30:59', '106.248.61.60', '106.248.61.60', 'N'),
(75, 32, 8, 'TYPE::SUB', 0, '2021-10-27 11:30:59', '2021-10-27 11:30:59', '106.248.61.60', '106.248.61.60', 'N'),
(76, 32, 8, 'TYPE::MAIN', 0, '2021-10-27 11:30:59', '2021-10-27 11:30:59', '106.248.61.60', '106.248.61.60', 'N'),
(77, 33, 7, 'TYPE::SUB', 0, '2021-10-27 11:32:02', '2021-10-27 11:32:02', '106.248.61.60', '106.248.61.60', 'N'),
(78, 33, 6, 'TYPE::SUB', 0, '2021-10-27 11:32:02', '2021-10-27 11:32:02', '106.248.61.60', '106.248.61.60', 'N'),
(79, 33, 5, 'TYPE::MAIN', 0, '2021-10-27 11:32:02', '2021-10-27 11:32:02', '106.248.61.60', '106.248.61.60', 'N'),
(80, 35, 8, 'TYPE::SUB', 0, '2021-10-27 11:37:33', '2021-10-27 11:37:33', '106.248.61.60', '106.248.61.60', 'N'),
(81, 35, 5, 'TYPE::SUB', 0, '2021-10-27 11:37:33', '2021-10-27 11:37:33', '106.248.61.60', '106.248.61.60', 'N'),
(82, 35, 7, 'TYPE::MAIN', 0, '2021-10-27 11:37:33', '2021-10-27 11:37:33', '106.248.61.60', '106.248.61.60', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_alarm`
--

CREATE TABLE `tb_alarm` (
  `id` int(11) NOT NULL,
  `writer_seq` int(11) NOT NULL COMMENT '알람 전송자(작성자)',
  `send_type` varchar(48) DEFAULT 'SEND_TYPE::UNSET' COMMENT '알람 전송 방법, SEND_TYPE::MAIL, SMS, KAKAO, APP, ...',
  `ref_target_type` varchar(48) DEFAULT NULL COMMENT '어떤 게시글에서 알람을 울리는지, TARGET_TYPE::PROJECT, BOARD, COMMENT, ...',
  `ref_target_id` varchar(48) DEFAULT NULL COMMENT '알람으로 이동해야 할 게시글의 고유 키',
  `title` varchar(48) DEFAULT NULL COMMENT '알람 제목',
  `desc` varchar(128) DEFAULT NULL COMMENT '알람 설명 (메일에 함께 보내는 내용)',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일자',
  `upd_date` datetime DEFAULT NULL COMMENT '업데이트 일자',
  `reg_ip` varchar(24) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(24) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='알람 목록';

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_alarm_receiver`
--

CREATE TABLE `tb_alarm_receiver` (
  `id` int(11) NOT NULL COMMENT '알람 고유 키',
  `ref_alarm_id` int(11) DEFAULT NULL COMMENT 'tb_alarm에서 알람의 내용을 조회하기 위한 키',
  `ref_receiver_seq` int(11) DEFAULT NULL COMMENT '알람을 받는 사람',
  `status` varchar(48) DEFAULT 'STATUS::DIDNTSEE' COMMENT 'STATUS::DIDNTSEE. SAW',
  `reg_date` datetime DEFAULT NULL COMMENT '알람 수신 일자',
  `saw_date` datetime DEFAULT NULL COMMENT '알람 확인 일자',
  `saw_ip` varchar(16) DEFAULT NULL COMMENT '알람 확인 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='알람 대상자 목록';

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_auth`
--

CREATE TABLE `tb_auth` (
  `id` int(11) NOT NULL,
  `code` varchar(8) DEFAULT NULL,
  `allow_action` varchar(1000) DEFAULT 'NOT' COMMENT '허용 가능한 동작, 디폴트 값  ''NOT''은 아무 행동도 하지 못함을 의미함.',
  `type_short_name` varchar(4) DEFAULT NULL,
  `type_full_name` varchar(48) DEFAULT NULL,
  `desc` varchar(48) DEFAULT '입력 필요',
  `count` int(11) DEFAULT 0,
  `inside_yn` varchar(1) DEFAULT 'Y',
  `delete_yn` varchar(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='권한 정보';

--
-- 테이블의 덤프 데이터 `tb_auth`
--

INSERT INTO `tb_auth` (`id`, `code`, `allow_action`, `type_short_name`, `type_full_name`, `desc`, `count`, `inside_yn`, `delete_yn`) VALUES
(0, 'E001', 'NOT', 'E', 'Etc', '방문객, 기타', 0, 'N', 'N'),
(1, 'U001', 'READ|DOWN|UPLOAD', 'U', 'User', '사원', 0, 'Y', 'N'),
(2, 'T001', 'READ|DOWN|UPLOAD', 'T', 'Team Manager', '팀장', 0, 'Y', 'N'),
(3, 'C001', 'READ|DOWN|UPLOAD', 'C', 'Chief', '본부장', 0, 'Y', 'N'),
(4, 'D001', 'READ|DOWN|UPLOAD', 'D', 'Director', '총괄 책임자', 0, 'Y', 'N'),
(5, 'H001', 'READ|DOWN|UPLOAD', 'H', 'Head', '대표', 0, 'Y', 'N'),
(6, 'M001', 'READ|DOWN|WRITE|UPLOAD', 'M', 'Master Manager', '관리자', 0, 'Y', 'N'),
(7, 'O001', 'READ|DOWN|UPLOAD', 'O', 'Outsourcing', '외주 인력', 0, 'N', 'N'),
(8, 'B001', 'READ', 'B', 'Business', '고객사', 0, 'N', 'N'),
(9, 'OR', 'READ', 'OR', 'Only Read', '읽기 전용', 0, 'N', 'N'),
(10, 'U002', 'READ|DOWN|UPLOAD|WRITE', 'U', 'User', '테스터', 0, 'Y', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_board_element`
--

CREATE TABLE `tb_board_element` (
  `id` int(11) NOT NULL COMMENT '고유키',
  `writer_seq` int(11) NOT NULL COMMENT '게시글 작성자',
  `ref_board_subject_id` int(11) DEFAULT NULL COMMENT '게시글을 소유하고 있는 게시판',
  `title` varchar(48) DEFAULT NULL COMMENT '제목',
  `board_type` varchar(24) DEFAULT 'BOARD_TYPE::NORMAL' COMMENT '보드 타입, BOARD_TYPE::NORMAL, IMG, VIDEO, ...',
  `status` varchar(48) DEFAULT 'STATUS::OPEN' COMMENT '게시글 상태, STATUS::OPEN, CLOSE',
  `upd_count` int(11) DEFAULT NULL COMMENT '업데이트 회수',
  `view_count` int(11) DEFAULT NULL COMMENT '조회수',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일자',
  `upd_date` datetime DEFAULT NULL COMMENT '업데이트 일자',
  `reg_ip` varchar(24) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(24) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시물';

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_board_element_comment`
--

CREATE TABLE `tb_board_element_comment` (
  `id` int(11) NOT NULL COMMENT '게시물 코멘트 고유 키',
  `writer_seq` int(11) NOT NULL COMMENT '게시물 코멘트 작성자',
  `ref_board_element_id` int(11) DEFAULT NULL COMMENT 'tb_boiard_element의 고유 키\n코멘트가 작성된 게시글 조회를 위한 키',
  `comment` varchar(1024) DEFAULT NULL COMMENT '코멘트 내용',
  `status` varchar(48) DEFAULT 'COMMENT_TYPE::NORMAL' COMMENT '코멘트 상태, COMMENT_TYPE::NORMAL, COMMENT_TYPE::FILE, COMMENT_TYPE::IMAGE',
  `file_name` varchar(256) DEFAULT NULL COMMENT '코멘트 타입이 파일일 경우 저장된 파일명',
  `file_path` varchar(1024) DEFAULT NULL COMMENT '코멘트 타입이 파일일 경우 경로',
  `upd_count` int(11) DEFAULT NULL COMMENT '업데이트 회수',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일자',
  `upd_date` datetime DEFAULT NULL COMMENT '업데이트 일자',
  `reg_ip` varchar(24) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(24) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시물 코멘트';

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_board_subject`
--

CREATE TABLE `tb_board_subject` (
  `id` int(11) NOT NULL COMMENT '고유 키',
  `ref_process_id` int(11) NOT NULL COMMENT '참조 프로세스 ID, 어떤 프로세스에 속한 게시판인지 나타난다.',
  `title` varchar(48) DEFAULT NULL COMMENT '제목',
  `desc` varchar(128) DEFAULT NULL COMMENT '게시판에 대한 설명',
  `layout_type` varchar(24) DEFAULT 'LAYOUT_TYPE::DEFAULT' COMMENT '레이아웃 구조, LAYOUT_TYPE::DEFAULT, QNA, FAQ, IMG, VIDEO, HTML5, ...',
  `status` varchar(24) DEFAULT 'STATUS::OPEN' COMMENT '공개 여부, STATUS::OPEN, CLOSE',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '생성 일자',
  `upd_date` datetime DEFAULT current_timestamp() COMMENT '업데이트 일자',
  `reg_ip` varchar(16) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(16) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시판 리스트';

--
-- 테이블의 덤프 데이터 `tb_board_subject`
--

INSERT INTO `tb_board_subject` (`id`, `ref_process_id`, `title`, `desc`, `layout_type`, `status`, `reg_date`, `upd_date`, `reg_ip`, `upd_ip`, `delete_yn`) VALUES
(1, 1, '보드 업로드', '보드 업로드하는 게시판입니다.', ' LAYOUT_TYPE::DEFAULT', 'STATUS::OPEN', '2021-10-10 01:02:37', '2021-10-10 01:02:37', NULL, NULL, 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_calendar_element`
--

CREATE TABLE `tb_calendar_element` (
  `id` int(11) NOT NULL COMMENT '고유 키',
  `ref_project_id` int(11) NOT NULL COMMENT '포함된 프로젝트 ID, 어느 프로젝트에 포함 되어 있는지가 나타난다.',
  `title` varchar(48) DEFAULT NULL COMMENT '캘린더 일정 제목',
  `status` varchar(48) DEFAULT 'STATUS::WAIT' COMMENT '캘린더 일정 상태(대기, 진행중, 만료, 완료), STATUS::WAIT, ING, DELAY, COMPLETE',
  `view_count` int(11) DEFAULT NULL COMMENT '일정 조회수',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일자',
  `upd_date` datetime DEFAULT NULL COMMENT '업데이트 일자',
  `start_date` datetime DEFAULT NULL COMMENT '일정 시작일',
  `end_date` datetime DEFAULT NULL COMMENT '일정 마감일',
  `reg_ip` varchar(24) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(24) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='캘린더 일정 리스트';

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_file_attach`
--

CREATE TABLE `tb_file_attach` (
  `id` int(11) NOT NULL COMMENT '파일 고유 키',
  `ref_file_board_id` int(11) NOT NULL COMMENT '어떤 게시물에 포함된 파일인지를 나타낸다.',
  `writer_seq` int(11) DEFAULT NULL COMMENT '업로드한 멤버의 고유 키',
  `file_name` varchar(256) DEFAULT NULL COMMENT '파일명',
  `file_path` varchar(1024) DEFAULT NULL COMMENT '파일 경로',
  `file_extension` varchar(24) DEFAULT NULL COMMENT '파일 확장자',
  `file_size` varchar(512) DEFAULT NULL COMMENT '파일 사이즈',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일자',
  `upd_date` datetime DEFAULT NULL COMMENT '업데이트 일자',
  `reg_ip` varchar(24) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(24) DEFAULT NULL COMMENT '업데이트 IP',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='파일 목록';

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_member`
--

CREATE TABLE `tb_member` (
  `seq` int(11) NOT NULL COMMENT '멤버 고유 키',
  `ref_auth_id` int(11) NOT NULL DEFAULT 0 COMMENT '권한 등급, 초기 가입시 0을 할당 받는다.',
  `id` varchar(96) NOT NULL COMMENT '멤버 로그인 ID',
  `password` varchar(256) NOT NULL COMMENT '멤버 로그인 패스워드, 암호화',
  `first_name` varchar(16) NOT NULL COMMENT '성',
  `last_name` varchar(16) NOT NULL COMMENT '이름',
  `full_name` varchar(32) DEFAULT NULL,
  `nickname` varchar(32) DEFAULT NULL COMMENT '성 + 이름',
  `phone` varchar(24) DEFAULT NULL COMMENT '휴대폰 번호',
  `dept_no` int(11) NOT NULL COMMENT '부서 번호',
  `rank_no` int(11) DEFAULT NULL COMMENT '직책',
  `age` int(11) DEFAULT NULL COMMENT '나이',
  `address` varchar(128) DEFAULT NULL COMMENT '주소',
  `followed` int(11) DEFAULT 0 COMMENT '팔로워 수',
  `avatar_name` varchar(256) DEFAULT 'default.png' COMMENT '등록 아바타 파일명',
  `avatar_path` varchar(1024) DEFAULT NULL COMMENT '등록 아바타 파일 경로',
  `reg_date` datetime DEFAULT NULL COMMENT '생성 일자',
  `upd_date` datetime DEFAULT NULL COMMENT '업데이트 일자',
  `reg_ip` varchar(32) DEFAULT NULL COMMENT '생성 IP',
  `upd_ip` varchar(32) DEFAULT NULL COMMENT '업데이트 IP',
  `country_name` varchar(48) DEFAULT 'unknown',
  `country_code` varchar(48) DEFAULT 'unknown',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='멤버 리스트';

--
-- 테이블의 덤프 데이터 `tb_member`
--

INSERT INTO `tb_member` (`seq`, `ref_auth_id`, `id`, `password`, `first_name`, `last_name`, `full_name`, `nickname`, `phone`, `dept_no`, `rank_no`, `age`, `address`, `followed`, `avatar_name`, `avatar_path`, `reg_date`, `upd_date`, `reg_ip`, `upd_ip`, `country_name`, `country_code`, `delete_yn`) VALUES
(1, 6, 'dev', '$2b$10$W0oXoG7OV9HaRTpuzdvK0.NJlHFoZozeMzZw3OvG8nquzuM/ElqgW', '관', '리자', '관리자', '관리자', '010-5614-1328', 15, 34, NULL, NULL, 0, 'avatar_1632279009489_cartoon.png', '\\static\\avatars\\items\\default\\33.jpg', '2021-09-22 11:50:09', '2021-09-22 11:50:09', '59.7.120.184', '59.7.120.184', 'South Korea', 'KR', 'N'),
(2, 1, 'blackishhood@mirimmedialab.co.kr', '$2b$10$1s4Ctr3V401dFJiUTszIEul5208RoRm8xpBf2jJ9nZ5YWDpNdTyx.', '정', '태복', '정태복', '정태복', '010-5614-1328', 15, 32, NULL, NULL, 0, 'avatar_1631980287125_cartoon.png', '\\static\\avatars\\items\\default\\07.jpg', '2021-09-19 00:51:27', '2021-09-19 00:51:27', '59.7.120.184', '59.7.120.184', 'South Korea', 'KR', 'N'),
(3, 1, 'outsourcing@outsourcing.com', '$2b$10$0LC4hj54P5cBcu/aEKtWh.t3MzMbZNwaEfHfcP.ZHMPJFr3qOS7EC', '아웃', '소싱', '아웃소싱', '아웃소싱', '010-0000-0000', 11, 34, NULL, NULL, 0, 'default.png', '\\static\\avatars\\items\\default\\17.jpg', '2021-09-23 19:09:46', '2021-09-23 19:09:46', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(4, 1, 'thddnwls0831@daum.net', '$2b$10$G2krZvOr/JFthX.uuV.wYexUclHLD81trRxmdA7LNEuawcGsOg02q', '송', '우진', '송우진', '송우진', '010-9679-3328', 15, 32, NULL, NULL, 0, 'default.png', '\\static\\avatars\\items\\default\\16.jpg', '2021-09-28 10:59:19', '2021-09-28 10:59:19', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(5, 1, 'ujm4243@naver.com', '$2b$10$Vwm0ByfuHx4rcjCy4E9sVu4EDxgzDbXd/J7rfhQUcOsBYLl/9uT.e', '윤', '민호', '윤민호', '윤민호', '010-9142-2726', 15, 32, NULL, NULL, 0, 'default.png', '\\static\\avatars\\items\\default\\18.jpg', '2021-09-28 10:59:41', '2021-09-28 10:59:41', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(6, 1, 'askjmyyyojqa@mirimmedialab.co.kr', '$2b$10$d.dRRrUIaDolmNXFgXKk/.RoCbhMsld/ZX5wCGYfbEbSEzk0b204W', '최', '현중', '최현중', 'askjmyyyojqa', '010-8374-0939', 15, 32, NULL, NULL, 0, 'default.png', '\\static\\avatars\\items\\default\\19.jpg', '2021-09-28 11:01:09', '2021-09-28 11:01:09', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(7, 1, 'dinb1242@naver.com', '$2b$10$h2QxPM504bec9zxdc6Dk3.4L4ibjB/KokziJ3xeHNQnVWi9lAnn7a', '정', '지현', '정지현', '정또술', '010-6679-3306', 15, 32, NULL, NULL, 0, 'default.png', '\\static\\avatars\\items\\default\\20.jpg', '2021-09-28 11:01:47', '2021-09-28 11:01:47', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(8, 1, 'xodud@test.com', '$2b$10$rrv4dT/.J3oMh/yEb4ueluA0.r0J1P8rqV2L6lFI55gW5CeAviITe', '정', '태영', '정태영', '꼬몽월드', '010-5621-8198', 33, 34, NULL, NULL, 0, 'avatar_1632794715774_김두얼 교수.png', '\\static\\avatars\\items\\user\\avatar_1632794715774_김두얼 교수.png', '2021-09-28 11:05:15', '2021-09-28 11:05:15', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(9, 1, 'icemira@nate.com', '$2b$10$xgKgGBHipHwFgT2vN1e2hOtBTgHjt.u8HOBRZZz3a27x3GHC8.gi2', '황', '미라', '황미라', '빵만보', '010-7327-0010', 15, 28, NULL, NULL, 0, 'default.png', '\\static\\avatars\\items\\default\\21.jpg', '2021-09-28 11:06:35', '2021-09-28 11:06:35', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(18, 0, 'xodud5648@naver.com', '$2b$10$eG.CtRei.h3E.JxWMKRScewndPo.6SDhQI31g5gnp7EgZJE5evSBe', '정', '태영', '정태영', '바바바', '01056218198', 9, 28, NULL, NULL, 0, '34.png', '\\static\\avatars\\items\\default\\01.png', '2021-09-30 21:55:23', '2021-09-30 21:55:23', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(20, 1, 'm_snow02@mirimmedia.co.kr', '$2b$10$IXEMBsMSjHp/6i3GGcVRfu8G6Ov4w8tmEHtUP.ULGuIeUrpbAaY9u', '김', '다솜', '김다솜', '다솜씨', '01041071306', 15, 32, NULL, NULL, 0, '33.jpg', '\\static\\avatars\\items\\default\\33.jpg', '2021-10-25 15:29:25', '2021-10-25 15:29:25', '115.178.65.100', '115.178.65.100', 'South Korea', 'KR', 'N'),
(21, 1, 'blackishhood2@mirimmedialab.co.kr', '$2b$10$2xDjggbFfg60p2JQXLQrleMvCV1jeTCgUxI73Eg98atDi8tlEHZKu', '제', '임스', '제임스', '외국인', '01056141328', 15, 32, NULL, NULL, 0, 'avatar_1635233676347_01.png', '/static/avatars/items/user/avatar_1635233676347_01.png', '2021-10-26 16:34:36', '2021-10-26 16:34:36', '106.248.61.60', '106.248.61.60', 'South Korea', 'KR', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_news`
--

CREATE TABLE `tb_news` (
  `id` int(11) NOT NULL COMMENT '고유 ID',
  `type` varchar(24) NOT NULL DEFAULT 'INCLUDE::UNKNOWN' COMMENT '어떤 곳에 포함이 되어 있는지',
  `ref_id` varchar(45) NOT NULL COMMENT '포함된 곳의 게시물 아이디',
  `writer_seq` int(11) NOT NULL DEFAULT 1 COMMENT '작성자의 시퀀스',
  `message` mediumtext DEFAULT 'NO MESSAGE' COMMENT '포함된 메세지',
  `url` varchar(1000) DEFAULT '/landing' COMMENT '이동할 링크',
  `reg_date` timestamp NULL DEFAULT current_timestamp() COMMENT '생성일(작성일)',
  `delete_yn` varchar(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `tb_news`
--

INSERT INTO `tb_news` (`id`, `type`, `ref_id`, `writer_seq`, `message`, `url`, `reg_date`, `delete_yn`) VALUES
(2, 'INCLUDE::PROJECT', '15', 2, 'voluptatem accusantium doloremque laudantium quia dolor sit amet, consectetur, adipisci velit 프로세스를 생성하였습니다.', '/agency/project/process/detail/25', '2021-10-24 06:30:31', 'N'),
(3, 'INCLUDE::PROJECT', '15', 1, 'NodeJS Python Interface GTK Lipsum Rails .NET Groovy 프로세스를 생성하였습니다.', '/agency/project/process/detail/26', '2021-10-12 06:43:03', 'N'),
(4, 'INCLUDE::PROJECT', '15', 3, 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit 프로세스를 생성하였습니다.', '/agency/project/process/detail/27', '2021-09-11 07:08:04', 'N'),
(5, 'INCLUDE::PROJECT', '15', 4, 'Translations Can you help translate this site into a foreign 프로세스를 생성하였습니다.', '/agency/project/process/detail/28', '2020-09-12 07:18:11', 'N'),
(6, 'INCLUDE::AGENCY', '16', 5, 'Translations Can you help translate this site into a foreign 프로젝트를 생성하였습니다.', '/agency/project/detail/15', '2021-10-24 06:30:31', 'N'),
(7, 'INCLUDE::AGENCY', '16', 6, 'currently testing the API 프로젝트를 생성하였습니다.', '/agency/project/detail/16', '2021-10-24 11:20:34', 'N'),
(8, 'INCLUDE::PROJECT', '14', 2, 'Occidental 프로세스를 생성하였습니다.', '/agency/project/process/detail/19', '2021-10-24 10:30:31', 'N'),
(9, 'INCLUDE::PROJECT', '14', 8, 'Unanimity 프로세스를 생성하였습니다.', '/agency/project/process/detail/20', '2021-10-12 06:43:03', 'N'),
(10, 'INCLUDE::PROJECT', '14', 2, 'Voting 프로세스을 생성하였습니다.', '/agency/project/process/detail/22', '2021-10-24 03:30:31', 'N'),
(11, 'INCLUDE::PROJECT', '14', 4, 'Help:Contents 프로세스를 생성하였습니다.', '/agency/project/process/detail/23', '2021-08-24 06:30:31', 'N'),
(12, 'INCLUDE::AGENCY', '18', 2, 'What follows is H. Rackham\'s translation 프로젝트를 생성하였습니다.', '/agency/project/detail/14', '2021-10-24 03:30:31', 'N'),
(13, 'INCLUDE::AGENCY', '18', 1, '10월26일 CDMS 발표일 프로젝트를 생성하였습니다.', '/agency/project/detail/17', '2021-10-26 08:02:20', 'N'),
(14, 'INCLUDE::AGENCY', '18', 1, '우정공무원 교육원 이러닝 4개 과정 콘텐츠 개발 프로젝트를 생성하였습니다.', '/agency/project/detail/18', '2021-10-26 08:08:24', 'N'),
(15, 'INCLUDE::PROJECT', '14', 1, '우정공무원 교육원 이러닝 4개 과정 콘텐츠 개발 프로세스를 생성하였습니다.', '/agency/project/process/detail/29', '2021-10-26 08:30:14', 'N'),
(16, 'INCLUDE::PROJECT', '18', 1, '보드 개발 프로세스를 생성하였습니다.', '/agency/project/process/detail/30', '2021-10-26 08:34:45', 'N'),
(17, 'INCLUDE::AGENCY', '19', 1, '이러닝_고객자산관리 프로젝트를 생성하였습니다.', '/agency/project/detail/19', '2021-10-27 02:19:32', 'N'),
(18, 'INCLUDE::AGENCY', '19', 1, '이러닝_제휴사업 역량 강화 프로젝트를 생성하였습니다.', '/agency/project/detail/20', '2021-10-27 02:21:57', 'N'),
(19, 'INCLUDE::AGENCY', '19', 1, '이러닝_우체국 외국환 업무 완전정복 프로젝트를 생성하였습니다.', '/agency/project/detail/21', '2021-10-27 02:23:03', 'N'),
(20, 'INCLUDE::AGENCY', '19', 1, '마이크로러닝_갑질예방교육 프로젝트를 생성하였습니다.', '/agency/project/detail/22', '2021-10-27 02:25:52', 'N'),
(21, 'INCLUDE::AGENCY', '19', 1, '마이크로러닝_공직자의 이해 충돌 방지법 프로젝트를 생성하였습니다.', '/agency/project/detail/23', '2021-10-27 02:26:55', 'N'),
(22, 'INCLUDE::AGENCY', '19', 1, '마이크로러닝_우체국 금융 창구 매뉴얼(장애인편) 프로젝트를 생성하였습니다.', '/agency/project/detail/24', '2021-10-27 02:28:21', 'N'),
(23, 'INCLUDE::PROJECT', '22', 1, '보드 개발 프로세스를 생성하였습니다.', '/agency/project/process/detail/31', '2021-10-27 02:29:59', 'N'),
(24, 'INCLUDE::PROJECT', '22', 1, '디자인 컨펌 프로세스를 생성하였습니다.', '/agency/project/process/detail/32', '2021-10-27 02:30:59', 'N'),
(25, 'INCLUDE::PROJECT', '22', 1, '양산 개발 프로세스를 생성하였습니다.', '/agency/project/process/detail/33', '2021-10-27 02:32:02', 'N'),
(26, 'INCLUDE::PROJECT', '22', 1, '프로토 차시 개발 프로세스를 생성하였습니다.', '/agency/project/process/detail/undefined', '2021-10-27 02:33:11', 'Y'),
(27, 'INCLUDE::PROJECT', '22', 1, '프로토 차시 개발 프로세스를 생성하였습니다.', '/agency/project/process/detail/35', '2021-10-27 02:37:33', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_org_structure`
--

CREATE TABLE `tb_org_structure` (
  `id` int(11) NOT NULL COMMENT '고유 키',
  `name` varchar(24) NOT NULL COMMENT '부서명',
  `code` varchar(4) NOT NULL COMMENT '코드',
  `reg_date` datetime DEFAULT NULL COMMENT '생성일자',
  `upd_date` datetime DEFAULT NULL COMMENT '업데이트 일자',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부',
  `type` varchar(48) NOT NULL DEFAULT 'TYPE::DEPART'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='부서 리스트';

--
-- 테이블의 덤프 데이터 `tb_org_structure`
--

INSERT INTO `tb_org_structure` (`id`, `name`, `code`, `reg_date`, `upd_date`, `delete_yn`, `type`) VALUES
(1, '경영 총괄', '1001', '2021-09-16 13:00:04', '2021-09-16 13:00:04', 'N', 'TYPE::DEPART'),
(2, '운영 총괄', '1002', '2021-09-16 13:01:27', '2021-09-16 13:01:27', 'N', 'TYPE::DEPART'),
(3, '러닝핏 총괄', '1003', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(4, '마케팅팀(러닝핏)', '1004', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(5, 'LMS 개발(러닝핏)', '1005', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(6, 'CS 및 B2B(러닝핏)', '1006', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(7, '경영지원팀', '1007', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(8, '영업본부', '1008', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(9, '스마트러닝본부 운영 총괄', '1009', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(10, '스마트러닝본부 공공 1팀', '1010', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(11, '스마트러닝본부 공공 2팀', '1011', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(12, '스마트러닝본부 대학 1팀', '1012', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(13, '스마트러닝본부 대학 2팀', '1013', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(14, '스마트러닝본부 대학 3팀', '1014', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(15, '스마트러닝본부 개발팀', '1015', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(16, '콘텐츠개발본부 운영 총괄', '1016', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(17, '콘텐츠개발본부 영상 1팀', '1017', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(18, '콘텐츠개발본부 영상 2팀', '1018', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(19, '콘텐츠개발본부 메이크업 팀', '1019', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(20, '콘텐츠개발본부 디자인 1팀', '1020', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(21, '콘텐츠개발본부 디자인 2팀', '1021', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(22, '콘텐츠개발본부 디자인 3팀', '1022', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(23, '콘텐츠개발본부 지원팀', '1023', '2021-09-16 13:07:31', '2021-09-16 13:07:31', 'N', 'TYPE::DEPART'),
(25, '대표이사', '1024', '2021-09-18 18:27:54', '2021-09-18 18:27:54', 'N', 'TYPE::RANK'),
(26, '본부장', '1025', '2021-09-18 18:27:54', '2021-09-18 18:27:54', 'N', 'TYPE::RANK'),
(27, '과장', '1026', '2021-09-18 18:27:54', '2021-09-18 18:27:54', 'N', 'TYPE::RANK'),
(28, '팀장', '1027', '2021-09-18 18:27:54', '2021-09-18 18:27:54', 'N', 'TYPE::RANK'),
(29, 'PD', '1028', '2021-09-18 18:27:55', '2021-09-18 18:27:55', 'N', 'TYPE::RANK'),
(30, '대리', '1029', '2021-09-18 18:27:55', '2021-09-18 18:27:55', 'N', 'TYPE::RANK'),
(31, '주임', '1030', '2021-09-18 18:27:55', '2021-09-18 18:27:55', 'N', 'TYPE::RANK'),
(32, '사원', '1031', '2021-09-18 18:27:55', '2021-09-18 18:27:55', 'N', 'TYPE::RANK'),
(33, '기타 부서', '1032', '2021-09-18 18:27:55', '2021-09-18 18:27:55', 'N', 'TYPE::DEPART'),
(34, '기타', '1033', '2021-09-18 18:27:55', '2021-09-18 18:27:55', 'N', 'TYPE::RANK');

-- --------------------------------------------------------

--
-- 테이블 구조 `tb_sidebar_menu`
--

CREATE TABLE `tb_sidebar_menu` (
  `id` int(11) NOT NULL COMMENT '고유 키',
  `name` varchar(32) DEFAULT NULL COMMENT '메뉴명',
  `push_url` varchar(64) NOT NULL DEFAULT '/' COMMENT '히스토리 푸쉬 URL',
  `icon_name` varchar(32) DEFAULT NULL COMMENT '아이콘 이름',
  `delete_yn` varchar(1) DEFAULT 'N' COMMENT '삭제 여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사이드바 메뉴 구성';

--
-- 테이블의 덤프 데이터 `tb_sidebar_menu`
--

INSERT INTO `tb_sidebar_menu` (`id`, `name`, `push_url`, `icon_name`, `delete_yn`) VALUES
(1, '홈으로', '/', 'HomeIcon', 'N'),
(2, '기관 리스트로', '/agency', 'NoteIcon', 'N'),
(3, '프로젝트로', '/projects', 'NoteIcon', 'N'),
(4, '대쉬보드로', '/dashboard', 'VerticalSplitIcon', 'N');

-- --------------------------------------------------------

--
-- 테이블 구조 `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `test`
--

INSERT INTO `test` (`id`, `name`, `time`) VALUES
(1, '123', NULL),
(2, '456', NULL),
(3, '[{\"key\":\"12321\",\"value\":\"3123213\"}', NULL),
(4, '[{\"key\":\"12321\",\"value\":\"3123213\"}]', NULL),
(5, '2021-10-05', NULL),
(6, '2021-10-05', NULL),
(7, '날짜테스트', '2021-10-17 23:59:59');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `tb_agcy`
--
ALTER TABLE `tb_agcy`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_agcy_biz_area`
--
ALTER TABLE `tb_agcy_biz_area`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_agcy_colleague`
--
ALTER TABLE `tb_agcy_colleague`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_agcy_favorite`
--
ALTER TABLE `tb_agcy_favorite`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_agcy_proj`
--
ALTER TABLE `tb_agcy_proj`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_agcy_proj_colleague`
--
ALTER TABLE `tb_agcy_proj_colleague`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_agcy_proj_proc`
--
ALTER TABLE `tb_agcy_proj_proc`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_agcy_proj_proc_colleague`
--
ALTER TABLE `tb_agcy_proj_proc_colleague`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_alarm`
--
ALTER TABLE `tb_alarm`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_alarm_receiver`
--
ALTER TABLE `tb_alarm_receiver`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_auth`
--
ALTER TABLE `tb_auth`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_board_element`
--
ALTER TABLE `tb_board_element`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_board_element_comment`
--
ALTER TABLE `tb_board_element_comment`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_board_subject`
--
ALTER TABLE `tb_board_subject`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_calendar_element`
--
ALTER TABLE `tb_calendar_element`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_file_attach`
--
ALTER TABLE `tb_file_attach`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_member`
--
ALTER TABLE `tb_member`
  ADD PRIMARY KEY (`seq`);

--
-- 테이블의 인덱스 `tb_news`
--
ALTER TABLE `tb_news`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_org_structure`
--
ALTER TABLE `tb_org_structure`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `tb_sidebar_menu`
--
ALTER TABLE `tb_sidebar_menu`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `tb_agcy`
--
ALTER TABLE `tb_agcy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유 키', AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `tb_agcy_biz_area`
--
ALTER TABLE `tb_agcy_biz_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- 테이블의 AUTO_INCREMENT `tb_agcy_colleague`
--
ALTER TABLE `tb_agcy_colleague`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '기관 담당자 시퀀스, 일반적으로 auth 타입 B를 가지고 있는 시퀀스여야 함', AUTO_INCREMENT=45;

--
-- 테이블의 AUTO_INCREMENT `tb_agcy_favorite`
--
ALTER TABLE `tb_agcy_favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `tb_agcy_proj`
--
ALTER TABLE `tb_agcy_proj`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- 테이블의 AUTO_INCREMENT `tb_agcy_proj_colleague`
--
ALTER TABLE `tb_agcy_proj_colleague`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '기관 담당자 시퀀스, 일반적으로 auth 타입 B를 가지고 있는 시퀀스여야 함', AUTO_INCREMENT=86;

--
-- 테이블의 AUTO_INCREMENT `tb_agcy_proj_proc`
--
ALTER TABLE `tb_agcy_proj_proc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '프로세스 고유 키', AUTO_INCREMENT=36;

--
-- 테이블의 AUTO_INCREMENT `tb_agcy_proj_proc_colleague`
--
ALTER TABLE `tb_agcy_proj_proc_colleague`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '참여자 리스트 ID', AUTO_INCREMENT=83;

--
-- 테이블의 AUTO_INCREMENT `tb_alarm`
--
ALTER TABLE `tb_alarm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `tb_alarm_receiver`
--
ALTER TABLE `tb_alarm_receiver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '알람 고유 키';

--
-- 테이블의 AUTO_INCREMENT `tb_auth`
--
ALTER TABLE `tb_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `tb_board_element`
--
ALTER TABLE `tb_board_element`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유키';

--
-- 테이블의 AUTO_INCREMENT `tb_board_element_comment`
--
ALTER TABLE `tb_board_element_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '게시물 코멘트 고유 키';

--
-- 테이블의 AUTO_INCREMENT `tb_board_subject`
--
ALTER TABLE `tb_board_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유 키', AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `tb_calendar_element`
--
ALTER TABLE `tb_calendar_element`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유 키';

--
-- 테이블의 AUTO_INCREMENT `tb_file_attach`
--
ALTER TABLE `tb_file_attach`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '파일 고유 키';

--
-- 테이블의 AUTO_INCREMENT `tb_member`
--
ALTER TABLE `tb_member`
  MODIFY `seq` int(11) NOT NULL AUTO_INCREMENT COMMENT '멤버 고유 키', AUTO_INCREMENT=22;

--
-- 테이블의 AUTO_INCREMENT `tb_news`
--
ALTER TABLE `tb_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유 ID', AUTO_INCREMENT=28;

--
-- 테이블의 AUTO_INCREMENT `tb_org_structure`
--
ALTER TABLE `tb_org_structure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유 키', AUTO_INCREMENT=35;

--
-- 테이블의 AUTO_INCREMENT `tb_sidebar_menu`
--
ALTER TABLE `tb_sidebar_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유 키', AUTO_INCREMENT=6;

--
-- 테이블의 AUTO_INCREMENT `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
