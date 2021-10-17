-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2021 at 04:40 AM
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
  `adminUniqueCode` varchar(20) NOT NULL,
  `adminID` int(5) NOT NULL,
  `adminName` varchar(50) NOT NULL,
  `adminEmail` varchar(50) NOT NULL,
  `adminPassword` varchar(100) NOT NULL,
  `adminContact` int(20) NOT NULL,
  `adminStatus` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `reportID` int(5) NOT NULL,
  `reportTitle` varchar(50) NOT NULL,
  `reportDetails` varchar(200) NOT NULL,
  `reportDate` datetime NOT NULL,
  `reportStatus` tinyint(1) NOT NULL DEFAULT 1,
  `adminUniqueCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE `rules` (
  `ruleID` int(5) NOT NULL,
  `ruleTitle` varchar(50) NOT NULL,
  `ruleDetails` varchar(200) NOT NULL,
  `ruleDate` datetime NOT NULL,
  `ruleStatus` tinyint(1) NOT NULL DEFAULT 1,
  `adminUniqueCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `stationID` int(5) NOT NULL,
  `stationName` varchar(50) NOT NULL,
  `stationDeparture` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticketUniqueCode` varchar(20) NOT NULL,
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
  `userUniqueCode` varchar(20) NOT NULL,
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
('user4616b80e607a934', 4, 'test2', 'test2', '$2y$10$ahaYXAgcrS4YyQrr9G8RVOAjBdl6ji0WH8RP.CpH0HMk3TWng48VG', 1234, '2000-01-01', 1, 0, 0),
('user616b3a8ebf0791', 1, 'lyn', 'lyn@gmail.com', '$2y$10$dHJvR33wmbfyo3OBwURpAewnCJhCJZIBx6PNS9WFlLP9uQb41rcC.', 123456789, '2000-12-29', 1, 0, 0),
('user616b3b8572d9c2', 2, 'lynchee', 'lynchee@gmail.com', '$2y$10$VJelrjwSdRIwL0xZGqqduedbtZeA/ie6gYIvF.I9fNmx7SnicE2kW', 123456788, '2000-01-01', 1, 0, 0),
('user616b468d6484d3', 3, 'evan', 'evan@test.com', '$2y$10$6yBFV1sUt2CRePf5JZh44ONdodMYbNUybuWH7XoUC5FtIBIZuURdK', 123456789, '1995-08-24', 1, 0, 0);

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
  MODIFY `reportID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `routeID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `routes_stations`
--
ALTER TABLE `routes_stations`
  MODIFY `route_station_ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rules`
--
ALTER TABLE `rules`
  MODIFY `ruleID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `stationID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stoss`
--
ALTER TABLE `stoss`
  MODIFY `stosID` int(5) NOT NULL AUTO_INCREMENT;

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
