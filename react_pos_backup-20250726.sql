-- MySQL dump 10.13  Distrib 9.2.0, for macos14.7 (arm64)
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
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` VALUES (9,6,7,2),(10,6,11,1),(11,7,1,2),(12,9,1,1),(13,9,7,2),(14,10,5,1),(15,10,7,1),(16,11,1,2),(17,11,5,1),(18,11,7,1),(19,11,10,1),(20,11,11,1),(21,12,1,1),(22,12,10,1),(23,13,11,1),(24,14,10,4),(25,15,2,1),(26,15,3,1),(27,16,5,2),(28,16,2,2),(29,16,1,1),(30,16,11,3),(31,16,7,2),(32,16,10,2),(33,17,1,1),(34,17,5,1),(35,17,7,1),(36,18,6,1),(37,18,3,1),(38,18,7,1),(39,19,2,1),(40,19,1,1),(41,19,6,1),(42,19,7,1),(43,19,10,1),(44,19,11,1),(45,20,1,1),(46,20,5,1),(47,20,11,1),(48,20,10,1),(49,21,12,1),(50,22,10,4),(51,23,1,2),(52,23,5,1),(53,23,7,2),(54,23,10,2),(55,24,1,4),(56,24,7,1),(57,25,10,2),(58,26,4,1),(59,26,7,1),(60,27,1,2),(61,27,10,1),(62,27,11,1),(63,28,7,2),(64,28,6,1),(65,28,1,1),(66,28,11,1),(67,29,7,1),(68,29,11,1),(69,30,7,2),(70,31,1,2),(71,31,10,1),(72,32,10,1),(73,33,6,1),(74,33,10,1),(75,33,3,1),(76,34,5,1),(77,34,10,2),(78,34,11,2),(79,35,5,2),(80,35,11,1),(81,36,1,3),(82,37,4,2),(83,37,7,1),(84,38,1,2),(85,39,7,1),(86,40,1,2),(87,40,10,2),(88,41,1,2),(89,41,10,1),(90,41,3,1),(91,42,11,3),(92,42,10,3),(93,43,4,2),(94,44,7,2),(95,44,10,1),(96,45,1,5),(97,45,5,3),(98,45,10,4),(99,45,11,1),(100,46,10,2),(101,46,11,2),(102,47,2,1),(103,48,1,1),(104,48,5,1),(105,48,7,1),(106,48,10,1),(107,48,11,1),(108,49,5,1),(109,49,1,1),(110,50,3,1),(111,50,1,1),(112,50,7,1),(113,50,10,1),(114,50,11,1),(115,51,1,1),(116,51,10,1),(117,51,11,1),(118,52,2,1),(119,52,7,1),(120,53,1,1),(121,54,1,1),(122,54,7,2),(123,54,11,1),(124,54,5,1),(125,55,7,2),(126,56,5,1),(127,57,11,1),(128,58,11,1),(129,59,1,1),(130,60,11,1),(131,61,11,1),(132,62,7,2),(133,63,1,1),(134,63,5,1),(135,63,11,1),(136,64,12,2),(137,65,7,2),(138,66,13,1);
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
  `delivery_status` tinyint NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (6,'Kalum',30.00,'card','2025-07-26 23:56:59',1),(7,'Aruna',30.00,'card','2025-07-27 00:02:30',1),(9,'Jeevan',39.00,'card','2025-07-27 00:06:29',1),(10,'Shawn',27.00,'card','2025-07-27 00:10:40',1),(11,'Samari',69.00,'card','2025-07-27 00:13:55',1),(12,'Sanjaya',21.00,'card','2025-07-27 00:14:36',1),(13,'Samari',6.00,'card','2025-07-27 00:17:39',1),(14,'Ravi',24.00,'card','2025-07-27 00:18:31',1),(15,'Dinusha',30.00,'cash','2025-07-27 00:19:24',1),(16,'Dineth',129.00,'card','2025-07-27 00:22:29',1),(17,'Lahiru',42.00,'card','2025-07-27 00:23:25',1),(18,'Paula',42.00,'card','2025-07-27 00:25:47',1),(19,'',69.00,'card','2025-07-27 00:27:19',1),(20,'',42.00,'card','2025-07-27 00:28:39',1),(21,'Lawren',15.00,'card','2025-07-27 00:30:28',1),(22,'Dinusha',24.00,'card','2025-07-27 00:31:53',1),(23,'Natasha',81.00,'card','2025-07-27 00:36:12',1),(24,'Nimal',72.00,'cash','2025-07-27 00:37:36',1),(25,'Nimal',12.00,'cash','2025-07-27 00:40:12',1),(26,'Dewani',27.00,'cash','2025-07-27 00:42:27',1),(27,'Rajitha',42.00,'card','2025-07-27 00:43:45',1),(28,'Erandi',60.00,'cash','2025-07-27 00:44:57',1),(29,'Jayawardhana',18.00,'cash','2025-07-27 00:45:32',1),(30,'Jeevan',24.00,'card','2025-07-27 00:46:04',1),(31,'Anusha',36.00,'card','2025-07-27 00:47:18',1),(32,'Pradeep',6.00,'cash','2025-07-27 00:48:06',1),(33,'Pulsara',36.00,'card','2025-07-27 00:49:09',1),(34,'Damitha',39.00,'card','2025-07-27 00:50:22',1),(35,'Hareendra',36.00,'card','2025-07-27 00:52:17',1),(36,'Prasad',45.00,'card','2025-07-27 00:53:09',1),(37,'Sanjaya',42.00,'card','2025-07-27 00:54:10',1),(38,'Rajitha',30.00,'card','2025-07-27 00:55:17',1),(39,'Rajitha',12.00,'cash','2025-07-27 00:55:49',1),(40,'Dhammika',42.00,'card','2025-07-27 00:56:47',1),(41,'Deepika',51.00,'card','2025-07-27 00:58:06',1),(42,'Nishshanka',36.00,'card','2025-07-27 00:59:14',1),(43,'Sha',30.00,'cash','2025-07-27 01:00:37',1),(44,'Chinthana',30.00,'cash','2025-07-27 01:01:18',1),(45,'Shanaka',150.00,'card','2025-07-27 01:03:09',1),(46,'Ruchira',24.00,'card','2025-07-27 01:04:08',1),(47,'Conrad',15.00,'card','2025-07-27 01:04:49',1),(48,'Vihanga',54.00,'card','2025-07-27 01:06:34',1),(49,'Chathu',30.00,'card','2025-07-27 01:08:04',1),(50,'Steny',54.00,'card','2025-07-27 01:10:20',1),(51,'Morein',27.00,'card','2025-07-27 01:11:30',1),(52,'Ashrifa',27.00,'card','2025-07-27 01:12:34',1),(53,'Upali',15.00,'card','2025-07-27 01:15:10',1),(54,'Vindya',60.00,'card','2025-07-27 01:16:24',1),(55,'Dasuni',24.00,'cash','2025-07-27 01:17:12',1),(56,'Nishshanka',15.00,'card','2025-07-27 01:18:23',1),(57,'Seenar',6.00,'card','2025-07-27 01:20:50',1),(58,'Nikhil',6.00,'card','2025-07-27 01:24:48',1),(59,'Ramesh',15.00,'card','2025-07-27 01:28:36',1),(60,'Vivek',6.00,'card','2025-07-27 01:29:19',1),(61,'Vivek',6.00,'card','2025-07-27 01:30:01',1),(62,'Rajitha',24.00,'card','2025-07-27 01:32:51',1),(63,'Malisha',36.00,'card','2025-07-27 01:34:24',1),(64,'Dineth',30.00,'card','2025-07-27 01:39:01',1),(65,'Dhanuka',24.00,'card','2025-07-27 01:50:44',1),(66,'Vihanga',10.00,'card','2025-07-27 01:55:25',1);
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
  `isSpecial` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Chicken Kottu',15.00,'',1,0),(2,'Fish Kottu',15.00,'',1,0),(3,'Egg Kottu',15.00,'',1,0),(4,'Veg Kottu',15.00,'',1,0),(5,'Chicken Fried Rice',15.00,'',1,0),(6,'Veg Fried Rice',15.00,'',1,0),(7,'Roast Bread (2)',12.00,'',1,0),(8,'Plain Hopper',2.00,NULL,0,1),(9,'Egg Hopper',5.00,NULL,0,1),(10,'Roll (3)',6.00,NULL,0,0),(11,'Wade (4)',6.00,'',1,0),(12,'Egg Fried Rice',15.00,'',1,0),(13,'Uludu Wade (3)',10.00,'',1,0);
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

-- Dump completed on 2025-07-27  1:50:55
