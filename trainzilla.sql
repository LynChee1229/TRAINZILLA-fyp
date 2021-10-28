-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2021 at 12:29 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trainzilla`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `adminUniqueCode` varchar(50) NOT NULL,
  `adminID` int(5) NOT NULL,
  `adminName` varchar(50) NOT NULL,
  `adminEmail` varchar(50) NOT NULL,
  `adminPassword` varchar(100) NOT NULL,
  `adminContact` int(20) NOT NULL,
  `adminStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`adminUniqueCode`, `adminID`, `adminName`, `adminEmail`, `adminPassword`, `adminContact`, `adminStatus`) VALUES
('admin106170f60d821d810', 10, 'Dummy 10', '10@gmail.com', '$2y$10$NeR4Q6Jki6h/w.f.uAUkz.VpssK1l/ZR4JmDtXpLxKjaAFqblQDlO', 123456789, 0),
('admin116170f6214ea3f11', 11, 'Dummy 11', '11@gmail.com', '$2y$10$nmqz7BPzHLIVNFNS.wbXdeLGJKTk1Ttp8AQasrSAgKqLBAXOx7z1S', 123456789, 0),
('admin190qknrtas671', 1, 'Chan Lin Chee', 'lyn@gmail.com', '$2y$10$PaUOde/XObsDeSjJeUbKQOq3ZbCoP2kl2NhaAs6btG.Q/HpXLFpWi', 1231231234, 1),
('admin2rtmokas67890', 2, 'Test 222', '111@gmail.com', '$2y$10$XOs.T6yN0jXNOZ094TzaWO.fBOHWb/Whh3G5RJqAVpbPG5bAwvW3y', 123123123, 1),
('admin36170f07ee3c893', 3, 'Evan Lin Yan Jun', 'evan@icloud.com', '$2y$10$zGqImflYALFc8l0wkFiY1OG.bUhfDW.U5Gh0vvJ6pKtbzFTzYzy7K', 163577219, 1),
('admin46170f348c527f4', 4, 'Dummy 4', '4@gmail.com', '$2y$10$0YZmInVGDHPmdW31ZFbtgufB9UUmi38c6ICKIF0b3VtselImzStSS', 123456789, 0),
('admin56170f362340665', 5, 'Dummy 5', '5@gmail.com', '$2y$10$oSPltEAUwy26N.wf3B6Q5ee4PV44rQw16xJU2kmi31cKmLvTeZ6oq', 123456789, 0),
('admin66170f39ce8d726', 6, 'Dummy 6', '6@gmail.com', '$2y$10$psax5vKxJNE5uPC2JhlLZO9232e8jFpwX0yTz5v5tzv0hGkjcilUe', 123456789, 0),
('admin76170f3c1c0dd47', 7, 'Dummy 7', '7@gmail.com', '$2y$10$m.skMzUpLnqQeuhIP3EoMuVLdm7NHimOM5Lxxc/x5WCQZDqGSMMq.', 123456789, 0),
('admin86170f45632dc48', 8, 'Dummy 8', '8@gmail.com', '$2y$10$8cibowEZtk8YtAYFW9hOp.AsadrXZw6S4Km.vkeqLjudhbInapWb6', 123456789, 0),
('admin96170f47094e3d9', 9, 'Dummy 9', '9@gmail.com', '$2y$10$62tz9jN/8RohdEzOEVczIOCeW.Xg8AY7mbb3v32MMI4rKZbGSCXHS', 123456789, 0);

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `reportID` int(5) NOT NULL,
  `reportTitle` varchar(50) NOT NULL,
  `reportDetails` varchar(200) NOT NULL,
  `reportDate` date NOT NULL,
  `reportStatus` tinyint(1) NOT NULL DEFAULT 1,
  `adminUniqueCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`reportID`, `reportTitle`, `reportDetails`, `reportDate`, `reportStatus`, `adminUniqueCode`) VALUES
(1, 'Looooooooooooooooooooooooooooooooong Title', 'Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Details', '2021-10-21', 1, 'admin190qknrtas671'),
(2, 'Title 2', 'Details 2 - mediummmmmmmmmmmmmmmmmmm leeeeeeeength', '2021-10-22', 1, 'admin190qknrtas671'),
(3, 'Title 3', 'Details 3', '2021-10-21', 1, 'admin190qknrtas671'),
(4, 'Title 4', 'Details 4', '2021-10-22', 0, 'admin2rtmokas67890'),
(5, 'Title 5', 'Details testing 555', '2021-10-22', 0, 'admin2rtmokas67890'),
(6, 'Title 6', 'Details 6', '2021-10-22', 0, 'admin2rtmokas67890'),
(7, 'Title 7', 'Details 7', '2021-10-21', 0, 'admin2rtmokas67890'),
(8, 'Title 888888', 'Details 8888', '2021-10-21', 1, 'admin2rtmokas67890'),
(9, 'Title 9', 'Details 9', '2021-10-21', 0, 'admin2rtmokas67890'),
(10, 'Title 10', 'Details 10', '2021-10-21', 0, 'admin2rtmokas67890'),
(11, 'Test 11', 'Test 11', '2021-10-21', 0, 'admin2rtmokas67890'),
(12, 'Test 12', 'Test 12', '2021-10-21', 1, 'admin2rtmokas67890'),
(13, 'Test 13', 'Test 13', '2021-10-21', 0, 'admin2rtmokas67890'),
(14, 'Test 14', 'Test 14', '2021-10-21', 0, 'admin2rtmokas67890'),
(15, 'Test 1555', 'Test 15', '2021-10-21', 0, 'admin2rtmokas67890'),
(16, 'Test 16', 'Test 16666', '2021-10-21', 0, 'admin2rtmokas67890'),
(17, 'Test 17', 'Test 17', '2021-10-21', 0, 'admin2rtmokas67890'),
(18, 'Test 18', 'Test 18\r\nTest', '2021-10-21', 0, 'admin2rtmokas67890'),
(19, 'Test 19', 'Test 19999', '2021-10-21', 0, 'admin2rtmokas67890'),
(20, 'Test 2000', 'Test 20000', '2021-10-21', 0, 'admin2rtmokas67890'),
(21, 'Title 21', 'Details 21', '2021-10-21', 0, 'admin2rtmokas67890'),
(22, 'Title 22', 'Details 22', '2021-10-21', 0, 'admin2rtmokas67890'),
(23, 'Title 23', 'Details 23', '2021-10-21', 1, 'admin36170f07ee3c893'),
(24, 'Title 24 :D', 'Details 24 ^^ Hi August', '2021-10-21', 1, 'admin36170f07ee3c893'),
(25, 'test 25', 'test 25', '2021-10-21', 0, 'admin2rtmokas67890'),
(26, 'test 26', 'test 26', '2021-10-22', 0, 'admin190qknrtas671'),
(29, 'Announcement Title test', 'Announcement Details test', '2021-10-22', 0, 'admin190qknrtas671');

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `routeID` int(5) NOT NULL,
  `routeTitle` varchar(50) NOT NULL,
  `routeStatus` tinyint(1) NOT NULL DEFAULT 0,
  `routeTrainNum` int(5) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`routeID`, `routeTitle`, `routeStatus`, `routeTrainNum`) VALUES
(1, 'Ampang Line', 1, 10),
(2, 'Sungai Buloh Line', 1, 10),
(3, 'Port Klang Line', 0, 10),
(4, 'Kelana Jaya Line', 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `routes_stations`
--

CREATE TABLE `routes_stations` (
  `route_station_ID` int(5) NOT NULL,
  `route_station_sequence` int(3) NOT NULL,
  `routeID` int(5) NOT NULL,
  `stationID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `routes_stations`
