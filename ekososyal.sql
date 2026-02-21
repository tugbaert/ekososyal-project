-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: ekososyal
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `announcement_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  `posted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`announcement_id`),
  KEY `user_id` (`user_id`),
  KEY `idx_announcements_posted` (`posted_at`),
  CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (21,'Kompost Yapımı ve Kompost Çayı Atölyemiz Başlıyor?','Organik atıkları dönüştürerek doğaya geri kazandırmayı, toprağa can veren kompost çayının yapımını ve sürdürülebilir yaşamın inceliklerini öğrenmek için sizleri bekliyoruz.\r\n\r\n? 25 Aralık 2025 – 13.30\r\n? Konum: Saklı Bahçe Kafe / Sivas\r\n',10,'2025-12-02 20:18:51','uploads/1764695931494-578241194.jpg',''),(23,'Büyük Takas Şenliği: Al, Ver, Dönüştür','Para geçmeyen tek pazar! Okuduğun kitabı, sıkıldığın kazağı veya kullanmadığın dekoratif objeyi getir; başkasının getirdiği ve senin ihtiyacın olan bir eşyayla takas et. Tüketimi azalt, paylaşımı çoğalt. ??\r\n\r\nTarih: 11 Ocak 2026 – 13.00\r\n\r\nKonum: Tarihi Taşhan Avlusu / Merkez',12,'2025-12-02 20:31:27','uploads/1764696687409-939059525.jpg',''),(25,'Yeşil Sinema Günü: \"Gezegenin Sınırları\"','İklim krizini ve dünyamızın hassas dengelerini anlatan ödüllü belgesel gösterimi ve sonrasında çevre mühendisliği öğrencileriyle mini bir söyleşi. Çaylar bizden, mataranı getirmek senden! ??\r\n\r\nTarih: 15 Ocak 2026 – 18.30\r\n\r\nKonum: Cep Sineması / Atatürk Kültür Merkezi',13,'2025-12-02 20:49:28','uploads/1764697768984-282597032.jpg',''),(26,'Eski Tişörtlerden Bez Çanta Atölyesi','Plastik poşete hayır diyoruz! Evde giymediğiniz, eskimiş tişörtlerinizi getirin; onları kesip biçerek rengarenk, yıkanabilir alışveriş çantalarına dönüştürelim. Dikiş bilmenize gerek yok, sadece yaratıcılığınızı getirin. ♻?\r\n\r\nTarih: 28 Aralık 2025 – 14.00\r\n\r\nKonum: Kitaplı Kahve / İstasyon Caddesi',14,'2025-12-02 20:52:32','uploads/1764697952215-922170716.jpg',''),(27,' ? Güvenli Parklar İçin Harekete Geçiyoruz: \"Cam Kırıkları Değil, Çocuk Gülüşleri\"','Geçtiğimiz günlerde paylaşılan ve hepimizi üzen o görüntüye kayıtsız kalamazdık! Parklarımız tehlike saçmamalı, neşe kaynağı olmalı. O yeşil alandaki tehlikeli cam birikintisini temizlemek, yerdeki kauçuk zeminleri düzenlemek ve çocuklarımıza güvenli bir oyun alanı geri vermek için toplanıyoruz. Eldivenini kap gel, parkı birlikte \"iyileştirelim\"! ??\r\n\r\nTarih: 11 Ocak 2026 – 10.00 Konum: Kardeşler Mahallesi Parkı / Sivas Not: Temizlik ekipmanları (çöp poşeti, tırmık, süpürge) kulübümüz tarafından sağlanacaktır.',12,'2025-12-02 21:02:00','uploads/1764698520966-461534.jpg',''),(28,'Sokak Canları İçin \"Atıktan Yuvaya\" Buluşması','Kış kapıda! Atık strafor kutuları, kullanılmayan battaniyeleri ve muşambaları kullanarak kampüsümüzdeki ve mahallemizdeki kedi/köpekler için sıcak, su geçirmez yuvalar inşa ediyoruz. Malzemeler bizden, el emeği sizden. ??\r\n\r\nTarih: 04 Ocak 2026 – 11.00\r\n\r\nKonum: Cumhuriyet Üniversitesi Kampüs Girişi / Sivas',15,'2025-12-02 21:12:42','uploads/1764699162857-402079286.jpg',''),(30,'CÜDOST Kardeşler Tepesi Orman Yürüyüşü!','CÜDOST olarak Kardeşler Tepesi Orman Yürüyüşü etkinliğimizle karşınızdayız!\r\n\r\n15 Aralık Cumartesi günü\r\n\r\nBuluşma yeri: Binali Yıldırım kız KYK önü\r\n\r\nHareket saati: 09.00',17,'2025-12-02 21:24:40','uploads/1764699880407-935451088.jpg','https://www.instagram.com/p/DQJj7ScjIP4/?igsh=MXR1dnR2d2tvZzEwcA=='),(31,'Gezengözler Doğa Kulübü “Adımlar ve Yansımalar”','Sivas Cumhuriyet Üniversitesi\'nde düzenlenecek IV. Uluslararası Disiplinlerarası Bilimde Kadın Kongresi kapsamında, Gezengözler Doğa Kulübü olarak \"Adımlar ve Yansımalar: Doğada Deneyimsel Bir Yürüyüş\" atölyesine davetlisiniz.',18,'2025-12-02 21:30:05','uploads/1764700205741-555210613.jpg','https://www.gezengozler.com/gezengozler-doga-kulubu-adimlar-ve-yansimalar-atolyesinde/'),(32,'PAŞABAHÇE - BAYRAKTEPE & KEKLİKPINARI DOĞA YÜRÜYÜŞÜ','7 Aralık 2025 tarihinde gerçekleştirilecek Paşabahçe -Bayraktepe & Keklikpınarı doğa yürüyüşü etkinliğine tüm doğaseverler davetlidir.\r\n\r\nFaaliyet Detayları:\r\n\r\nTarih: 7 Aralık 2025 (Pazar)\r\n\r\nToplanma ve Hareket Yeri: Yeni Valilik Binası\r\n\r\nHareket Saati: 09:00',22,'2025-12-02 21:46:38','uploads/1764701198077-365881224.jpg','https://www.instagram.com/_sivdak_?igsh=eHl4c2Rpd2x6eTRl'),(33,'Doğa İçin Harekete Geçiyoruz! ','Doğa Bizim Evimiz – Temizlik Hareketi Açıklama: Paylaşılan o üzücü görüntülere kayıtsız kalamazdık! ? Kulübümüz olarak nehir kenarındaki bu kirliliği temizlemek için bir araya geliyoruz. Eldivenini, enerjini kap gel, doğamıza sahip çıkalım! Birlikte daha temiz bir çevre mümkün! ?? Tarih: 21 Mayıs 2026 – 10.00 Konum: Nehir Kenarı Piknik Alanı (Üniversite Kampüsü Yanı) Not: Temizlik malzemeleri (eldiven, çöp poşeti) kulübümüz tarafından sağlanacaktır.',17,'2025-12-02 21:58:39','uploads/1764701919680-26961139.jpg','https://www.instagram.com/p/DQJj7ScjIP4/?igsh=MXR1dnR2d2tvZzEwcA==');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_id`),
  KEY `idx_articles_published` (`published_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `badge_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_class` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `required_points` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`badge_id`),
  UNIQUE KEY `ux_badge_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` VALUES (1,'Yeni Katılımcı','İlk görevini tamamladı.','fas fa-leaf',10,'2025-12-01 01:43:23'),(2,'Çevre Savaşçısı','Toplam 100 puanı aştı.','fas fa-award gold',100,'2025-12-01 01:43:23'),(3,'Başlangıç Fidanı','İlk görevini tamamladı.','bronze fas fa-seedling',10,'2025-12-01 01:43:23'),(4,'Bronz Yaprak','Toplam 400 puanı aştı.','bronze fas fa-leaf',400,'2025-12-01 01:43:23'),(5,'Gümüş Göl','Toplam 650 puanı aştı.','silver fas fa-water',650,'2025-12-01 01:43:23'),(6,'Altın Güneş','Toplam 900 puanı aştı.','gold fas fa-sun',900,'2025-12-01 01:43:23'),(7,'Elmas Gezegen','Toplam 1800 puanı aştı.','diamond fas fa-globe-americas',1800,'2025-12-01 01:43:23');
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaintcomments`
--

DROP TABLE IF EXISTS `complaintcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaintcomments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `complaint_id` int NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `complaint_id` (`complaint_id`),
  CONSTRAINT `complaintcomments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `complaintcomments_ibfk_2` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`complaint_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaintcomments`
--

LOCK TABLES `complaintcomments` WRITE;
/*!40000 ALTER TABLE `complaintcomments` DISABLE KEYS */;
INSERT INTO `complaintcomments` VALUES (15,21,36,'Çok üzücü bir görüntü!?','2025-12-02 22:30:52'),(16,9,30,'Harikasınız!?','2025-12-02 23:41:12'),(17,23,32,'Kolay gelsin. Harika bir manzara!','2025-12-03 00:30:51'),(18,23,27,'Çok kötü bir manzara maalesef!?','2025-12-03 00:32:02'),(19,23,23,'Harika daha yeşil bir kampüsümüz olacak!','2025-12-03 00:32:37'),(20,11,34,'Çok güzel bir ceket... Vintage parçalara bayılırım?','2025-12-03 00:34:34'),(21,11,23,'??','2025-12-03 00:35:22'),(22,11,36,'Keşke herkes biraz empati yapsa..','2025-12-03 00:36:01'),(24,20,31,'Çok iyi iş çıkarmışsınız ?','2025-12-03 00:56:37'),(25,20,30,'Ellerinize sağlık! Artık hep böyle temiz görmeyi umuyorum?','2025-12-03 01:00:02'),(26,20,35,'Ben de kompost etkinliğine katılmıştım. Herkesin denemesini tavsiye ederim!?','2025-12-03 01:01:22'),(27,20,33,'Kesinlikle çok güzel. Bez çanta boyama etkinliği olsa da katılsak!','2025-12-03 01:03:05'),(28,17,36,'Burdaki çevre kirliliği için bir etkinlik düzenleyeceğiz!','2025-12-03 09:20:53');
/*!40000 ALTER TABLE `complaintcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaintlikes`
--

DROP TABLE IF EXISTS `complaintlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaintlikes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `complaint_id` int NOT NULL,
  `liked_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `ux_user_complaint_like` (`user_id`,`complaint_id`),
  KEY `complaint_id` (`complaint_id`),
  CONSTRAINT `complaintlikes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `complaintlikes_ibfk_2` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`complaint_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaintlikes`
