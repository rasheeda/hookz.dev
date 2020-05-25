DROP TABLE IF EXISTS `hookz`;
CREATE TABLE `hookz` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `hookz_data`;
CREATE TABLE `hookz_data` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `webhook` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
