CREATE DATABASE  IF NOT EXISTS `tokyo-3-max` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tokyo-3-max`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tokyo-3-max
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anime`
--

DROP TABLE IF EXISTS `anime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anime` (
  `idanime` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `episodios` int NOT NULL,
  `estudio` varchar(45) NOT NULL,
  `genero` varchar(45) NOT NULL,
  `lancamento` date NOT NULL,
  PRIMARY KEY (`idanime`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anime`
--

LOCK TABLES `anime` WRITE;
/*!40000 ALTER TABLE `anime` DISABLE KEYS */;
INSERT INTO `anime` VALUES (12,'Kimetsu no Yaiba',26,'Ufotable','Aventura, Fantasia sombria, Artes marciais','2019-04-06'),(13,'FLCL / Fooly Cooly',6,'Gainax','Ficção Científica, Comédia surreal, Dementia.','2000-04-26'),(14,'Neon Genesis Evangelion',26,'Gainax','Apocalítico, Drama psicológico, Mecha','1995-10-04'),(15,'Samurai Champloo',26,'Manglobe Inc.','Ação, Aventura, Comédia, Drama','2004-05-19'),(16,'Shingeki no Kyojin',75,'Wit Studio e MAPPA','Ação, Fantasia sombria,Pós-apocalítico','2013-04-07'),(17,'Hunter x Hunter',148,'Madhouse','Ação, Aventura, Fantasia','2011-10-03');
/*!40000 ALTER TABLE `anime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filme`
--

DROP TABLE IF EXISTS `filme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filme` (
  `idfilme` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `duracao` varchar(45) NOT NULL,
  `diretor` varchar(45) NOT NULL,
  `genero` varchar(45) NOT NULL,
  `lancamento` date NOT NULL,
  PRIMARY KEY (`idfilme`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filme`
--

LOCK TABLES `filme` WRITE;
/*!40000 ALTER TABLE `filme` DISABLE KEYS */;
INSERT INTO `filme` VALUES (2,'Paprika','1h30min','Satoshi Kon','Anime, Ficção científica','2006-11-25'),(4,'A Viagem de Chihiro','2h05min','Hayao Miyazaki','Animação, Aventura','2003-07-18'),(5,'O Serviço de Entregas da Kiki','1h42m','Hayao Miyazaki','Aventura, Infantil','1990-07-27'),(6,'Akira','2h04m','Katsuhiro Otomo','Ficção científica, Ação','1988-07-16'),(7,'Ghost in the Shell','1h 23m','Mamoru Oshii','Ficção científica, Animação, Ação','1996-07-19'),(8,'Kimi no na wa',' 1h52min','Makoto Shinkai','Drama romântico, Fantasia científica','2017-10-11');
/*!40000 ALTER TABLE `filme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manga`
--

DROP TABLE IF EXISTS `manga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manga` (
  `idmanga` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `volumes` int NOT NULL,
  `mangaka` varchar(45) NOT NULL,
  `genero` varchar(45) NOT NULL,
  `lancamento` varchar(45) NOT NULL,
  PRIMARY KEY (`idmanga`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manga`
--

LOCK TABLES `manga` WRITE;
/*!40000 ALTER TABLE `manga` DISABLE KEYS */;
INSERT INTO `manga` VALUES (2,'Oyasumi Punpun',7,'Inio Asano','Slice of Life, Drama','2019-07-01'),(3,'Vitamin',1,'Keiko Suenobu','Slice of Life, Drama','2001-11-09'),(5,'Ayako',3,'Osamu Tezuka','Drama','1972-01-25'),(6,'Uzumaki',3,'Junji Ito','Fantasia sombria, Terror psicológico','1998-08-01'),(7,'Tekkonkinkreet',3,'Taiyō Matsumoto','Ação-aventura, Drama','1993-01-01');
/*!40000 ALTER TABLE `manga` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-01 19:02:46