--

LOCK TABLES `complaintlikes` WRITE;
/*!40000 ALTER TABLE `complaintlikes` DISABLE KEYS */;
INSERT INTO `complaintlikes` VALUES (2,9,32,'2025-12-03 00:28:18'),(3,23,35,'2025-12-03 00:29:27'),(4,23,34,'2025-12-03 00:29:29'),(5,23,31,'2025-12-03 00:29:32'),(6,23,30,'2025-12-03 00:29:33'),(7,23,27,'2025-12-03 00:29:35'),(8,23,23,'2025-12-03 00:29:38'),(9,11,34,'2025-12-03 00:33:14'),(10,11,33,'2025-12-03 00:34:42'),(11,11,31,'2025-12-03 00:34:46'),(12,11,23,'2025-12-03 00:34:53'),(13,20,36,'2025-12-03 00:55:26'),(15,20,32,'2025-12-03 00:55:36'),(16,20,30,'2025-12-03 00:55:43'),(17,20,27,'2025-12-03 00:55:45'),(18,20,23,'2025-12-03 00:55:47'),(19,20,33,'2025-12-03 01:01:43'),(20,20,31,'2025-12-03 01:03:18');
/*!40000 ALTER TABLE `complaintlikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `complaint_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `like_count` int DEFAULT '0',
  `comment_count` int DEFAULT '0',
  `reported_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`complaint_id`),
  KEY `idx_complaints_user` (`user_id`),
  CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (23,10,'Kampüs Bahçesine İlk Fidanlarımızı Diktik!','Bugün topluluk olarak harika bir etkinliğe imza attık. Kampüsümüzün belirlenen alanlarına fidan dikimi gerçekleştirerek geleceğe nefes olduk. Katılım gösteren ve emeği geçen tüm doğaseverlere teşekkür ederiz. Bu fidanlar sizlerle birlikte büyüyecek! ?\r\n','uploads/1764695225100-569067556.jpg',NULL,7,0,'2025-12-02 20:07:05'),(27,9,'Çocuklarımızın Güvenliği Bu Kadar Ucuz Olmamalı','Parkta çocukların koşuşturduğu yeşil alana bırakılmış bu cam birikintisine bakın... Sadece bir anlık dikkatsizlik veya umursamazlık, oyun oynayan bir çocuğun ciddi şekilde yaralanmasına sebep olabilir. Lütfen atıklarımızı doğaya veya parklara değil, ait oldukları yere atalım. Daha duyarlı bir toplum olmak zor değil! \r\nKonum: Kardeşler Mahallesi Parkı / Sivas??\r\n','uploads/1764698203615-414411956.jpg',NULL,9,0,'2025-12-02 20:56:43'),(30,12,'Görev Tamamlandı: Park Artık Güvende! ✅','Oyun parkındaki cam kırıklarına seyirci kalamazdık. Ekipçe el attık, temizledik! ? Çocuklar güvenle koşsun diye biz üzerimize düşeni yaptık. Lütfen çevremize karşı daha duyarlı olalım. ??\r\n','uploads/1764698840391-895494225.jpg',NULL,7,0,'2025-12-02 21:07:20'),(31,16,'Parkı hep birlikte temizledik!','Bu hafta sonu sadece konuşmakla kalmadık, harekete geçtik! ? Parkımızdaki çöpleri temizlemek için bir araya geldik ve sonuç harika oldu. Temiz bir çevre için el ele verdik. ?\r\n','uploads/1764699321742-770133409.jpg',NULL,7,0,'2025-12-02 21:15:21'),(32,11,'Yeşil Manzara, Sıcak Kahve, Sıfır Atık','Ofise giriş yaptım, manzaram bu! Yemyeşil ağaçların enerjisi ve elimin altındaki sıcak kahve... Termosumu yanımdan ayırmamanın ödülü bu işte; hem kahvem soğumuyor hem de o güzelim doğaya çöp atmamış oluyorum. Motivasyon tavan! Herkese iyi çalışmalar!','uploads/1764700298193-67358308.jpg',NULL,7,0,'2025-12-02 21:31:38'),(33,19,'Plastik poşet mi? Hayır, teşekkürler. ?‍♀ ','Alışverişlerimde kendi bez çantamı kullanmak benim için artık bir alışkanlık. Hem daha şık hem de doğa için çok daha iyi! ? Küçük bir adım, büyük bir fark.','uploads/1764700542363-321749306.jpg',NULL,8,0,'2025-12-02 21:35:42'),(34,20,'Harika bir vintage parça yakaladım! ','Yeni bir parça yerine, bu harika vintage ceketi buldum! ? İkinci el alışveriş sadece tarz değil, aynı zamanda gezegenimizi korumanın da bir yolu. Tekstil atığını azaltalım, bilinçli tüketelim. ♻','uploads/1764700742396-362273231.jpg',NULL,4,0,'2025-12-02 21:39:02'),(35,21,'Evde kendi kompostumu yaptım!','Mutfak atıklarımı çöpe atmak yerine bahçem için \"siyah altına\" dönüştürüyorum! ? Kompost kutumdaki bu dönüşümü izlemek inanılmaz. Doğanın kendi geri dönüşüm sistemi iş başında.','uploads/1764700907044-168609994.jpg',NULL,4,0,'2025-12-02 21:41:47'),(36,23,'Manzara Bu Olmamalı! ?','Nehir kenarında, doğanın kucağında huzur bulmak yerine karşılaştığımız bu manzara... Plastik şişeler, yiyecek ambalajları, sigara izmaritleri... Sadece bir anlık keyif için arkamızda bıraktığımız bu atıklar, doğanın nefesini kesiyor. Bu güzellikleri yok etmeye hakkımız yok! Lütfen çöplerimizi doğaya değil, ait oldukları yere atalım. Daha duyarlı bir toplum olmak zor değil! ??\r\n','uploads/1764701779582-213908583.jpg',NULL,11,0,'2025-12-02 21:56:19'),(38,20,'bugün hava çok güzel','tgdfgvdf','uploads/1764745019557-585607642.jpg',NULL,0,0,'2025-12-03 09:56:59');
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailverifications`
--

DROP TABLE IF EXISTS `emailverifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailverifications` (
  `token` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime DEFAULT NULL,
  `used` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `emailverifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailverifications`
--

LOCK TABLES `emailverifications` WRITE;
/*!40000 ALTER TABLE `emailverifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailverifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventcomments`
--

DROP TABLE IF EXISTS `eventcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventcomments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `eventcomments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventcomments`
--

LOCK TABLES `eventcomments` WRITE;
/*!40000 ALTER TABLE `eventcomments` DISABLE KEYS */;
INSERT INTO `eventcomments` VALUES (19,27,9,'Mükemmel! Bu etkinlik için teşekkürler. Kesinlikle katılacağım.','2025-12-02 23:44:14'),(20,21,9,'Bitkilerimde uygulamak için sabırsızlanıyorum!?','2025-12-02 23:47:16'),(21,32,11,'Paşabahçe çok güzel bir mesire alanı?.Etkinliğin harika olacağına eminim!','2025-12-03 00:38:04'),(22,28,11,'Dostlarımız ve doğa için çok iyi düşünülmüş bir etkinlik.?','2025-12-03 00:39:58'),(23,25,11,'?','2025-12-03 00:41:28'),(24,21,11,'Organik atıklarımı biriktirdim etkinliği bekliyorum!??','2025-12-03 00:42:21'),(25,28,19,'Sokak hayvanlarına sahip çıkalım!??','2025-12-03 00:44:22'),(26,30,19,'Bu kulübü çok duymuştum harika etkinlikleri varmış!','2025-12-03 00:45:25'),(27,33,23,'Bu çevre kirliliği sorununa el koyduğunuz için teşekkürler! Arkadaşlarımı da alıp geleceğim.','2025-12-03 00:47:27'),(28,30,23,'Doğa yürüyüşlerine bayılırım!','2025-12-03 00:48:43'),(29,26,23,'Aa benim de çöpe atmaya kıyamadığım eskiyen tişörtlerim vardı. Mükemmel bir etkinlik!','2025-12-03 00:49:52'),(30,25,23,'Belgesel izlemek favorim! Özellikle de dünyamızla ilgili olanlar?️','2025-12-03 00:52:22'),(31,33,20,'Piknik alanımızı el birliğiyle yeniden güzelleştireceğiz!','2025-12-03 00:54:40'),(32,27,10,'Süpersiniz! Biz de daha fazla böyle etkinlikler düzenleyeceğiz!','2025-12-03 01:04:56');
/*!40000 ALTER TABLE `eventcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `polloptions`
--

DROP TABLE IF EXISTS `polloptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `polloptions` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `poll_id` int NOT NULL,
  `option_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vote_count` int DEFAULT '0',
  PRIMARY KEY (`option_id`),
  KEY `poll_id` (`poll_id`),
  CONSTRAINT `polloptions_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`poll_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polloptions`
--

LOCK TABLES `polloptions` WRITE;
/*!40000 ALTER TABLE `polloptions` DISABLE KEYS */;
INSERT INTO `polloptions` VALUES (1,1,'Evet',0),(2,1,'Bazen',0),(3,1,'Hayır',0),(4,2,'Evet',0),(5,2,'Bazen',0),(6,2,'Hayır',0),(7,3,'Evet',0),(8,3,'Bazen',0),(9,3,'Hayır',0),(10,4,'Evet',0),(11,4,'Bazen',0),(12,4,'Hayır',0),(13,5,'Evet',0),(14,5,'Bazen',0),(15,5,'Hayır',0),(16,6,'Evet',0),(17,6,'Bazen',0),(18,6,'Hayır',0);
/*!40000 ALTER TABLE `polloptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `polls`
--

DROP TABLE IF EXISTS `polls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `polls` (
  `poll_id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`poll_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polls`
--

LOCK TABLES `polls` WRITE;
/*!40000 ALTER TABLE `polls` DISABLE KEYS */;
INSERT INTO `polls` VALUES (1,'Ne kadar çevrecisiniz?','2025-12-01 01:43:23'),(2,'Patili dostlara bakışımız','2025-12-01 01:43:23'),(3,'Toprağın Sesi','2025-12-01 01:43:23'),(4,'Minimal Atık, Maximum Etki','2025-12-01 01:43:23'),(5,'Karbon Ayak İzi','2025-12-01 01:43:23'),(6,'İklim Nabzı','2025-12-01 01:43:23');
/*!40000 ALTER TABLE `polls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizresults`
--

DROP TABLE IF EXISTS `quizresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizresults` (
  `result_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `quiz_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int NOT NULL,
  `taken_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`result_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `quizresults_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizresults`
--

LOCK TABLES `quizresults` WRITE;
/*!40000 ALTER TABLE `quizresults` DISABLE KEYS */;
INSERT INTO `quizresults` VALUES (1,6,'Ne kadar çevrecisiniz?',32,'2025-12-01 21:02:51'),(2,7,'Ne kadar çevrecisiniz?',30,'2025-12-02 13:52:37');
/*!40000 ALTER TABLE `quizresults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `points_reward` int NOT NULL DEFAULT '10',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`),
  KEY `idx_tasks_dates` (`start_date`,`end_date`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Görev','Otomatik',100,'2025-12-01','2025-12-01','2025-12-01 18:11:58'),(2,'Görev','Otomatik',100,'2025-12-01','2025-12-01','2025-12-01 18:12:08'),(3,'Görev','Otomatik',200,'2025-12-01','2025-12-01','2025-12-01 21:09:28'),(4,'Görev','Otomatik',200,'2025-12-02','2025-12-02','2025-12-02 14:04:02');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasksubmissioncomments`
--

DROP TABLE IF EXISTS `tasksubmissioncomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasksubmissioncomments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `tasksubmissioncomments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `tasksubmissioncomments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `tasksubmissions` (`post_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasksubmissioncomments`
--

LOCK TABLES `tasksubmissioncomments` WRITE;
/*!40000 ALTER TABLE `tasksubmissioncomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasksubmissioncomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasksubmissionlikes`
--

DROP TABLE IF EXISTS `tasksubmissionlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasksubmissionlikes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `liked_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `ux_user_post_like` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `tasksubmissionlikes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `tasksubmissionlikes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `tasksubmissions` (`post_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasksubmissionlikes`
--

LOCK TABLES `tasksubmissionlikes` WRITE;
/*!40000 ALTER TABLE `tasksubmissionlikes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasksubmissionlikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasksubmissions`
--

DROP TABLE IF EXISTS `tasksubmissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasksubmissions` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `task_id` int NOT NULL,
  `image_url` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` text COLLATE utf8mb4_unicode_ci,
  `like_count` int DEFAULT '0',
  `comment_count` int DEFAULT '0',
  `submission_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `idx_tasksub_user` (`user_id`),
  KEY `idx_tasksub_task` (`task_id`),
  CONSTRAINT `tasksubmissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `tasksubmissions_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasksubmissions`
--

LOCK TABLES `tasksubmissions` WRITE;
/*!40000 ALTER TABLE `tasksubmissions` DISABLE KEYS */;
INSERT INTO `tasksubmissions` VALUES (1,6,1,'uploads/1764601918443-202289235.PNG',NULL,0,0,'2025-12-01 18:11:58'),(2,6,2,'uploads/1764601928077-428648318.jpg',NULL,0,0,'2025-12-01 18:12:08'),(3,6,3,'uploads/1764612568623-533892920.jpg',NULL,0,0,'2025-12-01 21:09:28'),(4,5,1,'uploads/1764616489588-768211525.jpg',NULL,0,0,'2025-12-01 22:14:49'),(5,5,2,'uploads/1764616502483-226908273.jpg',NULL,0,0,'2025-12-01 22:15:02'),(6,5,3,'uploads/1764673296854-111733052.PNG',NULL,0,0,'2025-12-02 14:01:36'),(7,5,4,'uploads/1764673442593-34405180.jpg',NULL,0,0,'2025-12-02 14:04:02'),(8,8,1,'uploads/1764674515111-665146216.PNG',NULL,0,0,'2025-12-02 14:21:55'),(9,8,2,'uploads/1764674538316-967372464.jpg',NULL,0,0,'2025-12-02 14:22:18'),(10,7,1,'uploads/1764674853230-837831029.png',NULL,0,0,'2025-12-02 14:27:33'),(11,7,2,'uploads/1764674870728-466252025.jpg',NULL,0,0,'2025-12-02 14:27:50'),(12,21,1,'uploads/1764703666993-901285748.jpg',NULL,0,0,'2025-12-02 22:27:47'),(13,21,2,'uploads/1764703774088-818128132.jpg',NULL,0,0,'2025-12-02 22:29:34'),(14,20,1,'uploads/1764744064625-616696155.jpg',NULL,0,0,'2025-12-03 09:41:04'),(15,20,2,'uploads/1764744998324-982461020.jpeg',NULL,0,0,'2025-12-03 09:56:38');
/*!40000 ALTER TABLE `tasksubmissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbadges`
--

DROP TABLE IF EXISTS `userbadges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userbadges` (
  `user_badge_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  `earned_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_badge_id`),
  UNIQUE KEY `idx_user_badge_unique` (`user_id`,`badge_id`),
  KEY `badge_id` (`badge_id`),
  CONSTRAINT `userbadges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `userbadges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`badge_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbadges`
--

LOCK TABLES `userbadges` WRITE;
/*!40000 ALTER TABLE `userbadges` DISABLE KEYS */;
/*!40000 ALTER TABLE `userbadges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('ERKEK','KADIN','BELIRTMEK_ISTEMIYOR') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` enum('USER','CLUB','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `total_points` int DEFAULT '0',
  `post_count` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `ux_users_username` (`username`),
  KEY `idx_users_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test1@mail.com','test_hash1','eko_ali','1995-05-15',NULL,'USER',25,0,'2025-12-01 01:43:23'),(2,'test2@mail.com','test_hash2','sosyal_ayse','2000-10-20',NULL,'USER',10,0,'2025-12-01 01:43:23'),(3,'kulup@mail.com','$2b$10$YourHashedPasswordHere','YesilAdimlar','2023-01-01',NULL,'CLUB',500,0,'2025-12-01 01:43:23'),(4,'cevre@a','$2b$10$k03MAvFd1R12.oIsANgIyuDh4byVu4/d.FmUtR3iu68pLgaSGxiEu','çevre klubü','8888-04-06','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-01 01:44:27'),(5,'talha@a','$2b$10$58vUXzbX7WVnKyRkaogDS.JXWbxcW7.VVQBnxwHAGPdYJPldcxt8m','talha plus','5555-05-05','ERKEK','USER',300,0,'2025-12-01 01:46:21'),(6,'doga@a','$2b$10$QrQ0UClNaIj.mz3DSQ/AleTBkaAZZohKaay3JOITR9RsYo.4xIpAq','doğa klubü','5555-05-05','BELIRTMEK_ISTEMIYOR','CLUB',250,0,'2025-12-01 01:47:50'),(7,'admin@ekososyal.com','$2b$10$kTL/FZ4owhDcRPYIWkf2Ge/eVMJiuhfV1636TtSjsV.B4r84X85bi','Admin',NULL,NULL,'ADMIN',200,0,'2025-12-01 21:11:40'),(8,'sumeyye@a','$2b$10$zKpecRPF5kCdBb3b1pt3veK7A/vg5uAkeSS53gVUaE/w9n8LoC4VK','sümeyye','2025-05-05','KADIN','USER',200,0,'2025-12-02 14:16:57'),(9,'fatma@gmail.com','$2b$10$f71Nvkj9EJL57TveMsaB/uxl3.SrSMe5t65ptggXQq/Q7RjpNQuii','Fatma Esinöz','1997-05-26','KADIN','USER',0,0,'2025-12-02 19:53:25'),(10,'yildizcevrekulubu@gmail.com','$2b$10$/RftRRRfioqtjwA7.V/9MuOvJLBzFOa8rfwID9W1BrLoxJsLalRIi','Yıldız Çevre Kulübü','2024-05-05','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 20:05:36'),(11,'halesever@gmail.com','$2b$10$O9ewmT7S4oAfqJr6EoFXUul66lnTQaKORqxuMIR.F.2rOHnlvKttm','Hale Sever','1990-12-05','KADIN','USER',0,0,'2025-12-02 20:09:42'),(12,'scudogakulubu@gmail.com','$2b$10$iO2Mc/v2VznSvfENApoLmufnOXXnEF/Q4kWqP9wrJzbn1Mrtpp8RG','SCÜ Doğa Kulübü','2010-04-15','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 20:27:34'),(13,'iklimkulubu@gmail.com','$2b$10$K.2lhgIxexPAVH2f/G58JOJzA3Jgf9/nXg3NMAwmGscuwiwDRDNL2','İklim Kulübü','1999-07-26','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 20:47:38'),(14,'geridonusumkulubu@gmail.com','$2b$10$.BIWtpYxTUVmiwUUFCGcF.fDktdYbg9VsjeYG/nCqgbOO7cJ/NH8m','Geri Dönüşüm Kulübü','2022-06-14','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 20:50:55'),(15,'hayvanlarikorumakulubu@gmail.com','$2b$10$zXDLFYs4/ldWyn9CP5bzWOZjAqmHHTfzWqpEC4MtoEfn44w.FAUke','SCÜ Hayvanları Koruma Kulübü','1999-02-12','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 21:10:53'),(16,'mehmetozturk@gmail.com','$2b$10$rxWyoJegkJEMKAbM/aQoBO8bWoaH84wi7VPilZlFu8qgcHLK8He2i','Mehmet Öztürk','1985-12-18','ERKEK','USER',0,0,'2025-12-02 21:14:24'),(17,'cudost@gmail.com','$2b$10$zxeQ5d8.56Dc3ElhzFo13edXCLtu33XmBoFINwcC6WwSXL462FYyC','CÜDOST','1989-02-21','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 21:17:14'),(18,'bilgi@gezengozler.com','$2b$10$ZbpNrl.ZP46EjnywDiQHxeNZdTkoh9ojO9hJHBa09VaIfoRc5p7Vu','Gezengözler Doğa Kulübü','1652-02-06','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 21:27:13'),(19,'ahmetkahraman@gmail.com','$2b$10$4TpbO0j4lotbIHT0LyA.2u5kCUGlubLtVu5VvTCn9lq5d68OZ3vhm','Ahmet Kahraman','1930-02-26','ERKEK','USER',0,0,'2025-12-02 21:34:27'),(20,'badeseckin@gmail.com','$2b$10$UOna/sotlvNF4Rsz/.kq2OMqY/Yr9G07lxDV70lLmGseqtudl5zwm','Bade Seçkin','1998-05-24','KADIN','USER',200,0,'2025-12-02 21:38:10'),(21,'teyzemindogasi@gmail','$2b$10$H3NrkVpNiMsCOnfrYLVTJOpymNbV0cNwnq2BD3GHUDlg45ylkOq2S','Teyzemin Doğası','1956-02-05','KADIN','USER',200,0,'2025-12-02 21:40:54'),(22,'sivdak@gmail.com','$2b$10$ICrEMOZqXhGLm3U6hOkEGOCINqQTOvgh3wM5kXQ0Kmpo.qqplvUZO','SİVDAK','1996-05-05','BELIRTMEK_ISTEMIYOR','CLUB',0,0,'2025-12-02 21:44:10'),(23,'selimselimoglu@gmail.com','$2b$10$A7m2.p92tV.8XDbcvdz4mO8q/jNYRDtFxQoRWVnXbHF6k/cbVVjae','Selim Selimoğlu','2000-02-22','ERKEK','USER',0,0,'2025-12-02 21:55:13'),(24,'deneme@e','$2b$10$ahSCsJKMp.AAIBtpOZhnM.gumrdKP7cxfF7JMeTYfhdosgdrDDEpW','deneme','5555-05-05','BELIRTMEK_ISTEMIYOR','USER',0,0,'2025-12-03 01:06:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertaskstatus`
--

DROP TABLE IF EXISTS `usertaskstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertaskstatus` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `task_id` int NOT NULL,
  `completed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `next_available_at` datetime DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  KEY `task_id` (`task_id`),
  KEY `idx_user_task` (`user_id`,`task_id`),
  KEY `idx_user_completed_at` (`user_id`,`completed_at`),
  CONSTRAINT `usertaskstatus_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `usertaskstatus_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertaskstatus`
--

LOCK TABLES `usertaskstatus` WRITE;
/*!40000 ALTER TABLE `usertaskstatus` DISABLE KEYS */;
INSERT INTO `usertaskstatus` VALUES (1,6,1,'2025-12-01 18:11:58',NULL),(2,6,2,'2025-12-01 18:12:08',NULL),(3,6,3,'2025-12-01 21:09:28',NULL),(4,5,1,'2025-12-01 22:14:49',NULL),(5,5,2,'2025-12-01 22:15:02',NULL),(6,5,3,'2025-12-02 14:01:36',NULL),(7,5,4,'2025-12-02 14:04:02',NULL),(8,8,1,'2025-12-02 14:21:55',NULL),(9,8,2,'2025-12-02 14:22:18',NULL),(10,7,1,'2025-12-02 14:27:33',NULL),(11,7,2,'2025-12-02 14:27:50',NULL),(12,21,1,'2025-12-02 22:27:47',NULL),(13,21,2,'2025-12-02 22:29:34',NULL),(14,20,1,'2025-12-03 09:41:04',NULL),(15,20,2,'2025-12-03 09:56:38',NULL);
/*!40000 ALTER TABLE `usertaskstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uservotes`
--

DROP TABLE IF EXISTS `uservotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uservotes` (
  `vote_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `poll_id` int NOT NULL,
  `option_id` int NOT NULL,
  `voted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vote_id`),
  KEY `user_id` (`user_id`),
  KEY `poll_id` (`poll_id`),
  KEY `option_id` (`option_id`),
  CONSTRAINT `uservotes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `uservotes_ibfk_2` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`poll_id`) ON DELETE CASCADE,
  CONSTRAINT `uservotes_ibfk_3` FOREIGN KEY (`option_id`) REFERENCES `polloptions` (`option_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uservotes`
--

LOCK TABLES `uservotes` WRITE;
/*!40000 ALTER TABLE `uservotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `uservotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ekososyal'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 21:17:11
