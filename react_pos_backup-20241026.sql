-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: react_pos
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` VALUES (5,3,5,5),(6,3,2,4),(7,3,8,4),(8,4,2,4),(9,4,5,2),(10,5,2,2),(11,5,3,2),(12,5,7,2),(13,5,8,2),(14,6,5,5),(15,6,2,5),(16,7,2,8),(17,8,2,1),(18,8,5,1),(19,8,8,2),(20,9,2,2),(21,9,3,1),(22,9,5,1),(23,10,2,4),(24,10,8,4),(25,11,2,1),(26,11,5,1),(27,11,8,2),(28,12,2,1),(29,12,5,1),(30,12,8,1),(31,13,2,1),(32,14,2,2),(33,14,3,1),(34,14,5,2),(35,14,8,2),(36,15,2,2),(37,15,8,2),(38,16,2,1),(39,16,3,1),(40,16,7,1),(41,16,8,1),(42,17,2,2),(43,17,5,2),(44,18,5,1),(45,18,2,4),(46,19,5,4),(47,20,2,2),(48,20,5,1),(49,21,2,1),(50,21,5,1),(51,21,8,2),(52,22,2,2),(53,22,8,4),(54,23,2,2),(55,23,4,1),(56,24,2,2),(57,24,5,2),(58,24,8,4),(59,25,2,1),(60,25,8,4),(61,26,8,2),(62,26,5,2),(63,26,2,1),(64,26,3,1),(65,27,8,2),(66,28,2,1),(67,29,5,1),(68,29,8,2),(69,30,2,1),(70,30,5,1),(71,31,2,3),(72,31,8,3),(73,32,2,2),(74,32,8,1),(75,33,3,3),(76,33,2,2),(77,33,8,3),(78,34,2,2),(79,34,5,2),(80,34,8,2),(81,35,2,2),(82,35,5,2),(83,35,8,3),(84,36,2,2),(85,36,8,1),(86,37,8,4),(87,38,7,1),(88,38,4,1),(89,38,8,2),(90,39,5,1),(91,39,2,1),(92,40,2,1),(93,40,8,1),(94,41,2,2),(95,41,5,1),(96,41,8,1),(97,42,5,2),(98,43,8,2),(99,43,2,2),(100,44,2,2),(101,45,2,2),(102,46,2,2),(103,46,5,2),(104,46,8,1),(105,47,2,2),(106,48,2,1),(107,48,5,1),(108,49,8,1),(109,50,8,2),(110,51,8,2),(111,52,8,4);
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `payment_method` enum('card','cash') DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_status` tinyint DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,'',175.00,'card','2024-10-26 22:53:30',1),(4,'',90.00,'cash','2024-10-26 22:55:04',1),(5,'',110.00,'cash','2024-10-26 22:56:24',1),(6,'',150.00,'card','2024-10-26 22:57:27',1),(7,'',120.00,'cash','2024-10-26 22:58:29',1),(8,'',50.00,'card','2024-10-26 23:00:09',1),(9,'',60.00,'card','2024-10-26 23:01:12',1),(10,'',100.00,'cash','2024-10-26 23:02:25',1),(11,'',50.00,'card','2024-10-26 23:03:03',1),(12,'',40.00,'cash','2024-10-26 23:04:12',1),(13,'',15.00,'cash','2024-10-26 23:04:54',1),(14,'',95.00,'card','2024-10-26 23:06:05',1),(15,'',50.00,'card','2024-10-26 23:07:29',1),(16,'',55.00,'card','2024-10-26 23:08:09',1),(17,'',60.00,'card','2024-10-26 23:09:38',1),(18,'',75.00,'cash','2024-10-26 23:10:55',1),(19,'',60.00,'cash','2024-10-26 23:11:23',1),(20,'',45.00,'card','2024-10-26 23:12:01',1),(21,'',50.00,'cash','2024-10-26 23:13:49',1),(22,'',70.00,'card','2024-10-26 23:16:22',1),(23,'',45.00,'card','2024-10-26 23:17:12',1),(24,'',100.00,'card','2024-10-26 23:19:37',1),(25,'',55.00,'card','2024-10-26 23:20:33',1),(26,'',80.00,'card','2024-10-26 23:25:12',1),(27,'',20.00,'cash','2024-10-26 23:26:28',1),(28,'',15.00,'card','2024-10-26 23:27:02',1),(29,'',35.00,'cash','2024-10-26 23:28:46',1),(30,'',30.00,'card','2024-10-26 23:29:51',1),(31,'',75.00,'cash','2024-10-26 23:30:49',1),(32,'',40.00,'card','2024-10-26 23:31:11',1),(33,'',105.00,'cash','2024-10-26 23:32:33',1),(34,'',80.00,'card','2024-10-26 23:32:59',1),(35,'',90.00,'card','2024-10-26 23:33:50',1),(36,'',40.00,'card','2024-10-26 23:34:36',1),(37,'',40.00,'card','2024-10-26 23:36:25',1),(38,'',50.00,'cash','2024-10-26 23:37:16',1),(39,'',30.00,'cash','2024-10-26 23:37:45',1),(40,'',25.00,'card','2024-10-26 23:40:30',1),(41,'',55.00,'cash','2024-10-26 23:41:28',1),(42,'',30.00,'card','2024-10-26 23:42:34',1),(43,'',50.00,'card','2024-10-26 23:44:23',1),(44,'',30.00,'card','2024-10-26 23:46:39',1),(45,'',30.00,'card','2024-10-26 23:50:04',1),(46,'',70.00,'card','2024-10-26 23:51:35',1),(47,'',30.00,'card','2024-10-26 23:52:12',1),(48,'',30.00,'card','2024-10-26 23:53:35',1),(49,'',10.00,'card','2024-10-26 23:55:04',1),(50,'',20.00,'card','2024-10-27 00:04:37',1),(51,'',20.00,'card','2024-10-27 00:06:24',1),(52,'',40.00,'card','2024-10-27 00:08:12',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Kottu (Chicken)',15.00,'',1),(3,'Kottu (Veg)',15.00,'',1),(4,'Kottu (Egg)',15.00,'',1),(5,'Fried Rice (Chicken)',15.00,'',1),(6,'Fried Rice (Egg)',15.00,'',1),(7,'Fried Rice (Veg)',15.00,'',1),(8,'Roast Bread',10.00,'',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-27 23:19:59