--

INSERT INTO `routes_stations` (`route_station_ID`, `route_station_sequence`, `routeID`, `stationID`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 2),
(3, 3, 1, 3),
(4, 4, 1, 4),
(5, 5, 1, 5),
(6, 6, 1, 6),
(7, 7, 1, 7),
(8, 8, 1, 8),
(9, 9, 1, 9),
(18, 1, 3, 18),
(19, 4, 3, 10),
(20, 10, 3, 13),
(21, 2, 3, 19),
(22, 3, 3, 20),
(23, 5, 3, 21),
(24, 6, 3, 22),
(25, 7, 3, 23),
(26, 8, 3, 24),
(27, 9, 3, 25),
(28, 11, 3, 26),
(29, 12, 3, 27),
(30, 13, 3, 28),
(31, 14, 3, 29),
(32, 15, 3, 30),
(156, 1, 2, 10),
(157, 2, 2, 11),
(158, 3, 2, 12),
(159, 4, 2, 13),
(160, 5, 2, 14),
(161, 6, 2, 15),
(162, 7, 2, 16),
(163, 8, 2, 17),
(262, 1, 4, 32),
(263, 2, 4, 34),
(264, 3, 4, 35),
(265, 4, 4, 36),
(266, 5, 4, 37),
(267, 6, 4, 38),
(268, 7, 4, 6),
(269, 8, 4, 14),
(270, 9, 4, 13),
(271, 10, 4, 39),
(272, 11, 4, 40),
(273, 12, 4, 33);

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE `rules` (
  `ruleID` int(5) NOT NULL,
  `ruleTitle` varchar(50) NOT NULL,
  `ruleDetails` varchar(500) NOT NULL,
  `ruleDate` date NOT NULL,
  `ruleStatus` tinyint(1) NOT NULL DEFAULT 1,
  `adminUniqueCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`ruleID`, `ruleTitle`, `ruleDetails`, `ruleDate`, `ruleStatus`, `adminUniqueCode`) VALUES
(1, 'Social Distancing', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Sem ligula. Cubilia ipsum nostra montes quam habitasse urna mus porta iaculis gravida natoque odio parturient. Non sociis montes aenean. Parturient mi leo nisi consectetuer facilisis integer dictum maecenas nascetur amet class bibendum auctor. Ut eleifend nisi nulla consequat rhoncus ultrices torquent tempu.', '2021-10-22', 1, 'admin190qknrtas671'),
(2, 'Keep Back from The Platform Edge', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.', '2021-10-22', 0, 'admin190qknrtas671'),
(4, 'Do not eat on the trains.', 'Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica.', '2021-10-22', 0, 'admin190qknrtas671'),
(6, 'Travel Guideline', 'Passengers will have to arrive at the departure station at least 90 minutes before the departure time of the train. All the passengers will have to wear face cover in the station premises and during train travel.', '2021-10-22', 0, 'admin36170f07ee3c893');

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `stationID` int(5) NOT NULL,
  `stationName` varchar(50) NOT NULL,
  `stationDeparture` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`stationID`, `stationName`, `stationDeparture`) VALUES
(1, 'Ampang', '08:00:00'),
(2, 'Pandan Indah', NULL),
(3, 'Pandan Jaya', NULL),
(4, 'Pudu', NULL),
(5, 'Plaza Rakyat', NULL),
(6, 'Masjid Jamek', NULL),
(7, 'Bandaraya', NULL),
(8, 'Sultan Ismail', NULL),
(9, 'Sentul Timur', '08:00:00'),
(10, 'Sungai Buloh', '07:00:00'),
(11, 'Bandar Utama', NULL),
(12, 'Muzium Negara', '09:00:00'),
(13, 'KL Sentral', NULL),
(14, 'Pasar Seni', NULL),
(15, 'Bukit Bintang', '09:00:00'),
(16, 'Taman Connaught', NULL),
(17, 'Kajang', '07:00:00'),
(18, 'Batang Kali', '07:00:00'),
(19, 'Rawang', NULL),
(20, 'Kuang', NULL),
(21, 'Kepong', NULL),
(22, 'Segambut', NULL),
(23, 'PWTC', NULL),
(24, 'Bank Negara', NULL),
(25, 'Kuala Lumpur', NULL),
(26, 'Petaling', NULL),
(27, 'Setia Jaya', NULL),
(28, 'Shah Alam', NULL),
(29, 'Klang', NULL),
(30, 'Port Klang', '07:00:00'),
(31, 'Temporarily Station', '05:00:00'),
(32, 'Gombak', '06:00:00'),
(33, 'Subang Alam', '06:00:00'),
(34, 'Taman Melati', NULL),
(35, 'Wangsa Maju', NULL),
(36, 'Sri Rampai', NULL),
(37, 'Ampang Park', NULL),
(38, 'KLCC', NULL),
(39, 'Kelana Jaya', NULL),
(40, 'Subang Jaya', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stoss`
--

CREATE TABLE `stoss` (
  `stosID` int(5) NOT NULL,
  `stationA` varchar(50) NOT NULL,
  `stationB` varchar(50) NOT NULL,
  `stationDistance` double NOT NULL DEFAULT 0,
  `stationTimeTaken` int(5) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stoss`
--

INSERT INTO `stoss` (`stosID`, `stationA`, `stationB`, `stationDistance`, `stationTimeTaken`) VALUES
(1, 'Ampang', 'Pandan Indah', 6.8, 408),
(2, 'Pandan Indah', 'Pandan Jaya', 4.5, 270),
(3, 'Pandan Jaya', 'Pudu', 5.2, 312),
(4, 'Pudu', 'Plaza Rakyat', 3.9, 234),
(5, 'Plaza Rakyat', 'Masjid Jamek', 4, 240),
(6, 'Masjid Jamek', 'Bandaraya', 2.4, 144),
(7, 'Bandaraya', 'Sultan Ismail', 2.8, 168),
(8, 'Sultan Ismail', 'Sentul Timur', 4.1, 246),
(9, 'Sungai Buloh', 'Bandar Utama', 14, 840),
(10, 'Bandar Utama', 'Muzium Negara', 15, 900),
(11, 'Muzium Negara', 'KL Sentral', 2.4, 144),
(12, 'KL Sentral', 'Pasar Seni', 3, 180),
(13, 'Pasar Seni', 'Bukit Bintang', 2.6, 156),
(14, 'Bukit Bintang', 'Taman Connaught', 10, 600),
(15, 'Taman Connaught', 'Kajang', 14, 840),
(16, 'Batang Kali', 'Rawang', 22, 1320),
(17, 'Rawang', 'Kuang', 12, 720),
(18, 'Kuang', 'Sungai Buloh', 7, 420),
(19, 'Sungai Buloh', 'Kepong', 11, 660),
(20, 'Kepong', 'Segambut', 5.6, 336),
(21, 'Segambut', 'PWTC', 6.2, 372),
(22, 'PWTC', 'Bank Negara', 3.9, 234),
(23, 'Bank Negara', 'Kuala Lumpur', 4.3, 258),
(24, 'Kuala Lumpur', 'KL Sentral', 5.2, 312),
(25, 'KL Sentral', 'Petaling', 24, 1440),
(26, 'Petaling', 'Setia Jaya', 18, 1080),
(27, 'Setia Jaya', 'Shah Alam', 13, 780),
(28, 'Shah Alam', 'Klang', 9.6, 576),
(29, 'Klang', 'Port Klang', 8.7, 522),
(30, 'Sungai Buloh', 'KL Sentral', 5, 300),
(31, 'Pasar Seni', 'Kajang', 5, 300),
(32, 'Temporarily Station', 'Bandar Utama', 5, 300),
(33, 'Taman Connaught', 'Sungai Buloh', 5, 300),
(34, 'Sungai Buloh', 'Kajang', 12, 720),
(35, 'Gombak', 'Subang Alam', 42, 2520),
(36, 'Gombak', 'Taman Melati', 13, 780),
(37, 'Taman Melati', 'Wangsa Maju', 2.3, 138),
(38, 'Wangsa Maju', 'Sri Rampai', 4, 240),
(39, 'Sri Rampai', 'Ampang Park', 5.8, 348),
(40, 'Ampang Park', 'KLCC', 1.7, 102),
(41, 'KLCC', 'Masjid Jamek', 3, 180),
(42, 'Masjid Jamek', 'Pasar Seni', 1.8, 108),
(43, 'KL Sentral', 'Kelana Jaya', 14, 840),
(44, 'Kelana Jaya', 'Subang Jaya', 12, 720),
(45, 'Subang Jaya', 'Subang Alam', 8.1, 486);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticketUniqueCode` varchar(50) NOT NULL,
  `ticketID` int(5) NOT NULL,
  `ticketPrice` float(5,2) NOT NULL,
  `ticketDeparture` int(5) NOT NULL,
  `ticketArrival` int(5) NOT NULL,
  `ticketPaymentMethod` varchar(50) NOT NULL,
  `ticketStatus` tinyint(1) NOT NULL DEFAULT 1,
  `ticketPurchaseDate` datetime NOT NULL,
  `ticketExpiryDate` datetime NOT NULL,
  `userUniqueCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userUniqueCode` varchar(50) NOT NULL,
  `userID` int(5) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userEmail` varchar(50) NOT NULL,
  `userPassword` varchar(100) NOT NULL,
  `userContact` int(20) NOT NULL,
  `userDOB` date NOT NULL,
  `userStatus` tinyint(1) NOT NULL DEFAULT 1,
  `userVoucher` int(5) NOT NULL DEFAULT 0,
  `userPoint` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userUniqueCode`, `userID`, `userName`, `userEmail`, `userPassword`, `userContact`, `userDOB`, `userStatus`, `userVoucher`, `userPoint`) VALUES
('user16172e386084111', 1, 'lyn', 'lyn@gmail.com', '$2y$10$y/qUgGLbIXoEov7byeqVWOVKnfCX0GenPvLsKkrixKwIGbynELwzS', 123456789, '2000-01-01', 1, 5, 2400),
('user26172e3ad9b2072', 2, 'lynchee', 'lynchee@icloud.com', '$2y$10$qHeUsPs3IxwLvfS8FkFEOeV3Ght6Y.dwUHh//0MQ/Q7y6rLXNd0IW', 111111111, '2000-01-01', 1, 0, 0),
('user36172e3dbe33ef3', 3, 'Testuser1', '1@test.com', '$2y$10$lOcWN9Y1VhWw5Ic5Q9Flyu25uz3PQvsu0l97mPxp3BvZyrnct3TM.', 122222222, '2000-01-01', 0, 0, 0),
('user46172e425adaf54', 4, 'testuser2', '2@gmail.com', '$2y$10$2OhSoRe9DUpEB9BQPu4je.BgVdJSlCBrNeONhyBrwc.VOj9yaNxhS', 1333333333, '1900-01-01', 0, 0, 0),
('user56172e4494ee215', 5, 'testuser3', '3@gmail.com', '$2y$10$EXWIH6.vN5q.3B2ASAau1OppWoDwe75qtQFjEGUdJC4rEWy5vjZ3a', 144444444, '1994-01-01', 0, 0, 0),
('user66172e474e40406', 6, 'testuser5', '5@test.com', '$2y$10$uHz1VC5iwRQFA7cx/TdMWu5tfwGFYMMdo64GN29bBMFYw5z2kgRBe', 155555555, '1995-01-01', 0, 0, 0),
('user76172ed253953d7', 7, 'Loooooooooooong Name', 'looooooong@email.com', '$2y$10$LFIYC7DhwigOHgzsmBpmceV8q80PVWjGGCdqmA0gAx4qN6eCvyL4C', 191234567, '1995-01-01', 1, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`adminUniqueCode`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`reportID`),
  ADD KEY `adminUniqueCode` (`adminUniqueCode`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`routeID`);

--
-- Indexes for table `routes_stations`
--
ALTER TABLE `routes_stations`
  ADD PRIMARY KEY (`route_station_ID`),
  ADD KEY `routeID` (`routeID`),
  ADD KEY `stationID` (`stationID`);

--
-- Indexes for table `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`ruleID`),
  ADD KEY `adminUniqueCode` (`adminUniqueCode`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`stationID`);

--
-- Indexes for table `stoss`
--
ALTER TABLE `stoss`
  ADD PRIMARY KEY (`stosID`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticketUniqueCode`),
  ADD KEY `userUniqueCode` (`userUniqueCode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userUniqueCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `reportID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `routeID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `routes_stations`
--
ALTER TABLE `routes_stations`
  MODIFY `route_station_ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=274;

--
-- AUTO_INCREMENT for table `rules`
--
ALTER TABLE `rules`
  MODIFY `ruleID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `stationID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `stoss`
--
ALTER TABLE `stoss`
  MODIFY `stosID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`adminUniqueCode`) REFERENCES `admins` (`adminUniqueCode`);

--
-- Constraints for table `routes_stations`
--
ALTER TABLE `routes_stations`
  ADD CONSTRAINT `routes_stations_ibfk_1` FOREIGN KEY (`routeID`) REFERENCES `routes` (`routeID`),
  ADD CONSTRAINT `routes_stations_ibfk_2` FOREIGN KEY (`stationID`) REFERENCES `stations` (`stationID`);

--
-- Constraints for table `rules`
--
ALTER TABLE `rules`
  ADD CONSTRAINT `rules_ibfk_1` FOREIGN KEY (`adminUniqueCode`) REFERENCES `admins` (`adminUniqueCode`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`userUniqueCode`) REFERENCES `users` (`userUniqueCode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
