/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.7.31 : Database - turtle_auth
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`turtle_auth` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `turtle_auth`;

/*Table structure for table `gp_history` */

DROP TABLE IF EXISTS `gp_history`;

CREATE TABLE `gp_history` (
  `account_id` int(11) unsigned NOT NULL,
  `code` varchar(256) NOT NULL,
  PRIMARY KEY (`account_id`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `shop_coins_history` */

DROP TABLE IF EXISTS `shop_coins_history`;

CREATE TABLE `shop_coins_history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned NOT NULL,
  `points` int(11) NOT NULL,
  `actual_points` int(11) NOT NULL,
  `new_points` int(11) NOT NULL,
  `type` varchar(256) NOT NULL,
  `system` varchar(256) NOT NULL,
  `reference` varchar(256) NOT NULL,
  `date` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
